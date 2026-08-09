import { registerGameHandlers } from "./gameHandlers.js";
import { registerSystemHandlers } from "./systemHandlers.js";
import { registerObsHandlers } from "./obsHandlers.js";

export function registerIpcHandlers(): void {
  registerGameHandlers();
  registerSystemHandlers();
  registerObsHandlers();
}
