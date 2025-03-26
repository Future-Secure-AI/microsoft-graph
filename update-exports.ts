import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const distDir = './dist';
const pkgPath = './package.json';
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

const exportsMap = {
    ".": {
        import: "./dist/index.js",
        types: "./dist/index.d.ts"
    }
};

function isTestFile(fileName) {
    return (
        fileName.endsWith('.test.js') ||
        fileName.endsWith('.spec.js')
    );
}

function isTestDir(path) {
    return /\/(__tests__|__mocks__)(\/|$)/.test(path.replace(/\\/g, '/'));
}

function walk(dir, currentRelPath = '') {
    const entries = readdirSync(dir);

    for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stats = statSync(fullPath);
        const relPath = join(currentRelPath, entry);

        if (stats.isDirectory()) {
            if (!isTestDir(relPath)) {
                walk(fullPath, relPath);
            }
        } else if (
            entry.endsWith('.js') &&
            entry !== 'index.js' &&
            !isTestFile(entry) &&
            !isTestDir(relPath)
        ) {
            const exportPath = './' + relPath.replace(/\.js$/, '').replace(/\\/g, '/');
            exportsMap[exportPath] = {
                import: `./dist/${relPath.replace(/\\/g, '/')}`,
                types: `./dist/${relPath.replace(/\.js$/, '.d.ts').replace(/\\/g, '/')}`
            };
        }
    }
}

walk(distDir);

pkg.exports = exportsMap;

writeFileSync(pkgPath, JSON.stringify(pkg, null, "  ") + "\n");
console.log("✅ package.json exports updated with", Object.keys(exportsMap).length, "entries");