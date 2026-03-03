export interface StatsFormatters {
  edits: (n: number) => string;
  cmds: (n: number) => string;
  searches: (n: number) => string;
  reads: (n: number) => string;
  thinks: (n: number) => string;
  elapsed: (min: number) => string;
  justStarted: string;
}

export interface HookMessages {
  thinking: string;
  edit: string;
  bash: string;
  read: string;
  grep: string;
  web: string;
  task: string;
  fallback: string;
  finished: string;
  waiting: string;
}

export interface Messages {
  smallImageText: Record<string, string>;
  singleSessionDetails: Record<string, string[]>;
  singleSessionDetailsFallback: string[];
  singleSessionState: string[];
  multiSession: Record<number, string[]>;
  multiSessionOverflow: string[];
  tooltips: string[];
  stats: StatsFormatters;
  mcp: {
    defaultStatus: string;
  };
  session: {
    startingDetails: string;
    resumingDetails: string;
    startingSmallImageText: string;
  };
  hook: HookMessages;
}
