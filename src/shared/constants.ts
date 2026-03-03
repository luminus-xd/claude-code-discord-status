import { join } from 'node:path';
import { homedir } from 'node:os';

export const DEFAULT_PORT = 19452;
export const MCP_PRIORITY_WINDOW = 30_000; // 30 seconds
export const LARGE_IMAGE_KEY = 'claude-code';
export const LARGE_IMAGE_TEXT = 'Claude Code';

export const CONFIG_DIR = join(homedir(), '.claude-discord-status');
export const CONFIG_FILE = join(CONFIG_DIR, 'config.json');
export const PID_FILE = join(CONFIG_DIR, 'daemon.pid');
export const LOG_FILE = join(CONFIG_DIR, 'daemon.log');
export const UPDATE_CHECK_FILE = join(CONFIG_DIR, 'update-check.json');
export const LAST_SEEN_VERSION_FILE = join(CONFIG_DIR, 'last-seen-version');
export const PENDING_CHANGELOG_FILE = join(CONFIG_DIR, 'pending-changelog');

export const UPDATE_CHECK_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours
export const NPM_REGISTRY_URL = 'https://registry.npmjs.org';
export const PACKAGE_NAME = 'claude-code-discord-status';

export const DEFAULT_DISCORD_CLIENT_ID = '1472915568930848829';

export const STALE_CHECK_INTERVAL = 30_000; // 30 seconds
export const IDLE_TIMEOUT = 600_000; // 10 minutes
export const REMOVE_TIMEOUT = 1_800_000; // 30 minutes
export const RECONNECT_INTERVAL = 5_000; // 5 seconds

export const MESSAGE_ROTATION_INTERVAL = 300_000; // 5 minutes
