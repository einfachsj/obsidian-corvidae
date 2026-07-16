# CORVIDAE

**v2.0.4** · Obsidian plugin by [ein.ink](https://ein.ink)

Configure a modular dashboard for your vault — graph, notes, websites, and terminals in one workspace, plus project tickets, folder notes, and graph styling tools.

## Features

- **Modular dashboard** — Grid layout with graph, note, browser, terminal, and ticket boxes
- **Ticket sidebar** — Create numbered project tickets with auto frontmatter
- **Graph View extensions** — Node size and color from frontmatter, custom legend
- **Folder notes** — Sync folders with matching notes, rename and open on click
- **Hybrid links** — Auto-sync `link` property between sibling notes in a folder
- **Auto-frontmatter** — Default aliases, tags, size, and color for new notes
- **Explorer tools** — Custom sorting and folder-note visibility options

## Requirements

- Obsidian **1.12.7** or higher
- **Desktop only** (browser and terminal boxes use Electron APIs)
- Core plugin **Web Viewer** enabled for browser boxes

## Installation

### Community Plugins

1. Open **Settings → Community plugins**
2. Browse and search for **CORVIDAE**
3. Install and enable

### Manual

Install only these files into `<vault>/.obsidian/plugins/corvidae/`:

- `main.js` (built)
- `manifest.json` (repo root)
- `styles.css` (repo root)

## Development

**Source repo (this folder):**

`ORGANISATION/CORVIDAE PLUGIN/CURSOR/corvidae-v-2.0.0/`

**Local vault install (build output):**

`.obsidian/plugins/corvidae/`

```bash
pnpm install
npm run dev    # watch → deploys to vault plugin folder
npm run build  # production → deploys to vault plugin folder
```

`npm run build:release` writes `main.js`, `manifest.json`, and `styles.css` to the `build/` folder (for GitHub Releases / CI).

Do not commit `node_modules/`, `build/`, `data.json`, or `backup/`.

## GitHub Release

1. Bump `version` in `manifest.json` and `package.json`
2. `git tag 2.0.4 && git push origin 2.0.4`
3. GitHub Actions builds into `build/` and **publishes** a release with those assets
4. Tag must match `manifest.version` — Obsidian installs from the release assets (`main.js`, `manifest.json`, `styles.css`), not the Source code zip

## Links

- Author: [ein.ink](https://ein.ink)
- Plugin site: [plugin.corvidae.app](https://plugin.corvidae.app)
- Repository: [github.com/einfachsj/obsidian-corvidae](https://github.com/einfachsj/obsidian-corvidae)

## License

MIT — see [LICENSE](LICENSE)
