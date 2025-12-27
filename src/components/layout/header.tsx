"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Work", href: "/projects" },
    { name: "Contact", href: "/contact" },
]

export function Header() {
    const pathname = usePathname()

    return (
        <header className="fixed top-0 w-full z-50 mix-blend-difference text-white py-6 px-6 md:px-12 flex items-center justify-between pointer-events-none">
            {/* Logo */}
            <Link href="/" className="font-serif italic text-xl tracking-tight pointer-events-auto hover:opacity-70 transition-opacity">
                Y. Kocyigit
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase font-light pointer-events-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "hover:text-neutral-300 transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all",
                            pathname.startsWith(item.href) && "after:w-full"
                        )}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </header>
    )
}
