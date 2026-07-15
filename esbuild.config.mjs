import esbuild from "esbuild";
import process from "process";
import { builtinModules } from "node:module";
import { copyFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const banner = `/*
 * CORVIDAE Plugin – gebaut mit esbuild
 * Quellcode: ORGANISATION/CORVIDAE PLUGIN/CURSOR/corvidae-v-2.0.0
 * Author: ein.ink
 */
`;

const rootDir = dirname(fileURLToPath(import.meta.url));
const prod = process.argv[2] === "production";
const isRelease = process.env.BUILD_MODE === "release";
const deployDir = resolve(rootDir, "../../../../.obsidian/plugins/corvidae");
const releaseDir = resolve(rootDir, "build");
const outDir = isRelease ? releaseDir : deployDir;
const outfile = resolve(outDir, "main.js");

const assetDir = resolve(rootDir, "src");

function copyAssets(targetDir) {
	mkdirSync(targetDir, { recursive: true });
	copyFileSync(resolve(rootDir, "manifest.json"), resolve(targetDir, "manifest.json"));
	copyFileSync(resolve(assetDir, "styles.css"), resolve(targetDir, "styles.css"));
}

const context = await esbuild.context({
	banner: { js: banner },
	entryPoints: ["src/main.ts"],
	bundle: true,
	external: [
		"obsidian",
		"electron",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		...builtinModules,
	],
	format: "cjs",
	target: "es2021",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outfile,
	minify: prod,
	plugins: [
		{
			name: "copy-assets",
			setup(build) {
				build.onEnd((result) => {
					if (result.errors.length > 0) return;
					copyAssets(outDir);
					if (isRelease) {
						console.log(`Release assets in ${outDir}`);
					} else {
						console.log(`Deployed to ${outDir}`);
					}
				});
			},
		},
	],
});

if (prod) {
	await context.rebuild();
	process.exit(0);
}

copyAssets(outDir);
await context.watch();
