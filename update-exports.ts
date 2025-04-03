import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

const esmDir = './dist/esm';
const cjsDir = './dist/cjs';
const pkgPath = './package.json';
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

const exportsMap = {
  ".": {
    import: "./dist/esm/index.js",
    require: "./dist/cjs/index.js",
    types: "./dist/esm/index.d.ts"
  }
};

function isTestFile(fileName) {
  return fileName.endsWith('.test.js') || fileName.endsWith('.spec.js');
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
      const exportSubpath = './' + relPath.replace(/\.js$/, '').replace(/\\/g, '/');
      exportsMap[exportSubpath] = {
        import: `./dist/esm/${relPath.replace(/\\/g, '/')}`,
        require: `./dist/cjs/${relPath.replace(/\\/g, '/')}`,
        types: `./dist/esm/${relPath.replace(/\.js$/, '.d.ts').replace(/\\/g, '/')}`
      };
    }
  }
}

walk(esmDir); // Use esmDir to determine what gets exported

pkg.exports = exportsMap;

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log("✅ package.json exports updated with", Object.keys(exportsMap).length, "entries");