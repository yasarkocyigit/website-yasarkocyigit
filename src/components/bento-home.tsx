"use client";

import React from "react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FileText, Linkedin, Mail, MapPin, Terminal, Cpu, Database, Brain, Briefcase } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function BentoHome() {
    const items = [
        {
            title: "Data Engineering",
            description: "Architecting scalable data ecosystems. Azure, Databricks, Fabric.",
            header: (
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-neutral-300 dark:bg-neutral-700 overflow-hidden relative flex items-center justify-center">
                        <Database className="w-10 h-10 text-neutral-500" />
                    </div>
                </div>
            ),
            icon: <Database className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-2",
            href: "/data-engineering"
        },
        {
            title: "AI Engineering",
            description: "Building intelligent agents and RAG systems.",
            header: <StackMarquee />,
            icon: <Brain className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
            href: "/ai-engineering"
        },
        {
            title: "Selected Works",
            description: "Explore my technical portfolio and case studies.",
            header: (
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.2] dark:bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-zinc-900 justify-center flex-col p-4">
                    <div className="w-full flex items-center justify-center">
                        <Briefcase className="w-10 h-10 text-neutral-500" />
                    </div>
                </div>
            ),
            icon: <Briefcase className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-1",
            href: "/projects"
        },
        {
            title: "Connect",
            description: "Reach out via Email or LinkedIn.",
            header: <SocialLinks />,
            icon: <Mail className="h-4 w-4 text-neutral-500" />,
            className: "md:col-span-3",
            href: "/contact"
        },
    ];

    return (
        <BentoGrid className="max-w-4xl mx-auto py-12 px-4 md:px-0">
            {items.map((item, i) => (
                <SpotlightCard key={i} className={item.className}>
                    <Link href={item.href} className="block h-full p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4 text-neutral-500">
                                {item.icon}
                                <span className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">0{i + 1}</span>
                            </div>
                            {item.header}
                        </div>
                        <div className="mt-4">
                            <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200 mb-1">
                                {item.title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {item.description}
                            </p>
                        </div>
                    </Link>
                </SpotlightCard>
            ))}
        </BentoGrid>
    );
}

const StackMarquee = () => {
    // Simple marquee simulation
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 dark:bg-zinc-900 overflow-hidden relative items-center">
            <div className="absolute whitespace-nowrap animate-marquee flex gap-4 opacity-50 font-mono text-sm px-4">
                <span>Typescript</span>
                <span>•</span>
                <span>Next.js</span>
                <span>•</span>
                <span>React</span>
                <span>•</span>
                <span>Rust</span>
                <span>•</span>
                <span>Kafka</span>
                <span>•</span>
                <span>PostgreSQL</span>
                <span>•</span>
                <span>Tailwind</span>
                <span>•</span>
                <span>Docker</span>
            </div>
        </div>
    )
}

const MapWidget = () => {
    return (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-200 dark:bg-zinc-800 overflow-hidden relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* Abstract Map UI */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-[1px] bg-neutral-300 dark:bg-neutral-700/50">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-neutral-100 dark:bg-zinc-900" />
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-ping absolute" />
                <div className="w-3 h-3 rounded-full bg-blue-500 relative shadow-lg items-center justify-center flex border-2 border-white">
                </div>
            </div>
        </div>
    )
}

const SocialLinks = () => {
    return (
        <div className="flex flex-1 w-full h-full min-h-[4rem] items-center justify-around gap-4 pt-4">
            <div className="flex gap-4">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                </div>
                <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-emerald-500 hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                </div>
            </div>
        </div>
    )
}
