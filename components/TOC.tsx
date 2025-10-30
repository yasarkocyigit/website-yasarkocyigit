"use client";

import { useEffect, useState } from "react";

export interface TOCHeading {
  level: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden text-sm text-muted lg:block">
      <div className="sticky top-32">
        <p className="mono text-[0.6rem] tracking-[0.32em] text-muted">ON THIS PAGE</p>
        <nav className="mt-4 space-y-2">
          {headings.map((heading) => (
            <a
              key={heading.slug}
              href={`#${heading.slug}`}
              className="toc-link"
              data-active={active === heading.slug}
              data-level={heading.level}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
