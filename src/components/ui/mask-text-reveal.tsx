"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function MaskTextReveal({
    children,
    className,
    delay = 0,
}: {
    children: string;
    className?: string;
    delay?: number;
}) {
    const body = useRef(null);
    const isInView = useInView(body, { once: true, margin: "-10%" });

    const animation = {
        initial: { y: "100%" },
        enter: (i: number) => ({
            y: "0",
            transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] as const, delay: delay + i * 0.075 },
        }),
    };

    return (
        <div ref={body} className={className}>
            {children.split(" ").map((word, index) => {
                return (
                    <span
                        key={index}
                        className="inline-flex overflow-hidden mr-[0.25em] align-top relative"
                    >
                        <motion.span
                            variants={animation}
                            initial="initial"
                            animate={isInView ? "enter" : ""}
                            custom={index}
                        >
                            {word}
                        </motion.span>
                    </span>
                );
            })}
        </div>
    );
}
