import type { MessagePreset } from './types.js';
import {
  SINGLE_SESSION_STATE_MESSAGES,
  SINGLE_SESSION_DETAILS,
  SINGLE_SESSION_DETAILS_FALLBACK,
  MULTI_SESSION_MESSAGES,
  MULTI_SESSION_MESSAGES_OVERFLOW,
  MULTI_SESSION_TOOLTIPS,
} from '../shared/constants.js';

export const genZPreset: MessagePreset = {
  label: 'Gen-Z',
  description: 'Quirky, meme-flavored messages',
  singleSessionStateMessages: SINGLE_SESSION_STATE_MESSAGES,
  singleSessionDetails: SINGLE_SESSION_DETAILS,
  singleSessionDetailsFallback: SINGLE_SESSION_DETAILS_FALLBACK,
  multiSessionMessages: MULTI_SESSION_MESSAGES,
  multiSessionMessagesOverflow: MULTI_SESSION_MESSAGES_OVERFLOW,
  multiSessionTooltips: MULTI_SESSION_TOOLTIPS,
};
