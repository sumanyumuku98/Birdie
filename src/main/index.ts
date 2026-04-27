import { app, BrowserWindow } from 'electron';
import { createWindow } from './window';
import { createMenu } from './menu';
import { createTray } from './tray';
import { setupTheme } from './theme';
import { setupAutoUpdater } from './updater';

// Enforce single instance
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  let mainWindow: BrowserWindow | null = null;

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    setupTheme();
    mainWindow = createWindow();
    createMenu(mainWindow);
    createTray(mainWindow);
    setupAutoUpdater();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow();
      createMenu(mainWindow);
    }
  });
}
