import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import type { Route } from "next";

export const NAVBAR_HEIGHT = 88;

const NAV_ITEMS: Array<{ label: string; href: Route }> = [
  { label: "HOME", href: "/home" },
  { label: "INTRO", href: "/intro" },
  { label: "ABOUT", href: "/about" },
  { label: "BLOG", href: "/blog" },
];

export default function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-[1000] h-[88px] bg-transparent backdrop-blur-sm"
      style={{ WebkitBackdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/home"
          className="flex items-center gap-3 font-semibold transition hover:-translate-y-0.5"
        >
          <span className="relative h-5 w-5 shrink-0 md:h-6 md:w-6">
            <Image
              src="/logo.png"
              alt="Yasar Kocyigit logo"
              fill
              sizes="24px"
              className="h-full w-full object-contain invert dark:invert-0"
              priority
            />
          </span>
          <span className="text-lg font-semibold tracking-tight">Yasar Kocyigit</span>
        </Link>
        <nav className="flex items-center gap-6">
          <ul className="flex items-center gap-5 text-xs font-medium uppercase tracking-[0.32em] text-muted">
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
      </div>
    </header>
  );
}
