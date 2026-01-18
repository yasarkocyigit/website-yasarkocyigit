export const metadata = {
  title: "Manifesto",
  description: "Principles that guide Yasar Kocyigit's work.",
};

const principles = [
  {
    title: "Governance is a product",
    detail:
      "Treat data policy, cataloging, and lineage as features users experience, not paperwork behind the scenes.",
  },
  {
    title: "Metrics must narrate decisions",
    detail:
      "Every dashboard should answer who needs this, what action they take, and how we measure impact.",
  },
  {
    title: "Metadata is the operating system",
    detail:
      "Schema contracts, change feeds, and control tables keep ingestion predictable and auditable.",
  },
  {
    title: "Teaching scales platforms",
    detail:
      "Teams adopt new platforms when enablement is built in, through walkthroughs, reusable templates, and well-told stories.",
  },
];

export default function ManifestoPage() {
  return (
    <section className="page-offset space-y-10">
      <header className="space-y-3">
        <p className="mono text-[0.65rem] tracking-[0.32em] text-muted">MANIFESTO</p>
        <h1 className="text-4xl font-extrabold tracking-tight">Make the work legible.</h1>
        <p className="max-w-2xl text-muted">
          A working set of principles I use to evaluate platforms, teams, and projects. This list evolves as I learn.
        </p>
      </header>
      <ol className="space-y-6">
        {principles.map((principle, index) => (
          <li
            key={principle.title}
            className="grid gap-4 rounded-xl border border-line bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-lift lg:grid-cols-[90px_1fr]"
          >
            <span className="mono text-[0.65rem] tracking-[0.32em] text-muted">
              [{(index + 1).toString().padStart(2, "0")}]
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">{principle.title}</h2>
              <p className="text-muted">{principle.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
