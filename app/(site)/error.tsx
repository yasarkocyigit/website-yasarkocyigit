"use client";

import { useEffect } from "react";

export default function SiteError({
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
        PAGE ERROR
      </span>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
        Something went off track while loading this view.
      </h1>
      <p className="max-w-md text-muted">
        We logged the failure so it can be reviewed. Try refreshing the page or
        return to the homepage.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="mono rounded-md border border-line bg-card px-5 py-3 text-[0.7rem] tracking-[0.32em] transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          RETRY
        </button>
        <a
          href="/home"
          className="mono rounded-md border border-line/70 px-5 py-3 text-[0.7rem] tracking-[0.32em] transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          GO HOME
        </a>
      </div>
    </div>
  );
}
