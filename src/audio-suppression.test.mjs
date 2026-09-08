import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test, { mock } from "node:test";

let child;
mock.module("node:child_process", { namedExports: { spawn() {
  child = new EventEmitter();
  child.stdout = new EventEmitter(); child.stderr = new EventEmitter();
  child.stdin = new EventEmitter(); child.stdin.writable = true;
  child.commands = [];
  child.stdin.write = command => child.commands.push(command.trim().split("|"));
  child.stdin.end = () => queueMicrotask(() => child.emit("exit", 0));
  child.reply = command => child.stdout.emit("data", Buffer.from(`AUDIO_RESULT|${command[0]}|Mode=${command[2]}|Pid=123|Verified=True|ResultingMuted=0\n`));
  return child;
} } });

test("audio polling stays bounded and release bypasses pending mute", async t => {
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
  const platform = Object.getOwnPropertyDescriptor(process, "platform");
  Object.defineProperty(process, "platform", { value: "win32" });
  t.after(() => Object.defineProperty(process, "platform", platform));
  const audio = await import("./main/aoe2AudioSuppression.ts");
  audio.beginAoe2MatchAudioSuppression();
  t.mock.timers.tick(1000);
  assert.equal(child.commands.length, 2, "one transition plus one pending periodic command");
  child.reply(child.commands[1]);
  t.mock.timers.tick(100);
  assert.equal(child.commands.length, 3, "worker acknowledgement allows the next poll");
  audio.endAoe2MatchAudioSuppression();
  assert.equal(child.commands.at(-1)[2], "AUDIBLE", "release must not be coalesced away");
  const count = child.commands.length;
  t.mock.timers.tick(1000);
  assert.equal(child.commands.length, count, "release stops periodic mute commands");
  const shutdown = audio.restoreAoe2AudioOnShutdown();
  assert.equal(child.commands.at(-1)[2], "RESTORE");
  for (const command of child.commands) child.reply(command);
  await shutdown;
});
