/**
 * SVG force-directed renderer for Database / Custom Graph.
 * Folder/file nodes use a force layout; function nodes orbit their file parent
 * (not part of the O(n²) simulation) to keep Functions-mode readable.
 */

import type { DevGraphEdge, DevGraphNode } from "./model";

interface SimNode extends DevGraphNode {
	x: number;
	y: number;
	vx: number;
	vy: number;
	fx: number | null;
	fy: number | null;
}

export interface HierarchyRendererOptions {
	onNodeClick?: (node: DevGraphNode) => void;
}

const ALPHA_MIN = 0.0015;
const SETTLE_FRAMES = 90;

function clearEl(el: Element): void {
	while (el.firstChild) el.removeChild(el.firstChild);
}

function setClass(el: Element, className: string): void {
	el.setAttribute("class", className);
}

function nodeRadius(kind: DevGraphNode["kind"]): number {
	if (kind === "folder") return 10;
	if (kind === "function") return 4;
	return 8;
}

export class HierarchyRenderer {
	private svg: SVGSVGElement;
	private viewport: SVGGElement;
	private gEdges: SVGGElement;
	private gNodes: SVGGElement;
	private structural: SimNode[] = [];
	private functions: SimNode[] = [];
	private structuralEdges: DevGraphEdge[] = [];
	private functionEdges: DevGraphEdge[] = [];
	private byId = new Map<string, SimNode>();
	private raf = 0;
	private width = 800;
	private height = 600;
	private dragged: SimNode | null = null;
	private panX = 0;
	private panY = 0;
	private scale = 1;
	private panning = false;
	private panStartX = 0;
	private panStartY = 0;
	private panOriginX = 0;
	private panOriginY = 0;
	private disposed = false;
	private alpha = 1;
	private settleLeft = 0;
	private linkDistance = 110;
	private rootId: string | null = null;
	private resizeObserver: ResizeObserver | null = null;
	private edgeEls = new Map<string, SVGLineElement>();
	private nodeEls = new Map<string, SVGGElement>();

	constructor(
		private host: HTMLElement,
		private options: HierarchyRendererOptions = {}
	) {
		this.host.empty();
		this.host.addClass("corvidae-custom-graph-canvas-host");

		this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		setClass(this.svg, "corvidae-custom-graph-svg");
		this.svg.setAttribute("width", "100%");
		this.svg.setAttribute("height", "100%");

		this.viewport = document.createElementNS("http://www.w3.org/2000/svg", "g");
		setClass(this.viewport, "corvidae-custom-graph-viewport");

		this.gEdges = document.createElementNS("http://www.w3.org/2000/svg", "g");
		setClass(this.gEdges, "corvidae-custom-graph-edges");
		this.gNodes = document.createElementNS("http://www.w3.org/2000/svg", "g");
		setClass(this.gNodes, "corvidae-custom-graph-nodes");

		this.viewport.appendChild(this.gEdges);
		this.viewport.appendChild(this.gNodes);
		this.svg.appendChild(this.viewport);
		this.host.appendChild(this.svg);

		this.bindInput();
		this.resize();
		if (typeof ResizeObserver !== "undefined") {
			this.resizeObserver = new ResizeObserver(() => this.resize());
			this.resizeObserver.observe(this.host);
		}
	}

