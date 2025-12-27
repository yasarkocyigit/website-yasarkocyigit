"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Connections logic
const CONNECTIONS: Record<string, string[]> = {
    'node-source': ['link-src-broker', 'node-broker'],
    'node-broker': ['link-src-broker', 'link-broker-bronze', 'node-source', 'node-bronze'],
    'node-bronze': ['link-broker-bronze', 'link-bronze-silver', 'node-broker', 'node-silver'],
    'node-silver': ['link-bronze-silver', 'link-silver-gold', 'node-bronze', 'node-gold'],
    'node-gold': ['link-silver-gold', 'link-gold-serve', 'node-silver', 'node-serve'],
    'node-serve': ['link-gold-serve', 'node-gold']
};

interface NodeData {
    id: string;
    title: string;
    desc: string;
    tech: string;
    type: 'source' | 'broker' | 'stream' | 'serve';
    x: number;
    y: number;
    badge?: string;
    width?: number;
    height?: number;
}

const NODES: NodeData[] = [
    { id: 'node-source', title: 'STREAM SOURCES', desc: 'IoT devices, Kafka Producers, App Logs, and CDC feeds.', tech: 'IoT / JSON', type: 'source', x: 50, y: 150 },
    { id: 'node-broker', title: 'EVENT BROKER', desc: 'High-throughput buffer. Decouples producers/consumers.', tech: 'Event Hubs / Kafka', type: 'broker', x: 450, y: 60, width: 300, height: 80 },
    { id: 'node-bronze', title: 'RAW STREAM', desc: 'Raw ingestion. Appends data as-is via Spark.', tech: 'Spark / Autoloader', type: 'stream', x: 360, y: 280, badge: 'APPEND' },
    { id: 'node-silver', title: 'SILVER STREAM', desc: 'Filters, cleans, and joins streams. Handles watermarking.', tech: 'Delta Live Tables', type: 'stream', x: 540, y: 280, badge: 'CLEAN' },
    { id: 'node-gold', title: 'GOLD STREAM', desc: 'Real-time aggregations (Windowing). Computes metrics.', tech: 'Materialized Views', type: 'stream', x: 720, y: 280, badge: 'AGG' },
    { id: 'node-serve', title: 'LIVE DASH', desc: 'Power BI (Direct Query) or Custom Apps consuming metrics.', tech: 'API / Push', type: 'serve', x: 1000, y: 280, badge: 'SUB-SEC' },
];

