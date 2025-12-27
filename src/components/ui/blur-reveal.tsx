"use client";
import { motion, Variants } from "framer-motion";

export const BlurReveal = ({
    children,
    className,
    delay = 0,
    duration = 1
}: {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
}) => {
    // Split text into characters for smoother animation
    const characters = children.split("");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay * i },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: duration,
            },
        },
        hidden: {
            opacity: 0,
            filter: "blur(20px)",
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: duration,
            },
        },
    };

    return (
        <motion.span
            className={`inline-block whitespace-pre-wrap ${className || ""}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {characters.map((char, index) => (
                <motion.span variants={child} key={index} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
};
