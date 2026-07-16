import { App, ViewState } from "obsidian";

export const BROWSER_BOX_WORKSPACE_CLASS = "corvidae-box-browser-workspace";
export const WEB_VIEWER_PLUGIN_ID = "webviewer";
export const WEB_VIEWER_VIEW_TYPE = "webviewer";

interface AppWithInternalPlugins extends App {
	internalPlugins?: {
		getEnabledPluginById(id: string): object | null;
		config?: Record<string, boolean>;
	};
}

interface AppWithCommunityPlugins extends App {
	plugins: {
		enabledPlugins: Set<string>;
	};
}

export function isWebViewerEnabled(app: App): boolean {
	const internal = (app as AppWithInternalPlugins).internalPlugins;
	if (internal) {
		if (internal.getEnabledPluginById(WEB_VIEWER_PLUGIN_ID)) return true;
		if (internal.config?.[WEB_VIEWER_PLUGIN_ID] === true) return true;
	}

	// Community plugins only — kept as harmless fallback.
	return (app as AppWithCommunityPlugins).plugins.enabledPlugins.has(
		WEB_VIEWER_PLUGIN_ID
	);
}

export function normalizeBrowserUrl(raw: string): string | null {
	const trimmed = raw.trim();
	if (!trimmed) return null;

	if (/^https?:\/\//i.test(trimmed)) {
		return trimmed;
	}

	return `https://${trimmed}`;
}

export function buildWebViewerViewState(url: string): ViewState {
	return {
		type: WEB_VIEWER_VIEW_TYPE,
		state: {
			url,
			navigate: true,
		},
		active: false,
	};
}
