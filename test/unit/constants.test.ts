import { describe, it, expect } from 'vitest';
import {
  APP_NAME,
  APP_URL,
  ALLOWED_DOMAINS,
  ALLOWED_PERMISSIONS,
  DEFAULT_WINDOW_BOUNDS,
} from '../../src/shared/constants';

describe('constants', () => {
  it('has correct app name', () => {
    expect(APP_NAME).toBe('Birdie');
  });

  it('has correct app URL', () => {
    expect(APP_URL).toBe('https://x.com');
  });

  it('includes essential domains', () => {
    expect(ALLOWED_DOMAINS).toContain('x.com');
    expect(ALLOWED_DOMAINS).toContain('twitter.com');
    expect(ALLOWED_DOMAINS).toContain('t.co');
    expect(ALLOWED_DOMAINS).toContain('twimg.com');
  });

  it('allows only safe permissions', () => {
    expect(ALLOWED_PERMISSIONS).toContain('notifications');
    expect(ALLOWED_PERMISSIONS).toContain('media');
    expect(ALLOWED_PERMISSIONS).not.toContain('geolocation');
    expect(ALLOWED_PERMISSIONS).not.toContain('camera');
  });

  it('has sensible default window bounds', () => {
    expect(DEFAULT_WINDOW_BOUNDS.width).toBeGreaterThan(0);
    expect(DEFAULT_WINDOW_BOUNDS.height).toBeGreaterThan(0);
  });
});
