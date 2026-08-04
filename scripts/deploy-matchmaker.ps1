[CmdletBinding()]
param(
    [string]$Server = "207.148.25.84",
    [string]$User = "root",
    [string]$AppRoot = "/opt/empire-league-matchmaker",
    [string]$IdentityFile
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$archive = Join-Path ([System.IO.Path]::GetTempPath()) ("empire-league-matchmaker-{0}.tar.gz" -f [guid]::NewGuid())
$remoteArchive = "/tmp/empire-league-matchmaker.tar.gz"
$releaseId = Get-Date -Format "yyyyMMddHHmmss"
$sshArgs = @("-o", "StrictHostKeyChecking=accept-new")
if ($IdentityFile) {
    $sshArgs += @("-i", (Resolve-Path -LiteralPath $IdentityFile).Path)
}

Push-Location $repoRoot
try {
    Write-Host "Packaging matchmaker release $releaseId..."
    & tar -czf $archive src/*.mjs src/shared/data database scripts/migrate.mjs scripts/matchmaker-package.json
    if ($LASTEXITCODE -ne 0) { throw "Could not package the matchmaker release." }

    Write-Host "Uploading matchmaker release..."
    & scp @sshArgs $archive "${User}@${Server}:$remoteArchive"
    if ($LASTEXITCODE -ne 0) { throw "Matchmaker archive upload failed." }
    & scp @sshArgs (Join-Path $PSScriptRoot "activate-matchmaker.sh") "${User}@${Server}:/tmp/activate-matchmaker.sh"
    if ($LASTEXITCODE -ne 0) { throw "Matchmaker upload failed." }

    Write-Host "Activating and restarting matchmaker..."
    & ssh @sshArgs "${User}@${Server}" "bash /tmp/activate-matchmaker.sh '$AppRoot' '$releaseId'"
    if ($LASTEXITCODE -ne 0) { throw "Matchmaker activation failed." }
    Write-Host "Matchmaker deployed successfully: ws://matchmaker.empireleague.gg/events"
}
finally {
    Pop-Location
    Remove-Item -LiteralPath $archive -Force -ErrorAction SilentlyContinue
}
