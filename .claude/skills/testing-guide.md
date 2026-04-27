# Testing Guide for Birdie

## Unit Tests (Vitest)
- Location: `test/unit/`
- Run: `npm test` or `npx vitest run`
- Mock Electron APIs with `vi.mock('electron', ...)`
- Test pure functions directly (e.g., `isInternalURL`)

## Integration Tests (Vitest + mocked Electron)
- Location: `test/integration/`
- Test Electron API interactions with mock sessions, windows, etc.
- Use `vi.mock` for Electron modules

## E2E Tests (Playwright Electron)
- Location: `test/e2e/`
- Run: `npm run test:e2e`
- Requires `npm run build` first
- Uses `playwright`'s `_electron` module to launch the real app

## TDD Workflow
1. Write failing test
2. Implement minimum code to pass
3. Refactor
4. Ensure all tests pass: `npm test`
