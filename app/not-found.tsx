import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center">
      <span className="mono text-[0.65rem] tracking-[0.32em] text-muted">NOT FOUND</span>
      <h1 className="text-4xl font-extrabold tracking-tight">The page you were looking for moved on.</h1>
      <p className="max-w-md text-muted">
        The URL may be outdated or the note is no longer public. Start from the latest work to get back on track.
      </p>
      <Link
        href="/"
        className="mono rounded-lg border border-line bg-card px-6 py-3 text-[0.7rem] tracking-[0.32em] transition hover:-translate-y-0.5 hover:shadow-lift"
      >
        RETURN HOME
      </Link>
    </div>
  );
}
