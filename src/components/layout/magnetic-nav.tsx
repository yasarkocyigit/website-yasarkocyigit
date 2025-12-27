"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { motion } from "framer-motion"

const navItems = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/projects" },
    { name: "AI", href: "/ai-engineering" },
    { name: "Data", href: "/data-engineering" },
    { name: "Analytics", href: "/analytics" },
    { name: "Connect", href: "/contact" },
]

export function MagneticNav() {
    const pathname = usePathname()

    return (
        <div className="fixed top-6 left-0 w-full z-50 pointer-events-none flex justify-center">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth easeOut
                className="bg-neutral-950/80 backdrop-blur-md border border-white/10 px-6 py-3 flex items-center gap-8 pointer-events-auto rounded-none"
            >
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link key={item.href} href={item.href} className="group relative">
                            <span className={cn(
                                "font-mono text-xs tracking-widest transition-colors duration-300",
                                isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                            )}>
                                {isActive && <span className="mr-2 text-neutral-600">[</span>}
                                {item.name.toUpperCase()}
                                {isActive && <span className="ml-2 text-neutral-600">]</span>}
                            </span>

                            {/* Hover Indicator (Tiny Dot) */}
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    )
                })}
            </motion.nav>
        </div>
    )
}
