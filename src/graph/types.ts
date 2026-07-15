/** Einzelner Knoten im Graph-View (internes PixiJS-Objekt). */
export interface GraphNode {
	id: string;
	weight: number;
	color?: { a: number; rgb: number };
}

export interface GraphRenderer {
	nodes: GraphNode[];
	changed?: () => void;
}

export interface GraphViewLike {
	renderer?: GraphRenderer;
	containerEl: HTMLElement;
}

export interface WorkspaceLeafLike {
	view: unknown;
}
