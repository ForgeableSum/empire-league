import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { detectAoe2NativeProcess } from "./aoe2Win32Automation.js";

let matchAudioManaged = false;
let gameplayStarted = false;
let desiredMuted = false;
let worker: ChildProcessWithoutNullStreams | null = null;
let refreshTimer: NodeJS.Timeout | undefined;
let lastManagedPid: number | undefined;
let shuttingDown = false;
let workerGeneration = 0;
let nextRequestId = 0;
let observedPid: number | undefined;
let missingProcessRestored = false;
const pendingRequests = new Map<number, { resolve: (message: string) => void; timer: NodeJS.Timeout }>();

// Core Audio exposes per-process mute through audio sessions, but not through a
// regular Win32 function. Keep one lightweight PowerShell worker alive so the
// COM declarations are compiled once rather than on every focus transition.
const workerScript = String.raw`
Add-Type -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
[ComImport, Guid("BCDE0395-E52F-467C-8E3D-C4579291692E")] class MMDeviceEnumerator {}
enum EDataFlow { eRender, eCapture, eAll }
enum ERole { eConsole, eMultimedia, eCommunications }
[ComImport, InterfaceType(ComInterfaceType.InterfaceIsIUnknown), Guid("A95664D2-9614-4F35-A746-DE8DB63617E6")]
interface IMMDeviceEnumerator { int EnumAudioEndpoints(EDataFlow f, int s, out object c); int GetDefaultAudioEndpoint(EDataFlow f, ERole r, out IMMDevice d); }
[ComImport, InterfaceType(ComInterfaceType.InterfaceIsIUnknown), Guid("D666063F-1587-4E43-81F1-B948E807363F")]
interface IMMDevice { int Activate(ref Guid id, int ctx, IntPtr p, [MarshalAs(UnmanagedType.IUnknown)] out object o); }
[ComImport, InterfaceType(ComInterfaceType.InterfaceIsIUnknown), Guid("77AA99A0-1BD6-484F-8BC7-2C654C9A9B6F")]
interface IAudioSessionManager2 { int GetAudioSessionControl(IntPtr g, int f, out object c); int GetSimpleAudioVolume(IntPtr g, int f, out object v); int GetSessionEnumerator(out IAudioSessionEnumerator e); }
[ComImport, InterfaceType(ComInterfaceType.InterfaceIsIUnknown), Guid("E2F5BB11-0570-40CA-ACDD-3AA01277DEE8")]
interface IAudioSessionEnumerator { int GetCount(out int c); int GetSession(int i, out IAudioSessionControl c); }
[ComImport, InterfaceType(ComInterfaceType.InterfaceIsIUnknown), Guid("F4B1A599-7266-4319-A8CA-E70ACB11E8CD")]
interface IAudioSessionControl { int GetState(out int s); int GetDisplayName(out IntPtr n); int SetDisplayName(string n, ref Guid c); int GetIconPath(out IntPtr p); int SetIconPath(string p, ref Guid c); int GetGroupingParam(out Guid g); int SetGroupingParam(ref Guid g, ref Guid c); int RegisterAudioSessionNotification(IntPtr n); int UnregisterAudioSessionNotification(IntPtr n); }
[ComImport, InterfaceType(ComInterfaceType.InterfaceIsIUnknown), Guid("BFB7FF88-7239-4FC9-8FA2-07C950BE9C6D")]
interface IAudioSessionControl2 { int GetState(out int s); int GetDisplayName(out IntPtr n); int SetDisplayName(string n, ref Guid c); int GetIconPath(out IntPtr p); int SetIconPath(string p, ref Guid c); int GetGroupingParam(out Guid g); int SetGroupingParam(ref Guid g, ref Guid c); int RegisterAudioSessionNotification(IntPtr n); int UnregisterAudioSessionNotification(IntPtr n); int GetSessionIdentifier(out IntPtr i); int GetSessionInstanceIdentifier(out IntPtr i); int GetProcessId(out uint p); }
[ComImport, InterfaceType(ComInterfaceType.InterfaceIsIUnknown), Guid("87CE5498-68D6-44E5-9215-6DA47EF883D8")]
interface ISimpleAudioVolume { int SetMasterVolume(float v, ref Guid c); int GetMasterVolume(out float v); int SetMute([MarshalAs(UnmanagedType.Bool)] bool m, ref Guid c); int GetMute(out bool m); }
public static class SessionMute {
  private sealed class Lease {
    public uint ProcessId;
    public string InstanceId;
    public ISimpleAudioVolume Volume;
    public bool OriginalMute;
  }
  private static readonly List<Lease> leases = new List<Lease>();

  private static int RestoreAll() {
    Guid context = Guid.Empty;
    int restored = 0;
    foreach (Lease lease in leases) {
      // Empire League must never leave Windows' persisted AoE2 session mute
      // enabled after releasing ownership, even if it inherited a stale mute
      // from an older or interrupted Empire League session.
      try { lease.Volume.SetMute(false, ref context); restored++; } catch { }
    }
    leases.Clear();
    return restored;
  }

  public static string Apply(uint pid, string mode) {
    if (mode == "RESTORE") return "Restored=" + RestoreAll().ToString();
    for (int i = leases.Count - 1; i >= 0; i--) {
      if (leases[i].ProcessId != pid) {
        Guid restoreContext = Guid.Empty;
        try { leases[i].Volume.SetMute(false, ref restoreContext); } catch { }
        leases.RemoveAt(i);
      }
    }
    if (pid == 0) return "Sessions=0|Changed=0|Verified=False";
    IMMDevice d; ((IMMDeviceEnumerator)new MMDeviceEnumerator()).GetDefaultAudioEndpoint(EDataFlow.eRender, ERole.eMultimedia, out d);
    Guid id = typeof(IAudioSessionManager2).GUID; object o; d.Activate(ref id, 23, IntPtr.Zero, out o);
    IAudioSessionEnumerator e; ((IAudioSessionManager2)o).GetSessionEnumerator(out e); int count; e.GetCount(out count);
    Guid context = Guid.Empty;
    int sessions = 0, changed = 0, originallyMuted = 0, resultingMuted = 0;
    for (int i = 0; i < count; i++) {
      IAudioSessionControl c; e.GetSession(i, out c); var c2 = (IAudioSessionControl2)c; uint p; c2.GetProcessId(out p);
      if (p == pid) {
        sessions++;
        IntPtr instancePointer; c2.GetSessionInstanceIdentifier(out instancePointer);
        string instanceId = Marshal.PtrToStringUni(instancePointer) ?? (pid.ToString() + ":" + i.ToString());
        if (instancePointer != IntPtr.Zero) Marshal.FreeCoTaskMem(instancePointer);
        var volume = (ISimpleAudioVolume)c; bool current; volume.GetMute(out current);
        bool known = false;
        foreach (Lease lease in leases) { if (lease.InstanceId == instanceId) { known = true; break; } }
        if (!known) {
          leases.Add(new Lease { ProcessId = pid, InstanceId = instanceId, Volume = volume, OriginalMute = current });
          if (current) originallyMuted++;
        } else {
          foreach (Lease lease in leases) { if (lease.InstanceId == instanceId && lease.OriginalMute) { originallyMuted++; break; } }
        }
        bool target = mode == "MUTE";
        if (current != target) { volume.SetMute(target, ref context); changed++; }
        bool result; volume.GetMute(out result); if (result) resultingMuted++;
      }
    }
    bool verified = sessions > 0 && (mode == "MUTE" ? resultingMuted == sessions : resultingMuted == 0);
    return "Sessions=" + sessions.ToString() + "|Changed=" + changed.ToString()
      + "|OriginallyMuted=" + originallyMuted.ToString() + "|ResultingMuted=" + resultingMuted.ToString()
      + "|Verified=" + verified.ToString();
  }
  public static void Restore() { RestoreAll(); }
}
'@
try {
  while (($line = [Console]::ReadLine()) -ne $null) {
    try {
      $parts = $line -split '\|'
      $result = [SessionMute].GetMethod('Apply').Invoke($null, @([uint32]$parts[1], [string]$parts[2]))
      [Console]::WriteLine("AUDIO_RESULT|" + $parts[0] + "|Mode=" + $parts[2] + "|Pid=" + $parts[1] + "|" + $result)
      [Console]::Out.Flush()
    } catch { [Console]::WriteLine("AUDIO_RESULT|" + $parts[0] + "|Error=" + $_.Exception.Message); [Console]::Out.Flush() }
  }
} finally {
  # Held COM session objects let us restore even after AoE2's PID disappears.
  try { [SessionMute]::Restore() } catch {}
}
`;

