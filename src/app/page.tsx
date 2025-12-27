"use client";
import React from "react";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";
import { VelocityBlock } from "@/components/ui/velocity-block";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-neutral-950 text-white selection:bg-white selection:text-black">

      {/* Intro Overlay / Hint */}
      <div className="fixed bottom-12 left-12 z-50 mix-blend-difference hidden md:block">
        <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-neutral-500">
          <div className="w-12 h-[1px] bg-neutral-500" />
          <span>Scroll Down to Move Sideways</span>
        </div>
      </div>

      {/* --- DESKTOP LAYOUT (Horizontal) --- */}
      <div className="hidden md:block">
        <HorizontalScroll>
          {/* Card 1: Title Card */}
          <div className="relative h-[80vh] w-[90vw] md:w-[60vw] flex-shrink-0 flex flex-col justify-end p-8 md:p-16 border-r border-white/10">
            <VelocityBlock className="origin-bottom-left w-full">
              <div className="relative group cursor-default flex flex-col items-start leading-[0.75]">
                {/* Decoration Line */}
                <div className="w-24 h-[2px] bg-neutral-800 mb-8 origin-left scale-x-50 group-hover:scale-x-150 transition-transform duration-700" />

                {/* FIRST NAME */}
                <h1 className="text-[15vw] font-serif tracking-tighter text-white whitespace-nowrap mix-blend-difference hover:blur-[2px] transition-all duration-500">
                  <BlurReveal delay={0.1}>Yasar</BlurReveal>
                </h1>

                {/* LAST NAME */}
                <h1 className="text-[15vw] font-serif tracking-tighter text-neutral-400 whitespace-nowrap mix-blend-difference hover:text-white transition-colors duration-500">
                  <BlurReveal delay={0.25}>Kocyigit</BlurReveal>
                </h1>

                {/* Sub-text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex items-center gap-4 mt-8 pl-2"
                >
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.3em]">System.Design.Scale</span>
                </motion.div>
              </div>
            </VelocityBlock>
            <div className="mt-12 flex flex-col gap-4 max-w-xl">
              <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed">
                Engineering Director & Creative Technologist.
              </p>
            </div>
          </div>

          {/* Card 2: Philosophy (Typography Texture) */}
          <div className="relative h-[80vh] w-[90vw] md:w-[40vw] flex-shrink-0 flex items-center justify-center border-r border-white/10 overflow-hidden group">
            <VelocityBlock className="w-full">
              <p className="text-[8vw] font-bold font-mono text-neutral-900 absolute top-0 left-0 leading-none select-none pointer-events-none group-hover:text-neutral-800 transition-colors">
                SYSTEM<br />DESIGN
              </p>
              <div className="relative z-10 p-12">
                <h2 className="text-4xl font-serif mb-6"><BlurReveal>The Philosophy</BlurReveal></h2>
                <p className="text-neutral-400 leading-relaxed text-lg">
                  "Uncommon" isn't just about visuals. It's about architecture. Building distributed systems that feel liquid to the user, and rigid to the engineer.
                </p>
              </div>
            </VelocityBlock>
          </div>

          {/* Project 1 - Data Engineering */}
          <ProjectCard
            id="01"
            label="Domain"
            title="Data Engineering"
            category="AZURE / DATABRICKS"
            description="Architecting scalable data ecosystems and pipelines."
            color="bg-blue-500"
            href="/data-engineering"
          />

          {/* Project 2 - AI Engineering */}
          <ProjectCard
            id="02"
            label="Domain"
            title="AI Engineering"
            category="LLM / RAG / AGENTS"
            description="Building intelligent systems and agents."
            color="bg-purple-600"
            href="/ai-engineering"
          />

          {/* Project 3 - Works */}
          <ProjectCard
            id="03"
            label="Portfolio"
            title="Selected Works"
            category="PORTFOLIO"
            description="A collection of my systems and artifacts."
            color="bg-emerald-500"
            href="/projects"
          />

          {/* Contact / End Card */}
          <div className="relative h-[80vh] w-[90vw] md:w-[50vw] flex-shrink-0 flex flex-col items-start justify-center p-8 md:p-24 border-r border-white/10">
            <h2 className="text-6xl md:text-8xl font-serif mb-12">Let's<br />Build.</h2>
            <Link href="/contact" className="group flex items-center gap-4 text-2xl font-mono uppercase tracking-widest hover:text-green-400 transition-colors">
              <span>Get in touch</span>
              <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
            </Link>
          </div>

        </HorizontalScroll>
      </div>

      {/* --- MOBILE LAYOUT (Vertical) --- */}
      <div className="block md:hidden pb-20">

        {/* Intro */}
        <div className="min-h-screen flex flex-col justify-end p-6 border-b border-white/10">
          <VelocityBlock className="w-full">
            <div className="flex flex-col items-start leading-[0.8]">
              <div className="w-16 h-[2px] bg-neutral-800 mb-8" />
              <h1 className="text-7xl font-serif tracking-tighter text-white whitespace-nowrap">
                <BlurReveal delay={0.1}>Yasar</BlurReveal>
              </h1>
              <h1 className="text-7xl font-serif tracking-tighter text-neutral-400 whitespace-nowrap">
                <BlurReveal delay={0.25}>Kocyigit</BlurReveal>
              </h1>
              <div className="mt-8">
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.3em]">System.Design.Scale</span>
              </div>
            </div>
          </VelocityBlock>
          <div className="mt-12">
            <p className="text-lg font-light text-neutral-400 leading-relaxed">
              Engineering Director<br />& Creative Technologist.
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <div className="py-24 px-6 border-b border-white/10 overflow-hidden relative">
          <p className="text-[20vw] font-bold font-mono text-neutral-900/50 absolute top-10 right-0 leading-none select-none pointer-events-none">
            SYS<br />TEM
          </p>
          <h2 className="text-3xl font-serif mb-6 relative z-10"><BlurReveal>The Philosophy</BlurReveal></h2>
          <p className="text-neutral-400 leading-relaxed text-base relative z-10">
            "Uncommon" isn't just about visuals. It's about architecture. Building distributed systems that feel liquid to the user, and rigid to the engineer.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="flex flex-col">
          <ProjectCardMobile
            id="01"
            label="Domain"
            title="Data Engineering"
            category="AZURE / DATABRICKS"
            description="Architecting scalable data ecosystems and pipelines."
            color="bg-blue-500"
            href="/data-engineering"
          />
          <ProjectCardMobile
            id="02"
            label="Domain"
            title="AI Engineering"
            category="LLM / RAG / AGENTS"
            description="Building intelligent systems and agents."
            color="bg-purple-600"
            href="/ai-engineering"
          />
          <ProjectCardMobile
            id="03"
            label="Portfolio"
            title="Selected Works"
            category="PORTFOLIO"
            description="A collection of my systems and artifacts."
            color="bg-emerald-500"
            href="/projects"
          />
        </div>

        {/* Contact Mobile */}
        <div className="py-32 px-6">
          <h2 className="text-5xl font-serif mb-12">Let's<br />Build.</h2>
          <Link href="/contact" className="flex items-center gap-4 text-lg font-mono uppercase tracking-widest text-neutral-300">
            <span>Get in touch</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

      </div>
    </div>
  );
}

