[CmdletBinding()]
param(
    [string]$Server = "209.222.25.118",
    [string]$User = "root",
    [string]$WebRoot = "/var/www/empire-league",
    [string]$IdentityFile,
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$landingDir = Join-Path $repoRoot "landing"
$archive = Join-Path ([System.IO.Path]::GetTempPath()) ("empire-league-web-{0}.tar.gz" -f [guid]::NewGuid())
$remoteArchive = "/tmp/empire-league-web.tar.gz"

if (-not (Test-Path -LiteralPath (Join-Path $landingDir "index.html"))) {
    throw "Landing page not found at $landingDir"
}

$sshArgs = @()
if ($IdentityFile) {
    $resolvedIdentity = (Resolve-Path -LiteralPath $IdentityFile).Path
    $sshArgs += @("-i", $resolvedIdentity)
}

$askPassPath = $null
$previousAskPass = $env:SSH_ASKPASS
$previousAskPassRequirement = $env:SSH_ASKPASS_REQUIRE
$previousDisplay = $env:DISPLAY
$previousDeployPassword = $env:EMPIRE_DEPLOY_PASSWORD
$deployPassword = $env:EMPIRE_DEPLOY_PASSWORD
$secretsFile = Join-Path $repoRoot ".deploy-secrets.ps1"
if ([string]::IsNullOrWhiteSpace($deployPassword) -and (Test-Path -LiteralPath $secretsFile)) {
    . $secretsFile
    $savedPassword = Get-Variable -Name EmpireWebPassword -ValueOnly -ErrorAction SilentlyContinue
    if ($savedPassword) { $deployPassword = [string]$savedPassword }
}
if ([string]::IsNullOrWhiteSpace($deployPassword)) {
    $sshArgs += @("-o", "BatchMode=yes")
} else {
    $askPassPath = Join-Path ([System.IO.Path]::GetTempPath()) ("empire-deploy-askpass-{0}.cmd" -f [guid]::NewGuid())
    [System.IO.File]::WriteAllLines($askPassPath, @(
        "@echo off",
        'powershell.exe -NoLogo -NoProfile -NonInteractive -Command "[Console]::Out.Write($env:EMPIRE_DEPLOY_PASSWORD)"'
    ), [System.Text.Encoding]::ASCII)
    $env:EMPIRE_DEPLOY_PASSWORD = $deployPassword
    $env:SSH_ASKPASS = $askPassPath
    $env:SSH_ASKPASS_REQUIRE = "force"
    $env:DISPLAY = "empire-deploy"
}

Push-Location $repoRoot
try {
    if (-not $SkipBuild) {
        Write-Host "Building the embedded app preview..."
        npm run build:landing-preview
        if ($LASTEXITCODE -ne 0) { throw "Preview build failed." }
    }

    Write-Host "Packaging landing site..."
    tar -czf $archive -C $landingDir .
    if ($LASTEXITCODE -ne 0) { throw "Could not create deployment archive." }

    Write-Host "Uploading to ${User}@${Server}..."
    & scp @sshArgs $archive "${User}@${Server}:$remoteArchive"
    if ($LASTEXITCODE -ne 0) { throw "Upload failed." }

    $remoteCommand = @"
set -eu
webroot='$WebRoot'
staging="`${webroot}.new"
previous="`${webroot}.previous"
rm -rf "`$staging"
install -d -m 0755 "`$staging"
tar -xzf '$remoteArchive' -C "`$staging"
test -f "`$staging/index.html"
test -f "`$staging/app-preview/index.html"
# Application releases share this web root. Preserve them across website deploys.
if [ -d "`$webroot/updates" ]; then mv "`$webroot/updates" "`$staging/updates"; fi
rm -rf "`$previous"
if [ -d "`$webroot" ]; then mv "`$webroot" "`$previous"; fi
mv "`$staging" "`$webroot"
find "`$webroot" -type d -exec chmod 0755 {} +
find "`$webroot" -type f -exec chmod 0644 {} +
rm -f '$remoteArchive'
"@

    Write-Host "Activating release..."
    & ssh @sshArgs "${User}@${Server}" $remoteCommand
    if ($LASTEXITCODE -ne 0) { throw "Remote activation failed." }

    Write-Host "Deployed successfully: http://$Server/"
}
finally {
    Pop-Location
    Remove-Item -LiteralPath $archive -Force -ErrorAction SilentlyContinue
    if ($askPassPath -and (Test-Path -LiteralPath $askPassPath)) { Remove-Item -LiteralPath $askPassPath -Force }
    if ($null -eq $previousAskPass) { Remove-Item Env:SSH_ASKPASS -ErrorAction SilentlyContinue } else { $env:SSH_ASKPASS = $previousAskPass }
    if ($null -eq $previousAskPassRequirement) { Remove-Item Env:SSH_ASKPASS_REQUIRE -ErrorAction SilentlyContinue } else { $env:SSH_ASKPASS_REQUIRE = $previousAskPassRequirement }
    if ($null -eq $previousDisplay) { Remove-Item Env:DISPLAY -ErrorAction SilentlyContinue } else { $env:DISPLAY = $previousDisplay }
    if ($null -eq $previousDeployPassword) { Remove-Item Env:EMPIRE_DEPLOY_PASSWORD -ErrorAction SilentlyContinue } else { $env:EMPIRE_DEPLOY_PASSWORD = $previousDeployPassword }
}
