---
name: codex-permission-wrappers
description: Maintain repo-local Codex CLI permission wrapper scripts, especially scripts/codex-permission-profile.ps1 and scripts/codex-permission-profile.sh. Use when asked to add, update, fix, validate, document, or keep PowerShell and Bash wrappers in sync for selecting custom Codex permission profiles with default_permissions overrides.
---

# Codex Permission Wrappers

## Workflow

1. Read the current repo files before editing:
   - `.codex/config.toml`
   - `scripts/codex-permission-profile.ps1`
   - `scripts/codex-permission-profile.sh`
2. Treat `.codex/config.toml` permission tables as the source of truth for profile names. Extract active `[permissions.<name>]` tables, usually `agent-admin`, `agent-api`, `agent-api-client`, `agent-blog`, and `agent-schema`.
3. Keep the PowerShell and Bash wrappers behaviorally equivalent unless the user explicitly wants platform-specific behavior.
4. Preserve the simple contract: the wrappers assume `.codex/config.toml` already contains active permission profile definitions, then run Codex with:

```text
codex --cd <repo-root> -c default_permissions="<profile>" ...
```

5. Support `--exec` as a wrapper-level convenience that inserts the `exec` subcommand before Codex global flags.
6. Pass all remaining arguments through to Codex unchanged after the wrapper-owned arguments.
7. Keep usage comments at the top of both scripts current whenever behavior changes.

## Script Conventions

- Keep scripts small and readable; avoid installing profile files under `$CODEX_HOME` unless the user asks for that design.
- Prefer `CODEX_COMMAND` as the environment override for substituting the Codex executable during tests.
- Use repo-root detection based on each script's own path, not the caller's current directory.
- Do not add broad sandbox bypass flags, `:danger-full-access`, or persistent config edits unless the user explicitly asks.
- When adding a new permission profile, update both wrappers' validation lists and usage comments.
- In PowerShell, avoid formal `param(...)` when it prevents unknown Codex flags such as `--model` from passing through naturally.
- In Bash, keep array-based argument construction so spaces in prompts and paths remain intact.

## Validation

Validate wrapper edits without launching nested Codex when possible:

```powershell
$env:CODEX_COMMAND = "Write-Output"
.\scripts\codex-permission-profile.ps1 agent-blog --exec "Check args"
Remove-Item Env:\CODEX_COMMAND
```

```bash
bash -n scripts/codex-permission-profile.sh
CODEX_COMMAND=printf ./scripts/codex-permission-profile.sh agent-blog --exec "Check args"
```

If the local environment blocks script execution, at least inspect the generated command, confirm quoting, and report which validation could not run.
