"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <span className="mono text-[0.65rem] tracking-[0.32em] text-muted">
        SOMETHING BROKE
      </span>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
        The page ran into an unexpected issue.
      </h1>
      <p className="max-w-md text-muted">
        Try reloading the view. If the problem keeps happening feel free to
        reach out with a short description of what you were doing.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mono rounded-md border border-line bg-card px-5 py-3 text-[0.7rem] tracking-[0.32em] transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        RETRY
      </button>
    </div>
  );
}
