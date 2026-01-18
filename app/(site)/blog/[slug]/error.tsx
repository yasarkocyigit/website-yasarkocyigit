"use client";

import Link from "next/link";

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Post route error:", error);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <span className="mono text-[0.65rem] tracking-[0.32em] text-muted">
        NOTE ERROR
      </span>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
        This article failed to render.
      </h1>
      <p className="max-w-md text-muted">
        Reload to try again. If the issue persists, let me know which post and
        what you were doing so I can debug it.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="mono rounded-md border border-line bg-card px-5 py-3 text-[0.7rem] tracking-[0.32em] transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          RETRY
        </button>
        <Link
          href="/blog"
          className="mono rounded-md border border-line/70 px-5 py-3 text-[0.7rem] tracking-[0.32em] transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          BACK TO BLOG
        </Link>
      </div>
    </div>
  );
}
