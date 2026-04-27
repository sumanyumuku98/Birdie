import { shell } from 'electron';
import { ALLOWED_DOMAINS } from '../shared/constants';

export function isInternalURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return false;
    }
    return ALLOWED_DOMAINS.some(
      (domain) => parsed.hostname === domain || parsed.hostname.endsWith('.' + domain),
    );
  } catch {
    return false;
  }
}

export function handleNavigation(url: string): boolean {
  if (isInternalURL(url)) {
    return false; // allow navigation
  }
  shell.openExternal(url);
  return true; // prevent navigation
}
