"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative pt-10 pb-20 md:pt-20 md:pb-32 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50 animate-pulse" />
            <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl opacity-50" />

            <div className="max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        Available for new projects
                    </div>
                </motion.div>

                <motion.h1
                    className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-8 leading-[1.1]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                    Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Intelligence</span>, <br />
                    Designing <span className="text-foreground/80">Clarity</span>.
                </motion.h1>

                <motion.p
                    className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    I'm Yasar Kocyigit, a Senior Full-Stack Engineer & Product Designer.
                    I build high-scale data platforms and intuitive AI interfaces that solve complex problems.
                </motion.p>

                <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                    <Button asChild size="lg" className="h-12 px-8 text-base">
                        <Link href="/projects">
                            Check my work
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="h-12 px-8 text-base" asChild>
                        <Link href="/contact">
                            Let's talk <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
