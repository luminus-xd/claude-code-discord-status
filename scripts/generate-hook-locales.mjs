/**
 * Generates JSON locale files for the bash hook script.
 *
 * Reads the compiled i18n modules from dist/ and writes flat JSON files
 * to src/hooks/locales/ that the hook script can read with jq.
 *
 * Run after tsup build: node scripts/generate-hook-locales.mjs
 */

import { writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const i18nDir = resolve(__dirname, '..', 'dist', 'i18n');
const outDir = resolve(__dirname, '..', 'src', 'hooks', 'locales');

function buildHookJson(locale) {
  return {
    sessionStart: locale.session.startingDetails,
    sessionResume: locale.session.resumingDetails,
    iconStarting: locale.smallImageText.starting,
    thinking: locale.hook.thinking,
    edit: locale.hook.edit,
    iconCoding: locale.smallImageText.coding,
    bash: locale.hook.bash,
    iconTerminal: locale.smallImageText.terminal,
    read: locale.hook.read,
    iconReading: locale.smallImageText.reading,
    grep: locale.hook.grep,
    web: locale.hook.web,
    iconSearching: locale.smallImageText.searching,
    task: locale.hook.task,
    iconThinking: locale.smallImageText.thinking,
    fallback: locale.hook.fallback,
    finished: locale.hook.finished,
    waiting: locale.hook.waiting,
    iconIdle: locale.smallImageText.idle,
  };
}

mkdirSync(outDir, { recursive: true });

const files = readdirSync(i18nDir).filter((f) => f.endsWith('.js'));

for (const file of files) {
  const mod = await import(resolve(i18nDir, file));
  const localeName = basename(file, '.js');
  const exported = mod[localeName];
  if (!exported) continue;

  const hookJson = buildHookJson(exported);
  const outPath = resolve(outDir, `${localeName}.json`);
  writeFileSync(outPath, JSON.stringify(hookJson, null, 2) + '\n');
}

console.log(`Generated hook locales: ${files.map((f) => basename(f, '.js')).join(', ')}`);
