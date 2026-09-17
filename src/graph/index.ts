export { GraphPatcher, type LegendEntry } from "./patcher";
export { LegendManager } from "./legend";
export {
	DECOUPLE_EMBED_EXTS,
	isDecoupleEmbedPath,
	isEmbedOnlyDecoupledEdge,
	isEmbedOnlyDecoupledLink,
} from "./embed-links";
export type { DecoupleEmbedExt } from "./embed-links";
export { isFrontmatterLinkPropertyEdge } from "./frontmatter-links";

export type {
	GraphLink,
	GraphLinkGraphics,
	GraphNode,
	GraphRenderer,
	GraphViewLike,
	GraphWorkerLike,
	WorkspaceLeafLike,
} from "./types";