	setData(nodes: DevGraphNode[], edges: DevGraphEdge[]): void {
		const prev = new Map(
			[...this.structural, ...this.functions].map((n) => [n.id, n])
		);

		this.structural = [];
		this.functions = [];
		this.byId.clear();
		this.rootId = null;

		const structuralList = nodes.filter((n) => n.kind !== "function");
		const functionList = nodes.filter((n) => n.kind === "function");
		const rootCandidate =
			structuralList.find((n) => n.kind === "folder" && !n.parentId) ??
			structuralList.find((n) => !n.parentId) ??
			null;
		this.rootId = rootCandidate?.id ?? null;

		for (let i = 0; i < structuralList.length; i++) {
			const n = structuralList[i];
			const old = prev.get(n.id);
			const isRoot = n.id === this.rootId;
			const angle = (i / Math.max(structuralList.length, 1)) * Math.PI * 2;
			const radius = 100 + Math.min(structuralList.length, 50) * 6;
			const sim: SimNode = {
				...n,
				x: isRoot
					? this.width / 2
					: old?.x ?? this.width / 2 + Math.cos(angle) * radius,
				y: isRoot
					? this.height / 2
					: old?.y ?? this.height / 2 + Math.sin(angle) * radius,
				vx: 0,
				vy: 0,
				fx: isRoot ? this.width / 2 : null,
				fy: isRoot ? this.height / 2 : null,
			};
			this.structural.push(sim);
			this.byId.set(sim.id, sim);
		}

		const childrenByParent = new Map<string, DevGraphNode[]>();
		for (const n of functionList) {
			const parent = n.parentId ?? n.filePath ?? "";
			const list = childrenByParent.get(parent) ?? [];
			list.push(n);
			childrenByParent.set(parent, list);
		}

		for (const [parentId, kids] of childrenByParent) {
			const parent = this.byId.get(parentId);
			const px = parent?.x ?? this.width / 2;
			const py = parent?.y ?? this.height / 2;
			const orbitR = 28 + Math.min(kids.length, 24) * 2.2;
			for (let i = 0; i < kids.length; i++) {
				const n = kids[i];
				const old = prev.get(n.id);
				const angle = (i / kids.length) * Math.PI * 2;
				const sim: SimNode = {
					...n,
					x: old?.x ?? px + Math.cos(angle) * orbitR,
					y: old?.y ?? py + Math.sin(angle) * orbitR,
					vx: 0,
					vy: 0,
					fx: null,
					fy: null,
				};
				this.functions.push(sim);
				this.byId.set(sim.id, sim);
			}
		}

		this.structuralEdges = edges.filter((e) => {
			const a = this.byId.get(e.source);
			const b = this.byId.get(e.target);
			return a && b && a.kind !== "function" && b.kind !== "function";
		});
		this.functionEdges = edges.filter((e) => {
			const a = this.byId.get(e.source);
			const b = this.byId.get(e.target);
			return Boolean(a && b && (a.kind === "function" || b.kind === "function"));
		});

		this.alpha = 1;
		this.settleLeft = SETTLE_FRAMES + Math.min(this.structural.length, 80);
		this.rebuildDom();
		this.pinRoot();
		this.placeFunctions();
		this.centerCameraOnRoot();
		this.paint();
		this.start();
	}

	resize(): void {
		const rect = this.host.getBoundingClientRect();
		this.width = Math.max(rect.width, 200);
		this.height = Math.max(rect.height, 200);
		this.svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
		this.pinRoot();
		if (!this.panning) this.centerCameraOnRoot();
	}

	setLinkDistance(distance: number): void {
		const next = Math.max(40, Math.min(280, distance));
		if (next === this.linkDistance) return;
		this.linkDistance = next;
		this.wake();
	}

	getLinkDistance(): number {
		return this.linkDistance;
	}

	destroy(): void {
		this.disposed = true;
		if (this.raf) cancelAnimationFrame(this.raf);
		this.raf = 0;
		this.resizeObserver?.disconnect();
		this.resizeObserver = null;
		this.host.empty();
	}

	private bindInput(): void {
		this.svg.addEventListener("wheel", (event) => {
			event.preventDefault();
			const factor = event.deltaY < 0 ? 1.08 : 0.92;
			const next = Math.min(4, Math.max(0.2, this.scale * factor));
			if (next === this.scale) return;

			const root = this.getRootNode();
			const pivotX = root ? root.x : this.width / 2;
			const pivotY = root ? root.y : this.height / 2;
			const screenX = pivotX * this.scale + this.panX;
			const screenY = pivotY * this.scale + this.panY;

			this.scale = next;
			this.panX = screenX - pivotX * this.scale;
			this.panY = screenY - pivotY * this.scale;
			this.applyTransform();
		});

		this.svg.addEventListener("pointerdown", (event) => {
			if (event.button !== 0) return;
			const target = event.target as Element | null;
			if (target?.closest?.(".corvidae-custom-graph-node")) return;
			this.panning = true;
			this.panStartX = event.clientX;
			this.panStartY = event.clientY;
			this.panOriginX = this.panX;
			this.panOriginY = this.panY;
			this.svg.setPointerCapture(event.pointerId);
		});

		this.svg.addEventListener("pointermove", (event) => {
			if (this.dragged) {
				const pt = this.clientToWorld(event.clientX, event.clientY);
				this.dragged.fx = pt.x;
				this.dragged.fy = pt.y;
				this.dragged.x = pt.x;
				this.dragged.y = pt.y;
				if (this.dragged.kind !== "function") {
					this.placeFunctions();
					this.paint();
				}
				this.wake();
				return;
			}
			if (!this.panning) return;
			this.panX = this.panOriginX + (event.clientX - this.panStartX);
			this.panY = this.panOriginY + (event.clientY - this.panStartY);
			this.applyTransform();
		});

		const endPointer = (event: PointerEvent): void => {
			if (this.dragged) {
				const wasRoot = this.dragged.id === this.rootId;
				this.dragged.fx = null;
				this.dragged.fy = null;
				this.dragged = null;
				if (wasRoot) this.pinRoot();
				this.wake();
			}
			this.panning = false;
			try {
				this.svg.releasePointerCapture(event.pointerId);
			} catch {
				/* ignore */
			}
		};
		this.svg.addEventListener("pointerup", endPointer);
		this.svg.addEventListener("pointercancel", endPointer);
	}

