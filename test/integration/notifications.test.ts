import { describe, it, expect, vi } from 'vitest';

// Mock electron
vi.mock('electron', () => ({
  session: {},
}));

import { setupPermissionHandler } from '../../src/main/notifications';

function createMockSession() {
  let requestHandler: ((wc: unknown, perm: string, cb: (granted: boolean) => void) => void) | null =
    null;
  let checkHandler: ((wc: unknown, perm: string) => boolean) | null = null;

  return {
    setPermissionRequestHandler: vi.fn((handler) => {
      requestHandler = handler;
    }),
    setPermissionCheckHandler: vi.fn((handler) => {
      checkHandler = handler;
    }),
    simulateRequest(permission: string): boolean {
      let result = false;
      if (requestHandler) {
        requestHandler(null, permission, (granted) => {
          result = granted;
        });
      }
      return result;
    },
    simulateCheck(permission: string): boolean {
      if (checkHandler) {
        return checkHandler(null, permission);
      }
      return false;
    },
  };
}

describe('setupPermissionHandler', () => {
  it('allows notifications', () => {
    const session = createMockSession();
    setupPermissionHandler(session as unknown as import('electron').Session);
    expect(session.simulateRequest('notifications')).toBe(true);
    expect(session.simulateCheck('notifications')).toBe(true);
  });

  it('allows media', () => {
    const session = createMockSession();
    setupPermissionHandler(session as unknown as import('electron').Session);
    expect(session.simulateRequest('media')).toBe(true);
  });

  it('blocks geolocation', () => {
    const session = createMockSession();
    setupPermissionHandler(session as unknown as import('electron').Session);
    expect(session.simulateRequest('geolocation')).toBe(false);
    expect(session.simulateCheck('geolocation')).toBe(false);
  });

  it('blocks camera', () => {
    const session = createMockSession();
    setupPermissionHandler(session as unknown as import('electron').Session);
    expect(session.simulateRequest('camera')).toBe(false);
  });
});
