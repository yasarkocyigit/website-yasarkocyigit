"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// --- Configuration ---
const COLORS = {
    trigger: '#ef4444', // Red
    core: '#3b82f6',    // Blue
    tool: '#10b981',    // Emerald
    data: '#eab308',    // Amber
    void: '#030303',    // Bg
    glass: 'rgba(255, 255, 255, 0.03)',
    border: 'rgba(255, 255, 255, 0.08)',
};

// --- Node Metadata ---
const NODE_DATA: Record<string, { title: string; tech: string; desc: string }> = {
    trigger: {
        title: "WEBHOOK EVENT",
        tech: "Event Grid / JSON",
        desc: "Real-time system events sent from Databricks Workflows on job failure. Carries Run ID and Error context."
    },
    core: {
        title: "AGENT RUNTIME",
        tech: "Databricks Apps / Python",
        desc: "Serverless container hosting the ReAct Reasoning Engine. Maintains conversation context and executes tool logic."
    },
    uc: {
        title: "UNITY CATALOG",
        tech: "Delta Lake / Volumes",
        desc: "Governance layer providing secure access to driver logs and system tables for root cause analysis."
    },
    api: {
        title: "JOBS API",
        tech: "Databricks SDK",
        desc: "Control plane interface allowing the Agent to modify cluster configurations (e.g., memory) and restart runs."
    }
};