// Mobile Project Card
function ProjectCardMobile({ id, title, category, description, color, href, label }: { id: string, title: string, category: string, description: string, color: string, href?: string, label?: string }) {
  return (
    <Link href={href || "#"} className="group block border-b border-white/10 relative overflow-hidden">
      <div className="p-8 py-16 transition-colors hover:bg-neutral-900">
        <div className="flex justify-between items-start mb-8">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">{label} /{id}</span>
          <ArrowUpRight className="w-6 h-6 text-neutral-700 group-hover:text-white transition-colors" />
        </div>

        <div className={`w-8 h-8 ${color} rounded-full blur-[20px] opacity-20 absolute top-12 right-12`} />

        <h3 className="text-4xl font-serif leading-none tracking-tight mb-4 text-white">
          {title}
        </h3>
        <span className="inline-block px-2 py-1 border border-white/10 rounded-full text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-4">
          {category}
        </span>
        <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
          {description}
        </p>
      </div>
    </Link>
  )
}

// Sub-component for Project Cards to keep things clean
function ProjectCard({ id, title, category, description, color, href, label }: { id: string, title: string, category: string, description: string, color: string, href?: string, label?: string }) {
  const CardContent = (
    <div className="relative h-full w-full flex flex-col justify-between p-8 md:p-12 bg-neutral-900/50 hover:bg-neutral-900 transition-colors">
      <div className="flex justify-between items-start">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">{label || "Project"} /{id}</span>
        <VelocityBlock>
          <ArrowUpRight className="w-12 h-12 text-neutral-700 group-hover:text-white transition-colors" />
        </VelocityBlock>
      </div>

      <VelocityBlock className="space-y-6">
        <div className={`w-12 h-12 ${color} rounded-full blur-[40px] opacity-20 group-hover:opacity-50 transition-opacity duration-500`} />
        <h3 className="text-5xl md:text-7xl font-serif leading-none tracking-tight group-hover:scale-[1.02] transition-transform duration-500 origin-left">
          {title}
        </h3>
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 border border-white/10 rounded-full text-xs font-mono text-neutral-400 uppercase tracking-widest">
            {category}
          </span>
          <p className="text-neutral-400 max-w-sm leading-relaxed text-sm md:text-base">
            {description}
          </p>
        </div>
      </VelocityBlock>
    </div>
  );

  return (
    <div className="relative h-[80vh] w-[85vw] md:w-[45vw] flex-shrink-0 border-r border-white/10 group">
      {href ? (
        <Link href={href} className="block w-full h-full">
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}
    </div>
  )
}
