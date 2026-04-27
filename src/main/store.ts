// eslint-disable-next-line @typescript-eslint/no-require-imports
import Store = require('electron-store');
import { STORE_KEYS, DEFAULT_WINDOW_BOUNDS, type WindowBounds } from '../shared/constants';

interface StoreSchema {
  [STORE_KEYS.WINDOW_BOUNDS]: WindowBounds;
  [STORE_KEYS.THEME]: 'system' | 'dark' | 'light';
}

let store: Store<StoreSchema>;

export function getStore(): Store<StoreSchema> {
  if (!store) {
    store = new Store<StoreSchema>({
      defaults: {
        [STORE_KEYS.WINDOW_BOUNDS]: DEFAULT_WINDOW_BOUNDS,
        [STORE_KEYS.THEME]: 'system',
      },
    });
  }
  return store;
}

export function getWindowBounds(): WindowBounds {
  return getStore().get(STORE_KEYS.WINDOW_BOUNDS);
}

export function saveWindowBounds(bounds: WindowBounds): void {
  getStore().set(STORE_KEYS.WINDOW_BOUNDS, bounds);
}

export function getThemePreference(): 'system' | 'dark' | 'light' {
  return getStore().get(STORE_KEYS.THEME);
}

export function setThemePreference(theme: 'system' | 'dark' | 'light'): void {
  getStore().set(STORE_KEYS.THEME, theme);
}