export default function ArchitectureDiagramAgent() {
    // Animation Loop State
    const [phase, setPhase] = useState(0);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(p => (p + 1) % 5);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const isActive = (p: number) => phase === p;

    return (
        <div className="w-full relative bg-[#030303] rounded-xl overflow-hidden select-none group font-sans border border-white/5 shadow-2xl">

            {/* Ambient Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Live Architecture</span>
                </div>
                <h3 className="text-lg font-medium text-white tracking-tight">Self-Healing Runtime</h3>
            </div>

            {/* Desktop & Mobile Unified - Horizontal Scroll on Mobile */}
            <div className="w-full h-[500px] overflow-x-auto pb-6 md:pb-0 scrollbar-hide">
                <div className="min-w-[800px] md:min-w-full h-full relative">
                    <svg className="w-full h-full relative z-10" viewBox="0 0 1000 500">
                        <defs>
                            <linearGradient id="beam-gradient" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="#fff" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                            <filter id="glow-strong">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* --- CONNECTIONS (BEAMS) --- */}
                        {/* 1. Job -> Webhook */}
                        <path d="M 150 250 C 200 250, 200 250, 250 250" stroke={COLORS.border} strokeWidth="1" fill="none" strokeDasharray="4,4" />
                        {isActive(1) && (
                            <motion.circle cx="150" cy="250" r="3" fill={COLORS.trigger} filter="url(#glow-strong)">
                                <animateMotion dur="1s" repeatCount="1" path="M 150 250 C 200 250, 200 250, 250 250" />
                            </motion.circle>
                        )}

                        {/* 2. Webhook -> Core */}
                        <path d="M 390 250 C 420 250, 450 250, 480 250" stroke={COLORS.border} strokeWidth="1" fill="none" />
                        {isActive(1) && (
                            <motion.circle cx="0" cy="0" r="3" fill="#fff" filter="url(#glow-strong)">
                                <animateMotion begin="0.5s" dur="0.5s" fill="freeze" path="M 390 250 C 420 250, 450 250, 480 250" />
                            </motion.circle>
                        )}

                        {/* 3. Core -> Satellites (Outbound) */}
                        <path d="M 640 230 C 700 230, 700 130, 780 130" stroke={COLORS.border} strokeWidth="1" fill="none" />
                        <path d="M 640 270 C 700 270, 700 370, 780 370" stroke={COLORS.border} strokeWidth="1" fill="none" />

                        {isActive(3) && (
                            <>
                                <motion.circle cx="0" cy="0" r="3" fill={COLORS.data} filter="url(#glow-strong)">
                                    <animateMotion dur="0.5s" fill="freeze" path="M 640 230 C 700 230, 700 130, 780 130" />
                                </motion.circle>
                                <motion.circle cx="0" cy="0" r="3" fill={COLORS.tool} filter="url(#glow-strong)">
                                    <animateMotion dur="0.5s" fill="freeze" path="M 640 270 C 700 270, 700 370, 780 370" />
                                </motion.circle>
                            </>
                        )}

                        {/* --- NODES (GLASS CARDS) --- */}
                        {/* TRIGGER NODE (Left) */}
                        <g
                            transform="translate(250, 200)"
                            onMouseEnter={() => setHoveredNode('trigger')}
                            onMouseLeave={() => setHoveredNode(null)}
                            className="cursor-pointer"
                        >
                            <rect x="-5" y="-5" width="150" height="110" rx="16" fill="transparent" stroke={hoveredNode === 'trigger' ? COLORS.trigger : 'transparent'} strokeWidth="2" className="transition-all duration-300 opacity-50" />
                            <rect x="0" y="0" width="140" height="100" rx="12" fill={COLORS.glass} stroke={isActive(1) ? COLORS.trigger : COLORS.border} strokeWidth={isActive(1) ? 2 : 1} className="transition-colors duration-500" />
                            <text x="70" y="45" textAnchor="middle" fill={isActive(1) || hoveredNode === 'trigger' ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest transition-colors duration-500">EVENT BUS</text>
                            <text x="70" y="65" textAnchor="middle" fill="#666" className="text-[9px]">WEBHOOK TRIGGER</text>
                            <circle cx="70" cy="80" r="2" fill={isActive(1) ? COLORS.trigger : '#333'} className="transition-colors duration-300" />
                        </g>

                        {/* CORE NODE (Center) */}
                        <g
                            transform="translate(480, 150)"
                            onMouseEnter={() => setHoveredNode('core')}
                            onMouseLeave={() => setHoveredNode(null)}
                            className="cursor-pointer"
                        >
                            <rect x="-8" y="-8" width="176" height="216" rx="24" fill="transparent" stroke={hoveredNode === 'core' ? COLORS.core : 'transparent'} strokeWidth="2" className="transition-all duration-300 opacity-50" />
                            {isActive(2) && <rect x="-4" y="-4" width="168" height="208" rx="20" fill={COLORS.core} className="opacity-20 blur-xl animate-pulse" />}
                            <rect x="0" y="0" width="160" height="200" rx="16" fill="#0A0A0A" stroke={isActive(2) ? COLORS.core : COLORS.border} strokeWidth={isActive(2) ? 2 : 1} className="transition-all duration-500" />

                            <rect x="20" y="20" width="120" height="40" rx="8" fill={COLORS.glass} stroke={COLORS.border} />
                            <text x="80" y="44" textAnchor="middle" fill="#fff" className="text-[10px] font-bold">AGENT RUNTIME</text>

                            <g transform="translate(20, 80)">
                                <rect x="0" y="0" width="120" height="20" rx="4" fill={isActive(2) ? `${COLORS.core}20` : '#111'} />
                                <text x="60" y="13" textAnchor="middle" fill={isActive(2) ? COLORS.core : '#444'} className="text-[9px] font-mono">CONTEXT WINDOW</text>
                            </g>
                            <g transform="translate(20, 110)">
                                <rect x="0" y="0" width="120" height="20" rx="4" fill={isActive(2) ? `${COLORS.core}20` : '#111'} />
                                <text x="60" y="13" textAnchor="middle" fill={isActive(2) ? COLORS.core : '#444'} className="text-[9px] font-mono">REASONING ENGINE</text>
                            </g>
                            <g transform="translate(20, 140)">
                                <rect x="0" y="0" width="120" height="20" rx="4" fill={isActive(2) ? `${COLORS.core}20` : '#111'} />
                                <text x="60" y="13" textAnchor="middle" fill={isActive(2) ? COLORS.core : '#444'} className="text-[9px] font-mono">TOOL SELECTOR</text>
                            </g>
                        </g>

                        {/* SATELLITE 1: UNITY CATALOG (Top Right) */}
                        <g
                            transform="translate(780, 80)"
                            onMouseEnter={() => setHoveredNode('uc')}
                            onMouseLeave={() => setHoveredNode(null)}
                            className="cursor-pointer"
                        >
                            <rect x="-5" y="-5" width="150" height="110" rx="55" fill="transparent" stroke={hoveredNode === 'uc' ? COLORS.data : 'transparent'} strokeWidth="2" className="transition-all duration-300 opacity-50" />
                            <rect x="0" y="0" width="140" height="100" rx="50" fill={COLORS.glass} stroke={isActive(3) ? COLORS.data : COLORS.border} strokeWidth={1} className="transition-colors duration-500" />
                            <text x="70" y="45" textAnchor="middle" fill={isActive(3) || hoveredNode === 'uc' ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest transition-colors duration-500">UNITY CATALOG</text>
                            <text x="70" y="65" textAnchor="middle" fill="#555" className="text-[9px]">LOGS & STATE</text>
                            {isActive(3) && (
                                <circle cx="70" cy="50" r="60" stroke={COLORS.data} strokeWidth="1" fill="none" opacity="0" className="animate-ping" />
                            )}
                        </g>

                        {/* SATELLITE 2: JOBS API (Bottom Right) */}
                        <g
                            transform="translate(780, 320)"
                            onMouseEnter={() => setHoveredNode('api')}
                            onMouseLeave={() => setHoveredNode(null)}
                            className="cursor-pointer"
                        >
                            <path d="M 70 -5 L 145 47 L 70 105 L -5 47 Z" fill="transparent" stroke={hoveredNode === 'api' ? COLORS.tool : 'transparent'} strokeWidth="2" className="transition-all duration-300 opacity-50" />
                            <path d="M 70 0 L 140 50 L 70 100 L 0 50 Z" fill={COLORS.glass} stroke={isActive(3) ? COLORS.tool : COLORS.border} strokeWidth={1} className="transition-colors duration-500" />
                            <text x="70" y="45" textAnchor="middle" fill={isActive(3) || hoveredNode === 'api' ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest transition-colors duration-500">JOBS API</text>
                            <text x="70" y="65" textAnchor="middle" fill="#555" className="text-[9px]">COMPUTE CONTROL</text>
                        </g>

                        {/* Job Source Indicator */}
                        <path d="M 0 250 L 100 250" stroke={COLORS.border} strokeDasharray="2,2" />
                        <circle cx="100" cy="250" r="4" fill={COLORS.trigger} className={isActive(0) ? "animate-pulse" : "opacity-20"} />
                        <text x="100" y="270" textAnchor="middle" fill="#444" className="text-[9px]">INCIDENT</text>
                    </svg>
                </div>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
                {hoveredNode && NODE_DATA[hoveredNode] && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-8 right-8 w-64 bg-black/80 backdrop-blur-xl border border-white/10 p-4 z-50 pointer-events-none rounded-xl shadow-2xl"
                    >
                        <div className="border-b border-white/10 pb-2 mb-3">
                            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
                                {NODE_DATA[hoveredNode].title}
                            </h4>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-[9px] text-neutral-500 uppercase font-bold mb-1">Architecture</p>
                                <p className="text-[10px] font-mono text-blue-400">
                                    {NODE_DATA[hoveredNode].tech}
                                </p>
                            </div>
                            <div>
                                <p className="text-[9px] text-neutral-500 uppercase font-bold mb-1">Function</p>
                                <p className="text-[11px] text-neutral-300 leading-relaxed">
                                    {NODE_DATA[hoveredNode].desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
