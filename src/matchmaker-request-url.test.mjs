import assert from "node:assert/strict";
import test from "node:test";

import { parseMatchmakerRequestUrl } from "./matchmaker-request-url.mjs";

test("parses ordinary matchmaker request URLs", () => {
  const url = parseMatchmakerRequestUrl("/health?detail=1", "matchmaker.empireleague.gg");

  assert.equal(url?.pathname, "/health");
  assert.equal(url?.searchParams.get("detail"), "1");
});

test("rejects the double-slash request target used by the recurring scanner", () => {
  assert.equal(parseMatchmakerRequestUrl("//", "207.148.25.84"), null);
});

test("rejects malformed Host headers without throwing", () => {
  assert.equal(parseMatchmakerRequestUrl("/", "207.148.025.084"), null);
});
