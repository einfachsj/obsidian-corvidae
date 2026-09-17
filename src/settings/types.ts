/**
 * Plugin-Einstellungen
 */

import type { CorvidaeLanguageSetting } from "../i18n";

export interface TicketProjectConfig {
	id: string;
	name: string;
	undoneFolder: string;
	doneFolder: string;
	developmentLogPath: string;
}

export interface CustomGraphConfig {
	id: string;
	/** Anzeigename, z.B. "Test Graph" */
	name: string;
	/**
	 * Vault-relativer Projektordner (z.B. CURSOR/corvidae-v-2.0.0).
	 * Hier liegt `{folder}/dev.md`; Klick im Explorer öffnet den Graph.
	 */
	folder: string;
	/**
	 * Code-Ordner (z.B. `src` oder vault-relativ unter dem Projekt).
	 * Scan-Wurzel für Ordner-/Datei-Knoten im Custom Graph.
	 * Leer = gesamter Projektordner.
	 */
	codeFolder: string;
}

export interface CorvidaeSettings {
	/** UI-Sprache (en, de oder auto = Obsidian UI) */
	language: CorvidaeLanguageSetting;
	/** Legende im Graph-View ein-/ausblenden */
	showLegend: boolean;

	/** Auch Knoten ohne eigene Farbe in der Legende */
	legendShowDefaultAndUncolored: boolean;

	/** Graph: ![[…​.base]] / ![[…​.canvas]]-Embeds echt entkoppeln (keine Linie, keine Force) */
	graphHideBaseEmbedLinks: boolean;

	/** Graph: nur Kanten aus Frontmatter-Feld `link` (Body-[[…]] bleiben klickbar) */
	graphOnlyFrontmatterLinks: boolean;

	/** Frontmatter-Feld für Knotengröße (1–100) */
	sizeProperty: string;
	minSize: number;
	maxSize: number;

	/** Frontmatter-Feld für Knotenfarbe (#hex) */
	colorProperty: string;

	/** Wie oft (ms) der Graph erneut gepatcht wird */
	patchIntervalMs: number;

	/** Neue Notizen automatisch mit Frontmatter versehen */
	autoFrontmatter: boolean;

	/** Standard-tags für neue Notizen */
	defaultTags: string[];

	/** Standard-size für neue Notizen */
	defaultSize: number;

	/** Standard-color für neue Notizen */
	defaultColor: string;

	/** Jede Notiz und jeder Ordner bilden ein Paar Name/Name.md */
	folderNoteEnabled: boolean;

	/** Umbenennen/Verschieben synchronisiert Notiz und Ordner */
	folderNoteSyncRename: boolean;

	/** Pfade ohne Auto-Sync (Prefix-Match) */
	folderNoteExcludePrefixes: string[];

	/** Ordner-Klick öffnet die gleichnamige Notiz */
	folderNoteOpenOnClick: boolean;

	/** Name/Name.md im Explorer ausblenden (Ordner = Notiz) */
	folderNoteHideInExplorer: boolean;

	/**
	 * Vault-relative Entwicklungsordner (z.B. CURSOR): Container + direkte
	 * Kinder (Projekte) sichtbar mit DEV-Label; Inhalt unter den Kindern versiegelt.
	 */
	developmentFolders: string[];

	/**
	 * Custom Graphs: Name + Projektordner (`dev.md`) + optionaler Code-Ordner
	 * (Scan-Wurzel). Eigener SVG-Hierarchy-Graph, nicht die Core-Graph-Engine.
	 */
	customGraphs: CustomGraphConfig[];

	/** Leere Tabs im Hauptbereich durch Dashboard ersetzen */
	dashboardAutoOpen: boolean;

	/** Notiz-Dateititel (.inline-title) in Markdown-Dateien anzeigen */
	showNoteFileTitle: boolean;

	/** File-Properties-Sidebar beim ersten Start bereits eingerichtet */
	filePropertiesSidebarInitialized: boolean;

	/** Konfigurierte Ticket-Projekte für die Sidebar */
	ticketProjects: TicketProjectConfig[];

	/** Ticket-Sidebar beim Start automatisch in der rechten Sidebar öffnen */
	ticketsSidebarAutoOpen: boolean;
}

export const DEFAULT_SETTINGS: CorvidaeSettings = {
	language: "auto",
	showLegend: true,
	legendShowDefaultAndUncolored: false,
	graphHideBaseEmbedLinks: true,
	graphOnlyFrontmatterLinks: true,
	sizeProperty: "size",
	minSize: 1,
	maxSize: 100,
	colorProperty: "color",
	patchIntervalMs: 500,
	autoFrontmatter: true,
	defaultTags: [],
	defaultSize: 50,
	defaultColor: "#888888",
	folderNoteEnabled: true,
	folderNoteSyncRename: true,
	folderNoteExcludePrefixes: [".trash"],
	folderNoteOpenOnClick: true,
	folderNoteHideInExplorer: true,
	developmentFolders: [],
	customGraphs: [],
	dashboardAutoOpen: true,
	showNoteFileTitle: false,
	filePropertiesSidebarInitialized: false,
	ticketProjects: [],
	ticketsSidebarAutoOpen: true,
};
