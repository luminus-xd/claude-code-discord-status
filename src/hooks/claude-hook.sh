#!/usr/bin/env bash
# Claude Code Discord Status — Hook Script
# Reads lifecycle events from stdin and forwards to the daemon.
# Always exits 0 to never block Claude Code.

set -euo pipefail

DAEMON_URL="${CLAUDE_DISCORD_URL:-http://127.0.0.1:${CLAUDE_DISCORD_PORT:-19452}}"
CURL_OPTS="--connect-timeout 2 --max-time 2 -s -o /dev/null"

# Read locale from config (default: en)
CONFIG_FILE="${HOME}/.claude-discord-status/config.json"
LOCALE="${CLAUDE_DISCORD_LOCALE:-}"
if [ -z "$LOCALE" ] && [ -f "$CONFIG_FILE" ] && command -v jq &>/dev/null; then
  LOCALE=$(jq -r '.locale // "en"' "$CONFIG_FILE" 2>/dev/null) || LOCALE="en"
fi
LOCALE="${LOCALE:-en}"

# --- Locale message table ---
if [ "$LOCALE" = "ja" ]; then
  MSG_SESSION_START="セッション開始中…"
  MSG_SESSION_RESUME="セッション復帰中…"
  MSG_ICON_STARTING="起動中"
  MSG_THINKING="考え中…"
  MSG_EDIT="ファイルを編集中"
  MSG_ICON_CODING="コード記述中"
  MSG_BASH="コマンド実行中"
  MSG_ICON_TERMINAL="コマンド実行中"
  MSG_READ="ファイルを読み込み中"
  MSG_ICON_READING="ファイル読み込み中"
  MSG_GREP="コードベースを検索中"
  MSG_WEB="Webを検索中"
  MSG_ICON_SEARCHING="検索中"
  MSG_TASK="サブタスク実行中"
  MSG_ICON_THINKING="考え中…"
  MSG_FALLBACK="作業中…"
  MSG_FINISHED="完了"
  MSG_WAITING="入力待ち"
  MSG_ICON_IDLE="待機中"
else
  MSG_SESSION_START="Starting session..."
  MSG_SESSION_RESUME="Resuming session..."
  MSG_ICON_STARTING="Starting up"
  MSG_THINKING="Thinking..."
  MSG_EDIT="Editing a file"
  MSG_ICON_CODING="Writing code"
  MSG_BASH="Running a command"
  MSG_ICON_TERMINAL="Running a command"
  MSG_READ="Reading a file"
  MSG_ICON_READING="Reading files"
  MSG_GREP="Searching codebase"
  MSG_WEB="Searching the web"
  MSG_ICON_SEARCHING="Searching"
  MSG_TASK="Running a subtask"
  MSG_ICON_THINKING="Thinking..."
  MSG_FALLBACK="Working..."
  MSG_FINISHED="Finished"
  MSG_WAITING="Waiting for input"
  MSG_ICON_IDLE="Idle"
fi

# Read JSON from stdin
INPUT=$(cat)

# Extract fields using jq
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // empty' 2>/dev/null) || true
HOOK_EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // empty' 2>/dev/null) || true
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty' 2>/dev/null) || true
CWD=$(echo "$INPUT" | jq -r '.cwd // empty' 2>/dev/null) || true

if [ -z "$SESSION_ID" ] || [ -z "$HOOK_EVENT" ]; then
  exit 0
fi

# Helper: POST JSON to daemon
post_json() {
  local endpoint="$1"
  local data="$2"
  curl $CURL_OPTS -X POST \
    -H "Content-Type: application/json" \
    -d "$data" \
    "${DAEMON_URL}${endpoint}" 2>/dev/null || true
}

case "$HOOK_EVENT" in
  SessionStart)
    MATCHER=$(echo "$INPUT" | jq -r '.matcher // empty' 2>/dev/null) || true
    if [ "$MATCHER" = "resume" ]; then
      DETAILS="$MSG_SESSION_RESUME"
    else
      DETAILS="$MSG_SESSION_START"
    fi
    # Synchronous start — register session with daemon
    post_json "/sessions/${SESSION_ID}/start" \
      "{\"pid\": ${PPID}, \"projectPath\": \"${CWD}\"}"
    post_json "/sessions/${SESSION_ID}/activity" \
      "{\"details\": \"${DETAILS}\", \"smallImageKey\": \"starting\", \"smallImageText\": \"${MSG_ICON_STARTING}\", \"priority\": \"hook\"}"
    ;;

  SessionEnd)
    post_json "/sessions/${SESSION_ID}/end" "{}"
    ;;

  UserPromptSubmit)
    post_json "/sessions/${SESSION_ID}/activity" \
      "{\"details\": \"${MSG_THINKING}\", \"smallImageKey\": \"thinking\", \"smallImageText\": \"${MSG_THINKING}\", \"priority\": \"hook\"}"
    ;;

  PreToolUse)
    DETAILS=""
    ICON="coding"
    ICON_TEXT=""
    case "$TOOL_NAME" in
      Write|Edit)
        DETAILS="$MSG_EDIT"
        ICON="coding"
        ICON_TEXT="$MSG_ICON_CODING"
        ;;
      Bash)
        DETAILS="$MSG_BASH"
        ICON="terminal"
        ICON_TEXT="$MSG_ICON_TERMINAL"
        ;;
      Read)
        DETAILS="$MSG_READ"
        ICON="reading"
        ICON_TEXT="$MSG_ICON_READING"
        ;;
      Grep|Glob)
        DETAILS="$MSG_GREP"
        ICON="searching"
        ICON_TEXT="$MSG_ICON_SEARCHING"
        ;;
      WebSearch|WebFetch)
        DETAILS="$MSG_WEB"
        ICON="searching"
        ICON_TEXT="$MSG_ICON_SEARCHING"
        ;;
      Task)
        DETAILS="$MSG_TASK"
        ICON="thinking"
        ICON_TEXT="$MSG_ICON_THINKING"
        ;;
      *)
        DETAILS="$MSG_FALLBACK"
        ICON="coding"
        ICON_TEXT="$MSG_ICON_CODING"
        ;;
    esac

    # Truncate details to 128 chars
    DETAILS=$(echo "$DETAILS" | cut -c1-128)

    post_json "/sessions/${SESSION_ID}/activity" \
      "{\"details\": \"${DETAILS}\", \"smallImageKey\": \"${ICON}\", \"smallImageText\": \"${ICON_TEXT}\", \"priority\": \"hook\"}"
    ;;

  Stop)
    post_json "/sessions/${SESSION_ID}/activity" \
      "{\"details\": \"${MSG_FINISHED}\", \"smallImageKey\": \"idle\", \"smallImageText\": \"${MSG_ICON_IDLE}\", \"priority\": \"hook\"}"
    ;;

  Notification)
    post_json "/sessions/${SESSION_ID}/activity" \
      "{\"details\": \"${MSG_WAITING}\", \"smallImageKey\": \"idle\", \"smallImageText\": \"${MSG_ICON_IDLE}\", \"priority\": \"hook\"}"
    ;;

  *)
    # Unknown event, ignore
    ;;
esac

exit 0
