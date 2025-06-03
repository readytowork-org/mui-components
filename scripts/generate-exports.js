// scripts/generate-exports.js
import fs from 'fs';
import path from 'path';

const distDir = './dist';
const pkgPath = './package.json';

function toPosix(p) {
    return p.split(path.sep).join('/');
}

function getExportsMap() {
    const exports = {};

    function walk(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.js')) {
                const relPath = path.relative(distDir, fullPath);
                const subpath = './' + toPosix(relPath.replace(/\.js$/, ''));
                exports[subpath] = {
                    import: './dist/' + toPosix(relPath),
                    types: './dist/' + toPosix(relPath.replace(/\.js$/, '.d.ts')),
                };
            }
        }
    }

    walk(distDir);
    return exports;
}

function updatePackageJson() {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const generatedExports = getExportsMap();

    pkg.exports = {
        ...pkg.exports, // preserve existing exports if any
        ...generatedExports,
    };

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log('✅ package.json exports field updated.');
}

updatePackageJson();
