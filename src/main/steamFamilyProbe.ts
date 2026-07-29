import koffi from "koffi";

type LogLevel = "info" | "warn" | "error";

interface ProbeEvent {
  at: string;
  level: LogLevel;
  event: string;
  data?: Record<string, unknown>;
}

function log(level: LogLevel, event: string, data?: Record<string, unknown>): void {
  const entry: ProbeEvent = { at: new Date().toISOString(), level, event };
  if (data) entry.data = data;
  process.stdout.write(`${JSON.stringify(entry)}\n`);
}

function errorDetails(error: unknown): Record<string, unknown> {
  return {
    name: error instanceof Error ? error.name : typeof error,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined
  };
}

function steamIdString(value: unknown): string {
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "number") return Math.trunc(value).toString();
  return String(value);
}

function resolveInterface(
  library: ReturnType<typeof koffi.load>,
  prefix: string,
  versions: number[]
): { pointer: unknown; version: string } | undefined {
  for (const number of versions) {
    const version = `${prefix}${number.toString().padStart(3, "0")}`;
    try {
      const factory = library.func(`void *SteamAPI_${version}()`);
      const pointer = factory();
      log("info", "interface_attempt", { version, available: true, pointerPresent: Boolean(pointer) });
      if (pointer) return { pointer, version };
    } catch (error) {
      log("warn", "interface_attempt", { version, available: false, error: errorDetails(error) });
    }
  }
  return undefined;
}

function run(): void {
  const dllPath = process.argv[2];
  const expectedSteamId = process.argv[3] || undefined;

  log("info", "probe_started", {
    pid: process.pid,
    platform: process.platform,
    arch: process.arch,
    cwd: process.cwd(),
    node: process.version,
    dllPath,
    expectedSteamId,
    environment: {
      SteamAppId: process.env.SteamAppId,
      SteamGameId: process.env.SteamGameId,
      SteamOverlayGameId: process.env.SteamOverlayGameId
    }
  });

  if (!dllPath) {
    log("error", "probe_finished", { status: "unknown", reason: "missing_dll_path" });
    process.exitCode = 2;
    return;
  }

  let library: ReturnType<typeof koffi.load> | undefined;
  let initialized = false;
  try {
    library = koffi.load(dllPath);
    log("info", "library_loaded", { dllPath });

    const isSteamRunning = library.func("bool SteamAPI_IsSteamRunning()");
    log("info", "steam_client_state", { steamRunning: Boolean(isSteamRunning()) });

    const init = library.func("bool SteamAPI_Init()");
    const shutdown = library.func("void SteamAPI_Shutdown()");
    initialized = Boolean(init());
    log(initialized ? "info" : "error", "steam_api_init", { initialized });

    if (!initialized) {
      try {
        const initFlat = library.func("int SteamAPI_InitFlat(char *)");
        const errorBuffer = koffi.alloc("char", 1024);
        const initResult = Number(initFlat(errorBuffer));
        const detailedError = koffi.decode(errorBuffer, "char", -1);
        initialized = initResult === 0;
        log(initialized ? "info" : "error", "steam_api_init_flat", {
          initialized,
          initResult,
          resultName: [
            "OK",
            "FailedGeneric",
            "NoSteamClient",
            "VersionMismatch"
          ][initResult] ?? "Unknown",
          detailedError
        });
      } catch (error) {
        log("warn", "steam_api_init_flat_unavailable", errorDetails(error));
      }
    }

    if (!initialized) {
      log("error", "probe_finished", {
        status: "unknown",
        reason: "steam_api_initialization_failed",
        guidance: "Ensure Steam and AoE2 are running under the same Windows user, then retry."
      });
      process.exitCode = 3;
      return;
    }

    const apps = resolveInterface(library, "SteamApps_v", [8, 7, 6]);
    if (!apps) throw new Error("No supported ISteamApps interface was available.");

    const isSharedCall = library.func("bool SteamAPI_ISteamApps_BIsSubscribedFromFamilySharing(void *)");
    const getOwnerCall = library.func("uint64_t SteamAPI_ISteamApps_GetAppOwner(void *)");
    const isSubscribedCall = library.func("bool SteamAPI_ISteamApps_BIsSubscribed(void *)");

    const subscribed = Boolean(isSubscribedCall(apps.pointer));
    const familySharedFlag = Boolean(isSharedCall(apps.pointer));
    const ownerSteamId = steamIdString(getOwnerCall(apps.pointer));
    log("info", "apps_results", {
      interfaceVersion: apps.version,
      subscribed,
      familySharedFlag,
      ownerSteamId
    });

    const user = resolveInterface(library, "SteamUser_v", [23, 22, 21, 20, 19]);
    let currentSteamId: string | undefined;
    if (user) {
      const getSteamIdCall = library.func("uint64_t SteamAPI_ISteamUser_GetSteamID(void *)");
      currentSteamId = steamIdString(getSteamIdCall(user.pointer));
      log("info", "user_results", { interfaceVersion: user.version, currentSteamId });
    } else {
      log("warn", "user_results", { reason: "no_supported_isteamuser_interface" });
    }

    const comparisonSteamId = currentSteamId ?? expectedSteamId;
    const ownerDiffers = Boolean(
      comparisonSteamId
      && ownerSteamId !== "0"
      && ownerSteamId !== comparisonSteamId
    );
    const status = familySharedFlag || ownerDiffers
      ? "family_shared"
      : subscribed && ownerSteamId !== "0"
        ? "owned"
        : "unknown";

    log("info", "probe_finished", {
      status,
      familySharedFlag,
      subscribed,
      currentSteamId,
      expectedSteamId,
      ownerSteamId,
      ownerDiffers,
      identityMatchesLogin: currentSteamId && expectedSteamId
        ? currentSteamId === expectedSteamId
        : undefined
    });

    shutdown();
    initialized = false;
  } catch (error) {
    log("error", "probe_exception", errorDetails(error));
    log("error", "probe_finished", { status: "unknown", reason: "exception" });
    process.exitCode = 1;
  } finally {
    if (initialized && library) {
      try {
        library.func("void SteamAPI_Shutdown()")();
        log("info", "steam_api_shutdown", { afterError: true });
      } catch (error) {
        log("warn", "steam_api_shutdown_failed", errorDetails(error));
      }
    }
  }
}

run();
