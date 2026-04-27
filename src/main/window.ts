import { BrowserWindow, type BrowserWindowConstructorOptions } from 'electron';
import path from 'path';
import { APP_URL, APP_NAME } from '../shared/constants';
import { getWindowBounds, saveWindowBounds } from './store';
import { isInternalURL } from './external-links';
import { setupPermissionHandler } from './notifications';
import { shell } from 'electron';

export function createWindow(): BrowserWindow {
  const bounds = getWindowBounds();

  const windowOptions: BrowserWindowConstructorOptions = {
    width: bounds.width,
    height: bounds.height,
    ...(bounds.x !== undefined && bounds.y !== undefined ? { x: bounds.x, y: bounds.y } : {}),
    title: APP_NAME,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    show: false,
  };

  const win = new BrowserWindow(windowOptions);

  // Show when ready to prevent visual flash
  win.once('ready-to-show', () => {
    win.show();
  });

  // Setup permission handler
  setupPermissionHandler(win.webContents.session);

  // Navigation guard: block external URLs
  win.webContents.on('will-navigate', (event, url) => {
    if (!isInternalURL(url)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  // Handle new window requests (e.g., target="_blank")
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isInternalURL(url)) {
      // Load in same window instead of opening new one
      win.loadURL(url);
    } else {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // Save window bounds on move/resize
  const saveBounds = () => {
    const currentBounds = win.getBounds();
    saveWindowBounds({
      width: currentBounds.width,
      height: currentBounds.height,
      x: currentBounds.x,
      y: currentBounds.y,
    });
  };

  win.on('resize', saveBounds);
  win.on('move', saveBounds);

  // Set user agent to avoid bot detection
  const chromeVersion = process.versions.chrome;
  win.webContents.setUserAgent(
    `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`,
  );

  win.loadURL(APP_URL);

  return win;
}
