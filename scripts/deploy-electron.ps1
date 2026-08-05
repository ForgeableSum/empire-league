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
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$releaseDir = Join-Path $repoRoot "release"
$remoteStage = "/tmp/empire-league-electron-$Version"
$sshArgs = @("-o", "StrictHostKeyChecking=accept-new")
if ($IdentityFile) {
    $sshArgs += @("-i", (Resolve-Path -LiteralPath $IdentityFile).Path)
}

Push-Location $repoRoot
try {
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
    $remoteCommand = @"
set -eu
install -d -m 0755 '$UpdateRoot'
find '$remoteStage' -type f ! -name latest.yml -exec mv {} '$UpdateRoot/' \;
cp '$UpdateRoot/$($installer.Name)' '$UpdateRoot/Empire-League-Setup.exe.new'
chmod 0644 '$UpdateRoot/Empire-League-Setup.exe.new'
mv '$UpdateRoot/Empire-League-Setup.exe.new' '$UpdateRoot/Empire-League-Setup.exe'
mv '$remoteStage/latest.yml' '$UpdateRoot/latest.yml.new'
chmod 0644 '$UpdateRoot'/*
mv '$UpdateRoot/latest.yml.new' '$UpdateRoot/latest.yml'
rmdir '$remoteStage'
test -s '$UpdateRoot/latest.yml'
"@
    Write-Host "Publishing version $Version atomically..."
    & ssh @sshArgs "${User}@${Server}" $remoteCommand
    if ($LASTEXITCODE -ne 0) { throw "Remote release activation failed." }

    Write-Host "Published Empire League $Version at $PublicUpdateUrl/latest.yml"
}
finally {
    Pop-Location
}
