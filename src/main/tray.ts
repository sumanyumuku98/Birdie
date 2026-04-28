import { Tray, Menu, nativeImage, type BrowserWindow, type NativeImage } from 'electron';
import path from 'path';
import { APP_NAME } from '../shared/constants';

let tray: Tray | null = null;
let currentWindow: BrowserWindow | null = null;

export type WindowFactory = () => BrowserWindow;

function getOrCreateWindow(factory: WindowFactory): BrowserWindow {
  if (!currentWindow || currentWindow.isDestroyed()) {
    currentWindow = factory();
  }
  return currentWindow;
}

export function createTray(
  mainWindow: BrowserWindow,
  windowFactory: WindowFactory,
): Tray {
  currentWindow = mainWindow;

  const iconPath = path.join(__dirname, '..', '..', 'assets', 'tray-icon.png');

  // Use a small native image; fallback to empty if file doesn't exist
  let icon: NativeImage;
  try {
    icon = nativeImage.createFromPath(iconPath);
    if (icon.isEmpty()) {
      icon = nativeImage.createEmpty();
    }
    // Resize for tray (16x16 on most platforms)
    icon = icon.resize({ width: 16, height: 16 });
  } catch {
    icon = nativeImage.createEmpty();
  }

  tray = new Tray(icon);
  tray.setToolTip(APP_NAME);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: () => {
        const win = getOrCreateWindow(windowFactory);
        win.show();
        win.focus();
      },
    },
    {
      label: 'Hide',
      click: () => {
        if (currentWindow && !currentWindow.isDestroyed()) {
          currentWindow.hide();
        }
      },
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        if (currentWindow && !currentWindow.isDestroyed()) {
          currentWindow.destroy();
        }
        tray?.destroy();
        process.exit(0);
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    const win = getOrCreateWindow(windowFactory);
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
      win.focus();
    }
  });

  return tray;
}

export function updateTrayWindow(newWindow: BrowserWindow): void {
  currentWindow = newWindow;
}
