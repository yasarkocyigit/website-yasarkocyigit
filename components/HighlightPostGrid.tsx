"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Post } from "contentlayer/generated";
import { formatDate } from "@/lib/posts";

interface HighlightPostGridProps {
  posts: Post[];
}

const HIGHLIGHT_COLORS = [
  "rgba(226, 78, 27, 0.18)",
  "rgba(67, 129, 193, 0.18)",
  "rgba(247, 152, 36, 0.18)",
  "rgba(4, 167, 119, 0.18)",
  "rgba(91, 140, 90, 0.18)",
  "rgba(33, 118, 255, 0.18)",
  "rgba(129, 141, 146, 0.18)",
  "rgba(34, 170, 161, 0.18)",
];

export default function HighlightPostGrid({ posts }: HighlightPostGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);

  const rows = (() => {
    if (posts.length <= 3) {
      return [posts];
    }
    const firstRowCount = Math.min(3, posts.length);
    return [posts.slice(0, firstRowCount), posts.slice(firstRowCount)];
  })();

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;
    if (!container || !highlight) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const cards = Array.from(
      container.querySelectorAll<HTMLAnchorElement>("[data-grid-card]")
    );

    cards.forEach((card, index) => {
      card.dataset.highlightColor = HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length];
    });

    if (prefersReducedMotion || !finePointer || cards.length === 0) {
      highlight.style.display = "none";
      return;
    }

    let active = cards[0];

    const positionHighlight = (card: HTMLAnchorElement) => {
      if (!container || !highlight) return;
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const isDark = document.documentElement.classList.contains("dark");
      const baseColor = card.dataset.highlightColor ?? "rgba(10, 10, 10, 0.12)";
      const tint = (() => {
        const match = baseColor.match(
          /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)/
        );
        if (!match) return baseColor;
        const [, r, g, b, a] = match;
        const alpha = isDark
          ? Math.min(parseFloat(a) + 0.08, 0.36)
          : parseFloat(a);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      })();

      highlight.style.transform = `translate(${cardRect.left - containerRect.left}px, ${
        cardRect.top - containerRect.top
      }px)`;
      highlight.style.width = `${cardRect.width}px`;
      highlight.style.height = `${cardRect.height}px`;
      highlight.style.opacity = "1";
      highlight.style.backgroundColor = tint;
      highlight.style.borderColor = isDark
        ? "rgba(245, 245, 245, 0.25)"
        : "rgba(10, 10, 10, 0.15)";
      active = card;
    };

    positionHighlight(active);

    const handlePointerMove = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        "[data-grid-card]"
      );
      if (target && target !== active) {
        positionHighlight(target);
      }
    };

    const handleMouseLeave = () => {
      if (highlight) {
        highlight.style.opacity = "0";
      }
    };

    const handleResize = () => {
      if (active) {
        positionHighlight(active);
      }
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [posts.length]);

  return (
    <div className="highlight-grid" ref={containerRef}>
      <div className="highlight-grid__highlight" ref={highlightRef} />
      <div className="highlight-grid__rows">
        {rows.map((rowPosts, rowIndex) => (
          <div className="highlight-grid__row" key={`row-${rowIndex}`}>
            {rowPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-grid-card
                className="highlight-grid__card"
              >
                <span className="mono text-[0.65rem] tracking-[0.32em] text-muted">
                  {`[${String(post.index).padStart(2, "0")}]`}
                </span>
                <div className="highlight-grid__title">
                  <h2 className="text-[clamp(1.1rem,2vw,1.9rem)] font-extrabold leading-tight tracking-tight text-foreground">
                    {post.title}
                  </h2>
                  <span className="mono text-[0.6rem] tracking-[0.28em] text-muted">
                    {formatDate(post.date)}
                  </span>
                </div>
                <p className="highlight-grid__summary text-sm text-muted">
                  {post.summary}
                </p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
