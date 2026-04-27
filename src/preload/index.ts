import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('birdie', {
  version: process.env.npm_package_version ?? 'unknown',
});