	private getRootNode(): SimNode | null {
		if (!this.rootId) return null;
		return this.byId.get(this.rootId) ?? null;
	}

	/** Keep the main folder fixed at the layout center. */
	private pinRoot(): void {
		const root = this.getRootNode();
		if (!root) return;
		root.fx = this.width / 2;
		root.fy = this.height / 2;
		root.x = root.fx;
		root.y = root.fy;
		root.vx = 0;
		root.vy = 0;
	}

	/** Keep the camera centered on the main folder (scale pivot stays on root). */
	private centerCameraOnRoot(): void {
		const root = this.getRootNode();
		if (!root) {
			this.panX = 0;
			this.panY = 0;
			this.applyTransform();
			return;
		}
		this.panX = this.width / 2 - root.x * this.scale;
		this.panY = this.height / 2 - root.y * this.scale;
		this.applyTransform();
	}

	private wake(): void {
		this.alpha = Math.max(this.alpha, 0.4);
		this.settleLeft = SETTLE_FRAMES;
		this.start();
	}

	private clientToWorld(clientX: number, clientY: number): { x: number; y: number } {
		const rect = this.svg.getBoundingClientRect();
		const x = (clientX - rect.left - this.panX) / this.scale;
		const y = (clientY - rect.top - this.panY) / this.scale;
		return { x, y };
	}

	private applyTransform(): void {
		this.viewport.setAttribute(
			"transform",
			`translate(${this.panX} ${this.panY}) scale(${this.scale})`
		);
	}

