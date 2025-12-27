"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function SystemHUD() {
    const [time, setTime] = useState<string>("")
    const [mounted, setMounted] = useState(false)
    const [scroll, setScroll] = useState(0)

    useEffect(() => {
        setMounted(true)
        const timer = setInterval(() => {
            const now = new Date()
            setTime(now.toLocaleTimeString('en-US', { hour12: false }) + ":" + now.getMilliseconds().toString().padStart(3, '0'))
        }, 80) // Fast update for technical feel

        const handleScroll = () => {
            const scrolled = window.scrollY
            const max = document.body.scrollHeight - window.innerHeight
            setScroll(Math.min(100, Math.floor((scrolled / max) * 100)) || 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            clearInterval(timer)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] p-4 md:p-6 overflow-hidden text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-widest select-none">
            {/* Top Right: System Clock */}
            <div className="absolute top-6 right-6 text-right">
                <div className="flex flex-col gap-1">
                    <span className="opacity-50">SYS.TIME [UTC]</span>
                    <span className="font-bold text-foreground">{time}</span>
                </div>
            </div>

            {/* Bottom Left: Status (Empty) */}
            <div className="absolute bottom-6 left-6">
            </div>

            {/* Bottom Right: Scroll Indicator */}
            <div className="absolute bottom-6 right-6 text-right">
                <div className="flex flex-col gap-1 items-end">
                    <span className="opacity-50">SCROLL_DEPTH</span>
                    <span className="font-bold text-foreground">{scroll}%</span>
                    <div className="w-24 h-1 bg-border mt-1 relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 bottom-0 bg-foreground"
                            style={{ width: `${scroll}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Left Middle: Vertical Ruler decoration */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-20 hidden md:flex">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="w-2 h-[1px] bg-foreground" />
                ))}
            </div>
        </div>
    )
}
