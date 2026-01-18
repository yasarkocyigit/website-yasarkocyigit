"use client";

import { useMemo, useState } from "react";
import type { Post } from "contentlayer/generated";
import PostRow from "@/components/PostRow";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 20;

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const visible = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return posts.slice(start, end);
  }, [page, posts]);

  return (
    <div className="space-y-10">
      <ul className="divide-y divide-dashed divide-line">
        {visible.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </ul>
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-3" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              className={cn(
                "mono flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-card text-[0.7rem] tracking-[0.32em] transition",
                page === number
                  ? "bg-foreground text-background"
                  : "hover:-translate-y-0.5 hover:shadow-lift"
              )}
              aria-current={page === number ? "page" : undefined}
            >
              {number.toString().padStart(2, "0")}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
