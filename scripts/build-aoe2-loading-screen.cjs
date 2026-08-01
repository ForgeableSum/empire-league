const { app, BrowserWindow } = require("electron");
const { mkdir, writeFile } = require("node:fs/promises");
const { dirname, join } = require("node:path");

const projectRoot = dirname(__dirname);
const artworkPath = join(projectRoot, "assets", "branding", "el4-mod.png");
const outputPath = join(projectRoot, "assets", "aoe2-maps", "loading_slash.png");

app.whenReady().then(async () => {
  const window = new BrowserWindow({
    show: false,
    transparent: true,
    useContentSize: true,
    width: 2560,
    height: 1400,
    webPreferences: {
      offscreen: true
    }
  });

  await window.loadFile(artworkPath);
  await window.webContents.executeJavaScript(`
    (async () => {
      const image = document.images[0];
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      const size = 1024;
      canvas.getContext("2d").drawImage(
        image,
        (canvas.width - size) / 2,
        (canvas.height - size) / 2 + 100,
        size,
        size
      );
      document.body.replaceChildren(canvas);
      document.body.style.cssText = "margin:0;overflow:hidden;background:transparent";
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    })()
  `);
  const png = (await window.webContents.capturePage()).toPNG();
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, png);
  window.destroy();
  app.quit();
});