export default function StreamingArchitectureDiagram() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const isFocused = (id: string) => {
        if (!hoveredNode) return false;
        if (hoveredNode === id) return true;
        return CONNECTIONS[hoveredNode]?.includes(id);
    };

    const getOpacity = (id: string) => {
        if (!hoveredNode) return 0.5;
        return isFocused(id) ? 1 : 0.1;
    };

    const getStroke = (id: string, defaultColor: string) => {
        if (isFocused(id)) return defaultColor;
        return '#262626';
    };

    // Shared Node Rendering Group to keep DRY across Mobile/Desktop
    const renderNode = (node: NodeData, xOverride?: number, yOverride?: number) => {
        const x = xOverride ?? node.x;
        const y = yOverride ?? node.y;

        const isActive = hoveredNode === node.id;
        const isDimmed = hoveredNode && !isFocused(node.id);

        let activeColor = '#ffffff';
        if (node.type === 'source') activeColor = '#EC4899';
        if (node.type === 'broker') activeColor = '#D946EF';
        if (node.type === 'serve') activeColor = '#10B981';

        return (
            <g
                key={node.id}
                id={node.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: isDimmed ? 0.3 : 1 }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setHoveredNode(isActive ? null : node.id)}
            >
                <rect
                    x="0" y="0"
                    width={node.width || (node.type === 'stream' ? 120 : 140)}
                    height={node.height || 140}
                    fill={isActive ? '#000' : '#0A0A0A'}
                    stroke={isActive ? activeColor : '#333'}
                    strokeWidth={isActive ? 1 : 1}
                    className="transition-colors duration-300"
                />

                {/* Inner Visuals */}
                {node.type === 'source' && (
                    <>
                        <text x="10" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">IoT</text>
                        <text x="70" y="70" fill={isActive ? '#fff' : '#333'} textAnchor="middle" className="text-xs">SENSORS</text>
                    </>
                )}
                {node.type === 'broker' && (
                    <>
                        <text x="20" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">EVENT HUB</text>
                        <text x="150" y="45" fill={isActive ? '#fff' : '#333'} textAnchor="middle" className="text-sm tracking-tight">BUFFER ZONE</text>
                    </>
                )}
                {node.type === 'stream' && (
                    <>
                        <text x="10" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">{node.id.split('-')[1].toUpperCase()}</text>
                        <path d="M 40 70 Q 60 50 80 70 T 120 70" fill="none" stroke={isActive ? '#fff' : '#333'} strokeWidth="1" transform="translate(-20, 0)" />
                    </>
                )}
                {node.type === 'serve' && (
                    <>
                        <text x="10" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">LIVE</text>
                        <circle cx="70" cy="70" r="4" fill={isActive ? '#10B981' : '#333'} className={isActive ? 'animate-pulse' : ''} />
                    </>
                )}
            </g>
        );
    };

    return (
        <div className="w-full relative bg-neutral-950 rounded-none border border-neutral-800 overflow-hidden font-mono group">

            {/* Background Grid - Monochrome */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Header Overlay */}
            <div className="absolute top-8 left-8 z-20 pointer-events-none border-l-2 border-white pl-4">
                <h3 className="text-xl font-bold text-white tracking-widest uppercase">Streaming Pipeline</h3>
                <p className="text-xs text-neutral-500 mt-1">REAL-TIME • LOW LATENCY</p>
            </div>

            {/* Desktop & Mobile Unified - Horizontal Scroll on Mobile */}
            <div className="w-full h-[700px] overflow-x-auto pb-6 md:pb-0 scrollbar-hide">
                <div className="min-w-[800px] md:min-w-full h-full relative">
                    <svg className="w-full h-full relative z-10" viewBox="0 0 1200 600">
                        <defs>
                            <marker id="arrow-stream" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#525252" />
                            </marker>
                        </defs>

                        {/* Zones */}
                        <rect x="300" y="40" width="600" height="120" fill="none" stroke="#333" strokeDasharray="4,4" />
                        <text x="310" y="60" className="text-[10px] fill-neutral-600 tracking-widest uppercase">Ingestion Layer</text>

                        <rect x="320" y="200" width="560" height="320" fill="none" stroke="#333" />
                        <text x="330" y="500" className="text-[10px] fill-neutral-600 tracking-widest uppercase">Stream Processing</text>

                        {/* Connections */}
                        <g className="transition-all duration-500">
                            <path id="link-src-broker" d="M 120 150 L 120 100 L 450 100" stroke={getStroke('link-src-broker', '#fff')} strokeWidth="1" fill="none" markerEnd="url(#arrow-stream)" style={{ opacity: getOpacity('link-src-broker') }} />
                            <path id="link-broker-bronze" d="M 600 140 L 600 200 L 420 200 L 420 280" stroke={getStroke('link-broker-bronze', '#fff')} strokeWidth="1" fill="none" markerEnd="url(#arrow-stream)" style={{ opacity: getOpacity('link-broker-bronze') }} />
                            <path id="link-bronze-silver" d="M 480 350 L 540 350" stroke={getStroke('link-bronze-silver', '#fff')} strokeWidth="1" fill="none" markerEnd="url(#arrow-stream)" style={{ opacity: getOpacity('link-bronze-silver') }} />
                            <path id="link-silver-gold" d="M 660 350 L 720 350" stroke={getStroke('link-silver-gold', '#fff')} strokeWidth="1" fill="none" markerEnd="url(#arrow-stream)" style={{ opacity: getOpacity('link-silver-gold') }} />
                            <path id="link-gold-serve" d="M 840 350 L 1000 350" stroke={getStroke('link-gold-serve', '#fff')} strokeWidth="1" fill="none" markerEnd="url(#arrow-stream)" style={{ opacity: getOpacity('link-gold-serve') }} />
                        </g>

                        {/* Ambient Particles */}
                        <g className="pointer-events-none">
                            <circle r="2" fill="#d946ef" style={{ opacity: getOpacity('link-src-broker') }}>
                                <animateMotion dur="1s" repeatCount="indefinite" path="M 120 150 L 120 100 L 450 100" />
                            </circle>
                        </g>

                        {/* Nodes - Desktop */}
                        {NODES.map((node) => renderNode(node))}
                    </svg>
                </div>
            </div>

            {/* Float Tooltip */}
            <AnimatePresence>
                {hoveredNode && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-8 right-8 w-64 bg-black border border-white/20 p-4 z-50 pointer-events-none"
                    >
                        {(() => {
                            const node = NODES.find(n => n.id === hoveredNode);
                            if (!node) return null;
                            return (
                                <div className="space-y-4">
                                    <div className="border-b border-white/20 pb-2">
                                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">{node.title}</h4>
                                        <p className="text-[10px] text-neutral-500 font-mono mt-1">ID: {node.id.toUpperCase()}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-[10px] text-neutral-500 uppercase">Description</p>
                                            <p className="text-xs text-neutral-300 leading-relaxed">{node.desc}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-neutral-500 uppercase">Technology</p>
                                            <p className="text-xs font-mono text-white">{node.tech}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
