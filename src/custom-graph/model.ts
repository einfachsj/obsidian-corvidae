export type DevGraphNodeKind = "folder" | "file" | "function";

export interface DevGraphNode {
	id: string;
	path: string;
	label: string;
	kind: DevGraphNodeKind;
	/** Parent node id (folder path, or file path for functions). */
	parentId: string | null;
	/** For function nodes: source file path. */
	filePath?: string;
}

export interface DevGraphEdge {
	source: string;
	target: string;
}

export interface DevGraphModel {
	nodes: DevGraphNode[];
	edges: DevGraphEdge[];
	scanRoot: string;
}

export interface DevMdNodeEntry {
	path: string;
	kind: "folder" | "file";
	parent?: string;
}
