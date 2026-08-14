import { parentPort } from "node:worker_threads";
import koffi from "koffi";

const user32 = koffi.load("user32.dll");
const gdi32 = koffi.load("gdi32.dll");
const HANDLE = koffi.pointer("EL_CAPTURE_WORKER_HANDLE", koffi.opaque());
koffi.alias("EL_CAPTURE_WORKER_HWND", HANDLE);
koffi.alias("EL_CAPTURE_WORKER_HDC", HANDLE);
koffi.alias("EL_CAPTURE_WORKER_HGDIOBJ", HANDLE);
koffi.alias("EL_CAPTURE_WORKER_HBITMAP", HANDLE);
koffi.struct("EL_CAPTURE_WORKER_RECT", { left: "int32_t", top: "int32_t", right: "int32_t", bottom: "int32_t" });

const GetWindowRect = user32.func("bool __stdcall GetWindowRect(EL_CAPTURE_WORKER_HWND hwnd, _Out_ EL_CAPTURE_WORKER_RECT *rect)");
const GetWindowDC = user32.func("EL_CAPTURE_WORKER_HDC __stdcall GetWindowDC(EL_CAPTURE_WORKER_HWND hwnd)");
const ReleaseDC = user32.func("int32_t __stdcall ReleaseDC(EL_CAPTURE_WORKER_HWND hwnd, EL_CAPTURE_WORKER_HDC dc)");
const PrintWindow = user32.func("bool __stdcall PrintWindow(EL_CAPTURE_WORKER_HWND hwnd, EL_CAPTURE_WORKER_HDC dc, uint32_t flags)");
const CreateCompatibleDC = gdi32.func("EL_CAPTURE_WORKER_HDC __stdcall CreateCompatibleDC(EL_CAPTURE_WORKER_HDC dc)");
const CreateCompatibleBitmap = gdi32.func("EL_CAPTURE_WORKER_HBITMAP __stdcall CreateCompatibleBitmap(EL_CAPTURE_WORKER_HDC dc, int32_t width, int32_t height)");
const SelectObject = gdi32.func("EL_CAPTURE_WORKER_HGDIOBJ __stdcall SelectObject(EL_CAPTURE_WORKER_HDC dc, EL_CAPTURE_WORKER_HGDIOBJ object)");
const BitBlt = gdi32.func("bool __stdcall BitBlt(EL_CAPTURE_WORKER_HDC dest, int32_t x, int32_t y, int32_t width, int32_t height, EL_CAPTURE_WORKER_HDC source, int32_t sourceX, int32_t sourceY, uint32_t operation)");
const GetDIBits = gdi32.func("int32_t __stdcall GetDIBits(EL_CAPTURE_WORKER_HDC dc, EL_CAPTURE_WORKER_HBITMAP bitmap, uint32_t start, uint32_t lines, _Out_ void *bits, _Inout_ void *info, uint32_t usage)");
const DeleteObject = gdi32.func("bool __stdcall DeleteObject(EL_CAPTURE_WORKER_HGDIOBJ object)");
const DeleteDC = gdi32.func("bool __stdcall DeleteDC(EL_CAPTURE_WORKER_HDC dc)");

function captureWindow(windowHandle: string) {
  const window = BigInt(windowHandle);
  const rect = {} as { left: number; top: number; right: number; bottom: number };
  if (!GetWindowRect(window, rect)) return;
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  if (width <= 0 || height <= 0 || width > 16_384 || height > 16_384) return;
  const windowDc = GetWindowDC(window) as bigint | null;
  if (!windowDc) return;
  let memoryDc: bigint | null = null;
  let bitmap: bigint | null = null;
  let previousObject: bigint | null = null;
  try {
    memoryDc = CreateCompatibleDC(windowDc) as bigint | null;
    if (!memoryDc) return;
    bitmap = CreateCompatibleBitmap(windowDc, width, height) as bigint | null;
    if (!bitmap) return;
    previousObject = SelectObject(memoryDc, bitmap) as bigint | null;
    if (!previousObject) return;
    const rendered = Boolean(PrintWindow(window, memoryDc, 0x00000002))
      || Boolean(BitBlt(memoryDc, 0, 0, width, height, windowDc, 0, 0, 0x00cc0020));
    if (!rendered) return;
    const pixels = Buffer.allocUnsafe(width * height * 4);
    const bitmapInfo = Buffer.alloc(40);
    bitmapInfo.writeUInt32LE(40, 0);
    bitmapInfo.writeInt32LE(width, 4);
    bitmapInfo.writeInt32LE(-height, 8);
    bitmapInfo.writeUInt16LE(1, 12);
    bitmapInfo.writeUInt16LE(32, 14);
    if (Number(GetDIBits(memoryDc, bitmap, 0, height, pixels, bitmapInfo, 0)) !== height) return;
    return { bitmap: pixels, capturedAt: Date.now(), height, sourceId: `window:${windowHandle}`, width };
  } finally {
    if (memoryDc && previousObject) SelectObject(memoryDc, previousObject);
    if (bitmap) DeleteObject(bitmap);
    if (memoryDc) DeleteDC(memoryDc);
    ReleaseDC(window, windowDc);
  }
}

parentPort?.on("message", ({ id, windowHandle }: { id: number; windowHandle: string }) => {
  try {
    const frame = captureWindow(windowHandle);
    if (!frame) return parentPort?.postMessage({ id });
    parentPort?.postMessage({ id, frame }, [frame.bitmap.buffer]);
  } catch (error) {
    parentPort?.postMessage({ id, error: error instanceof Error ? error.message : String(error) });
  }
});
