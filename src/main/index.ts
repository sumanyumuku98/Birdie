import { app, BrowserWindow } from 'electron';
import { createWindow } from './window';
import { createMenu } from './menu';
import { createTray, updateTrayWindow } from './tray';
import { setupTheme } from './theme';
import { setupAutoUpdater } from './updater';

// Enforce single instance
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  let mainWindow: BrowserWindow | null = null;

  function createMainWindow(): BrowserWindow {
    mainWindow = createWindow();
    createMenu(mainWindow);
    return mainWindow;
  }

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    setupTheme();
    createMainWindow();
    createTray(mainWindow!, createMainWindow);
    setupAutoUpdater();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
      updateTrayWindow(mainWindow!);
    }
  });
}
