"use client"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function BlendedCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [cursorVariant, setCursorVariant] = useState("default")

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            })
        }

        window.addEventListener("mousemove", mouseMove)

        return () => {
            window.removeEventListener("mousemove", mouseMove)
        }
    }, [])

    const variants = {
        default: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            height: 20,
            width: 20,
            backgroundColor: "white",
            mixBlendMode: "difference" as const
        },
        text: {
            height: 100,
            width: 100,
            x: mousePosition.x - 50,
            y: mousePosition.y - 50,
            backgroundColor: "white",
            mixBlendMode: "difference" as const
        }
    }

    // Only render on desktop / pointing devices
    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
            animate={cursorVariant}
            variants={variants}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }}
        />
    )
}
