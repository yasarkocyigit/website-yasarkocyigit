"use client";
import React from "react";
import { VelocityBlock } from "@/components/ui/velocity-block";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-black flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">

            {/* Background Noise/Grid if desired, keeping it clean for void feel */}

            <VelocityBlock>
                <div className="text-center space-y-12">
                    <span className="font-mono text-xs text-neutral-600 uppercase tracking-[0.5em] block">
                        Start a transmission
                    </span>

                    <Link href="mailto:yasarkocyigit@daqconsulting.com" className="group block">
                        <h1 className="text-[8vw] md:text-[10vw] leading-none font-serif tracking-tighter hover:text-neutral-400 transition-colors duration-500">
                            <BlurReveal delay={0.2}>Say Hello.</BlurReveal>
                        </h1>
                        <div className="h-px w-0 group-hover:w-full bg-white transition-all duration-700 mx-auto mt-4" />
                    </Link>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-12">
                        <Link href="https://linkedin.com/in/yasarkocyigit" target="_blank" className="font-mono text-sm text-neutral-500 hover:text-white uppercase tracking-widest flex items-center gap-2">
                            LinkedIn <ArrowRight className="w-4 h-4 -rotate-45" />
                        </Link>
                    </div>
                </div>
            </VelocityBlock>
        </div>
    );
}
