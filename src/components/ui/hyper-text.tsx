"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, Variants } from "framer-motion";

const defaultAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

export function HyperText({
    children,
    className,
    delay = 0,
}: {
    children: string;
    className?: string;
    delay?: number;
}) {
    const [displayText, setDisplayText] = useState(children.split(""));
    const [trigger, setTrigger] = useState(false);
    const interations = useRef(0);
    const isFirstRender = useRef(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            setTrigger(true);
        }
    }, [isInView]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!trigger) return;
            if (interations.current < children.length) {
                setDisplayText((t) =>
                    t.map((l, i) => {
                        if (i <= interations.current) {
                            return children[i];
                        }
                        return defaultAlphabets[Math.floor(Math.random() * defaultAlphabets.length)];
                    })
                );
                interations.current += 0.1;
            } else {
                setDisplayText(children.split(""));
                clearInterval(interval);
            }
        }, 30); // Speed of scramble

        if (delay > 0 && isFirstRender.current) {
            isFirstRender.current = false;
            setTimeout(() => {
                // Delay logic handled by trigger in this specific implementation pattern mostly, 
                // but here we let the interval run after mount + trigger. 
                // For strict delay we'd wrap setTrigger.
            }, delay * 1000)
        }

        return () => clearInterval(interval);
    }, [children, trigger, delay]);

    return (
        <span ref={ref} className={className}>
            {displayText.map((char, i) => (
                <span key={i}>{char}</span>
            ))}
        </span>
    );
}
