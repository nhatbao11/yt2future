function fePaths(files) {
  return files.map((f) => f.replace(/^yt2future-f2-v2\//, '')).join(' ');
}

function bePaths(files) {
  return files.map((f) => f.replace(/^yt2future-be-v2\//, '')).join(' ');
}

export default {
  'yt2future-f2-v2/**/*.{ts,tsx,mjs,js,json,css,md}': 'prettier --write',
  'yt2future-be-v2/**/*.{ts,tsx,js,json,md}': 'prettier --write',
  '*.{json,md,yml,yaml}': 'prettier --write',
  '.github/**/*.{yml,yaml}': 'prettier --write',
  '.vscode/*.json': 'prettier --write',
  'yt2future-f2-v2/**/*.{ts,tsx,mjs}': (files) =>
    files.length ? `cd yt2future-f2-v2 && npx eslint --fix ${fePaths(files)}` : [],
  'yt2future-be-v2/**/*.{ts,tsx}': (files) =>
    files.length ? `cd yt2future-be-v2 && npx eslint --fix ${bePaths(files)}` : [],
};
