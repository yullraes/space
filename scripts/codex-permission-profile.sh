#!/usr/bin/env bash
#
# Runs Codex CLI with one of this repo's project permission profiles.
#
# Assumes .codex/config.toml has active [permissions.agent-*] tables.
# This script only overrides default_permissions for the current run.
#
# Usage:
#   ./scripts/codex-permission-profile.sh agent-blog
#   ./scripts/codex-permission-profile.sh agent-api --exec "Fix the API handler"
#   ./scripts/codex-permission-profile.sh agent-admin --model gpt-5.5
#
# Profiles:
#   agent-admin
#   agent-api
#   agent-api-client
#   agent-blog
#   agent-schema

set -euo pipefail

usage() {
  sed -n '2,18p' "$0" | sed 's/^# \{0,1\}//'
}

if [[ $# -lt 1 ]]; then
  usage >&2
  exit 2
fi

permission_profile="$1"
shift

case "$permission_profile" in
  agent-admin | agent-api | agent-api-client | agent-blog | agent-schema)
    ;;
  -h | --help | help)
    usage
    exit 0
    ;;
  *)
    echo "Unknown permission profile: $permission_profile" >&2
    usage >&2
    exit 2
    ;;
esac

codex_command="${CODEX_COMMAND:-codex}"
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

run_args=()
if [[ "${1:-}" == "--exec" ]]; then
  run_args+=("exec")
  shift
fi

if [[ "${1:-}" == "--" ]]; then
  shift
fi

run_args+=(
  "--cd"
  "$repo_root"
  "-c"
  "default_permissions=\"$permission_profile\""
)

run_args+=("$@")

printf 'Running: %s' "$codex_command"
printf ' %q' "${run_args[@]}"
printf '\n'

exec "$codex_command" "${run_args[@]}"
