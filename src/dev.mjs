import { spawn } from "node:child_process";
import { request } from "node:http";

const clientOnly = process.argv.includes("--client-only");
const permanentLoadingScreen = process.argv.includes("--permanent-loading-screen");
const independentMinimize = process.argv.includes("--independent-minimize");
const opacityMode = process.argv.includes("--opacity");
const disableAoe2LobbyAutoRestart = process.argv.includes("--disable-aoe2-lobby-auto-restart");
const vite = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1"], {
  stdio: "inherit",
  env: {
    ...process.env,
    VITE_PERMANENT_LOADING_SCREEN: permanentLoadingScreen ? "true" : process.env.VITE_PERMANENT_LOADING_SCREEN,
    VITE_INDEPENDENT_WINDOW_MINIMIZE: independentMinimize ? "true" : "false",
    VITE_DISABLE_AOE2_LOBBY_AUTO_RESTART: disableAoe2LobbyAutoRestart ? "true" : "false"
  }
});
const matchmaker = clientOnly
  ? null
  : spawn(process.execPath, ["src/matchmaker.mjs"], {
      stdio: "inherit",
      env: { ...process.env, EMPIRE_MATCHMAKER_PORT: "4317" }
    });

let electron;
let stopping = false;

function stop(exitCode = 0) {
  if (stopping) return;
  stopping = true;

  if (electron && !electron.killed) electron.kill();
  if (!vite.killed) vite.kill();
  if (matchmaker && !matchmaker.killed) matchmaker.kill();
  process.exit(exitCode);
}

function waitForVite(attempts = 60) {
  const check = request("http://127.0.0.1:5173", (response) => {
    response.resume();
    electron = spawn(process.execPath, ["node_modules/electron/cli.js", "."], {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: "development",
        EMPIRE_INDEPENDENT_WINDOW_MINIMIZE: independentMinimize ? "true" : "false",
        EMPIRE_OPACITY_MODE: opacityMode ? "true" : "false"
      }
    });
    electron.on("exit", (code) => stop(code ?? 0));
  });

  check.on("error", () => {
    if (attempts <= 1) {
      console.error("Vite did not start at http://127.0.0.1:5173");
      stop(1);
      return;
    }
    setTimeout(() => waitForVite(attempts - 1), 250);
  });
  check.end();
}

vite.on("exit", (code) => {
  if (!stopping) stop(code ?? 1);
});
matchmaker?.on("exit", (code) => {
  if (!stopping) stop(code ?? 1);
});

process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());

waitForVite();
