import { describe, it, expect, vi } from 'vitest';

// Mock electron
vi.mock('electron', () => ({
  app: { name: 'Birdie' },
  Menu: {
    buildFromTemplate: vi.fn((t) => t),
    setApplicationMenu: vi.fn(),
  },
  shell: { openExternal: vi.fn() },
}));

import { buildMenuTemplate } from '../../src/main/menu';

function createMockWindow() {
  return {
    loadURL: vi.fn(),
    webContents: {
      canGoBack: vi.fn(() => true),
      canGoForward: vi.fn(() => true),
      goBack: vi.fn(),
      goForward: vi.fn(),
    },
  } as unknown as import('electron').BrowserWindow;
}

describe('buildMenuTemplate', () => {
  it('returns an array of menu items', () => {
    const template = buildMenuTemplate(createMockWindow());
    expect(Array.isArray(template)).toBe(true);
    expect(template.length).toBeGreaterThan(0);
  });

  it('includes Edit menu', () => {
    const template = buildMenuTemplate(createMockWindow());
    const editMenu = template.find((item) => item.label === 'Edit');
    expect(editMenu).toBeDefined();
    expect(Array.isArray(editMenu!.submenu)).toBe(true);
  });

  it('includes View menu', () => {
    const template = buildMenuTemplate(createMockWindow());
    const viewMenu = template.find((item) => item.label === 'View');
    expect(viewMenu).toBeDefined();
  });

  it('includes Navigate menu with Home, Back, Forward', () => {
    const template = buildMenuTemplate(createMockWindow());
    const navMenu = template.find((item) => item.label === 'Navigate');
    expect(navMenu).toBeDefined();
    const submenu = navMenu!.submenu as import('electron').MenuItemConstructorOptions[];
    const labels = submenu.map((item) => item.label);
    expect(labels).toContain('Home');
    expect(labels).toContain('Back');
    expect(labels).toContain('Forward');
  });

  it('includes Window menu', () => {
    const template = buildMenuTemplate(createMockWindow());
    const windowMenu = template.find((item) => item.label === 'Window');
    expect(windowMenu).toBeDefined();
  });

  it('includes Help menu', () => {
    const template = buildMenuTemplate(createMockWindow());
    const helpMenu = template.find((item) => item.label === 'Help');
    expect(helpMenu).toBeDefined();
  });
});
