"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Activity,
    Bot,
    BrainCircuit,
    TerminalSquare,
    CheckCircle2,
    ServerCrash,
    PlayCircle,
    ArrowRight
} from "lucide-react";

const DEMO_SCRIPT = [
    {
        type: "alert",
        title: "Incident Detected",
        content: "Job #9941 (ETL_Daily_Sales) failed. Error: ExecutorLoss.",
        meta: "Webhook • 10:23:01 AM"
    },
    {
        type: "agent",
        title: "Agent AI",
        content: "I'm investigating the failure. Retrieving driver logs...",
        meta: "Thinking"
    },
    {
        type: "tool-call",
        title: "Unity Catalog",
        content: "EXEC: jobs.get_run_output(run_id=9941)",
        meta: "Tool Use"
    },
    {
        type: "analysis",
        title: "Root Cause Found",
        content: "Analysis confirmed: java.lang.OutOfMemoryError. The executor requires more memory.",
        meta: "Reasoning"
    },
    {
        type: "action",
        title: "Auto-Remediation",
        content: "Upgrading Cluster: spark.executor.memory -> 24g.",
        meta: "Resolution"
    },
    {
        type: "success",
        title: "System Restored",
        content: "Job #5521 configuration updated and restarted successfully.",
        meta: "Fixed"
    }
];

export function McpAgentDemo() {
    const [step, setStep] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [step]);

    useEffect(() => {
        if (step >= DEMO_SCRIPT.length) {
            const timer = setTimeout(() => setStep(0), 4000);
            return () => clearTimeout(timer);
        }

        const timer = setTimeout(() => {
            setStep(s => s + 1);
        }, 1800);

        return () => clearTimeout(timer);
    }, [step]);

    return (
        <div className="w-full h-[500px] bg-white dark:bg-[#09090b] rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm flex flex-col font-sans">

            {/* Header: SaaS Style */}
            <div className="h-12 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-6 bg-neutral-50 dark:bg-[#0c0c0e]">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white">
                        <Bot size={14} />
                    </div>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">Pipeline Guardian</span>
                    <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-medium uppercase tracking-wide">
                        Active
                    </span>
                </div>
                <div className="text-xs text-neutral-400 font-medium">
                    Run ID: #9941-A
                </div>
            </div>

            {/* Content Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-50/50 dark:bg-black/50">
                <AnimatePresence mode="popLayout">
                    {DEMO_SCRIPT.slice(0, step).map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={cn(
                                "p-4 rounded-lg border shadow-sm transition-all",
                                item.type === 'alert' && "bg-red-50 dark:bg-red-950/10 border-red-200 dark:border-red-900/20",
                                item.type === 'agent' && "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 ml-8",
                                item.type === 'tool-call' && "bg-neutral-100 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 border-dashed ml-12",
                                item.type === 'analysis' && "bg-blue-50 dark:bg-blue-950/10 border-blue-100 dark:border-blue-900/20 ml-8",
                                item.type === 'action' && "bg-amber-50 dark:bg-amber-950/10 border-amber-100 dark:border-amber-900/20 ml-8",
                                item.type === 'success' && "bg-green-50 dark:bg-green-950/10 border-green-200 dark:border-green-900/20 ml-8"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn("mt-0.5 shrink-0",
                                    item.type === 'alert' ? "text-red-500" :
                                        item.type === 'success' ? "text-green-500" : "text-neutral-400"
                                )}>
                                    {item.type === 'alert' && <ServerCrash size={16} />}
                                    {item.type === 'agent' && <Bot size={16} />}
                                    {item.type === 'tool-call' && <TerminalSquare size={16} />}
                                    {item.type === 'analysis' && <BrainCircuit size={16} />}
                                    {item.type === 'action' && <PlayCircle size={16} />}
                                    {item.type === 'success' && <CheckCircle2 size={16} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className={cn("text-xs font-bold uppercase tracking-wider",
                                            item.type === 'alert' ? "text-red-700 dark:text-red-400" :
                                                item.type === 'success' ? "text-green-700 dark:text-green-400" :
                                                    "text-neutral-900 dark:text-neutral-200"
                                        )}>
                                            {item.title}
                                        </h4>
                                        <span className="text-[10px] text-neutral-400 uppercase">{item.meta}</span>
                                    </div>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Thinking Indicator */}
                {step < DEMO_SCRIPT.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 ml-8 pt-2"
                    >
                        <div className="flex gap-1">
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                        </div>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Processing</span>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
