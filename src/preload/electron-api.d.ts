import type { ElectronGameApi } from "../shared/contracts/electronApi.js";

declare global {
  interface Window {
    electronApi?: ElectronGameApi;
  }
}

export {};
