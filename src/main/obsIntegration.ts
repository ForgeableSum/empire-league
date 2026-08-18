import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { app, safeStorage } from "electron";
import WebSocket from "ws";
import type { ObsIntegrationStatus, ObsOutputStatus, ObsSetupResult } from "../shared/contracts/electronApi.js";

const obsUrl = "ws://127.0.0.1:4455";
const sceneName = "Empire League";
const appSourceName = "Empire League - App";
const gameSourceName = "Empire League - Age of Empires II";
const appCaptureExecutable = basename(process.execPath);
let desiredCapture: "app" | "game" = "app";

type JsonObject = Record<string, unknown>;

class ObsClient {
  private socket?: WebSocket;
  private sequence = 0;
  private pending = new Map<string, { resolve: (value: JsonObject) => void; reject: (error: Error) => void }>();

  async connect(password?: string): Promise<{ obsVersion?: string; websocketVersion?: string }> {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket(obsUrl, "obswebsocket.json", { handshakeTimeout: 2500 });
      this.socket = socket;
      const fail = (error: Error) => {
        socket.close();
        reject(error);
      };
      socket.once("error", fail);
      socket.on("message", (raw) => {
        try {
          const message = JSON.parse(raw.toString()) as { op: number; d: JsonObject };
          if (message.op === 0) {
            const authentication = message.d.authentication as { challenge: string; salt: string } | undefined;
            if (authentication && !password) return fail(new Error("OBS_PASSWORD_REQUIRED"));
            socket.send(JSON.stringify({ op: 1, d: {
              rpcVersion: 1,
              ...(authentication ? { authentication: makeAuthentication(password!, authentication.salt, authentication.challenge) } : {})
            } }));
          } else if (message.op === 2) {
            socket.removeListener("error", fail);
            resolve({
              obsVersion: message.d.obsStudioVersion as string | undefined,
              websocketVersion: message.d.obsWebSocketVersion as string | undefined
            });
          } else if (message.op === 7) {
            const requestId = String(message.d.requestId);
            const waiter = this.pending.get(requestId);
            if (!waiter) return;
            this.pending.delete(requestId);
            const status = message.d.requestStatus as { result: boolean; comment?: string; code?: number };
            if (status.result) waiter.resolve((message.d.responseData as JsonObject | undefined) ?? {});
            else waiter.reject(new Error(status.comment || `OBS request failed (${status.code ?? "unknown"}).`));
          }
        } catch (error) {
          fail(error instanceof Error ? error : new Error(String(error)));
        }
      });
      socket.once("close", (code) => {
        if (code === 4009) reject(new Error("OBS authentication failed. Check the WebSocket password."));
        for (const waiter of this.pending.values()) waiter.reject(new Error("OBS disconnected."));
        this.pending.clear();
      });
    });
  }

  async request(requestType: string, requestData: JsonObject = {}): Promise<JsonObject> {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) throw new Error("OBS is not connected.");
    const requestId = `empire-league-${++this.sequence}`;
    const response = new Promise<JsonObject>((resolve, reject) => this.pending.set(requestId, { resolve, reject }));
    this.socket.send(JSON.stringify({ op: 6, d: { requestType, requestId, requestData } }));
    return response;
  }

  close(): void {
    this.socket?.close();
  }
}

export async function getObsStatus(password?: string): Promise<ObsIntegrationStatus> {
  const effectivePassword = password || await loadPassword();
  const client = new ObsClient();
  try {
    const version = await client.connect(effectivePassword);
    const scenes = await client.request("GetSceneList");
    const configured = Array.isArray(scenes.scenes)
      && scenes.scenes.some((scene) => (scene as { sceneName?: string }).sceneName === sceneName);
    return {
      state: configured ? "configured" : "connected",
      message: configured ? "OBS is connected and the Empire League scene is ready." : "OBS is connected and ready to set up.",
      ...version,
      sceneConfigured: configured
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message === "OBS_PASSWORD_REQUIRED") {
      return { state: "auth_required", message: "OBS is running. Enter the password from Tools → WebSocket Server Settings." };
    }
    if (/ECONNREFUSED|connect/i.test(message)) {
      return { state: "unavailable", message: "Turn on Enable WebSocket server in OBS under Tools → WebSocket Server Settings." };
    }
    return { state: "error", message };
  } finally {
    client.close();
  }
}

