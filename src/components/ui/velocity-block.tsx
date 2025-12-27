"use client";
import React from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

export const VelocityBlock = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth out the velocity reading
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Map velocity to a skew angle.
    // Fast scroll = larger skew. Max skew around 10-15 deg is usually good.
    const skewX = useTransform(smoothVelocity, [-1000, 1000], [5, -5]);

    // Optionally map to scale for a "stretch" effect
    const scale = useTransform(smoothVelocity, [-1000, 0, 1000], [1.05, 1, 1.05]);

    return (
        <motion.div style={{ skewX, scale }} className={className}>
            {children}
        </motion.div>
    );
};
