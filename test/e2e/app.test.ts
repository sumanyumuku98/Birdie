import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import path from 'path';

test.describe('Birdie E2E', () => {
  test('app launches and shows window', async () => {
    const electronApp = await electron.launch({
      args: [path.join(__dirname, '..', '..', 'dist', 'main', 'index.js')],
    });

    const window = await electronApp.firstWindow();
    expect(window).toBeTruthy();

    const title = await window.title();
    // x.com sets its own title
    expect(title).toBeTruthy();

    await electronApp.close();
  });

  test('app loads x.com', async () => {
    const electronApp = await electron.launch({
      args: [path.join(__dirname, '..', '..', 'dist', 'main', 'index.js')],
    });

    const window = await electronApp.firstWindow();
    const url = window.url();
    expect(url).toContain('x.com');

    await electronApp.close();
  });
});