	private rebuildDom(): void {
		clearEl(this.gEdges);
		clearEl(this.gNodes);
		this.edgeEls.clear();
		this.nodeEls.clear();

		for (const edge of [...this.structuralEdges, ...this.functionEdges]) {
			const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
			const isFn =
				this.byId.get(edge.source)?.kind === "function" ||
				this.byId.get(edge.target)?.kind === "function";
			setClass(
				line,
				isFn
					? "corvidae-custom-graph-edge is-function"
					: "corvidae-custom-graph-edge"
			);
			const key = `${edge.source}\0${edge.target}`;
			line.dataset.source = edge.source;
			line.dataset.target = edge.target;
			this.gEdges.appendChild(line);
			this.edgeEls.set(key, line);
		}

		for (const node of [...this.structural, ...this.functions]) {
			const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
			setClass(g, `corvidae-custom-graph-node is-${node.kind}`);
			g.dataset.id = node.id;

			const circle = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"circle"
			);
			circle.setAttribute("r", String(nodeRadius(node.kind)));
			setClass(circle, "corvidae-custom-graph-node-circle");

			const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			setClass(text, "corvidae-custom-graph-node-label");
			text.setAttribute("x", String(nodeRadius(node.kind) + 4));
			text.setAttribute("y", "4");
			text.textContent = node.label;

			g.appendChild(circle);
			g.appendChild(text);

			if (node.kind === "function") {
				g.setAttribute("aria-label", node.label);
				const title = document.createElementNS(
					"http://www.w3.org/2000/svg",
					"title"
				);
				title.textContent = node.label;
				g.appendChild(title);
			}

			g.addEventListener("pointerdown", (event) => {
				event.stopPropagation();
				if (node.kind === "function") return;
				if (node.id === this.rootId) return;
				this.dragged = node;
				const pt = this.clientToWorld(event.clientX, event.clientY);
				node.fx = pt.x;
				node.fy = pt.y;
				this.svg.setPointerCapture(event.pointerId);
				this.wake();
			});

			g.addEventListener("click", (event) => {
				event.stopPropagation();
				this.options.onNodeClick?.(node);
			});

			this.gNodes.appendChild(g);
			this.nodeEls.set(node.id, g);
		}
	}

	private start(): void {
		if (this.raf) return;
		const tick = (): void => {
			if (this.disposed) {
				this.raf = 0;
				return;
			}
			const active = this.alpha > ALPHA_MIN || this.settleLeft > 0 || this.dragged;
			if (active) {
				this.step();
				this.pinRoot();
				this.placeFunctions();
				this.paint();
				if (this.settleLeft > 0) this.settleLeft -= 1;
				this.raf = requestAnimationFrame(tick);
			} else {
				this.raf = 0;
				this.pinRoot();
				this.paint();
			}
		};
		this.raf = requestAnimationFrame(tick);
	}

	private step(): void {
		const nodes = this.structural;
		const n = nodes.length;
		if (n === 0) {
			this.alpha = 0;
			return;
		}

		const alpha = this.alpha;
		const spacing = this.linkDistance / 110;
		const charge = (1400 + Math.min(n, 80) * 22) * spacing * spacing;
		const pad = 24 + 36 * spacing;
		const centerPull = 0.0028 / Math.sqrt(Math.max(spacing, 0.35));

		for (let i = 0; i < n; i++) {
			for (let j = i + 1; j < n; j++) {
				const a = nodes[i];
				const b = nodes[j];
				let dx = a.x - b.x;
				let dy = a.y - b.y;
				let dist2 = dx * dx + dy * dy;
				if (dist2 < 1) {
					dx = (Math.random() - 0.5) * 0.5;
					dy = (Math.random() - 0.5) * 0.5;
					dist2 = dx * dx + dy * dy;
				}
				const dist = Math.sqrt(dist2);
				const minDist = nodeRadius(a.kind) + nodeRadius(b.kind) + pad;
				const force =
					dist < minDist
						? ((minDist - dist) / dist) * (2.4 + spacing) * alpha
						: (charge * alpha) / dist2;
				const fx = (dx / dist) * force;
				const fy = (dy / dist) * force;
				a.vx += fx;
				a.vy += fy;
				b.vx -= fx;
				b.vy -= fy;
			}
		}

		for (const edge of this.structuralEdges) {
			const a = this.byId.get(edge.source);
			const b = this.byId.get(edge.target);
			if (!a || !b) continue;
			const dx = b.x - a.x;
			const dy = b.y - a.y;
			const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
			const ideal = this.linkDistance;
			const force = (dist - ideal) * 0.05 * alpha;
			const fx = (dx / dist) * force;
			const fy = (dy / dist) * force;
			a.vx += fx;
			a.vy += fy;
			b.vx -= fx;
			b.vy -= fy;
		}

		const root = this.getRootNode();
		const cx = root?.x ?? this.width / 2;
		const cy = root?.y ?? this.height / 2;
		for (const node of nodes) {
			if (node.id === this.rootId) {
				node.vx = 0;
				node.vy = 0;
				continue;
			}
			node.vx += (cx - node.x) * centerPull * alpha;
			node.vy += (cy - node.y) * centerPull * alpha;
			node.vx *= 0.82;
			node.vy *= 0.82;
			if (node.fx !== null && node.fy !== null) {
				node.x = node.fx;
				node.y = node.fy;
				node.vx = 0;
				node.vy = 0;
			} else {
				node.x += node.vx;
				node.y += node.vy;
			}
		}

		this.alpha *= 0.96;
	}

	/** Place function nodes in rings around their parent file. */
	private placeFunctions(): void {
		if (this.functions.length === 0) return;

		const groups = new Map<string, SimNode[]>();
		for (const fn of this.functions) {
			const parentId = fn.parentId ?? fn.filePath ?? "";
			const list = groups.get(parentId) ?? [];
			list.push(fn);
			groups.set(parentId, list);
		}

		for (const [parentId, kids] of groups) {
			const parent = this.byId.get(parentId);
			if (!parent) continue;
			const count = kids.length;
			const spacing = this.linkDistance / 110;
			const ringCapacity = Math.max(8, Math.ceil(Math.sqrt(count) * 4));

			for (let i = 0; i < count; i++) {
				const ring = Math.floor(i / ringCapacity);
				const inRing = i % ringCapacity;
				const onThisRing = Math.min(ringCapacity, count - ring * ringCapacity);
				const angle =
					(inRing / onThisRing) * Math.PI * 2 + ring * 0.35;
				const orbitR =
					(22 + ring * 16 + Math.min(onThisRing, 16) * 0.6) * Math.max(spacing, 0.7);
				const fn = kids[i];
				fn.x = parent.x + Math.cos(angle) * orbitR;
				fn.y = parent.y + Math.sin(angle) * orbitR;
			}
		}
	}

	private paint(): void {
		for (const [key, line] of this.edgeEls) {
			const [sourceId, targetId] = key.split("\0");
			const source = this.byId.get(sourceId);
			const target = this.byId.get(targetId);
			if (!source || !target) continue;
			line.setAttribute("x1", String(source.x));
			line.setAttribute("y1", String(source.y));
			line.setAttribute("x2", String(target.x));
			line.setAttribute("y2", String(target.y));
		}

		for (const [id, g] of this.nodeEls) {
			const node = this.byId.get(id);
			if (!node) continue;
			g.setAttribute("transform", `translate(${node.x} ${node.y})`);
		}
	}
}
