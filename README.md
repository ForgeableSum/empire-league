# Empire League

## Windows releases

Packaged clients check `/updates/windows/latest.yml` three seconds after launch
and every ten minutes while running. A new release downloads in the background,
then displays a mandatory themed restart lightbox. The update installs silently
after the player selects **Restart and update**.

Publish a release from PowerShell with:

```powershell
.\scripts\deploy-electron.ps1 -Version 0.1.1
```

The script updates `package.json` and `package-lock.json`, builds the NSIS
installer and blockmap, uploads all artifacts, and publishes `latest.yml` last
so clients cannot observe a partial release. Use `-IdentityFile` for SSH key
authentication; otherwise OpenSSH prompts for the server password.

The first updater-enabled installer must be installed manually over older
builds. Releases after that update automatically. The current installer is
always available at `/updates/windows/Empire-League-Preview-Setup.exe`.

The stable browser-download URL is protected by Apache Basic Auth on the
production server. Update metadata and versioned artifacts must remain
unprotected so already-installed clients can update without embedding the
preview password in the application.

Electron prototype for an unofficial AoE2 DE community 1v1 matchmaking client.

## Commands

```bash
npm install
npm run dev
npm run build
npm run package
```
