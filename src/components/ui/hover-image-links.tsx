"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const HoverImageLinks = () => {
    return (
        <div className="p-4 md:p-8">
            <div className="mx-auto max-w-5xl">
                <LinkItem
                    heading="Vector Search Engine"
                    subheading="RUST / WASM"
                    imgSrc="/projects/vector-engine.jpg" // Placeholder path, using generic fallback in code if needed
                    href="/projects"
                />
                <LinkItem
                    heading="Real-time Analytics"
                    subheading="KAFKA / CLICKHOUSE"
                    imgSrc="/projects/analytics.jpg"
                    href="/projects"
                />
                <LinkItem
                    heading="Design System 2.0"
                    subheading="REACT / FIGMA"
                    imgSrc="/projects/design-system.jpg"
                    href="/projects"
                />
                <LinkItem
                    heading="Generative UI"
                    subheading="AI / NEXT.JS"
                    imgSrc="/projects/gen-ui.jpg"
                    href="/projects"
                />
            </div>
        </div>
    );
};

const LinkItem = ({
    heading,
    subheading,
    imgSrc,
    href,
}: {
    heading: string;
    subheading: string;
    imgSrc: string;
    href: string;
}) => {
    const ref = useRef<HTMLAnchorElement | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
    const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const rect = ref.current!.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const MotionLink = motion(Link);

    return (
        <MotionLink
            href={href}
            ref={ref}
            onMouseMove={handleMouseMove}
            initial="initial"
            whileHover="whileHover"
            className="group relative flex items-center justify-between border-b border-neutral-700 py-12 transition-colors duration-500 hover:border-neutral-50 md:py-16"
        >
            <div className="relative z-10 flex flex-col md:flex-row md:items-baseline md:gap-8">
                <motion.span
                    variants={{
                        initial: { x: 0 },
                        whileHover: { x: -16 },
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                    className="text-4xl font-bold text-neutral-300 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl font-serif"
                >
                    {heading}
                </motion.span>
                <span className="text-neutral-500 transition-colors duration-500 group-hover:text-neutral-200 mt-2 md:mt-0 font-mono text-xs tracking-widest uppercase">
                    {subheading}
                </span>
            </div>

            <motion.div
                variants={{
                    initial: {
                        scale: 0,
                        rotate: "-12.5deg",
                        opacity: 0,
                    },
                    whileHover: {
                        scale: 1,
                        rotate: "12.5deg",
                        opacity: 1,
                    },
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }} // More fluid
                style={{
                    top,
                    left,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="absolute z-20 h-48 w-64 rounded-lg object-cover md:h-64 md:w-80 pointer-events-none bg-neutral-800 overflow-hidden border border-white/20"
            >
                {/* Abstract Placeholder Graphic since we might not have images yet */}
                <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-black grid place-content-center">
                    <div className="text-neutral-600 font-mono text-xs uppercase border border-current px-2 py-1 rounded">
                        project_preview
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={{
                    initial: {
                        x: "25%",
                        opacity: 0,
                    },
                    whileHover: {
                        x: "0%",
                        opacity: 1,
                    },
                }}
                transition={{ type: "spring" }}
                className="relative z-10 p-4"
            >
                <ArrowUpRight className="text-5xl text-neutral-50" />
            </motion.div>
        </MotionLink>
    );
};
