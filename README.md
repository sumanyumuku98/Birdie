<p align="center">
  <img src="assets/icon.png" alt="Birdie" width="128" height="128">
</p>

<h1 align="center">Birdie</h1>

<p align="center">
  A minimal, sleek desktop wrapper for <a href="https://x.com">X (formerly Twitter)</a>.
  <br>
  Built with Electron. No bloat, no custom UI — just X in a native window.
</p>

<p align="center">
  <a href="https://github.com/sumanyumuku98/Birdie/releases/latest">Download</a> &middot;
  <a href="https://github.com/sumanyumuku98/Birdie/issues">Report Bug</a> &middot;
  <a href="https://github.com/sumanyumuku98/Birdie/discussions">Discussions</a>
</p>

---

## Features

- **Native desktop experience** — dedicated window, system tray, keyboard shortcuts
- **System notifications** — get notified without keeping a browser tab open
- **Auto-update** — updates delivered automatically via GitHub Releases
- **Theme sync** — respects your system light/dark mode preference
- **Privacy-first** — no telemetry, no tracking, no injected code
- **Lightweight** — loads x.com directly with zero custom renderer code

## Download

Grab the latest release for your platform:

| Platform | Format |
|----------|--------|
| macOS | `.dmg` |
| Windows | `.exe` (NSIS installer) |
| Linux | `.AppImage`, `.deb`, `.snap` |

**[Download latest release](https://github.com/sumanyumuku98/Birdie/releases/latest)**

## Install via Package Managers

```bash
# macOS (Homebrew)
brew install --cask sumanyumuku98/birdie/birdie

# Arch Linux (AUR)
yay -S birdie-bin
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + N` | New post |
| `Cmd/Ctrl + F` | Search |
| `Cmd/Ctrl + ,` | Settings |
| `Cmd/Ctrl + R` | Refresh |
| `Cmd/Ctrl + W` | Close window |
| `Cmd/Ctrl + Q` | Quit |

## Building from Source

```bash
git clone https://github.com/sumanyumuku98/Birdie.git
cd Birdie
npm install
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Build and launch the app |
| `npm run build` | Compile TypeScript |
| `npm test` | Run unit + integration tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run package` | Build distributable |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## Security

Birdie takes security seriously:

- `nodeIntegration` is **disabled**
- `contextIsolation` is **enabled**
- `sandbox` is **enabled**
- Navigation is restricted to x.com, twitter.com, and related domains
- No IPC bridge to the renderer — x.com runs in a fully sandboxed environment
- Permissions are whitelisted (notifications, media, clipboard only)

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feat/my-feature`)
3. Write tests for your changes
4. Ensure all tests pass (`npm test`)
5. Commit and push
6. Open a Pull Request

## License

[MIT](LICENSE)
