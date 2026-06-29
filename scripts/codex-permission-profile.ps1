<#
Runs Codex CLI with one of this repo's project permission profiles.

Assumes .codex/config.toml has active [permissions.agent-*] tables.
This script only overrides default_permissions for the current run.

Usage:
  .\scripts\codex-permission-profile.ps1 agent-blog
  .\scripts\codex-permission-profile.ps1 agent-api --exec "Fix the API handler"
  .\scripts\codex-permission-profile.ps1 agent-admin --model gpt-5.5

Profiles:
  agent-admin
  agent-api
  agent-api-client
  agent-blog
  agent-schema
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$KnownProfiles = @(
  "agent-admin",
  "agent-api",
  "agent-api-client",
  "agent-blog",
  "agent-schema"
)

function Write-Usage {
  Get-Content -LiteralPath $PSCommandPath |
    Select-Object -First 17 |
    ForEach-Object { $_ -replace '^<#', '' -replace '^#>', '' }
}

if ($args.Count -lt 1) {
  Write-Usage
  exit 2
}

if ($args[0] -in @("-h", "--help", "help")) {
  Write-Usage
  exit 0
}

$PermissionProfile = [string]$args[0]
if ($PermissionProfile -notin $KnownProfiles) {
  [Console]::Error.WriteLine("Unknown permission profile: $PermissionProfile")
  Write-Usage
  exit 2
}

$CodexArgs = @()
if ($args.Count -gt 1) {
  $CodexArgs = @($args[1..($args.Count - 1)])
}

$CodexCommand = if ($env:CODEX_COMMAND) { $env:CODEX_COMMAND } else { "codex" }
$RepoRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))

$runArgs = @()
if ($CodexArgs.Count -gt 0 -and $CodexArgs[0] -in @("-Exec", "--exec")) {
  $runArgs += "exec"
  $CodexArgs = @($CodexArgs | Select-Object -Skip 1)
}

if ($CodexArgs.Count -gt 0 -and $CodexArgs[0] -eq "--") {
  $CodexArgs = @($CodexArgs | Select-Object -Skip 1)
}

$runArgs += @(
  "--cd",
  $RepoRoot,
  "-c",
  "default_permissions=`"$PermissionProfile`""
)

if ($CodexArgs.Count -gt 0) {
  $runArgs += $CodexArgs
}

Write-Output "Running: $CodexCommand $($runArgs -join ' ')"
& $CodexCommand @runArgs
exit $LASTEXITCODE
