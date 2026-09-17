# CORVIDAE

**v2.0.8** · Obsidian plugin by [ein.ink](https://ein.ink)

Configure a modular dashboard for your vault — graph, notes, websites, and terminals in one workspace, plus tickets, folder notes, graph styling, custom code graphs, and reading-view helpers.

## Features

- **Modular dashboard** — Grid layout with graph, note, browser, terminal, and ticket boxes
- **Ticket sidebar** — Create numbered project tickets with auto frontmatter
- **Graph View extensions** — Node size and color from frontmatter, custom legend, optional frontmatter-`link`-only edges, and decoupled `.base` / `.canvas` embeds
- **Custom Graph** — Separate hierarchy graph for project folders, source files, and code functions (`dev.md`)
- **Vault bar** — Graph + Crow icons next to Help/Settings (no left ribbon required)
- **Folder notes** — Sync folders with matching notes, rename and open on click
- **Hybrid links** — Auto-sync `link` property between sibling notes in a folder
- **Auto-frontmatter** — Default aliases, tags, size, and color for new notes
- **Explorer tools** — Custom sorting, folder-note visibility, and development-folder highlights
- **Callout links** — Favicons on external callout links; click a heading to open section URLs
- **HTML code blocks** — Sandboxed `html` embeds with auto height
- **Table formulas** — Reading-view formulas, euro formatting, merges, and side-by-side tables
- **Tips note** — Open built-in tips from settings

## Requirements

- Obsidian **1.13.0** or higher
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
2. `git tag 2.0.8 && git push origin 2.0.8`
3. GitHub Actions builds into `build/` and **publishes** a release with those assets
4. Tag must match `manifest.version` — Obsidian installs from the release assets (`main.js`, `manifest.json`, `styles.css`), not the Source code zip

## Links

- Author: [ein.ink](https://ein.ink)
- Plugin site: [plugin.corvidae.app](https://plugin.corvidae.app)
- Repository: [github.com/einfachsj/obsidian-corvidae](https://github.com/einfachsj/obsidian-corvidae)

## License

MIT
