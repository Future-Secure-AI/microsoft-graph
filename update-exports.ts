import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";

const esmFolderPath = join(process.cwd(), "dist", "esm");
const cjsFolderPath = join(process.cwd(), "dist", "cjs");

const cjsPackageFilePath = join(cjsFolderPath, "package.json");
const esmPackageFilePath = join(esmFolderPath, "package.json");

const rootPackageFilePath = join(process.cwd(), "package.json");

patchRoot();
// biome-ignore lint/suspicious/noConsoleLog: Appropriate in this context
console.log("✅ package.json exports updated with");

createCjsPackageJson();
createEsmPackageJson();
// biome-ignore lint/suspicious/noConsoleLog: Appropriate in this context
console.log("✅ Generated package.json files in dist folders");

function patchRoot() {
	const exportsMap = {
		".": {
			import: "./dist/esm/index.js",
			require: "./dist/cjs/index.js",
			types: "./dist/esm/index.d.ts",
		},
	};

	exportsWalk(esmFolderPath, exportsMap); // Use esmDir to determine what gets exported

	const pkg = JSON.parse(readFileSync(rootPackageFilePath, "utf-8"));
	pkg.exports = exportsMap;
	writeFileSync(rootPackageFilePath, JSON.stringify(pkg, null, 2));
}

function createCjsPackageJson() {
	const body = {
		type: "commonjs",
	};
	writeFileSync(cjsPackageFilePath, JSON.stringify(body, null, 2));
}

function createEsmPackageJson() {
	const body = {
		type: "module",
	};
	writeFileSync(esmPackageFilePath, JSON.stringify(body, null, 2));
}

function exportsWalk(dir: string, exportsMap, currentRelPath = ""): void {
	const entries = readdirSync(dir);

	for (const entry of entries) {
		const fullPath = join(dir, entry);
		const stats = statSync(fullPath);
		const relPath = join(currentRelPath, entry);

		if (stats.isDirectory()) {
			exportsWalk(fullPath, exportsMap, relPath);
		} else if (extname(entry) === ".js" && entry !== "index.js" && !isTestFile(entry)) {
			const esmImport = `./dist/esm/${relPath}`;
			const cjsRequire = `./dist/cjs/${relPath}`;
			const target = {
				import: esmImport,
				require: cjsRequire,
				types: `./dist/esm/${
					// biome-ignore lint/performance/useTopLevelRegex: <explanation>
					relPath.replace(/\.js$/, ".d.ts")
				}`,
			};

			exportsMap[`./${basename(entry, extname(entry))}`] = target; // Workaround for legacy CJS support
			exportsMap[cjsRequire] = target; // Workaround for legacy CJS support TODO: Remove in next major version since extensions aren't required
			exportsMap[`./${join(dirname(cjsRequire), basename(cjsRequire, extname(cjsRequire)))}`] = target; // Workaround for legacy CJS support
			exportsMap[`./${join(dirname(relPath), basename(relPath, extname(relPath)))}`] = target; // TODO: Remove in next major version
			exportsMap[`./${relPath}`] = target; // TODO: Remove in next major version
		}
	}
}

function isTestFile(fileName: string): boolean {
	return fileName.endsWith(".test.js") || fileName.endsWith(".spec.js");
}
