import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { detectAoe2NativeProcess } from "./aoe2Win32Automation.js";

let matchAudioManaged = false;
let gameplayStarted = false;
let desiredMuted = false;
let worker: ChildProcessWithoutNullStreams | null = null;
let refreshTimer: NodeJS.Timeout | undefined;
let lastManagedPid: number | undefined;
let shuttingDown = false;

// Core Audio exposes per-process mute through audio sessions, but not through a
// regular Win32 function. Keep one lightweight PowerShell worker alive so the
// COM declarations are compiled once rather than on every focus transition.
const workerScript = String.raw`
Add-Type -TypeDefinition @'
using System;
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
  public static void Set(uint pid, bool muted) {
    IMMDevice d; ((IMMDeviceEnumerator)new MMDeviceEnumerator()).GetDefaultAudioEndpoint(EDataFlow.eRender, ERole.eMultimedia, out d);
    Guid id = typeof(IAudioSessionManager2).GUID; object o; d.Activate(ref id, 23, IntPtr.Zero, out o);
    IAudioSessionEnumerator e; ((IAudioSessionManager2)o).GetSessionEnumerator(out e); int count; e.GetCount(out count);
    Guid context = Guid.Empty;
    for (int i = 0; i < count; i++) {
      IAudioSessionControl c; e.GetSession(i, out c); var c2 = (IAudioSessionControl2)c; uint p; c2.GetProcessId(out p);
      if (p == pid) {
        var volume = (ISimpleAudioVolume)c; bool current; volume.GetMute(out current);
        if (current != muted) volume.SetMute(muted, ref context);
      }
    }
  }
}
'@
try {
  while (($line = [Console]::ReadLine()) -ne $null) {
    try {
      $parts = $line.Split('|'); $lastPid = [uint32]$parts[0]
      [SessionMute]::Set($lastPid, $parts[1] -eq '1')
    } catch { [Console]::Error.WriteLine($_.Exception.Message) }
  }
} finally {
  # Closing the IPC pipe must never leave Windows' persisted app mute enabled.
  if ($null -ne $lastPid) { try { [SessionMute]::Set($lastPid, $false) } catch {} }
}
`;

function ensureWorker(): ChildProcessWithoutNullStreams | null {
  if (process.platform !== "win32" || shuttingDown) return null;
  if (worker && !worker.killed) return worker;
  worker = spawn("powershell.exe", ["-NoLogo", "-NoProfile", "-NonInteractive", "-Command", workerScript], {
    windowsHide: true,
    stdio: "pipe"
  });
  worker.on("exit", () => { worker = null; });
  worker.stderr.on("data", (data: Buffer) => console.warn(`[AoE2 audio] ${data.toString().trim()}`));
  return worker;
}

function applyDesiredMute(): void {
  const pid = detectAoe2NativeProcess().pid;
  const activeWorker = ensureWorker();
  if (!pid || !activeWorker?.stdin.writable) return;
  lastManagedPid = pid;
  activeWorker.stdin.write(`${pid}|${desiredMuted ? 1 : 0}\n`);
}

function setDesiredMute(muted: boolean): void {
  desiredMuted = muted;
  applyDesiredMute();
  if (refreshTimer) clearInterval(refreshTimer);
  // Audio sessions can be recreated while AoE2 changes screens. Poll quickly
  // enough that a replacement session cannot leak an audible second.
  refreshTimer = muted ? setInterval(applyDesiredMute, 100) : undefined;
}

export function beginAoe2MatchAudioSuppression(): void {
  matchAudioManaged = true;
  gameplayStarted = false;
  setDesiredMute(true);
}

export function beginAoe2GameplayAudio(): void {
  if (!matchAudioManaged) return;
  gameplayStarted = true;
  setDesiredMute(false);
}

export function handleEmpireLeagueAudioFocus(focused: boolean): void {
  if (!matchAudioManaged || !gameplayStarted) return;
  // Leaving Electron may mean an external link, Alt+Tab, or another utility;
  // none of those is permission to restore game audio. Only the explicit
  // gameplay handoff above may unmute AoE2.
  if (focused) setDesiredMute(true);
}

export function endAoe2MatchAudioSuppression(): void {
  matchAudioManaged = false;
  gameplayStarted = false;
  setDesiredMute(false);
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
    activeWorker.stdin.write(`${pid}|0\n`);
    activeWorker.stdin.end();
    await Promise.race([
      new Promise<void>((resolve) => activeWorker.once("exit", () => resolve())),
      new Promise<void>((resolve) => setTimeout(resolve, 1_000))
    ]);
  }
  shuttingDown = true;
  worker = null;
  lastManagedPid = undefined;
}
