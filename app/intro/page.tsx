"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TypingLines from "@/components/intro/TypingLines";
import EnterButton from "@/components/intro/EnterButton";
import { inter, plexMono } from "../fonts";

const lines = [
  "Data engineer delivering governed Azure lakehouses,",
  "AI engineer shaping intelligent automation for analytics,",
  "Full-stack insight from Databricks orchestration to Power BI craft,",
  "Clarity-led execution for every decision maker.",
];

export default function IntroPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const exitTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    try {
      router.prefetch("/home");
    } catch (err) {
      console.warn("Prefetch for /home failed (non-critical):", err);
    }
  }, [router]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("intro-dark");
    return () => {
      root.classList.remove("intro-dark");
    };
  }, []);

  const handleActivate = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    exitTimeout.current = setTimeout(() => {
      if (transitionLinkRef.current) {
        transitionLinkRef.current.click();
      } else {
        router.push("/home");
      }
    }, 150);
  }, [isExiting, router]);

  useEffect(() => {
    return () => {
      if (exitTimeout.current) {
        clearTimeout(exitTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleActivate();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleActivate]);

  const fadeClass = `intro-fade ${
    isVisible && !isExiting ? "intro-fade-in" : ""
  } ${isExiting ? "intro-fade-out" : ""}`.trim();

  return (
    <main
      className={`${inter.variable} ${plexMono.variable} ${fadeClass} relative min-h-screen w-full overflow-hidden bg-background text-foreground`}
      style={{ minHeight: "100dvh" }}
    >
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="/hero-video.mov"
        autoPlay
        muted
        loop
        playsInline
        poster="/og-default.png"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-neutral-950/70 mix-blend-multiply dark:bg-neutral-950/75" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/45 to-background/20 dark:from-neutral-950/85 dark:via-neutral-950/55 dark:to-neutral-950/35" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-20 md:w-2/3 md:px-16 md:pt-24 lg:w-1/2">
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-1">
            <span className="block text-lg font-medium tracking-[0.32em] text-muted md:text-xl">
              Yasar
            </span>
            <span className="block text-5xl font-extrabold tracking-tight md:text-6xl">
              Kocyigit.
            </span>
          </div>

          <div className="mt-10 md:mt-12">
            <TypingLines
              lines={lines}
              className="measure text-zinc-800 dark:text-zinc-200"
            />
          </div>
        </div>
      </div>

      <EnterButton onActivate={handleActivate} disabled={isExiting} />
      <a ref={transitionLinkRef} href="/home" tabIndex={-1} aria-hidden="true" hidden>
        Home
      </a>
    </main>
  );
}