function ensureWorker(): ChildProcessWithoutNullStreams | null {
  if (process.platform !== "win32" || shuttingDown) return null;
  if (worker && !worker.killed) return worker;
  worker = spawn("powershell.exe", ["-NoLogo", "-NoProfile", "-NonInteractive", "-Command", workerScript], {
    windowsHide: true,
    stdio: "pipe"
  });
  const activeWorker = worker;
  const generation = ++workerGeneration;
  const handleFailure = (error: Error) => {
    console.warn(`[AoE2 audio] WORKER_PIPE_ERROR|Generation=${generation}|${error.message}`);
    if (worker === activeWorker) worker = null;
  };
  activeWorker.on("error", handleFailure);
  activeWorker.stdin.on("error", handleFailure);
  activeWorker.on("exit", (code) => {
    console.info(`[AoE2 audio] WORKER_EXIT|Generation=${generation}|Code=${code ?? "null"}`);
    if (worker === activeWorker) worker = null;
  });
  let stdoutBuffer = "";
  activeWorker.stdout.on("data", (data: Buffer) => {
    stdoutBuffer += data.toString();
    const lines = stdoutBuffer.split(/\r?\n/);
    stdoutBuffer = lines.pop() ?? "";
    for (const message of lines.filter(Boolean)) {
      const match = /^AUDIO_RESULT\|(\d+)\|/.exec(message);
      if (!match) {
        console.info(`[AoE2 audio] ${message}`);
        continue;
      }
      const request = pendingRequests.get(Number(match[1]));
      // Periodic guards are intentionally quiet when they are successful
      // no-ops. Awaited transitions, actual changes, and errors remain visible.
      if (request || /Changed=[1-9]/.test(message) || message.includes("Error=")) {
        console.info(`[AoE2 audio] ${message}`);
      }
      if (!request) continue;
      clearTimeout(request.timer);
      pendingRequests.delete(Number(match[1]));
      request.resolve(message);
    }
  });
  activeWorker.stderr.on("data", (data: Buffer) => console.warn(`[AoE2 audio] ${data.toString().trim()}`));
  return activeWorker;
}

