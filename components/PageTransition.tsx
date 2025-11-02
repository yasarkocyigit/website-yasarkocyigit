"use client";

import { useCallback, useEffect, useRef, createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

const BLOCK_COUNT = 20;

interface PageTransitionContextValue {
  navigate: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransition");
  }
  return context;
}

export default function PageTransition({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);
  const lastRevealedPathRef = useRef(pathname);
  const currentAnimationRef = useRef<gsap.core.Tween | null>(null);

  const revealPage = useCallback(() => {
    if (blocksRef.current.length === 0) return;

    // Prevent overlapping animations
    if (currentAnimationRef.current) {
      currentAnimationRef.current.kill();
      currentAnimationRef.current = null;
    }

    const rootStyles = getComputedStyle(document.documentElement);
    const bgValue = rootStyles.getPropertyValue("--bg").trim() || "transparent";
    if (overlayRef.current) {
      overlayRef.current.style.background = bgValue;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[PageTransition] reveal start");
    }

    gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });

    currentAnimationRef.current = gsap.to(blocksRef.current, {
      scaleX: 0,
      duration: 0.45,
      stagger: 0.024,
      ease: "power2.out",
      transformOrigin: "right",
      onComplete: () => {
        isTransitioning.current = false;
        currentAnimationRef.current = null;
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
          overlayRef.current.style.background = "transparent";
        }
        if (process.env.NODE_ENV === "development") {
          console.log("[PageTransition] reveal complete");
        }
      },
    });
  }, []);

  const coverPage = useCallback(
    (pushHref: string) => {
      if (!overlayRef.current) return;

      // Prevent overlapping animations
      if (currentAnimationRef.current) {
        currentAnimationRef.current.kill();
        currentAnimationRef.current = null;
      }

      overlayRef.current.style.pointerEvents = "auto";

      const rootStyles = getComputedStyle(document.documentElement);
      const bgValue = rootStyles.getPropertyValue("--bg").trim() || "transparent";
      overlayRef.current.style.background = bgValue;

      if (process.env.NODE_ENV === "development") {
        console.log("[PageTransition] cover start", pushHref);
      }

      // Close transition only
      currentAnimationRef.current = gsap.to(blocksRef.current, {
        scaleX: 1,
        duration: 0.45,
        stagger: 0.024,
        transformOrigin: "left",
        ease: "power2.out",
        onComplete: () => {
          currentAnimationRef.current = null;
          if (process.env.NODE_ENV === "development") {
            console.log("[PageTransition] cover complete, pushing", pushHref);
          }
          // Navigate when screen is fully covered
          router.push(pushHref as Route);
          // Open transition will happen automatically via revealPage on pathname change
          // isTransitioning will be reset in revealPage's onComplete
        },
      });
    },
    [router]
  );

  const handleRouteChange = useCallback(
    (pushHref: string) => {
      if (isTransitioning.current) {
        if (process.env.NODE_ENV === "development") {
          console.log("[PageTransition] BLOCKED - already transitioning", pushHref);
        }
        return;
      }
      isTransitioning.current = true;
      if (process.env.NODE_ENV === "development") {
        console.log("[PageTransition] handleRouteChange ->", pushHref);
      }
      coverPage(pushHref);
    },
    [coverPage]
  );

  // Public API for programmatic navigation with transition
  const navigate = useCallback(
    (href: string) => {
      if (isTransitioning.current) return;
      if (process.env.NODE_ENV === "development") {
        console.log("[PageTransition] navigate ->", href);
      }
      handleRouteChange(href);
    },
    [handleRouteChange]
  );

  const handleAnchorClick = useCallback(
    (event: MouseEvent) => {
      const anchor = event.currentTarget as HTMLAnchorElement | null;
      if (!anchor) return;

      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0 ||
        anchor.target === "_blank" ||
        anchor.getAttribute("download") !== null ||
        anchor.getAttribute("rel")?.includes("external") ||
        anchor.dataset.transition === "false"
      ) {
        return;
      }

      const pushHref = `${anchor.pathname}${anchor.search}${anchor.hash}`;
      if (pushHref === pathname) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      anchor.blur();
      if (process.env.NODE_ENV === "development") {
        console.log("[PageTransition] anchor click ->", pushHref);
      }
      handleRouteChange(pushHref);
    },
    [handleRouteChange, pathname]
  );

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (blocksRef.current.length === 0) {
      for (let i = 0; i < BLOCK_COUNT; i += 1) {
        const block = document.createElement("div");
        block.className = "transition-block";
        overlay.appendChild(block);
        blocksRef.current.push(block);
      }
    }

    // Set initial state without animation
    gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });
  }, []);

  useEffect(() => {
    const anchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("#__next a[href^='/']")
    );

    const listenerOptions: AddEventListenerOptions = { capture: true };
    anchors.forEach((anchor) =>
      anchor.addEventListener("click", handleAnchorClick, listenerOptions)
    );

    return () => {
      anchors.forEach((anchor) =>
        anchor.removeEventListener("click", handleAnchorClick, listenerOptions)
      );
    };
  }, [handleAnchorClick, pathname]);

  useEffect(() => {
    // Skip if pathname hasn't changed
    if (lastRevealedPathRef.current === pathname) {
      if (process.env.NODE_ENV === "development") {
        console.log("[PageTransition] skip reveal - same pathname", pathname);
      }
      return;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[PageTransition] trigger reveal", pathname);
    }
    lastRevealedPathRef.current = pathname;
    revealPage();
  }, [pathname, revealPage]);

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      <div ref={overlayRef} className="transition-overlay" />
      {children}
    </PageTransitionContext.Provider>
  );
}
