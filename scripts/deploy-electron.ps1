[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^\d+\.\d+\.\d+([+-][0-9A-Za-z.-]+)?$')]
    [string]$Version,
    [string]$Server = "209.222.25.118",
    [string]$User = "root",
    [string]$UpdateRoot = "/var/www/empire-league/updates/windows",
    [string]$PublicUpdateUrl = "https://empireleague.gg/updates/windows",
    [string]$IdentityFile,
    [switch]$SkipBuild,
    [switch]$VerifyOnly
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$releaseDir = Join-Path $repoRoot "release"
$remoteStage = "/tmp/empire-league-electron-$Version"
$sshArgs = @(
    "-o", "StrictHostKeyChecking=accept-new",
    "-o", "ConnectTimeout=10",
    "-o", "ConnectionAttempts=1",
    "-o", "ServerAliveInterval=10",
    "-o", "ServerAliveCountMax=2",
    "-o", "NumberOfPasswordPrompts=1"
)
if ($IdentityFile) {
    $sshArgs += @("-i", (Resolve-Path -LiteralPath $IdentityFile).Path)
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
    # Never fall back to an invisible interactive password prompt.
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
    Write-Host "Verifying non-interactive production SSH access..."
    & ssh @sshArgs "${User}@${Server}" "printf DEPLOY_SSH_OK"
    if ($LASTEXITCODE -ne 0) {
        throw "Production SSH authentication failed. Build and publish were not started."
    }
    if ($VerifyOnly) {
        Write-Host "Production SSH verification succeeded; no build or publish was performed."
        return
    }

    if (-not $SkipBuild) {
        Write-Host "Setting package version to $Version..."
        & npm.cmd version $Version --no-git-tag-version --allow-same-version
        if ($LASTEXITCODE -ne 0) { throw "Could not set package version." }

        Write-Host "Building Windows installer and update metadata..."
        & npm.cmd run release:windows
        if ($LASTEXITCODE -ne 0) { throw "Electron release build failed." }
    }

    $metadata = Join-Path $releaseDir "latest.yml"
    if (-not (Test-Path -LiteralPath $metadata)) { throw "Missing $metadata" }
    $installer = Get-ChildItem -LiteralPath $releaseDir -File |
        Where-Object { $_.Name -match "Setup.*\.exe$" } |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1
    if (-not $installer) { throw "No Windows setup executable was produced." }
    $blockmap = Get-Item -LiteralPath ($installer.FullName + ".blockmap") -ErrorAction SilentlyContinue
    if (-not $blockmap) { throw "Missing blockmap for $($installer.Name)." }
    $latestContents = Get-Content -LiteralPath $metadata -Raw
    if ($latestContents -notmatch "version:\s*$([regex]::Escape($Version))") {
        throw "latest.yml does not describe version $Version. Refusing to publish mismatched files."
    }

    Write-Host "Creating remote staging directory..."
    & ssh @sshArgs "${User}@${Server}" "rm -rf '$remoteStage' && install -d -m 0755 '$remoteStage'"
    if ($LASTEXITCODE -ne 0) { throw "Could not prepare remote staging directory." }

    Write-Host "Uploading release artifacts..."
    & scp @sshArgs $installer.FullName $blockmap.FullName $metadata "${User}@${Server}:${remoteStage}/"
    if ($LASTEXITCODE -ne 0) { throw "Release upload failed." }

    # Install binaries first and latest.yml last. Clients never see metadata for
    # an artifact that has not finished uploading.
    # Keep this as one LF-free command. Windows PowerShell here-strings use
    # CRLF, and ssh can pass those carriage returns through to remote Bash.
    $remoteCommand = @(
        "set -eu",
        "install -d -m 0755 '$UpdateRoot'",
        "mv '$remoteStage/$($installer.Name)' '$UpdateRoot/'",
        "mv '$remoteStage/$($blockmap.Name)' '$UpdateRoot/'",
        "cp '$UpdateRoot/$($installer.Name)' '$UpdateRoot/Empire-League-Setup.exe.new'",
        "chmod 0644 '$UpdateRoot/Empire-League-Setup.exe.new'",
        "mv '$UpdateRoot/Empire-League-Setup.exe.new' '$UpdateRoot/Empire-League-Setup.exe'",
        "mv '$remoteStage/latest.yml' '$UpdateRoot/latest.yml.new'",
        "chmod 0644 '$UpdateRoot'/*",
        "mv '$UpdateRoot/latest.yml.new' '$UpdateRoot/latest.yml'",
        "rmdir '$remoteStage'",
        "test -s '$UpdateRoot/latest.yml'"
    ) -join "; "
    Write-Host "Publishing version $Version atomically..."
    & ssh @sshArgs "${User}@${Server}" $remoteCommand
    if ($LASTEXITCODE -ne 0) { throw "Remote release activation failed." }

    Write-Host "Published Empire League $Version at $PublicUpdateUrl/latest.yml"
}
finally {
    Pop-Location
    if ($askPassPath -and (Test-Path -LiteralPath $askPassPath)) {
        Remove-Item -LiteralPath $askPassPath -Force
    }
    if ($null -eq $previousAskPass) { Remove-Item Env:SSH_ASKPASS -ErrorAction SilentlyContinue } else { $env:SSH_ASKPASS = $previousAskPass }
    if ($null -eq $previousAskPassRequirement) { Remove-Item Env:SSH_ASKPASS_REQUIRE -ErrorAction SilentlyContinue } else { $env:SSH_ASKPASS_REQUIRE = $previousAskPassRequirement }
    if ($null -eq $previousDisplay) { Remove-Item Env:DISPLAY -ErrorAction SilentlyContinue } else { $env:DISPLAY = $previousDisplay }
    if ($null -eq $previousDeployPassword) { Remove-Item Env:EMPIRE_DEPLOY_PASSWORD -ErrorAction SilentlyContinue } else { $env:EMPIRE_DEPLOY_PASSWORD = $previousDeployPassword }
}
