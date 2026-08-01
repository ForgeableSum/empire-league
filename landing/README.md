# Empire League landing page

This folder is a static site. You can open `index.html` directly or serve it with
any static file server:

```powershell
npx serve landing
```

The embedded app preview is built from the real React renderer. Rebuild it after
renderer changes with:

```powershell
npm run build:landing-preview
```

Before publishing, replace the `href="#"` value on both elements marked `data-download`
in `index.html` with the final installer URL.

## Deploying the website

From PowerShell at the repository root, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-web.ps1
```

The script rebuilds the embedded React preview, packages everything in `landing/`,
uploads it to `root@209.222.25.118`, and activates it at
`/var/www/empire-league`. SSH prompts for the server password; credentials are not
stored in the repository. The active site is retained as
`/var/www/empire-league.previous` during the next deployment for simple rollback.

Useful options:

```powershell
# Publish existing landing/app-preview files without rebuilding them
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-web.ps1 -SkipBuild

# Use an SSH key after you have configured one yourself
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-web.ps1 -IdentityFile "$env:USERPROFILE\.ssh\empire_league_deploy"

# Deploy to a different host or account
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-web.ps1 -Server example.com -User deploy
```

Requirements: Node.js/npm, OpenSSH (`ssh` and `scp`), and `tar` available on the
local Windows machine.
