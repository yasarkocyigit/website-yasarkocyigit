export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="mono space-y-4 text-center">
        <span className="block text-[0.65rem] tracking-[0.32em] text-muted">
          LOADING
        </span>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/60 [animation-delay:120ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/40 [animation-delay:240ms]" />
        </div>
      </div>
    </div>
  );
}
