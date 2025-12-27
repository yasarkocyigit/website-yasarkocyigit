"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VelocityBlock } from "@/components/ui/velocity-block";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { projects } from "@/data/projects";

// Group projects by year for that "Archive" feel
const projectsByYear = projects.reduce((acc, project) => {
    const year = project.year || "2024";
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
}, {} as Record<string, typeof projects>);

const descendingYears = Object.keys(projectsByYear).sort((a, b) => Number(b) - Number(a));

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-black pb-32 pt-32 px-6 md:px-12">
            <div className="max-w-[90rem] mx-auto">
                {/* Header */}
                <div className="mb-32">
                    <h1 className="text-[10vw] leading-[0.8] font-serif tracking-tighter mix-blend-difference mb-8">
                        <BlurReveal delay={0}>Archive</BlurReveal>
                    </h1>
                    <p className="max-w-xl text-neutral-400 text-lg md:text-xl leading-relaxed">
                        A collection of experiments, systems, and artifacts built for the digital realm.
                    </p>
                </div>

                {/* Kinetic List */}
                <div className="space-y-32">
                    {descendingYears.map((year) => (
                        <div key={year} className="relative">
                            <div className="sticky top-32 mb-12 mix-blend-difference z-10">
                                <span className="font-mono text-sm text-neutral-500 uppercase tracking-widest border-b border-neutral-800 pb-2">
                                    {year}
                                </span>
                            </div>

                            <div className="space-y-12">
                                {projectsByYear[year].map((project, idx) => (
                                    <Link key={idx} href={project.link || "#"} className="block group">
                                        <VelocityBlock className="border-t border-white/10 pt-8 transition-colors group-hover:border-white/50">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                                                <div className="md:col-span-8">
                                                    <h2 className="text-5xl md:text-8xl font-serif font-light mb-4 group-hover:Skew-x-6 transition-transform origin-left">
                                                        {project.title}
                                                    </h2>
                                                    <div className="flex flex-wrap gap-4 mt-6">
                                                        {project.tags.map(tag => (
                                                            <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="md:col-span-4 flex items-start justify-between md:justify-end gap-8">
                                                    <p className="text-neutral-400 leading-relaxed max-w-sm text-sm">
                                                        {project.description}
                                                    </p>
                                                    <ArrowUpRight className="w-12 h-12 text-neutral-700 group-hover:text-white transition-colors duration-500" />
                                                </div>
                                            </div>
                                        </VelocityBlock>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
