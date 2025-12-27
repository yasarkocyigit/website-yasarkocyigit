"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VelocityBlock } from "@/components/ui/velocity-block";
import { BlurReveal } from "@/components/ui/blur-reveal";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-black pt-32 pb-32 px-6 md:px-12">
            {/* Typographic Poster Layout */}
            <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32">

                {/* Left: The Manifesto (Fixed/Sticky feel visually, but scrolls) */}
                <div className="md:col-span-7">
                    <VelocityBlock>
                        <h1 className="text-[11vw] leading-[0.85] font-serif tracking-tighter mix-blend-difference mb-12">
                            <span className="block text-neutral-600">Digital</span>
                            <span className="block pl-12 md:pl-24">Architect</span>
                        </h1>
                    </VelocityBlock>

                    <div className="space-y-12 text-2xl md:text-4xl font-light leading-snug text-neutral-300 max-w-4xl">
                        <p>
                            I don't just write code. I engineer <span className="text-white font-serif italic"><BlurReveal>digital physics</BlurReveal></span>.
                        </p>
                        <p>
                            Born from the intersection of distributed systems and creative coding, my work is about making the invisible visible.
                            Translating 50TB of raw data into a seamless, liquid experience that feels inevitable.
                        </p>
                    </div>
                </div>

                {/* Right: Technical Details (The Fine Print) */}
                <div className="md:col-span-5 space-y-24 md:pt-32">

                    {/* Stack */}
                    <div>
                        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest border-b border-neutral-800 pb-2 block mb-8">
                            tech_stack
                        </span>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-sm text-neutral-400">
                            <div>Rust / WASM</div>
                            <div>Kafka</div>
                            <div>Next.js / React</div>
                            <div>Clickhouse</div>
                            <div>Kubernetes</div>
                            <div>WebGL / Three.js</div>
                            <div>Python / PyTorch</div>
                            <div>Tailwind CSS</div>
                        </div>
                    </div>

                    {/* Experience (Mini) */}
                    <div>
                        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest border-b border-neutral-800 pb-2 block mb-8">
                            timeline
                        </span>
                        <ul className="space-y-8">
                            <li className="group">
                                <div className="flex justify-between text-lg md:text-xl font-serif text-white mb-2">
                                    <span>Senior Engineer</span>
                                    <span className="text-neutral-500 font-mono text-sm">Now</span>
                                </div>
                                <p className="text-neutral-500 text-sm leading-relaxed">Data Architecture & Distributed Systems.</p>
                            </li>
                            <li className="group">
                                <div className="flex justify-between text-lg md:text-xl font-serif text-white mb-2">
                                    <span>Product Engineer</span>
                                    <span className="text-500 font-mono text-sm">2019-22</span>
                                </div>
                                <p className="text-neutral-500 text-sm leading-relaxed">Core Design Systems & Performance.</p>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest border-b border-neutral-800 pb-2 block mb-8">
                            connect
                        </span>
                        <div className="flex flex-col gap-4">
                            <Link href="mailto:yasarkocyigit@daqconsulting.com" className="flex items-center justify-between group border-b border-white/10 pb-4 hover:border-white transition-colors">
                                <span className="text-xl">Direct Email</span>
                                <ArrowUpRight className="w-6 h-6 text-neutral-500 group-hover:text-white transition-colors" />
                            </Link>
                            <Link href="https://linkedin.com/in/yasarkocyigit" target="_blank" className="flex items-center justify-between group border-b border-white/10 pb-4 hover:border-white transition-colors">
                                <span className="text-xl">LinkedIn</span>
                                <ArrowUpRight className="w-6 h-6 text-neutral-500 group-hover:text-white transition-colors" />
                            </Link>
                            <Link href="/contact" className="flex items-center justify-between group border-b border-white/10 pb-4 hover:border-white transition-colors">
                                <span className="text-xl">Contact Form</span>
                                <ArrowUpRight className="w-6 h-6 text-neutral-500 group-hover:text-white transition-colors" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
