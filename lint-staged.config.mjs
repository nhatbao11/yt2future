function fePaths(files) {
  return files.join(' ');
}

function bePaths(files) {
  return files.join(' ');
}

export default {
  'yt2future-f2-v2/**/*.{ts,tsx,mjs,js,json,css,md}': 'prettier --write',
  'yt2future-be-v2/**/*.{ts,tsx,js,json,md}': 'prettier --write',
  '*.{json,md,yml,yaml}': 'prettier --write',
  '.github/**/*.{yml,yaml}': 'prettier --write',
  '.vscode/*.json': 'prettier --write',
  'yt2future-f2-v2/**/*.{ts,tsx,mjs}': (files) =>
    files.length ? `npm --prefix yt2future-f2-v2 run lint -- --fix ${fePaths(files)}` : [],
  'yt2future-be-v2/**/*.{ts,tsx}': (files) =>
    files.length ? `npm --prefix yt2future-be-v2 run lint -- --fix ${bePaths(files)}` : [],
};
