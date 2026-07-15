import { App, Platform, ViewState } from "obsidian";

export const TERMINAL_VIEW_TYPE = "terminal:terminal";
export const TERMINAL_BOX_WORKSPACE_CLASS = "corvidae-box-terminal-workspace";

const INTEGRATABLE_PROFILE_TYPES = new Set([
	"integrated",
	"developerConsole",
	"emulator",
]);

interface TerminalProfile {
	type?: string;
	name?: string;
	platforms?: {
		darwin?: boolean;
		linux?: boolean;
		win32?: boolean;
	};
}

interface TerminalPluginSettings {
	defaultProfile?: string;
	profiles?: Record<string, TerminalProfile>;
}

interface TerminalPluginLike {
	settings?: {
		value?: TerminalPluginSettings;
	};
}

interface AppWithPlugins extends App {
	plugins: {
		enabledPlugins: Set<string>;
		getPlugin(id: string): TerminalPluginLike | null;
	};
}

function getAppPlugins(app: App): AppWithPlugins["plugins"] {
	return (app as AppWithPlugins).plugins;
}

export interface ResolvedTerminalProfile {
	profileSourceId: string;
	profile: TerminalProfile;
}

function getTerminalSettings(app: App): TerminalPluginSettings | null {
	const plugin = getAppPlugins(app).getPlugin("terminal");
	return plugin?.settings?.value ?? null;
}

function isProfilePlatformCompatible(profile: TerminalProfile): boolean {
	const platforms = profile.platforms;
	if (!platforms) return true;

	if (Platform.isMacOS) return platforms.darwin !== false;
	if (Platform.isLinux) return platforms.linux !== false;
	if (Platform.isWin) return platforms.win32 !== false;
	return true;
}

function isEmbeddableProfile(profile: TerminalProfile): boolean {
	const type = profile.type ?? "invalid";
	if (!INTEGRATABLE_PROFILE_TYPES.has(type)) return false;
	return isProfilePlatformCompatible(profile);
}

export function isTerminalPluginEnabled(app: App): boolean {
	const plugins = getAppPlugins(app);
	if (!plugins.enabledPlugins.has("terminal")) return false;
	return plugins.getPlugin("terminal") !== null;
}

export function resolveDefaultTerminalProfile(
	app: App
): ResolvedTerminalProfile | null {
	if (!isTerminalPluginEnabled(app)) return null;

	const settings = getTerminalSettings(app);
	const profileSourceId = settings?.defaultProfile;
	if (!profileSourceId) return null;

	const profile = settings?.profiles?.[profileSourceId];
	if (!profile || !isEmbeddableProfile(profile)) return null;

	return { profileSourceId, profile };
}

export function buildTerminalViewState(
	profileSourceId: string,
	profile: TerminalProfile,
	userTitle = ""
): ViewState {
	return {
		type: TERMINAL_VIEW_TYPE,
		state: {
			[TERMINAL_VIEW_TYPE]: {
				profile,
				profileSourceId,
				cwd: null,
				serial: null,
				focus: false,
				userTitle,
			},
		},
		active: false,
	};
}
