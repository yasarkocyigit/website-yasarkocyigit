#!/usr/bin/env node

import fs from "fs/promises";
import path from "node:path";
import process from "node:process";

const POSTS_DIR = path.resolve(process.cwd(), "content", "posts");

async function readJsonFromMedium(url) {
  const response = await fetch(`${url}?format=json`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Medium request failed with ${response.status} ${response.statusText}`);
  }

  const raw = await response.text();
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    const snippet = raw.slice(0, 160).replace(/\s+/g, " ");
    throw new Error(`Medium returned non-JSON content (${contentType}): ${snippet}`);
  }
  const normalized = raw.replace(/^\]\)\}while\(1\);<\/x>/, "");
  return JSON.parse(normalized);
}

function sanitizeForYaml(value) {
  if (value === null || value === undefined) return "";
  const trimmed = value.trim();
  const escaped = trimmed.replace(/"/g, '\\"');
  return escaped;
}

function pad(number) {
  return number.toString().padStart(2, "0");
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  return `${year}-${month}-${day}`;
}

function chunkIntoCharacters(text) {
  return Array.from(text ?? "");
}

function applyMarkups(text, markups = []) {
  if (!markups.length) return text ?? "";

  const chars = chunkIntoCharacters(text ?? "");
  const starts = new Map();
  const ends = new Map();

  markups.forEach((markup, idx) => {
    const item = { ...markup, id: idx };
    if (!starts.has(item.start)) starts.set(item.start, []);
    if (!ends.has(item.end)) ends.set(item.end, []);
    starts.get(item.start).push(item);
    ends.get(item.end).push(item);
  });

  let result = "";
  const active = [];

  for (let i = 0; i <= chars.length; i++) {
    const closing = ends.get(i);
    if (closing) {
      closing
        .sort((a, b) => {
          if (a.start === b.start) {
            return b.end - a.end;
          }
          return b.start - a.start;
        })
        .forEach((markup) => {
          result += closeToken(markup);
          const index = active.findIndex((item) => item.id === markup.id);
          if (index !== -1) active.splice(index, 1);
        });
    }

    const opening = starts.get(i);
    if (opening) {
      opening
        .sort((a, b) => {
          if (a.end === b.end) {
            return a.start - b.start;
          }
          return b.end - a.end;
        })
        .forEach((markup) => {
          result += openToken(markup);
          active.push(markup);
        });
    }

    if (i < chars.length) {
      result += chars[i];
    }
  }

  return result;
}

function openToken(markup) {
  switch (markup.type) {
    case 1: // bold
      return "**";
    case 2: // italic
      return "*";
    case 3: // link
      return "[";
    case 9: // code span
      return "`";
    case 10: // code span (alternate)
      return "`";
    default:
      return "";
  }
}

function closeToken(markup) {
  switch (markup.type) {
    case 1:
      return "**";
    case 2:
      return "*";
    case 3:
      return `](${markup.href})`;
    case 9:
    case 10:
      return "`";
    default:
      return "";
  }
}

function renderParagraphs(paragraphs, title) {
  const lines = [];
  let inBulletList = false;
  let inOrderedList = false;
  let orderedIndex = 1;

  const flushLists = () => {
    if (inBulletList || inOrderedList) {
      lines.push("");
      inBulletList = false;
      inOrderedList = false;
      orderedIndex = 1;
    }
  };

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const text = applyMarkups(paragraph.text, paragraph.markups);
    const trimmed = text.trim();

    switch (paragraph.type) {
      case 3: {
        if (i === 0 && trimmed === title.trim()) {
          break;
        }
        flushLists();
        lines.push(`## ${trimmed}`);
        lines.push("");
        break;
      }
      case 1: {
        if (!trimmed) break;
        flushLists();
        lines.push(trimmed);
        lines.push("");
        break;
      }
      case 4: {
        flushLists();
        if (paragraph.metadata?.id) {
          const imageUrl = `https://miro.medium.com/v2/resize:fit:1400/${paragraph.metadata.id}`;
          lines.push(`![${paragraph.text ?? ""}](${imageUrl})`);
          lines.push("");
        }
        break;
      }
      case 8: {
        flushLists();
        const lang = paragraph.codeBlockMetadata?.lang ?? "";
        lines.push("```" + lang);
        lines.push(paragraph.text ?? "");
        lines.push("```");
        lines.push("");
        break;
      }
      case 9:
      case 13: {
        if (!inBulletList) {
          flushLists();
          inBulletList = true;
          lines.push(`- ${trimmed}`);
        } else {
          lines.push(`- ${trimmed}`);
        }
        break;
      }
      case 10: {
        if (!inOrderedList) {
          flushLists();
          inOrderedList = true;
          orderedIndex = 1;
        }
        lines.push(`${orderedIndex}. ${trimmed}`);
        orderedIndex += 1;
        break;
      }
      default: {
        if (!trimmed) break;
        flushLists();
        lines.push(trimmed);
        lines.push("");
      }
    }
  }

  flushLists();

  while (lines.length && lines[lines.length - 1] === "") {
    lines.pop();
  }

  return lines.join("\n");
}

