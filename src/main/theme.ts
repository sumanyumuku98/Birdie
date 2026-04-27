import { nativeTheme } from 'electron';
import { getThemePreference } from './store';

export function setupTheme(): void {
  const pref = getThemePreference();
  nativeTheme.themeSource = pref;
}

export function toggleTheme(): void {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light';
  } else {
    nativeTheme.themeSource = 'dark';
  }
}