export async function setupObs(password?: string): Promise<ObsSetupResult> {
  const effectivePassword = password || await loadPassword();
  const client = new ObsClient();
  try {
    const version = await client.connect(effectivePassword);
    if (password) await savePassword(password);

    const sceneList = await client.request("GetSceneList");
    const hasScene = Array.isArray(sceneList.scenes)
      && sceneList.scenes.some((scene) => (scene as { sceneName?: string }).sceneName === sceneName);
    if (!hasScene) await client.request("CreateScene", { sceneName });

    await ensureInput(client, appSourceName, "window_capture", {
      priority: 2,
      capture_cursor: true,
      method: 2
    });
    await ensureInput(client, gameSourceName, "game_capture", {
      capture_mode: "window",
      priority: 2,
      capture_cursor: true,
      anti_cheat_hook: true
    });
    const appReady = await ensureWindowTarget(client, appSourceName, appCaptureExecutable);
    await ensureAoe2CaptureTarget(client);
    await fitManagedSourcesToCanvas(client);
    await setSceneCapture(client, "app");
    await client.request("SetCurrentProgramScene", { sceneName });
    const output = await readRawOutputStatus(client);
    if (!output.streaming && !output.recording) await disableManagedSources(client);
    return {
      ok: true,
      message: appReady
        ? "The Empire League scene is selected. It will switch to AoE2 after the game-start countdown."
        : "The scene was created, but OBS could not identify the Empire League window.",
      ...version
    };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : String(error) };
  } finally {
    client.close();
  }
}

export async function getObsOutputStatus(): Promise<ObsOutputStatus> {
  return withObsOutputClient(async (client) => readOutputStatus(client));
}

export async function setObsStreaming(active: boolean): Promise<ObsOutputStatus> {
  return withObsOutputClient(async (client) => {
    const current = await readOutputStatus(client);
    if (current.streaming !== active) {
      if (active) await prepareDesiredCapture(client);
      await client.request(active ? "StartStream" : "StopStream");
    }
    return readOutputStatus(client);
  });
}

export async function setObsRecording(active: boolean): Promise<ObsOutputStatus> {
  return withObsOutputClient(async (client) => {
    const current = await readOutputStatus(client);
    if (current.recording !== active) {
      if (active) await prepareDesiredCapture(client);
      await client.request(active ? "StartRecord" : "StopRecord");
    }
    return readOutputStatus(client);
  });
}

export async function setObsCaptureMode(mode: "app" | "game"): Promise<boolean> {
  desiredCapture = mode;
  const client = new ObsClient();
  try {
    await client.connect(await loadPassword());
    if (mode === "game" && !await ensureAoe2CaptureTarget(client)) return false;
    if (mode === "app" && !await ensureWindowTarget(client, appSourceName, appCaptureExecutable)) return false;
    await fitManagedSourcesToCanvas(client);
    await setSceneCapture(client, mode);
    return true;
  } catch {
    return false;
  } finally {
    client.close();
  }
}

async function withObsOutputClient(action: (client: ObsClient) => Promise<ObsOutputStatus>): Promise<ObsOutputStatus> {
  const client = new ObsClient();
  try {
    await client.connect(await loadPassword());
    return await action(client);
  } catch (error) {
    return {
      connected: false,
      captureReady: false,
      streaming: false,
      recording: false,
      message: error instanceof Error ? error.message : String(error)
    };
  } finally {
    client.close();
  }
}

async function readOutputStatus(client: ObsClient): Promise<ObsOutputStatus> {
  const [stream, record, video] = await Promise.all([
    client.request("GetStreamStatus"),
    client.request("GetRecordStatus"),
    client.request("GetVideoSettings")
  ]);
  const captureReady = desiredCapture === "game"
    ? await ensureAoe2CaptureTarget(client)
    : await ensureWindowTarget(client, appSourceName, appCaptureExecutable);
  const streaming = Boolean(stream.outputActive);
  const recording = Boolean(record.outputActive);
  if (captureReady && (streaming || recording)) await setSceneCapture(client, desiredCapture);
  else if (!streaming && !recording) await disableManagedSources(client);
  return {
    connected: true,
    captureReady,
    streaming,
    recording,
    streamTimecode: stream.outputTimecode as string | undefined,
    recordTimecode: record.outputTimecode as string | undefined,
    outputWidth: Number(video.outputWidth) || undefined,
    outputHeight: Number(video.outputHeight) || undefined,
    fps: Number(video.fpsNumerator) && Number(video.fpsDenominator)
      ? Number(video.fpsNumerator) / Number(video.fpsDenominator)
      : undefined
  };
}

async function readRawOutputStatus(client: ObsClient): Promise<{ streaming: boolean; recording: boolean }> {
  const [stream, record] = await Promise.all([
    client.request("GetStreamStatus"),
    client.request("GetRecordStatus")
  ]);
  return { streaming: Boolean(stream.outputActive), recording: Boolean(record.outputActive) };
}

async function prepareDesiredCapture(client: ObsClient): Promise<void> {
  const ready = desiredCapture === "game"
    ? await ensureAoe2CaptureTarget(client)
    : await ensureWindowTarget(client, appSourceName, appCaptureExecutable);
  if (!ready) throw new Error("The active OBS capture window is not ready.");
  await fitManagedSourcesToCanvas(client);
  await setSceneCapture(client, desiredCapture);
}

async function ensureAoe2CaptureTarget(client: ObsClient): Promise<boolean> {
  return ensureWindowTarget(client, gameSourceName, "aoe2de_s.exe");
}

