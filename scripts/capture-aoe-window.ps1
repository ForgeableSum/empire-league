param(
  [Parameter(Mandatory = $true)]
  [string]$OutputPath,
  [switch]$Focus
)

Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class EmpireLeagueCapture {
  public delegate bool EnumWindowsProc(IntPtr hwnd, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc callback, IntPtr lParam);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hwnd, out uint processId);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hwnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hwnd, out Rect rect);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hwnd);
  [StructLayout(LayoutKind.Sequential)]
  public struct Rect { public int Left, Top, Right, Bottom; }
}
"@

$process = Get-Process AoE2DE_s -ErrorAction Stop | Select-Object -First 1
$bestHandle = [IntPtr]::Zero
$bestRect = New-Object EmpireLeagueCapture+Rect
$bestArea = 0

[EmpireLeagueCapture]::EnumWindows({
  param([IntPtr]$handle, [IntPtr]$state)
  $ownerPid = 0
  [void][EmpireLeagueCapture]::GetWindowThreadProcessId($handle, [ref]$ownerPid)
  if ($ownerPid -ne $process.Id -or -not [EmpireLeagueCapture]::IsWindowVisible($handle)) {
    return $true
  }
  $rect = New-Object EmpireLeagueCapture+Rect
  if ([EmpireLeagueCapture]::GetWindowRect($handle, [ref]$rect)) {
    $area = [Math]::Max(0, $rect.Right - $rect.Left) * [Math]::Max(0, $rect.Bottom - $rect.Top)
    if ($area -gt $bestArea) {
      $script:bestArea = $area
      $script:bestHandle = $handle
      $script:bestRect = $rect
    }
  }
  return $true
}, [IntPtr]::Zero) | Out-Null

if ($bestHandle -eq [IntPtr]::Zero) {
  throw "No visible AoE2 window was found."
}

if ($Focus) {
  [void][EmpireLeagueCapture]::SetForegroundWindow($bestHandle)
  Start-Sleep -Milliseconds 750
}

Add-Type -AssemblyName System.Drawing
$width = $bestRect.Right - $bestRect.Left
$height = $bestRect.Bottom - $bestRect.Top
$bitmap = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
try {
  $graphics.CopyFromScreen($bestRect.Left, $bestRect.Top, 0, 0, $bitmap.Size)
  $resolvedOutput = [System.IO.Path]::GetFullPath($OutputPath)
  $bitmap.Save($resolvedOutput, [System.Drawing.Imaging.ImageFormat]::Png)
  "CAPTURED|Pid=$($process.Id)|Handle=$bestHandle|Rect=$($bestRect.Left),$($bestRect.Top),$($bestRect.Right),$($bestRect.Bottom)|Path=$resolvedOutput"
} finally {
  $graphics.Dispose()
  $bitmap.Dispose()
}
