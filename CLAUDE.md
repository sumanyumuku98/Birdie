# Birdie — Electron X/Twitter Desktop Wrapper

## Architecture
- **Main process** (`src/main/`): Window management, tray, menus, shortcuts, auto-update, persistent store, external link handling, notifications, theme
- **Preload** (`src/preload/`): Exposes only `birdie.version` via contextBridge. No IPC to renderer.
- **Renderer**: x.com loaded directly. Zero custom code.
- **Shared** (`src/shared/`): Constants and types shared between main and preload.

## Commands
- `npm run build` — Compile TypeScript
- `npm run dev` — Build and launch the app
- `npm run typecheck` — Type check without emitting
- `npm run lint` — ESLint
- `npm run format` — Prettier format
- `npm test` — Vitest unit + integration tests
- `npm run test:e2e` — Playwright Electron E2E tests
- `npm run package` — Build distributable with electron-builder

## Security Rules (NEVER violate)
- `nodeIntegration: false` — ALWAYS
- `contextIsolation: true` — ALWAYS
- `sandbox: true` — ALWAYS
- Never expose `ipcRenderer` to the renderer
- Navigation guard: only allow x.com/twitter.com/twimg.com/t.co domains
- Permission handler: whitelist only notifications, media, clipboard

## Conventions
- All logic lives in the main process
- TDD: Write tests before implementation for new modules
- Use `src/shared/constants.ts` for all magic strings and config values
- No bundler — tsc only (app is small)
- Package manager: npm
