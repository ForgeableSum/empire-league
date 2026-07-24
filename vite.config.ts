import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait()],
  build: {
    outDir: "dist/renderer",
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/renderer"),
      "@shared": resolve(__dirname, "src/shared")
    }
  }
});
