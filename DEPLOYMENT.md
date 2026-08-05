# Empire League live deployment

This runbook covers deploying:

1. The `empireleague.gg` website
2. The Windows Electron client and auto-updater feed
3. The production matchmaker

Run all local commands from Windows PowerShell at the repository root:

```powershell
cd C:\Users\Dude\Desktop\empire-league
```

## Production targets

- Website and update server: `root@209.222.25.118`
- Website root: `/var/www/empire-league`
- Electron update root: `/var/www/empire-league/updates/windows`
- Matchmaker server: `root@207.148.25.84`
- Matchmaker hostname: `matchmaker.empireleague.gg`
- Matchmaker application root: `/opt/empire-league-matchmaker`
- Matchmaker systemd service: `empire-league-matchmaker`

## Prerequisites

The deployment machine needs:

- Node.js and npm
- Git
- OpenSSH (`ssh` and `scp`)
- `tar`
- SSH access to the production servers

Prefer an SSH private key kept outside the repository. Never commit server
passwords, private keys, database credentials, or authentication files.

Local deployment passwords are stored in the Git-ignored file
`.deploy-secrets.ps1`. It defines `$EmpireWebPassword` and
`$EmpireMatchmakerPassword`. Dot-source that file when password authentication
is required; never copy its values into tracked files or command examples.
This workstation also has a Git-ignored `.deploy-askpass.cmd` helper. To use
the saved webserver password non-interactively, load the secrets file, assign
`$EmpireWebPassword` to the `EMPIRE_DEPLOY_PASSWORD` environment variable, and
set `SSH_ASKPASS` to the resolved helper path, `SSH_ASKPASS_REQUIRE` to `force`,
and `DISPLAY` to any non-empty value before running `deploy-web.ps1`. Use
`$EmpireMatchmakerPassword` in the same way only for an authorized matchmaker
deployment.

Before any release, install dependencies and verify the checkout:

```powershell
npm.cmd install
npm.cmd run lint
npm.cmd run build
git status --short
git diff
```

Review all local changes before deploying.

## 1. Deploy the website

Deploy the website and rebuild its embedded application preview:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-web.ps1
```

OpenSSH prompts for the server password when key authentication is not
configured. To use an SSH key:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-web.ps1 `
  -IdentityFile "$env:USERPROFILE\.ssh\empire_league_deploy"
```

Use `-SkipBuild` only when the files in `landing/app-preview` were already
built and verified:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-web.ps1 -SkipBuild
```

The script:

1. Rebuilds the embedded React application preview.
2. Packages everything under `landing/`.
3. Uploads it to `root@209.222.25.118`.
4. Activates it at `/var/www/empire-league`.
5. Preserves the existing `/updates` directory and Electron releases.
6. Moves the previous website to `/var/www/empire-league.previous` for simple
   rollback.

The website's Download buttons point to:

```text
updates/windows/Empire-League-Preview-Setup.exe
```

Verify the deployment:

```powershell
curl.exe -I http://empireleague.gg/
curl.exe -I http://empireleague.gg/app-preview/
```

Open the live website and manually confirm that its Download buttons return
the current installer.

## 2. Deploy the Electron client

Choose a strictly increasing semantic version. The version must be higher than
the currently published version.

For example:

```powershell
.\scripts\deploy-electron.ps1 `
  -Version 0.1.13 `
  -IdentityFile "$env:USERPROFILE\.ssh\empire_league_deploy"
```

Without an SSH key:

```powershell
.\scripts\deploy-electron.ps1 -Version 0.1.13
```

The script:

1. Updates the version in `package.json` and `package-lock.json`.
2. Builds the Windows one-click NSIS installer.
3. Validates `latest.yml`, the installer, and its blockmap.
4. Uploads the artifacts to a temporary server directory.
5. Publishes the versioned files and stable installer alias.
6. Publishes `latest.yml` last so clients never observe an incomplete release.

The stable browser download is:

```text
http://209.222.25.118/updates/windows/Empire-League-Preview-Setup.exe
```

The Electron updater feed is currently configured in `package.json` as:

```text
http://209.222.25.118/updates/windows
```

Verify the published metadata and installer:

```powershell
curl.exe -fsS http://209.222.25.118/updates/windows/latest.yml
curl.exe -I http://209.222.25.118/updates/windows/Empire-League-Preview-Setup.exe
```

Then test the updater from an installed older client:

1. Start the older packaged version.
2. Wait several seconds for its initial update check.
3. Confirm the update downloads.
4. Accept the restart prompt.
5. Confirm that the application reopens on the new version.

Development mode deliberately skips update checks. The first updater-enabled
installer must be installed manually.

Do not replace files belonging to an already-published version. If a release
is defective, fix it and publish a higher version so caches and blockmap
metadata remain consistent.

## 3. Deploy the matchmaker

Assuming the production server has already been provisioned, run:

```powershell
.\scripts\deploy-matchmaker.ps1 `
  -IdentityFile "$env:USERPROFILE\.ssh\empire_league_deploy"
```

Without an SSH key:

```powershell
.\scripts\deploy-matchmaker.ps1
```

The script deploys to `root@207.148.25.84`. It:

1. Packages the matchmaker source, shared data, migrations, and production
   package manifest.
2. Uploads and extracts a timestamped release.
3. Installs production npm dependencies.
4. Applies pending database migrations.
5. Atomically switches the `current` symlink.
6. Restarts the `empire-league-matchmaker` systemd service.
7. Checks the local health endpoint for up to ten seconds.
8. Restores and restarts the previous application release if health checks
   fail.
9. Retains the five newest release directories.

Database migrations must remain backward-compatible with the immediately
previous application release. An application rollback does not reverse a
database migration.

Verify the public health endpoint:

```powershell
curl.exe -fsS http://matchmaker.empireleague.gg/health
```

For server-side verification, connect to the matchmaker host:

```powershell
ssh root@207.148.25.84
```

Then run:

```bash
sudo systemctl status empire-league-matchmaker
sudo journalctl -u empire-league-matchmaker -n 100 --no-pager
curl -fsS http://127.0.0.1:4317/health
sudo nginx -t
```

Follow live logs when diagnosing a deployment:

```bash
sudo journalctl -u empire-league-matchmaker -f
```

For an end-to-end production test, use two real authenticated Electron clients
queued for compatible modes. Synthetic preview matching is not a valid
production queue test.

## Recommended deployment order

1. Deploy backward-compatible matchmaker changes.
2. Verify the public matchmaker health endpoint.
3. Publish the Electron client release.
4. Verify updating from an older installed client.
5. Deploy the website when its content, application preview, or download
   presentation changed.
6. Verify the website and installer download.
