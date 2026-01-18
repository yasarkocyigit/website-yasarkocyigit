"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
        <div className="space-y-6 text-center">
          <span className="mono text-[0.65rem] tracking-[0.32em] text-muted">
            GLOBAL ERROR
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Something went wrong while rendering the app shell.
          </h1>
          <p className="max-w-md text-muted">
            The runtime crashed unexpectedly. We logged the issue with the
            digest {error.digest ?? "N/A"} so it can be investigated.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mono rounded-md border border-line bg-card px-5 py-3 text-[0.7rem] tracking-[0.32em] transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            TRY AGAIN
          </button>
        </div>
      </body>
    </html>
  );
}
