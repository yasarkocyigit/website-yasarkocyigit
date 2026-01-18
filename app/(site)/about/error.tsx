"use client";

import Link from "next/link";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("About route error:", error);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <span className="mono text-[0.65rem] tracking-[0.32em] text-muted">
        ABOUT ERROR
      </span>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
        The profile page failed to load.
      </h1>
      <p className="max-w-md text-muted">
        Reload to give it another shot, or head back to the home feed while I
        investigate.
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
          href="/home"
          className="mono rounded-md border border-line/70 px-5 py-3 text-[0.7rem] tracking-[0.32em] transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
