"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Send, Terminal, Cpu, Database, ChevronRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// --- Types ---
type MessageType = "user" | "agent" | "thought" | "tool-call" | "tool-result";

interface Message {
    id: string;
    type: MessageType;
    content: string;
    timestamp: number;
    metadata?: {
        toolName?: string;
        toolArgs?: string;
        executionTime?: string;
        status?: "running" | "success" | "error";
    };
}

// --- Simulation Data ---
const CANNED_RESPONSES = [
    {
        trigger: "default",
        steps: [
            { type: "thought", content: "User is asking for a general query. I should check the available tools first to see if I can retrieve relevant context." },
            { type: "tool-call", content: "security_policy_check", metadata: { toolName: "policy_guard", toolArgs: "{ level: 'high' }" } },
            { type: "tool-result", content: "Policy Check Passed: Access Granted. Rate limit: 1000req/min.", metadata: { status: "success", executionTime: "12ms" } },
            { type: "agent", content: "I am ready to process your request. The security policy check has passed, and I have access to the necessary resources. What would you like to know?" }
        ]
    },
    {
        trigger: "status",
        steps: [
            { type: "thought", content: "Retrieving system health metrics from the observability pipeline." },
            { type: "tool-call", content: "fetch_metrics", metadata: { toolName: "k8s_monitor", toolArgs: "{ namespace: 'prod', metric: 'cpu_usage' }" } },
            { type: "tool-result", content: "CPU Usage: 45%. Memory: 62%. All pods healthy.", metadata: { status: "success", executionTime: "145ms" } },
            { type: "agent", content: "System is operating within normal parameters. Cluster CPU usage is steady at 45%." }
        ]
    },
    {
        trigger: "data",
        steps: [
            { type: "thought", content: "User wants data access. I need to verify schema compatibility before generating SQL." },
            { type: "tool-call", content: "get_schema", metadata: { toolName: "unity_catalog", toolArgs: "{ table: 'sales_gold' }" } },
            { type: "tool-result", content: "Schema found: [id: int, revenue: double, region: string].", metadata: { status: "success", executionTime: "89ms" } },
            { type: "thought", content: "Schema contents confirmed. Formulating aggregation query." },
            { type: "agent", content: "I've confirmed the schema for 'sales_gold'. I can aggregate revenue by region for you. Shall I proceed?" }
        ]
    },
    {
        trigger: "simulate failure",
        steps: [
            { type: "agent", content: "🚨 ALERT RECEIVED: Job #9941 (ETL_Daily_Sales) has FAILED. Initializing triage..." },
            { type: "thought", content: "Received Webhook event. Job #9941 failed. I need to fetch the driver logs to understand the root cause." },
            { type: "tool-call", content: "jobs.triggers.get_run_output", metadata: { toolName: "databricks_sdk", toolArgs: "{ run_id: 9941, error_only: true }" } },
            { type: "tool-result", content: "ERROR: ExecutorLoss. Reasons: [Container killed by YARN for exceeding memory limits. 12.4GB of 12GB used. Consider boosting spark.executor.memory.]", metadata: { status: "success", executionTime: "412ms" } },
            { type: "thought", content: "Analysis confirmed: OutOfMemoryError (OOM). The executor needs more RAM. I will propose doubling the memory to 24GB." },
            { type: "tool-call", content: "jobs.update", metadata: { toolName: "databricks_sdk", toolArgs: "{ job_id: 5521, new_settings: { spark_executor_memory: '24g' } }" } },
            { type: "tool-result", content: "Job #5521 configuration updated successfully.", metadata: { status: "success", executionTime: "205ms" } },
            { type: "thought", content: "Fix applied. I should prompt the user to restart." },
            { type: "agent", content: "I've diagnosed the issue as an OOM error (Executor Memory). I have updated the job config to 24GB. Should I restart the job now?" }
        ]
    }
];

// --- Components ---

const Typewriter = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayed(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, 15); // Typing speed
        return () => clearInterval(timer);
    }, [text, onComplete]);

    return <span>{displayed}</span>;
}

