const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
// Publish only browser assets, never local tools or repository configuration.
const files = [
  'index.html',
  'style.css',
  'app.js',
  'visuals.js',
  'animations.js',
  'favicon.svg',
];
for (const file of files) {
  if (!fs.statSync(path.join(root, file)).isFile()) {
    throw new Error(`Missing site asset: ${file}`);
  }
}
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}
fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log(`Static site ready in dist/ (${files.length} assets).`);