function sendAudioCommand(mode: "MUTE" | "AUDIBLE" | "RESTORE", waitForResult = false): Promise<string> {
  const pid = detectAoe2NativeProcess().pid;
  const activeWorker = ensureWorker();
  if (!activeWorker?.stdin.writable) return Promise.resolve("AUDIO_RESULT|0|Error=WorkerUnavailable");
  if (pid) lastManagedPid = pid;
  const requestId = ++nextRequestId;
  if (!waitForResult) {
    activeWorker.stdin.write(`${requestId}|${pid ?? 0}|${mode}\n`);
    return Promise.resolve(`AUDIO_RESULT|${requestId}|Queued=True`);
  }
  const result = new Promise<string>((resolve) => {
    const timer = setTimeout(() => {
      pendingRequests.delete(requestId);
      resolve(`AUDIO_RESULT|${requestId}|Mode=${mode}|Pid=${pid ?? 0}|Error=Timeout`);
    }, 2_000);
    pendingRequests.set(requestId, { resolve, timer });
  });
  activeWorker.stdin.write(`${requestId}|${pid ?? 0}|${mode}\n`);
  return result;
}

function applyDesiredMute(): void {
  const pid = detectAoe2NativeProcess().pid;
  if (!pid) {
    observedPid = undefined;
    if (!missingProcessRestored) {
      missingProcessRestored = true;
      void sendAudioCommand("RESTORE");
    }
    return;
  }
  if (observedPid !== pid) {
    observedPid = pid;
    missingProcessRestored = false;
    console.info(`[AoE2 audio] PROCESS|Pid=${pid}|DesiredMuted=${desiredMuted}`);
  }
  void sendAudioCommand(desiredMuted ? "MUTE" : "AUDIBLE");
}

