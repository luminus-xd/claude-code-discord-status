import type { MessagePreset } from './types.js';

export const minimalPreset: MessagePreset = {
  label: 'Minimal',
  description: 'Terse, just the facts (default)',
  singleSessionStateMessages: ['Coding', 'Active', 'Working', 'Developing', 'In progress', 'Busy'],
  singleSessionDetails: {
    coding: ['Editing code', 'Writing code', 'Making changes', 'Modifying files'],
    terminal: ['Running commands', 'In the terminal', 'Executing tasks', 'Running scripts'],
    searching: ['Searching code', 'Finding references', 'Looking up code', 'Navigating files'],
    thinking: ['Thinking', 'Analyzing', 'Planning', 'Evaluating'],
    reading: ['Reading code', 'Reviewing files', 'Studying code', 'Loading context'],
    idle: ['Idle', 'Waiting', 'On standby', 'Ready'],
    starting: ['Starting', 'Initializing', 'Loading', 'Booting'],
  },
  singleSessionDetailsFallback: ['Working', 'Busy', 'Active', 'In progress'],
  multiSessionMessages: {
    2: ['2 projects active', '2 sessions running', 'Working on 2 projects', 'Across 2 codebases'],
    3: ['3 projects active', '3 sessions running', 'Working on 3 projects', 'Across 3 codebases'],
    4: ['4 projects active', '4 sessions running', 'Working on 4 projects', 'Across 4 codebases'],
  },
  multiSessionMessagesOverflow: [
    '{n} projects active',
    '{n} sessions running',
    'Working on {n} projects',
    'Across {n} codebases',
  ],
  multiSessionTooltips: [
    'Multiple sessions active',
    'Parallel development',
    'Multi-project workflow',
    'Working across repos',
    'Concurrent sessions',
    'Multitasking',
  ],
};
