# Packaging

Publishing channel configs for distributing Birdie across platform-specific package managers.

## Homebrew (macOS)

`homebrew/birdie.rb` is a cask formula template. To publish:

1. Create a separate tap repo (`homebrew-birdie`)
2. Copy `birdie.rb` into the tap's `Casks/` directory
3. Update `sha256` and `version` after each release
4. Users install with: `brew install --cask sumanyumuku98/birdie/birdie`

## Snap Store (Linux)

`snap/snapcraft.yaml` defines the Snap package. To publish:

1. `snapcraft login`
2. `snapcraft register birdie`
3. Build locally or let CI handle it (see `release.yml`)
4. `snapcraft upload --release=stable birdie_*.snap`

## AUR (Arch Linux)

`aur/PKGBUILD` is a binary package descriptor. To publish:

1. Clone the AUR repo: `git clone ssh://aur@aur.archlinux.org/birdie-bin.git`
2. Copy `PKGBUILD` into the cloned repo
3. Run `makepkg --printsrcinfo > .SRCINFO`
4. Update `sha256sums` with actual hash from the release
5. Commit and push to AUR

## winget (Windows)

`winget/sumanyumuku98.Birdie.yaml` is a winget manifest. To publish:

1. Fork `microsoft/winget-pkgs`
2. Create `manifests/s/sumanyumuku98/Birdie/1.0.0/sumanyumuku98.Birdie.yaml`
3. Update `InstallerSha256` with actual hash
4. Submit a PR to `microsoft/winget-pkgs`

## Notes

- All `sha256` / checksum values are placeholders — update them from the GitHub Release checksums after tagging
- The `release.yml` workflow generates `checksums.txt` with SHA-256 hashes for all artifacts
- Snap uploads are handled automatically by CI on tagged releases
