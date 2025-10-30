import Link from "next/link";

export const metadata = {
  title: "About",
  description: "About Yasar Kocyigit",
};

export default function AboutPage() {
  return (
    <article className="page-offset space-y-12">
      <div className="space-y-4">
        <Link
          href="/home"
          className="mono inline-flex items-center gap-2 text-[0.65rem] tracking-[0.32em] text-muted transition hover:text-foreground"
        >
          ← BACK HOME
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight">
          The Work Should Be Clear.
        </h1>
      </div>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <p>
            I help data teams build governed, high-trust analytics platforms
            with Azure and Databricks. Over the past decade I have designed
            lakehouse architectures, scaled ingestion pipelines, and aligned
            product teams around reliable metrics that business leaders can
            defend.
          </p>
          <p>
            My focus is on combining Unity Catalog, Delta Live Tables, metadata
            automation, and Power BI story craft so that every model is both
            explainable and fast to iterate. The aim is simple: ship insight
            products that teams adopt because the path from data to decision is
            obvious.
          </p>
          <p>
            Outside of delivery work I mentor engineering squads, run workshops
            on responsible AI and semantic modeling, and publish frameworks to
            help practitioners operationalize these ideas. Recent projects
            include evolving a metadata-driven ingestion framework into an
            agentic AI pipeline that self-tunes data quality rules. If you want
            to collaborate, reach out at{" "}
            <a
              className="underline underline-offset-4"
              href="mailto:yasarkocyigit@daqconsulting.com"
            >
              yasarkocyigit@daqconsulting.com
            </a>
            .
          </p>
        </div>

        <aside className="space-y-8">
          <div className="space-y-3">
            <p className="mono text-[0.65rem] tracking-[0.32em] text-muted">
              EXPERTISE
            </p>
            <ul className="space-y-2 text-sm text-muted">
              {[
                {
                  label: "Azure",
                  detail:
                    "Landing zones, Fabric, Synapse, and governance patterns for enterprise data estates.",
                },
                {
                  label: "Databricks",
                  detail:
                    "Unity Catalog, Delta Lake automation, ML workflows, and production-ready data engineering.",
                },
                {
                  label: "AI Engineering",
                  detail:
                    "Agentic patterns, responsible ML governance, and human-in-the-loop automation for analytics workflows.",
                },
                {
                  label: "Power Platform",
                  detail:
                    "Power BI analytics, semantic models, and Power Apps/Automate integrations for decision loops.",
                },
              ].map(({ label, detail }) => (
                <li
                  key={label}
                  className="rounded-lg border border-dashed border-line bg-card/70 p-4 text-foreground"
                >
                  <p className="mono text-[0.6rem] tracking-[0.28em] text-muted">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="mono text-[0.65rem] tracking-[0.32em] text-muted">
              RECENT HIGHLIGHTS
            </p>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex gap-4">
                <span className="mono text-[0.65rem] tracking-[0.32em] text-muted">
                  [01]
                </span>
                <span className="leading-relaxed text-foreground">
                  Deployed governed Azure lakehouse for a multi-country finance
                  team with catalog-first access.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mono text-[0.65rem] tracking-[0.32em] text-muted">
                  [02]
                </span>
                <span className="leading-relaxed text-foreground">
                  Automated Databricks ML pipelines with observability and CI/CD
                  gates tuned for feature drift.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mono text-[0.65rem] tracking-[0.32em] text-muted">
                  [03]
                </span>
                <span className="leading-relaxed text-foreground">
                  Rolled out Power BI scorecards and Power Automate loops that
                  reduced executive reporting time by 45%.
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </article>
  );
}