export function McpChatInterface() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "init",
            type: "agent",
            content: "MCP Server Online. Neural Interface Ready. Waiting for input...",
            timestamp: Date.now()
        }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isProcessing) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            type: "user",
            content: input,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsProcessing(true);

        // Determine response flow
        const lowerInput = userMsg.content.toLowerCase();
        const flow = CANNED_RESPONSES.find(r => lowerInput.includes(r.trigger)) || CANNED_RESPONSES[0];

        // Execute "Step-by-Step" simulation
        for (const step of flow.steps) {
            await new Promise(r => setTimeout(r, 800 + Math.random() * 1000)); // "Thinking" delay

            const msg: Message = {
                id: Date.now().toString() + Math.random(),
                // @ts-ignore
                type: step.type,
                content: step.content,
                timestamp: Date.now(),
                // @ts-ignore
                metadata: step.metadata
            };

            setMessages(prev => [...prev, msg]);
        }

        setIsProcessing(false);
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] text-neutral-300 font-mono text-sm relative overflow-hidden">

            {/* Header / Status Bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-neutral-950/50 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs uppercase tracking-widest text-neutral-500">Connected: localhost:8080</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-600">
                    <div className="flex items-center gap-1.5">
                        <Cpu className="w-3 h-3" />
                        <span>v1.0.4</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3" />
                        <span>bash</span>
                    </div>
                </div>
            </div>

            {/* Message Stream */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth pb-32">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex gap-4 max-w-4xl",
                                msg.type === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                            {/* Avatar / Icon */}
                            <div className={cn(
                                "w-8 h-8 rounded flex items-center justify-center shrink-0 border mt-1",
                                msg.type === "user" ? "bg-white/10 border-white/20 text-white" :
                                    msg.type === "agent" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                                        msg.type === "thought" ? "bg-neutral-800 border-neutral-700 text-neutral-500" :
                                            "bg-amber-500/10 border-amber-500/30 text-amber-500"
                            )}>
                                {msg.type === "user" && <ChevronRight className="w-4 h-4" />}
                                {msg.type === "agent" && <Terminal className="w-4 h-4" />}
                                {msg.type === "thought" && <Loader2 className="w-4 h-4 animate-spin-slow" />}
                                {(msg.type === "tool-call" || msg.type === "tool-result") && <Database className="w-4 h-4" />}
                            </div>

                            {/* Content Bubble */}
                            <div className={cn(
                                "flex flex-col gap-1 min-w-[200px]",
                                msg.type === "user" ? "items-end" : "items-start"
                            )}>
                                {/* Metadata Header */}
                                {msg.type !== "user" && (
                                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold opacity-60">
                                        {msg.type === "agent" && <span className="text-blue-400">Assistant</span>}
                                        {msg.type === "thought" && <span className="text-neutral-500">Reasoning...</span>}
                                        {msg.type === "tool-call" && <span className="text-amber-500">Calling Tool: {msg.metadata?.toolName}</span>}
                                        {msg.type === "tool-result" && <span className="text-green-500">Result ({msg.metadata?.executionTime})</span>}
                                    </div>
                                )}

                                {/* Message Body */}
                                <div className={cn(
                                    "p-3 rounded text-sm leading-relaxed border",
                                    msg.type === "user" ? "bg-neutral-800 border-neutral-700 text-white" :
                                        msg.type === "agent" ? "bg-transparent border-transparent px-0 py-0" : // Clean text for agent
                                            msg.type === "thought" ? "bg-neutral-900/50 border-white/5 text-neutral-500 italic" :
                                                msg.type === "tool-call" ? "bg-[#0d1117] border-amber-900/30 font-mono text-amber-200 w-full" :
                                                    "bg-[#0d1117] border-green-900/30 font-mono text-green-200 w-full"
                                )}>
                                    {msg.type === "agent" ? (
                                        <Typewriter text={msg.content} />
                                    ) : (
                                        <span>{msg.content}</span>
                                    )}

                                    {/* Tool Call Args Visualization */}
                                    {msg.type === "tool-call" && msg.metadata?.toolArgs && (
                                        <div className="mt-2 text-xs text-neutral-500 font-mono opacity-70">
                                            ARGS: {msg.metadata.toolArgs}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Processing Indicator */}
                {isProcessing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-xs text-neutral-500 animate-pulse ml-12"
                    >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span>Processing request chain...</span>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 pt-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent z-20">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex items-center bg-neutral-900 rounded-lg border border-white/10 overflow-hidden">
                        <div className="pl-4 text-neutral-500">
                            <Terminal className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Execute command or ask question..."
                            disabled={isProcessing}
                            className="w-full bg-transparent border-none text-white px-4 py-4 focus:ring-0 placeholder:text-neutral-600 font-mono text-sm"
                            autoFocus
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isProcessing}
                            className="p-3 mr-1 text-neutral-400 hover:text-white disabled:opacity-50 transition-colors"
                        >
                            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
                <div className="flex justify-center gap-6 mt-3 text-[10px] text-neutral-600 uppercase tracking-widest font-mono">
                    <span>█ RAG Enabled</span>
                    <span>█ Tools: 14</span>
                    <span>█ Latency: 45ms</span>
                </div>
            </div>

            {/* Background Grid Ambience */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
}
