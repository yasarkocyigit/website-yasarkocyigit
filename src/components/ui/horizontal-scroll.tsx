"use client";
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Transform vertical scroll progress to horizontal movement
    // We assume the scrollable height is roughly equal to the horizontal width we want to traverse
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]); // Adjust -80% based on content width

    return (
        <section ref={targetRef} className="relative h-[500vh]"> {/* Massive height to allow for long scroll */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-neutral-950">
                <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
                    {children}
                </motion.div>
            </div>
        </section>
    );
};
