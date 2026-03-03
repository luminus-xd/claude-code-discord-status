import type { Messages } from './types.js';
import { ja } from './ja.js';
import { en } from './en.js';

const locales: Record<string, Messages> = { ja, en };

let currentMessages: Messages = en;

export function initLocale(locale: string): void {
  currentMessages = locales[locale] ?? ja;
}

export function getMessages(): Messages {
  return currentMessages;
}

export type { Messages } from './types.js';