async function getNextIndex() {
  const files = await fs.readdir(POSTS_DIR);
  let maxIndex = 0;

  await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const fullPath = path.join(POSTS_DIR, file);
        const handle = await fs.open(fullPath, "r");
        try {
          const content = await handle.readFile({ encoding: "utf8" });
          const match = content.match(/index:\s*(\d+)/);
          if (match) {
            const value = Number(match[1]);
            if (!Number.isNaN(value)) {
              maxIndex = Math.max(maxIndex, value);
            }
          }
        } finally {
          await handle.close();
        }
      })
  );

  return maxIndex + 1;
}

function normalizeTags(tags) {
  if (!tags?.length) return ["Data Platforms"];
  const picked = tags.slice(0, 4).map((tag) => tag.name ?? "").filter(Boolean);
  if (!picked.length) return ["Data Platforms"];
  return picked.map((tag) => {
    const cleaned = tag.trim();
    if (!cleaned) return null;
    return cleaned
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }).filter(Boolean);
}

function buildFrontMatter({ title, date, index, summary, tags }) {
  const parts = [
    "---",
    `title: "${sanitizeForYaml(title)}"`,
    `date: ${date}`,
    `index: ${index}`,
    `summary: "${sanitizeForYaml(summary)}"`,
    "tags:",
  ];

  tags.forEach((tag) => {
    parts.push(`  - ${sanitizeForYaml(tag)}`);
  });

  parts.push("draft: false", "---", "");
  return parts.join("\n");
}

async function writePostFile(slug, content) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  await fs.writeFile(filePath, content, "utf8");
  return filePath;
}

function deriveSlug(value) {
  if (value.uniqueSlug) return value.uniqueSlug.replace(/^posts\//, "");
  if (value.slug) return value.slug;
  return value.id;
}

function deriveSummary(value, body) {
  const subtitle = value.virtuals?.subtitle;
  if (subtitle) {
    return subtitle.replace(/\u2026$/, "...");
  }
  const fallback = body
    .split("\n")
    .find((line) => line.trim() && !line.startsWith("#") && !line.startsWith("- "));
  if (!fallback) return value.title;
  return fallback.length > 160 ? `${fallback.slice(0, 157)}...` : fallback;
}

function printUsage() {
  console.log("Usage: pnpm node scripts/import-medium-post.mjs <medium-url>");
}

async function main() {
  const [, , url] = process.argv;
  if (!url) {
    printUsage();
    process.exit(1);
  }

  const json = await readJsonFromMedium(url);
  const value = json.payload?.value;
  if (!value) {
    throw new Error("Unexpected response from Medium: missing payload.value");
  }

  const paragraphs = value.content?.bodyModel?.paragraphs ?? [];
  if (!paragraphs.length) {
    throw new Error("Medium article body was empty.");
  }

  const body = renderParagraphs(paragraphs, value.title ?? "");
  const index = await getNextIndex();
  const date = formatDate(value.firstPublishedAt ?? Date.now());
  const summary = deriveSummary(value, body);
  const tags = normalizeTags(value.virtuals?.tags);
  const frontMatter = buildFrontMatter({
    title: value.title ?? "Untitled",
    date,
    index,
    summary,
    tags,
  });
  const slug = deriveSlug(value);
  const postContent = `${frontMatter}${body}\n`;
  const targetPath = await writePostFile(slug, postContent);
  console.log(`Created ${path.relative(process.cwd(), targetPath)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
