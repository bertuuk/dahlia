// tools/update-version.js
// Updates the version number in every file that carries it, and adds an empty
// CHANGELOG entry if there isn't one. It does NOT commit, tag or push:
// git flow does that when you finish the release.
//
// Usage: npm run update-version -- 1.2.3

const fs = require("fs");
const path = require("path");

const version = process.argv[2];
if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error("❌ Give a version like 1.2.3. Example: npm run update-version -- 1.2.3");
  process.exit(1);
}

const root = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(root, f), c);
const exists = (f) => fs.existsSync(path.join(root, f));

const textFiles = [
  { file: "style.css", pattern: /^Version:\s*[0-9.]+/m, replace: `Version: ${version}` },
  { file: "readme.txt", pattern: /^Stable tag:\s*[0-9.]+/m, replace: `Stable tag: ${version}` },
  { file: "README.md", pattern: /Stable version:\s*[0-9.]+/, replace: `Stable version: ${version}` },
];

textFiles.forEach(({ file, pattern, replace }) => {
  if (!exists(file)) return;
  write(file, read(file).replace(pattern, replace));
  console.log(`✅ ${file}`);
});

["package.json", "package-lock.json"].forEach((file) => {
  if (!exists(file)) return;
  const json = JSON.parse(read(file));
  json.version = version;
  if (json.packages && json.packages[""]) json.packages[""].version = version;
  write(file, JSON.stringify(json, null, 2) + "\n");
  console.log(`✅ ${file}`);
});

if (exists("CHANGELOG.md")) {
  const changelog = read("CHANGELOG.md");
  if (!changelog.includes(`## [${version}]`)) {
    const today = new Date().toISOString().slice(0, 10);
    const entry = `## [${version}] - ${today}\n\n- \n\n`;
    const at = changelog.search(/^## \[/m);
    write("CHANGELOG.md", at === -1 ? `${changelog.trimEnd()}\n\n${entry}` : changelog.slice(0, at) + entry + changelog.slice(at));
    console.log(`✅ CHANGELOG.md: empty entry added for ${version}. Fill it in before finishing the release.`);
  }
}

console.log(`\n🎉 Version ${version}. Now: write the CHANGELOG entry, commit, and finish the release.`);
