import { describe, it, expect } from 'vitest';
import { ja } from '../src/i18n/ja.js';
import { en } from '../src/i18n/en.js';
import type { Messages } from '../src/i18n/types.js';

function assertHookMessages(locale: Messages) {
  for (const key of Object.keys(locale.hook) as (keyof Messages['hook'])[]) {
    expect(locale.hook[key]).toBeDefined();
    expect(locale.hook[key].length).toBeGreaterThan(0);
    expect(locale.hook[key].length).toBeLessThanOrEqual(128);
  }
}

describe('i18n - ja', () => {
  it('全アクティビティモードの smallImageText が定義されている', () => {
    const modes = [
      'starting',
      'thinking',
      'coding',
      'terminal',
      'reading',
      'searching',
      'idle',
      'multi-session',
    ];
    modes.forEach((mode) => {
      expect(ja.smallImageText[mode]).toBeDefined();
    });
  });

  it('全モードの singleSessionDetails プールが定義されている', () => {
    const detailModes = [
      'coding',
      'terminal',
      'searching',
      'thinking',
      'reading',
      'idle',
      'starting',
    ];
    detailModes.forEach((mode) => {
      expect(ja.singleSessionDetails[mode].length).toBeGreaterThan(0);
    });
  });

  it('singleSessionState メッセージが24件ある', () => {
    expect(ja.singleSessionState.length).toBe(24);
  });

  it('マルチセッションメッセージが正しい件数ある', () => {
    expect(ja.multiSession[2].length).toBe(12);
    expect(ja.multiSession[3].length).toBe(12);
    expect(ja.multiSession[4].length).toBe(12);
    expect(ja.multiSessionOverflow.length).toBe(16);
  });

  it('ツールチップが25件ある', () => {
    expect(ja.tooltips.length).toBe(25);
  });

  it('統計テキストが正しくフォーマットされる', () => {
    expect(ja.stats.edits(10)).toBe('10回編集');
    expect(ja.stats.cmds(3)).toBe('3回実行');
    expect(ja.stats.searches(5)).toBe('5回検索');
    expect(ja.stats.reads(2)).toBe('2回読み込み');
    expect(ja.stats.thinks(1)).toBe('1回思考');
    expect(ja.stats.elapsed(45)).toBe('経過 45分');
    expect(ja.stats.elapsed(90)).toBe('経過 1時間30分');
    expect(ja.stats.elapsed(120)).toBe('経過 2時間');
  });

  it('Discord Rich Presence の文字数制限（128文字）を超えない', () => {
    // smallImageText
    Object.values(ja.smallImageText).forEach((text) => {
      expect(text.length).toBeLessThanOrEqual(128);
    });

    // 全メッセージプール
    Object.values(ja.singleSessionDetails).forEach((pool) => {
      pool.forEach((text) => {
        expect(text.length).toBeLessThanOrEqual(128);
      });
    });
    ja.singleSessionDetailsFallback.forEach((text) => {
      expect(text.length).toBeLessThanOrEqual(128);
    });
    ja.singleSessionState.forEach((text) => {
      expect(text.length).toBeLessThanOrEqual(128);
    });
    Object.values(ja.multiSession).forEach((pool) => {
      pool.forEach((text) => {
        expect(text.length).toBeLessThanOrEqual(128);
      });
    });
    ja.multiSessionOverflow.forEach((text) => {
      expect(text.length).toBeLessThanOrEqual(128);
    });
    ja.tooltips.forEach((text) => {
      expect(text.length).toBeLessThanOrEqual(128);
    });
  });

  it('hook メッセージが全フィールド定義されている', () => {
    assertHookMessages(ja);
  });

  it('英語ロケールと同じキー構造を持つ', () => {
    expect(Object.keys(ja).sort()).toEqual(Object.keys(en).sort());
    expect(Object.keys(ja.hook).sort()).toEqual(Object.keys(en.hook).sort());
  });
});

describe('i18n - en', () => {
  it('全アクティビティモードの smallImageText が定義されている', () => {
    const modes = [
      'starting',
      'thinking',
      'coding',
      'terminal',
      'reading',
      'searching',
      'idle',
      'multi-session',
    ];
    modes.forEach((mode) => {
      expect(en.smallImageText[mode]).toBeDefined();
    });
  });

  it('singleSessionState メッセージが24件ある', () => {
    expect(en.singleSessionState.length).toBe(24);
  });

  it('マルチセッションメッセージが正しい件数ある', () => {
    expect(en.multiSession[2].length).toBe(12);
    expect(en.multiSession[3].length).toBe(12);
    expect(en.multiSession[4].length).toBe(12);
    expect(en.multiSessionOverflow.length).toBe(16);
  });

  it('ツールチップが25件ある', () => {
    expect(en.tooltips.length).toBe(25);
  });

  it('hook メッセージが全フィールド定義されている', () => {
    assertHookMessages(en);
  });

  it('統計テキストの英語単数/複数形が正しい', () => {
    expect(en.stats.edits(1)).toBe('1 edit');
    expect(en.stats.edits(5)).toBe('5 edits');
    expect(en.stats.cmds(1)).toBe('1 cmd');
    expect(en.stats.cmds(3)).toBe('3 cmds');
    expect(en.stats.searches(1)).toBe('1 search');
    expect(en.stats.searches(5)).toBe('5 searches');
    expect(en.stats.reads(1)).toBe('1 read');
    expect(en.stats.reads(2)).toBe('2 reads');
    expect(en.stats.thinks(1)).toBe('1 think');
    expect(en.stats.thinks(4)).toBe('4 thinks');
    expect(en.stats.elapsed(15)).toBe('15m deep');
    expect(en.stats.elapsed(90)).toBe('1h 30m deep');
    expect(en.stats.elapsed(120)).toBe('2h deep');
  });
});
