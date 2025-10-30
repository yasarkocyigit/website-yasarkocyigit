#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";

const [, , rawTitle] = process.argv;

if (!rawTitle) {
  console.error("Usage: pnpm new:post \"Your Title\"");
  process.exit(1);
}

const title = rawTitle.trim();

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const contentDir = path.join(process.cwd(), "content", "posts");
const slug = slugify(title);
const targetPath = path.join(contentDir, `${slug}.mdx`);

const today = new Date().toISOString().split("T")[0];

async function getNextIndex() {
  const files = await fs.readdir(contentDir);
  let highest = 0;
  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(contentDir, file);
      const stat = await fs.stat(filePath);
      if (!stat.isFile()) return;
      const content = await fs.readFile(filePath, "utf8");
      const match = content.match(/index:\s*(\d+)/);
      if (match) {
        const value = Number.parseInt(match[1], 10);
        if (!Number.isNaN(value)) {
          highest = Math.max(highest, value);
        }
      }
    })
  );
  return highest + 1;
}

const template = (index) => `---\ntitle: "${title}"\ndate: ${today}\nindex: ${index}\nsummary: "${title} insights by Yasar Kocyigit."\ntags:\n  - Data Platforms\ndraft: true\n---\n\n`;

async function main() {
  try {
    await fs.access(targetPath);
    console.error(`A post with slug "${slug}" already exists.`);
    process.exit(1);
  } catch (error) {
    // file does not exist, continue
  }

  const nextIndex = await getNextIndex();
  const content = template(nextIndex);
  await fs.writeFile(targetPath, content, "utf8");
  console.log(`Created ${path.relative(process.cwd(), targetPath)} with index ${nextIndex}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
