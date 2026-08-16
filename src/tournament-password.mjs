import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export async function hashTournamentPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  return { hash: derivedKey.toString("hex"), salt };
}

export async function tournamentPasswordMatches(password, salt, expectedHash) {
  if (!salt || !expectedHash) return false;
  const expected = Buffer.from(expectedHash, "hex");
  const actual = await scrypt(password, salt, expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
