import * as fs from 'fs';
import * as path from 'path';

const esmDir = './dist/esm';
const cjsDir = './dist/cjs';
const pkgPath = './package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const exportsMap = {
  ".": {
    import: "./dist/esm/index.js",
    require: "./dist/cjs/index.js",
    types: "./dist/esm/index.d.ts"
  }
};

function isTestFile(fileName: string): boolean {
  return fileName.endsWith('.test.js') || fileName.endsWith('.spec.js');
}

function isTestDir(path: string): boolean {
  return /\/(__tests__|__mocks__)(\/|$)/.test(path.replace(/\\/g, '/'));
}

function walk(dir: string, currentRelPath = ''): void {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = fs.statSync(fullPath);
    const relPath = path.join(currentRelPath, entry);

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

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log("✅ package.json exports updated with", Object.keys(exportsMap).length, "entries");

// Generate package.json for CJS modules
const cjsPackageJson = {
  type: "commonjs"
};

// Generate package.json for ESM modules
const esmPackageJson = {
  type: "module"
};

// Write the package.json files
fs.writeFileSync(
  path.join(process.cwd(), 'dist', 'cjs', 'package.json'),
  JSON.stringify(cjsPackageJson, null, 2)
);

fs.writeFileSync(
  path.join(process.cwd(), 'dist', 'esm', 'package.json'),
  JSON.stringify(esmPackageJson, null, 2)
);

console.log('✅ Generated package.json files in dist folders');