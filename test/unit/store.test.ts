import { describe, it, expect } from 'vitest';
import { STORE_KEYS, DEFAULT_WINDOW_BOUNDS } from '../../src/shared/constants';

describe('store logic', () => {
  it('STORE_KEYS has correct values', () => {
    expect(STORE_KEYS.WINDOW_BOUNDS).toBe('windowBounds');
    expect(STORE_KEYS.THEME).toBe('theme');
  });

  it('DEFAULT_WINDOW_BOUNDS has sensible defaults', () => {
    expect(DEFAULT_WINDOW_BOUNDS.width).toBe(1200);
    expect(DEFAULT_WINDOW_BOUNDS.height).toBe(800);
    expect(DEFAULT_WINDOW_BOUNDS.x).toBeUndefined();
    expect(DEFAULT_WINDOW_BOUNDS.y).toBeUndefined();
  });

  describe('store get/set behavior (with mock)', () => {
    function createFakeStore() {
      const data = new Map<string, unknown>();
      data.set(STORE_KEYS.WINDOW_BOUNDS, { ...DEFAULT_WINDOW_BOUNDS });
      data.set(STORE_KEYS.THEME, 'system');
      return {
        get: (key: string) => data.get(key),
        set: (key: string, value: unknown) => data.set(key, value),
      };
    }

    it('returns default window bounds from fresh store', () => {
      const store = createFakeStore();
      const bounds = store.get(STORE_KEYS.WINDOW_BOUNDS);
      expect(bounds).toEqual({
        width: 1200,
        height: 800,
        x: undefined,
        y: undefined,
      });
    });

    it('saves and retrieves window bounds', () => {
      const store = createFakeStore();
      store.set(STORE_KEYS.WINDOW_BOUNDS, { width: 1000, height: 600, x: 100, y: 200 });
      expect(store.get(STORE_KEYS.WINDOW_BOUNDS)).toEqual({
        width: 1000,
        height: 600,
        x: 100,
        y: 200,
      });
    });

    it('returns default theme preference from fresh store', () => {
      const store = createFakeStore();
      expect(store.get(STORE_KEYS.THEME)).toBe('system');
    });

    it('saves and retrieves theme preference', () => {
      const store = createFakeStore();
      store.set(STORE_KEYS.THEME, 'dark');
      expect(store.get(STORE_KEYS.THEME)).toBe('dark');
    });
  });
});
