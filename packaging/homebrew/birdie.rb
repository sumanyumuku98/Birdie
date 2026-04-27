cask "birdie" do
  version "1.0.0"
  sha256 :no_check # Updated by CI on release

  url "https://github.com/sumanyumuku98/birdie/releases/download/v#{version}/Birdie-#{version}-universal.dmg"
  name "Birdie"
  desc "A minimal, sleek desktop wrapper for X (x.com)"
  homepage "https://github.com/sumanyumuku98/birdie"

  livecheck do
    url :url
    strategy :github_latest
  end

  app "Birdie.app"

  zap trash: [
    "~/Library/Application Support/Birdie",
    "~/Library/Preferences/com.birdie.app.plist",
    "~/Library/Caches/com.birdie.app",
  ]
end
