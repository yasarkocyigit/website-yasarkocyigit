/*
To temporarily gate the site behind the intro screen, you can replace this
entire file with:

import { redirect } from "next/navigation";

export default function Page() {
  redirect("/intro");
}

Keep a copy of the original implementation below so you can restore it easily
once the intro gate is no longer needed.
*/

import Link from "next/link";
import Ticker from "@/components/Ticker";
import HighlightPostGrid from "@/components/HighlightPostGrid";
import { getTopPosts } from "@/lib/posts";

export const revalidate = 3600;

export default function HomePage() {
  const posts = getTopPosts(6);
  const focusItems = [
    {
      code: "[01]",
      text: "Design Azure lakehouses with governance, observability, and cost discipline baked in.",
    },
    {
      code: "[02]",
      text: "Operationalize Databricks notebooks, jobs, and Unity Catalog so ML and BI stay in sync.",
    },
    {
      code: "[03]",
      text: "Ship Power BI experiences that surface the signal for executives without drowning teams in noise.",
    },
  ];

  const NAVBAR_OFFSET = 88;

  return (
    <div>
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-dashed border-line">
        <div className="relative isolate flex w-full items-center" style={{ minHeight: "100dvh" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/60 to-background/25 dark:from-neutral-950/90 dark:via-neutral-950/60 dark:to-neutral-950/35" />
          <div
            className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center gap-12 px-6 sm:px-10"
            style={{
              minHeight: "100dvh",
              paddingTop: `calc(${NAVBAR_OFFSET}px + env(safe-area-inset-top, 0px))`,
            }}
          >
            <div className="space-y-10">
              <Ticker />
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                <div className="space-y-6">
                  <p className="mono inline-flex items-center gap-2 text-[0.65rem] tracking-[0.32em] text-muted">
                    DATA & AI ENGINEER
                  </p>
                  <div className="space-y-4">
                    <h1 className="text-[clamp(2.4rem,4vw,3.6rem)] font-extrabold leading-tight tracking-tight text-foreground">
                      Precision data platforms that make intelligent decisions feel calm.
                    </h1>
                    <p className="max-w-xl text-lg text-muted">
                      I partner with data leaders to architect Azure-native analytics, automate Databricks delivery,
                      and shape Power BI products that stay explainable as AI scales. Every layer is designed for clarity,
                      governance, and teams that move quickly.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-muted md:flex-row md:items-center md:gap-6">
                    <span className="mono text-[0.6rem] tracking-[0.28em] text-muted">
                      ACTIVE STACK
                    </span>
                    <span className="text-foreground">Azure · Databricks · Power BI · Fabric</span>
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="mono text-[0.65rem] tracking-[0.32em] text-muted">
                    ENGAGEMENT NOTES
                  </p>
                  <ul className="space-y-3 text-sm text-muted">
                    {focusItems.map((item) => (
                      <li
                        key={item.code}
                        className="flex gap-4 border-b border-dashed border-line/60 pb-3 last:border-none last:pb-0"
                      >
                        <span className="mono text-[0.65rem] tracking-[0.32em] text-muted">
                          {item.code}
                        </span>
                        <span className="leading-relaxed text-foreground">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mono text-[0.65rem] tracking-[0.32em] text-muted">
                    Collaborations open →{" "}
                    <a
                      className="underline underline-offset-4 transition hover:text-foreground"
                      href="mailto:yasarkocyigit@daqconsulting.com"
                    >
                      yasarkocyigit@daqconsulting.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8 px-6 pb-16 pt-16 sm:px-0">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Latest posts
          </h1>
          <Link
            href="/blog"
            className="mono text-[0.65rem] tracking-[0.32em] text-muted transition hover:text-foreground"
          >
            VIEW ALL
          </Link>
        </div>
        <HighlightPostGrid posts={posts} />
      </section>
    </div>
  );
}
