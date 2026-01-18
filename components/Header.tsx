"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

export const NAVBAR_HEIGHT = 88;

const NAV_ITEMS: Array<{ label: string; href: Route; description: string }> = [
  { label: "HOME", href: "/home", description: "Data & AI Engineer" },
  { label: "INTRO", href: "/intro", description: "Origin story & principles" },
  { label: "ABOUT", href: "/about", description: "Experience & expertise" },
  { label: "BLOG", href: "/blog", description: "Latest notes & frameworks" },
];

const BODY_LOCK_CLASS = "mobile-nav-open";
const MOBILE_NAV_ID = "mobile-navigation-panel";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [closeMenu, pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    const body = document.body;
    if (isMenuOpen) {
      body.classList.add(BODY_LOCK_CLASS);
    } else {
      body.classList.remove(BODY_LOCK_CLASS);
    }
    return () => {
      body.classList.remove(BODY_LOCK_CLASS);
    };
  }, [isMenuOpen]);

  // Handle keyboard and resize events
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [closeMenu, isMenuOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[100] h-16 bg-background/80 backdrop-blur-md border-b border-line md:h-[88px]"
        style={{ WebkitBackdropFilter: "blur(16px)" }}
      >
        <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/home"
            className="flex items-center gap-3 font-semibold transition-transform hover:scale-105 active:scale-95"
            onClick={closeMenu}
          >
            <span className="relative h-5 w-5 shrink-0 sm:h-6 sm:w-6">
              <Image
                src="/logo.png"
                alt="Yasar Kocyigit logo"
                fill
                sizes="24px"
                className="h-full w-full object-contain invert dark:invert-0"
                priority
              />
            </span>
            <span className="text-base font-semibold tracking-tight sm:text-lg">Yasar Kocyigit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-5 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-muted">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="mono transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle className="h-9 w-9" />
            <button
              type="button"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-card transition-all hover:bg-muted/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              aria-controls={MOBILE_NAV_ID}
              onClick={toggleMenu}
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-transform" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 transition-transform" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm md:hidden animate-fade-in"
            aria-hidden="true"
            onClick={closeMenu}
          />

          {/* Mobile Menu Panel */}
          <aside
            id={MOBILE_NAV_ID}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            className="fixed right-0 top-0 bottom-0 z-[300] w-[85vw] max-w-sm flex flex-col bg-background border-l border-line shadow-2xl md:hidden animate-slide-in-from-right"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Link
                href="/home"
                onClick={closeMenu}
                className="flex items-center gap-3 font-semibold transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative h-6 w-6 shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Yasar Kocyigit logo"
                    fill
                    sizes="24px"
                    className="h-full w-full object-contain invert dark:invert-0"
                    priority
                  />
                </span>
                <span className="text-sm font-semibold tracking-tight">Yasar Kocyigit</span>
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-card transition-all hover:bg-muted/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <h2 id="mobile-navigation-title" className="sr-only">
                Main Navigation
              </h2>
              <ul className="space-y-2">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <li
                      key={item.href}
                      className="opacity-0 animate-fade-in"
                      style={{
                        animationDelay: `${index * 75}ms`,
                        animationFillMode: "forwards"
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={cn(
                          "group block rounded-xl px-4 py-4 transition-all duration-200",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          isActive
                            ? "bg-foreground text-background shadow-md"
                            : "bg-card hover:bg-muted/20 border border-line hover:border-foreground/20 hover:shadow-sm active:scale-[0.98]"
                        )}
                      >
                        <span
                          className={cn(
                            "block font-mono text-[0.65rem] font-medium uppercase tracking-wider",
                            isActive ? "text-background/80" : "text-muted"
                          )}
                        >
                          {isActive ? "● Active" : "Navigate"}
                        </span>
                        <span className="mt-2 block text-2xl font-bold tracking-tight">
                          {item.label}
                        </span>
                        <span
                          className={cn(
                            "mt-1.5 block text-xs tracking-wide",
                            isActive ? "text-background/70" : "text-muted group-hover:text-foreground/80"
                          )}
                        >
                          {item.description}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-line px-5 py-5 bg-muted/5">
              <p className="font-mono text-[0.65rem] font-medium uppercase tracking-wider text-muted">
                Stay in touch
              </p>
              <a
                href="mailto:yasarkocyigit@daqconsulting.com"
                className="mt-2 inline-block text-sm text-foreground underline-offset-4 transition-all hover:underline hover:text-foreground/80 active:scale-95"
              >
                yasarkocyigit@daqconsulting.com
              </a>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