async function ensureWindowTarget(client: ObsClient, inputName: string, executable: string): Promise<boolean> {
  try {
    const properties = await client.request("GetInputPropertiesListPropertyItems", {
      inputName,
      propertyName: "window"
    });
    const items = Array.isArray(properties.propertyItems) ? properties.propertyItems : [];
    const target = items.find((item) => {
      const value = (item as { itemValue?: unknown }).itemValue;
      return typeof value === "string" && value.toLowerCase().includes(executable);
    }) as { itemValue?: string } | undefined;
    if (!target?.itemValue) return false;

    const current = await client.request("GetInputSettings", { inputName });
    const settings = (current.inputSettings as JsonObject | undefined) ?? {};
    const gameModeNeedsUpdate = inputName === gameSourceName && settings.capture_mode !== "window";
    if (settings.window !== target.itemValue || gameModeNeedsUpdate) {
      await client.request("SetInputSettings", {
        inputName,
        inputSettings: { ...(inputName === gameSourceName ? { capture_mode: "window" } : {}), window: target.itemValue, priority: 2 },
        overlay: true
      });
    }
    return true;
  } catch {
    return false;
  }
}

async function ensureInput(client: ObsClient, inputName: string, inputKind: string, inputSettings: JsonObject): Promise<void> {
  const inputs = await client.request("GetInputList");
  const hasInput = Array.isArray(inputs.inputs)
    && inputs.inputs.some((input) => (input as { inputName?: string }).inputName === inputName);
  if (hasInput) {
    await client.request("SetInputSettings", { inputName, inputSettings, overlay: true });
    try {
      await client.request("GetSceneItemId", { sceneName, sourceName: inputName });
    } catch {
      await client.request("CreateSceneItem", { sceneName, sourceName: inputName, sceneItemEnabled: true });
    }
  } else {
    await client.request("CreateInput", { sceneName, inputName, inputKind, inputSettings, sceneItemEnabled: true });
  }
}

async function setSceneCapture(client: ObsClient, mode: "app" | "game"): Promise<void> {
  for (const [sourceName, enabled] of [[appSourceName, mode === "app"], [gameSourceName, mode === "game"]] as const) {
    const item = await client.request("GetSceneItemId", { sceneName, sourceName });
    await client.request("SetSceneItemEnabled", { sceneName, sceneItemId: item.sceneItemId, sceneItemEnabled: enabled });
  }
}

async function disableManagedSources(client: ObsClient): Promise<void> {
  for (const sourceName of [appSourceName, gameSourceName]) {
    const item = await client.request("GetSceneItemId", { sceneName, sourceName });
    await client.request("SetSceneItemEnabled", { sceneName, sceneItemId: item.sceneItemId, sceneItemEnabled: false });
  }
}

async function fitManagedSourcesToCanvas(client: ObsClient): Promise<void> {
  const video = await client.request("GetVideoSettings");
  const boundsWidth = Number(video.baseWidth);
  const boundsHeight = Number(video.baseHeight);
  if (!Number.isFinite(boundsWidth) || !Number.isFinite(boundsHeight) || boundsWidth <= 0 || boundsHeight <= 0) return;
  for (const sourceName of [appSourceName, gameSourceName]) {
    const item = await client.request("GetSceneItemId", { sceneName, sourceName });
    await client.request("SetSceneItemTransform", {
      sceneName,
      sceneItemId: item.sceneItemId,
      sceneItemTransform: {
        positionX: 0,
        positionY: 0,
        alignment: 5,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        boundsType: "OBS_BOUNDS_SCALE_INNER",
        boundsAlignment: 0,
        boundsWidth,
        boundsHeight,
        cropLeft: 0,
        cropTop: 0,
        cropRight: 0,
        cropBottom: 0
      }
    });
  }
}

function makeAuthentication(password: string, salt: string, challenge: string): string {
  const secret = createHash("sha256").update(password + salt).digest("base64");
  return createHash("sha256").update(secret + challenge).digest("base64");
}

function credentialsPath(): string {
  return `${app.getPath("userData")}\\obs-integration.json`;
}

async function savePassword(password: string): Promise<void> {
  if (!safeStorage.isEncryptionAvailable()) return;
  const encryptedPassword = safeStorage.encryptString(password).toString("base64");
  await writeFile(credentialsPath(), JSON.stringify({ encryptedPassword }), { encoding: "utf8", mode: 0o600 });
}

async function loadPassword(): Promise<string | undefined> {
  if (!safeStorage.isEncryptionAvailable()) return undefined;
  try {
    const saved = JSON.parse(await readFile(credentialsPath(), "utf8")) as { encryptedPassword?: string };
    return saved.encryptedPassword ? safeStorage.decryptString(Buffer.from(saved.encryptedPassword, "base64")) : undefined;
  } catch {
    return undefined;
  }
}
