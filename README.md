# Empire League

<p align="center">
  <img src="src/renderer/assets/el5-ranked.png" alt="Empire League logo" width="420">
</p>

Electron client and production matchmaking service for Empire League.

This document is the deployment runbook. It intentionally contains no server
addresses, passwords, private keys, or database credentials. Substitute values
such as `<update-host>` locally and keep secrets outside the repository.

## Architecture

- The Windows Electron client is built locally and published to a generic
  `electron-updater` feed under `/updates/windows`.
- Packaged clients check the update feed three seconds after startup and every
  ten minutes while running. Updates download in the background and present a
  mandatory, themed restart prompt when ready.
- Production clients connect to the public matchmaker hostname. Development
  uses `VITE_MATCHMAKER_URL`, falling back to `http://127.0.0.1:4317`.
- The matchmaker runs as a systemd service behind Nginx and stores persistent
  state in MariaDB.

## Deployment prerequisites

Deployment is run from Windows PowerShell and requires:

- Node.js and npm
- Git
- OpenSSH (`ssh` and `scp`)
- `tar`
- An SSH account authorized to write the configured application directories
  and manage the relevant web server or systemd service
- Preferably an SSH private key; never commit a password or private key

Install dependencies and verify the checkout before a release:

```powershell
npm.cmd install
npm.cmd run lint
npm.cmd run build
```

## Windows client and auto-updater

### One-time update-server setup

1. Configure the `build.publish.url` value in `package.json` to the public URL
   serving `/updates/windows`. The URL must be reachable by installed clients
   without interactive authentication.
2. Create the update directory on the web server. Its default path is
   `/var/www/empire-league/updates/windows`.
3. Configure the web server to serve that directory as static files.
An Apache template is provided at `scripts/apache-empire-league.conf`. Review
and replace its `ServerName` before installing it. Validate the configuration
with `apachectl configtest`, then reload Apache.

The stable browser download is:

```text
/updates/windows/Empire-League-Setup.exe
```

### Publish a client release

Choose a new, strictly increasing semantic version and run:

```powershell
.\scripts\deploy-electron.ps1 `
  -Version <major.minor.patch> `
  -Server <update-host> `
  -User <ssh-user> `
  -IdentityFile <path-to-private-key>
```

Use `-UpdateRoot <remote-path>` if the server does not use the default update
directory. If key authentication is not supplied, OpenSSH may prompt for a
password; the script never stores it.

The deployment script:

1. Updates the version in `package.json` and `package-lock.json`.
2. Runs the production build and creates the one-click NSIS installer.
3. Validates the installer, blockmap, and `latest.yml` versions.
4. Uploads artifacts to a temporary server directory.
5. Publishes binary artifacts and the stable download alias first.
6. Moves `latest.yml` into place last, preventing clients from observing a
   partially uploaded release.

Use `-SkipBuild` only when the local `release` directory already contains a
fully verified build for the exact version being published.

### Verify a client release

- Confirm `latest.yml` reports the intended version.
- Confirm its referenced installer and blockmap return successfully.
- Confirm the protected stable browser URL requests credentials.
- Start the previous packaged version. It should check after about three
  seconds, download the update, show the restart prompt, install silently, and
  reopen on the new version.
- Leave the previous version open for at least ten minutes to verify the
  recurring update check if needed.

Development mode deliberately skips auto-update checks. The first
updater-enabled installer must be installed manually; later releases update
automatically.

If a client release is defective, fix it and publish a **higher** version.
Replacing files under an already-published version can conflict with cached
metadata and blockmaps and is not a safe rollback strategy.

## Matchmaker

### DNS and network requirements

Before provisioning, point the public matchmaker hostname at the matchmaker
host. The current configuration uses ordinary HTTP and WebSocket traffic:

```text
http://<matchmaker-hostname>/health
ws://<matchmaker-hostname>/events
```

Allow SSH for administration and TCP port 80 for public traffic. The Node
process listens only on `127.0.0.1:4317`; do not expose that port publicly.

### One-time server provisioning

The supported target is a Debian/Ubuntu server with systemd. Copy the three
provisioning files to the server:

