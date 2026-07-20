import { registerGameHandlers } from "./gameHandlers.js";
import { registerSystemHandlers } from "./systemHandlers.js";

export function registerIpcHandlers(): void {
  registerGameHandlers();
  registerSystemHandlers();
}
