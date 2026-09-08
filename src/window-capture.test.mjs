import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test, { mock } from "node:test";

class FakeWorker extends EventEmitter {
  static instances = [];
  static respond = true;
  constructor() { super(); FakeWorker.instances.push(this); }
  unref() {}
  postMessage(request) {
    this.request = request;
    if (FakeWorker.respond) queueMicrotask(() => this.reply());
  }
  reply(value = 100) {
    this.emit("message", { id: this.request.id, startedAt: Date.now(), finishedAt: Date.now(),
      frame: { bitmap: Buffer.from([value, value, value, 255]), capturedAt: Date.now(),
        width: 1, height: 1, sourceId: `window:${this.request.windowHandle}` } });
  }
  async terminate() { this.terminated = true; return 0; }
}
mock.module("node:worker_threads", { namedExports: { Worker: FakeWorker } });
const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };
let moduleId = 0;
async function fixture(t) {
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval", "Date"], now: 100000 });
  FakeWorker.instances = [];
  FakeWorker.respond = true;
  const platform = Object.getOwnPropertyDescriptor(process, "platform");
  Object.defineProperty(process, "platform", { value: "win32" });
  const capture = await import(`./main/aoe2WindowCapture.ts?case=${++moduleId}`);
  t.after(() => { capture.stopAoe2WindowCapture(); Object.defineProperty(process, "platform", platform); });
  const read = (handle = "123") => capture.readAoe2CapturedClientPixel(handle, 0, 0,
    { left: 0, top: 0, right: 1, bottom: 1 }, { x: 0, y: 0 });
  return { capture, read };
}

test("one verification retains a fresh frame even if it ages during pixel sampling", async (t) => {
  const { capture, read } = await fixture(t);
  read(); await flush();
  FakeWorker.respond = false;
  t.mock.timers.tick(990);
  capture.withAoe2CaptureSnapshot(() => {
    assert.deepEqual(read().rgb, [100, 100, 100]);
    t.mock.timers.tick(40);
    assert.deepEqual(read().rgb, [100, 100, 100]);
    assert.equal(read("456"), null, "snapshot never accepts a different window");
  });
  assert.equal(read(), null, "the next verification rejects the now-stale frame");
});

test("snapshot cleanup runs even when verification throws", async (t) => {
  const { capture, read } = await fixture(t);
  read(); await flush(); FakeWorker.respond = false;
  assert.throws(() => capture.withAoe2CaptureSnapshot(() => { throw new Error("test"); }));
  t.mock.timers.tick(1100);
  assert.equal(read(), null);
});

test("fresh-frame wait respects its own deadline when the worker never replies", async (t) => {
  const { capture } = await fixture(t);
  FakeWorker.respond = false;
  const waiting = capture.waitForFreshAoe2WindowCapture("123", 250);
  for (const ms of [100, 100, 50]) { t.mock.timers.tick(ms); await flush(); }
  assert.equal(await waiting, false);
  assert.equal(Date.now(), 100250);
});

test("stalled request retires its worker and rejects late replies before recovery", async (t) => {
  const { capture, read } = await fixture(t);
  const logs = []; capture.setAoe2CaptureDiagnosticSink((line) => logs.push(line));
  FakeWorker.respond = false; read();
  const old = FakeWorker.instances[0];
  t.mock.timers.tick(4000); await flush();
  assert.equal(old.terminated, true);
  assert.ok(logs.some((line) => line.includes("RequestTimeout")));
  FakeWorker.respond = true; read(); await flush();
  assert.equal(FakeWorker.instances.length, 2);
  old.reply(250);
  assert.deepEqual(read().rgb, [100, 100, 100]);
});

test("stopping capture discards an in-flight frame from the old generation", async (t) => {
  const { capture, read } = await fixture(t);
  FakeWorker.respond = false; read();
  const worker = FakeWorker.instances[0];
  capture.stopAoe2WindowCapture();
  worker.reply(); await flush();
  assert.equal(read(), null);
  worker.reply(150); await flush();
  assert.deepEqual(read().rgb, [150, 150, 150]);
});

test("a worker stuck in native code cannot accumulate replacement workers", async (t) => {
  const { read } = await fixture(t);
  FakeWorker.respond = false; read();
  let finishRetirement;
  FakeWorker.instances[0].terminate = () => new Promise((resolve) => { finishRetirement = resolve; });
  t.mock.timers.tick(4000); await flush();
  for (let i = 0; i < 5; i++) { read(); await flush(); }
  assert.equal(FakeWorker.instances.length, 1);
  finishRetirement(0); await flush();
  FakeWorker.respond = true; read(); await flush();
  assert.equal(FakeWorker.instances.length, 2);
  assert.ok(read());
});
