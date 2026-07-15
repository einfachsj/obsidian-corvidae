export { CORVIDAE_DASHBOARD_VIEW, CorvidaeDashboardView } from "./view";
export type { CorvidaeDashboardState } from "./view";
export { DashboardLayoutManager } from "./layout";
export { DashboardCrowControl } from "./crow-control";
export { DashboardBoxStore } from "./box-store";
export { DashboardGraphBoxEmbed } from "./graph-box-embed";
export { DashboardNoteBoxEmbed } from "./note-box-embed";
export { DashboardBrowserBoxEmbed } from "./browser-box-embed";
export { DashboardTerminalBoxEmbed } from "./terminal-box-embed";
export { DashboardTicketBoxEmbed } from "./ticket-box-embed";
export { BoxModal } from "./box-modal";
export type { DashboardBox, DashboardBoxType } from "./box-types";
export {
	DASHBOARD_GRID_COLUMNS,
	DEFAULT_BOX_COLS,
	DEFAULT_BOX_ROWS,
	DASHBOARD_BOX_TYPES,
} from "./box-types";
export { collectDashboardProjects, type DashboardProject } from "./model";
