import { allPosts } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";

const POSTS_SORTED = [...allPosts]
  .filter((post) => !post.draft)
  .sort((a, b) => {
    if (b.index === a.index) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.index - a.index;
  });

export function getAllPosts(): Post[] {
  return POSTS_SORTED;
}

export function getTopPosts(limit: number): Post[] {
  return POSTS_SORTED.slice(0, limit);
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS_SORTED.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const position = POSTS_SORTED.findIndex((post) => post.slug === slug);
  if (position === -1) {
    return { newer: undefined, older: undefined };
  }
  const newer = position > 0 ? POSTS_SORTED[position - 1] : undefined;
  const older = position < POSTS_SORTED.length - 1 ? POSTS_SORTED[position + 1] : undefined;
  return { newer, older };
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function calculateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return minutes;
}
