"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function FadeIn({
    children,
    className,
    delay = 0
}: {
    children: React.ReactNode,
    className?: string,
    delay?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerContainer({
    children,
    className
}: {
    children: React.ReactNode,
    className?: string
}) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}
