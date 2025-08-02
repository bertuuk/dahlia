// scripts/update-version.js

const fs = require("fs");
const path = require("path");

const version = process.argv[2];

if (!version) {
  console.error("❌ Please provide a version. Example: node scripts/update-version.js 1.2.3");
  process.exit(1);
}

const filesToUpdate = [
  {
    file: "style.css",
    pattern: /Version:\s*[0-9.]+/,
    replace: `Version: ${version}`,
  },
  {
    file: "readme.txt",
    pattern: /Stable tag:\s*[0-9.]+/,
    replace: `Stable tag: ${version}`,
  },
  {
    file: "README.md",
    pattern: /Stable version:\s*[0-9.]+/,
    replace: `Stable version: ${version}`,
  }
];

filesToUpdate.forEach(({ file, pattern, replace }) => {
  const fullPath = path.join(__dirname, "..", file);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ File not found: ${file}`);
    return;
  }

  const content = fs.readFileSync(fullPath, "utf8");
  const updated = content.replace(pattern, replace);

  fs.writeFileSync(fullPath, updated);
  console.log(`✅ Updated version in ${file}`);
});

console.log(`\n🎉 Version updated to ${version}`);

const { execSync } = require("child_process");

try {
  execSync(`git add .`);
  execSync(`git commit -m "Update files to v${version}"`);
  execSync(`git push`);
  execSync(`git push --tags`);
  console.log(`🚀 Git commit + tag pushed: v${version}`);
} catch (err) {
  console.error("❌ Git commands failed:", err.message);
}