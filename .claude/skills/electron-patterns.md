# Electron Patterns for Birdie

## Adding a New Main Process Module
1. Create `src/main/<module>.ts`
2. Export pure functions where possible (testable without Electron mocks)
3. Wire into `src/main/index.ts` in the `app.whenReady()` handler
4. Add constants to `src/shared/constants.ts`
5. Write unit tests in `test/unit/<module>.test.ts`
6. Write integration tests in `test/integration/<module>.test.ts` if it uses Electron APIs

## Security Checklist
- Never add `nodeIntegration: true`
- Never expose ipcRenderer
- Always validate URLs against the allowlist before navigation
- Always use the permission handler for new permission types

## Window Management
- Window bounds are persisted via electron-store
- Always save bounds on resize/move
- Restore bounds on app start
