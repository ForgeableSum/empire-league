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
$activationScript = Join-Path ([System.IO.Path]::GetTempPath()) ("activate-matchmaker-{0}.sh" -f [guid]::NewGuid())
$remoteArchive = "/tmp/empire-league-matchmaker.tar.gz"
$releaseId = Get-Date -Format "yyyyMMddHHmmss"
$sshArgs = @("-o", "StrictHostKeyChecking=accept-new")
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
    $savedPassword = Get-Variable -Name EmpireMatchmakerPassword -ValueOnly -ErrorAction SilentlyContinue
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
    Write-Host "Packaging matchmaker release $releaseId..."
    & tar -czf $archive src/*.mjs src/shared/data database scripts/migrate.mjs scripts/matchmaker-package.json
    if ($LASTEXITCODE -ne 0) { throw "Could not package the matchmaker release." }

    Write-Host "Uploading matchmaker release..."
    & scp @sshArgs $archive "${User}@${Server}:$remoteArchive"
    if ($LASTEXITCODE -ne 0) { throw "Matchmaker archive upload failed." }
    $activationSource = Get-Content -Raw (Join-Path $PSScriptRoot "activate-matchmaker.sh")
    [System.IO.File]::WriteAllText(
        $activationScript,
        $activationSource.Replace("`r`n", "`n"),
        [System.Text.UTF8Encoding]::new($false)
    )
    & scp @sshArgs $activationScript "${User}@${Server}:/tmp/activate-matchmaker.sh"
    if ($LASTEXITCODE -ne 0) { throw "Matchmaker upload failed." }

    Write-Host "Activating and restarting matchmaker..."
    & ssh @sshArgs "${User}@${Server}" "bash /tmp/activate-matchmaker.sh '$AppRoot' '$releaseId'"
    if ($LASTEXITCODE -ne 0) { throw "Matchmaker activation failed." }
    Write-Host "Matchmaker deployed successfully: ws://matchmaker.empireleague.gg/events"
}
finally {
    Pop-Location
    Remove-Item -LiteralPath $archive -Force -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath $activationScript -Force -ErrorAction SilentlyContinue
    if ($askPassPath -and (Test-Path -LiteralPath $askPassPath)) { Remove-Item -LiteralPath $askPassPath -Force }
    if ($null -eq $previousAskPass) { Remove-Item Env:SSH_ASKPASS -ErrorAction SilentlyContinue } else { $env:SSH_ASKPASS = $previousAskPass }
    if ($null -eq $previousAskPassRequirement) { Remove-Item Env:SSH_ASKPASS_REQUIRE -ErrorAction SilentlyContinue } else { $env:SSH_ASKPASS_REQUIRE = $previousAskPassRequirement }
    if ($null -eq $previousDisplay) { Remove-Item Env:DISPLAY -ErrorAction SilentlyContinue } else { $env:DISPLAY = $previousDisplay }
    if ($null -eq $previousDeployPassword) { Remove-Item Env:EMPIRE_DEPLOY_PASSWORD -ErrorAction SilentlyContinue } else { $env:EMPIRE_DEPLOY_PASSWORD = $previousDeployPassword }
}
