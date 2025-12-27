"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ArchitecturalHero() {
    return (
        <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8 max-w-2xl"
            >
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
                        Designing systems with clarity and purpose.
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed font-light">
                        I am Yasar Kocyigit, a Full-Stack Engineer and Product Designer.
                        I build digital tools that are intuitive, robust, and beautifully quiet.
                    </p>
                </div>

                <div className="flex gap-6 text-sm">
                    <Link href="/projects" className="flex items-center gap-2 border-b border-foreground/20 pb-0.5 hover:border-foreground transition-colors group">
                        <span>View Selected Work</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/about" className="flex items-center gap-2 border-b border-foreground/20 pb-0.5 hover:border-foreground transition-colors group">
                        <span>More About Me</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </section>
    )
}