function setDesiredMute(muted: boolean, source: string): void {
  desiredMuted = muted;
  console.info(
    `[AoE2 audio] STATE|Muted=${muted}|Source=${source}`
    + `|Managed=${matchAudioManaged}|GameplayStarted=${gameplayStarted}`
  );
  applyDesiredMute();
  if (refreshTimer) clearInterval(refreshTimer);
  // Audio sessions can be recreated while AoE2 changes screens. Poll quickly
  // enough that a replacement session cannot leak an audible second.
  refreshTimer = muted ? setInterval(applyDesiredMute, 100) : undefined;
  refreshTimer?.unref();
}

export function beginAoe2MatchAudioSuppression(): void {
  matchAudioManaged = true;
  gameplayStarted = false;
  setDesiredMute(true, "MatchSuppression");
}

export async function beginAoe2GameplayAudio(): Promise<string> {
  if (!matchAudioManaged) return "AUDIO_RESULT|0|Mode=AUDIBLE|Error=AudioNotManaged";
  gameplayStarted = true;
  desiredMuted = false;
  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = undefined;
  console.info("[AoE2 audio] STATE|Muted=false|Source=GameplayHandoff|Managed=true|GameplayStarted=true");
  let result = "AUDIO_RESULT|0|Mode=AUDIBLE|Error=NotAttempted";
  for (let attempt = 1; attempt <= 20; attempt += 1) {
    result = await sendAudioCommand("AUDIBLE", true);
    console.info(`[AoE2 audio] GAMEPLAY_ATTEMPT|Attempt=${attempt}|${result}`);
    if (result.includes("Verified=True") && result.includes("ResultingMuted=0")) {
      // AoE2 may replace its session while moving from loading into gameplay.
      // Read-before-write in the worker makes this guard silent and idempotent.
      refreshTimer = setInterval(() => void sendAudioCommand("AUDIBLE"), 250);
      refreshTimer.unref();
      return result;
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 250));
  }
  return result;
}

export function handleEmpireLeagueAudioFocus(focused: boolean): void {
  if (!matchAudioManaged || !gameplayStarted) return;
  // Leaving Electron may mean an external link, Alt+Tab, or another utility;
  // none of those is permission to restore game audio. Only the explicit
  // gameplay handoff above may unmute AoE2.
  if (focused) setDesiredMute(true, "ElectronFocus");
}

export function endAoe2MatchAudioSuppression(): void {
  matchAudioManaged = false;
  gameplayStarted = false;
  setDesiredMute(false, "MatchSuppressionEnded");
}

export async function restoreAoe2AudioOnShutdown(): Promise<void> {
  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = undefined;
  matchAudioManaged = false;
  gameplayStarted = false;
  desiredMuted = false;

  const pid = detectAoe2NativeProcess().pid ?? lastManagedPid;
  // Recreate a failed worker if necessary. A previous worker may have applied
  // mute successfully and then exited before shutdown restoration.
  const activeWorker = pid ? ensureWorker() : worker;
  if (pid && activeWorker?.stdin.writable) {
    // Preserve ordering on the worker's stdin: this unmute is processed after
    // every queued mute, then EOF triggers its independent finally safeguard.
    await sendAudioCommand("RESTORE", true);
    activeWorker.stdin.end();
    await Promise.race([
      new Promise<void>((resolve) => activeWorker.once("exit", () => resolve())),
      new Promise<void>((resolve) => setTimeout(resolve, 1_000))
    ]);
  }
  shuttingDown = true;
  worker = null;
  lastManagedPid = undefined;
  observedPid = undefined;
  missingProcessRestored = false;
}
