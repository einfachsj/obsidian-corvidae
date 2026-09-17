/** Einzelner Knoten im Graph-View (internes PixiJS-Objekt). */
export interface GraphNode {
	id: string;
	weight: number;
	x?: number;
	y?: number;
	color?: { a: number; rgb: number };
	/** PIXI.Text label — vorhanden wenn der Graph Text-Fade > 0 hat. */
	text?: { text: string };
	/** Ausgehende Kanten (target.id → GraphLink). */
	forward?: Record<string, GraphLink>;
	/** Eingehende Kanten (source.id → GraphLink). */
	reverse?: Record<string, GraphLink>;
	clearGraphics?: () => void;
	destroy?: () => void;
}

/** PIXI-Display-Objekt einer Graph-Kante (undokumentiertes Core-API). */
export interface GraphLinkGraphics {
	visible?: boolean;
	alpha?: number;
}

/** Einzelne Kante im Graph-View (undokumentiertes Core-API). */
export interface GraphLink {
	source: GraphNode;
	target: GraphNode;
	line?: GraphLinkGraphics;
	arrow?: GraphLinkGraphics;
	px?: GraphLinkGraphics;
	clearGraphics?: () => void;
}

export interface GraphWorkerLike {
	postMessage: (data: unknown) => void;
}

export interface GraphRenderer {
	nodes: GraphNode[];
	links?: GraphLink[];
	worker?: GraphWorkerLike;
	changed?: () => void;
	/** Optional id → node map used by some Obsidian graph builds. */
	nodeLookup?: Record<string, GraphNode>;
}

export interface GraphViewLike {
	renderer?: GraphRenderer;
	containerEl: HTMLElement;
}

export interface WorkspaceLeafLike {
	view: unknown;
}