```powershell
scp -i <path-to-private-key> `
  scripts/provision-matchmaker.sh `
  scripts/empire-league-matchmaker.service `
  scripts/nginx-matchmaker.conf `
  <ssh-user>@<matchmaker-host>:/tmp/
```

Then provision it over SSH:

```powershell
ssh -i <path-to-private-key> <ssh-user>@<matchmaker-host> `
  "sudo bash /tmp/provision-matchmaker.sh"
```

The provisioner installs Node.js, npm, MariaDB, Nginx, and curl; creates the
restricted `empire-matchmaker` system user; creates the database and a random
database password; installs the Nginx and systemd configuration; and enables
the required services.

Before running it, review `scripts/nginx-matchmaker.conf` and replace the
`server_name` if the production hostname changes. Also review the operating
system firewall policy rather than assuming its existing SSH rules.

Runtime configuration and secrets live only on the server at:

```text
/etc/empire-league-matchmaker.env
```

The file is created with restricted permissions. Its required settings are:

```dotenv
DB_HOST=<database-host>
DB_PORT=<database-port>
DB_NAME=<database-name>
DB_USER=<database-user>
DB_PASSWORD=<secret>
MATCHMAKER_HOST=127.0.0.1
EMPIRE_MATCHMAKER_PORT=4317
PUBLIC_MATCHMAKER_URL=http://<matchmaker-hostname>
TICKET_DISCONNECT_GRACE_MS=20000
MATCH_REPORT_CORROBORATION_TIMEOUT_MS=3600000
```

Never copy this file into a release archive or commit it. After changing it,
restart the service with `sudo systemctl restart empire-league-matchmaker`.

### Deploy or update the matchmaker

Run from the repository root:

```powershell
.\scripts\deploy-matchmaker.ps1 `
  -Server <matchmaker-host> `
  -User <ssh-user> `
  -IdentityFile <path-to-private-key>
```

Use `-AppRoot <remote-path>` only if the installation differs from the default
`/opt/empire-league-matchmaker` layout.

The script packages only the matchmaker source, shared data, migrations, and
production package manifest. On the server it:

1. Extracts a timestamped release.
2. Installs production npm dependencies.
3. Applies pending database migrations before activation.
4. Atomically switches the `current` symlink.
5. Restarts the systemd service.
6. Checks the local `/health` endpoint for up to ten seconds.
7. Restores the previous symlink and restarts the old release if health checks
   fail.
8. Retains the five newest release directories.

Database migrations should be backward-compatible with the immediately prior
application release because application rollback does not reverse migrations.

### Matchmaker verification and operations

Verify the public health endpoint after every deployment:

```powershell
curl.exe -fsS http://<matchmaker-hostname>/health
```

Useful server-side commands:

```bash
sudo systemctl status empire-league-matchmaker
sudo journalctl -u empire-league-matchmaker -n 100 --no-pager
sudo journalctl -u empire-league-matchmaker -f
sudo nginx -t
sudo systemctl reload nginx
curl -fsS http://127.0.0.1:4317/health
```

Normal production clients use the real matchmaker. Synthetic matching is
restricted to the explicit UI preview mode and must never be used for a
production queue test. A valid end-to-end matchmaking test requires two real,
authenticated clients queued for compatible modes.

## Local development

Start the local matchmaker and Electron development client in separate shells:

```powershell
npm.cmd run matchmaker
npm.cmd run dev
```

To point development at another non-production matchmaker, set
`VITE_MATCHMAKER_URL` in the local environment. Packaged production builds use
the production matchmaker configured in the application source.

Other useful commands:

```powershell
npm.cmd run package
npm.cmd run test:maps
npm.cmd run test:civilizations
npm.cmd run test:replays
npm.cmd run test:replay-results
npm.cmd run test:ratings
```

## Secret-handling rules

- Do not add host addresses, passwords, private keys, database credentials, or
  authentication files to this README or to Git.
- Prefer SSH keys protected by an agent or secure credential store.
- Keep server environment files readable only by the service group and root.
- Review `git diff` and `git status` before every commit and deployment.
- Rotate a credential immediately if it is ever pasted into a tracked file or
  committed.

## License

Original Empire League source code and documentation are available under the
[MIT License](LICENSE). The license does not grant rights to the Empire League
name or logos, or to Microsoft, Age of Empires, and other third-party assets.
See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for details.
