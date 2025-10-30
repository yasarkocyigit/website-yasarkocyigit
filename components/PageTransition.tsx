"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

const BLOCK_COUNT = 20;

export default function PageTransition({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const signatureOverlayRef = useRef<HTMLDivElement | null>(null);
  const signatureTextRef = useRef<HTMLSpanElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);
  const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMountedRef = useRef(false);

  const resetSignature = useCallback(() => {
    const text = signatureTextRef.current;
    if (!text) return;
    gsap.set(text, { opacity: 0, y: 28 });
  }, []);

  const revealPage = useCallback(() => {
    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
    }

    if (blocksRef.current.length === 0) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const bgValue = rootStyles.getPropertyValue("--bg").trim() || "transparent";
    if (overlayRef.current) {
      overlayRef.current.style.background = bgValue;
    }

    resetSignature();

    gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });

    gsap.to(blocksRef.current, {
      scaleX: 0,
      duration: 0.45,
      stagger: 0.024,
      ease: "power2.out",
      transformOrigin: "right",
      onComplete: () => {
        isTransitioning.current = false;
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
          overlayRef.current.style.background = "transparent";
        }
        if (signatureOverlayRef.current) {
          signatureOverlayRef.current.style.pointerEvents = "none";
        }
      },
    });

    revealTimeoutRef.current = setTimeout(() => {
      const first = blocksRef.current[0];
      if (first && (gsap.getProperty(first, "scaleX") as number) > 0.01) {
        gsap.to(blocksRef.current, {
          scaleX: 0,
          duration: 0.2,
          ease: "power2.out",
          transformOrigin: "right",
          onComplete: () => {
            isTransitioning.current = false;
            if (overlayRef.current) {
              overlayRef.current.style.pointerEvents = "none";
              overlayRef.current.style.background = "transparent";
            }
            if (signatureOverlayRef.current) {
              signatureOverlayRef.current.style.pointerEvents = "none";
            }
          },
        });
      }
    }, 900);
  }, [resetSignature]);

  const coverPage = useCallback(
    (pushHref: string) => {
      if (!overlayRef.current || !signatureOverlayRef.current) return;

      overlayRef.current.style.pointerEvents = "auto";
      signatureOverlayRef.current.style.pointerEvents = "auto";

      const rootStyles = getComputedStyle(document.documentElement);
      const bgValue = rootStyles.getPropertyValue("--bg").trim() || "transparent";
      overlayRef.current.style.background = bgValue;

      resetSignature();

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          router.push(pushHref as Route);
        },
      });

      timeline
        .to(blocksRef.current, {
          scaleX: 1,
          duration: 0.45,
          stagger: 0.024,
          transformOrigin: "left",
        })
        .set(signatureOverlayRef.current, { opacity: 1 }, "-=0.18");

      const textElement = signatureTextRef.current;
      if (textElement) {
        timeline
          .fromTo(
            textElement,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
            "-=0.18"
          )
          .to(textElement, {
            opacity: 1,
            duration: 0.75,
            ease: "power1.inOut",
          })
          .to(textElement, {
            opacity: 0,
            y: -18,
            duration: 0.55,
            ease: "power2.in",
          });
      }

      timeline.to(signatureOverlayRef.current, {
        opacity: 0,
        duration: 0.28,
      });
    },
    [resetSignature, router]
  );

  const handleRouteChange = useCallback(
    (pushHref: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(pushHref);
    },
    [coverPage]
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

    gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });
    resetSignature();

    requestAnimationFrame(() => {
      revealPage();
      hasMountedRef.current = true;
    });
  }, [resetSignature, revealPage]);

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
    if (!hasMountedRef.current) return;
    revealPage();
  }, [pathname, revealPage]);

  return (
    <>
      <div ref={overlayRef} className="transition-overlay" />
      <div ref={signatureOverlayRef} className="transition-logo">
        <span ref={signatureTextRef} className="transition-signature">
          YASAR KOCYIGIT
        </span>
      </div>
      {children}
    </>
  );
}
