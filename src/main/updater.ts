import { autoUpdater } from 'electron-updater';
import { app } from 'electron';

export function setupAutoUpdater(): void {
  // Don't check for updates in development
  if (!app.isPackaged) {
    return;
  }

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('error', (error) => {
    console.error('Auto-updater error:', error);
  });

  autoUpdater.checkForUpdatesAndNotify();
}
