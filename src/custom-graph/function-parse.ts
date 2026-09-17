/**
 * Heuristic extraction of function-like symbols from JS/TS source.
 */

export interface ParsedFunction {
	name: string;
	index: number;
	line: number;
}

const CODE_EXTS = new Set(["ts", "tsx", "js", "jsx", "mjs", "cjs"]);

export function isCodeFilePath(path: string): boolean {
	const dot = path.lastIndexOf(".");
	if (dot < 0) return false;
	return CODE_EXTS.has(path.slice(dot + 1).toLowerCase());
}

/**
 * Parse function / const-arrow declarations. Best-effort, not a full AST.
 */
export function parseFunctionsFromSource(source: string): ParsedFunction[] {
	const results: ParsedFunction[] = [];
	const seen = new Set<string>();
	const lines = source.split(/\r?\n/);

	const patterns: RegExp[] = [
		/^\s*(?:export\s+)?(?:default\s+)?(?:async\s+)?function\s+\*?\s*([A-Za-z_$][\w$]*)\s*[<(]/,
		/^\s*(?:export\s+)?(?:async\s+)?function\s*\*\s*([A-Za-z_$][\w$]*)\s*[<(]/,
		/^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/,
		/^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?function\b/,
		// Class methods only when a modifier makes them unambiguous
		/^\s+(?:(?:public|private|protected|static|async|readonly|override|abstract)\s+)+([A-Za-z_$][\w$]*)\s*\([^;{]*\)\s*(?::\s*[^{]+)?\s*\{/,
	];

	const reserved = new Set([
		"if",
		"for",
		"while",
		"switch",
		"catch",
		"with",
		"constructor",
		"get",
		"set",
		"return",
		"throw",
		"typeof",
		"instanceof",
		"new",
		"await",
		"yield",
	]);

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (/^\s*\/\//.test(line) || /^\s*\*/.test(line)) continue;
		if (/^\s*(if|for|while|switch|catch|with)\s*\(/.test(line)) continue;

		for (const pattern of patterns) {
			const match = line.match(pattern);
			if (!match?.[1]) continue;
			const name = match[1];
			if (reserved.has(name)) continue;
			const key = `${name}@${i}`;
			if (seen.has(key)) continue;
			seen.add(key);
			results.push({ name, index: results.length, line: i + 1 });
			break;
		}
	}

	return results;
}

export function functionNodeId(filePath: string, name: string, index: number): string {
	return `${filePath}#fn:${name}@${index}`;
}
