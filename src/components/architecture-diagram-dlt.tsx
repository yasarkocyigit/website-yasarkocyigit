"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// DLT Logic: Flow travels through Expectations (Quality) before hitting Silver/Gold
const CONNECTIONS: Record<string, string[]> = {
    'node-source': ['link-source-stream', 'node-stream', 'part-1'],
    'node-stream': ['link-source-stream', 'link-stream-bronze', 'node-source', 'node-bronze', 'part-1', 'part-2'],
    'node-bronze': ['link-stream-bronze', 'link-bronze-quality', 'node-stream', 'node-quality', 'part-2', 'part-dlt', 'link-dlt-bronze'],
    'node-quality': ['link-bronze-quality', 'link-quality-silver', 'node-bronze', 'node-silver', 'part-3', 'part-dlt'],
    'node-silver': ['link-quality-silver', 'link-silver-gold', 'node-quality', 'node-gold', 'part-3', 'part-4', 'part-dlt', 'link-dlt-silver'],
    'node-gold': ['link-silver-gold', 'link-gold-serve', 'node-silver', 'node-serve', 'part-4', 'part-5', 'part-dlt', 'link-dlt-gold'],
    'node-serve': ['link-gold-serve', 'node-gold', 'part-5'],
    'node-dlt': ['link-dlt-bronze', 'link-dlt-silver', 'link-dlt-gold', 'node-bronze', 'node-silver', 'node-gold', 'part-dlt'], // DLT manages compute/orchestration internally
    'node-unity': ['link-unity-bronze', 'link-unity-silver', 'link-unity-gold', 'node-bronze', 'node-silver', 'node-gold']
};

interface NodeData {
    id: string;
    title: string;
    desc: string;
    tech: string;
    type: 'source' | 'bronze' | 'silver' | 'gold' | 'serve' | 'control' | 'quality' | 'gov';
    x: number;
    y: number;
    badge?: string;
}

const NODES: NodeData[] = [
    { id: 'node-source', title: 'CONNECT', desc: 'Lakeflow Connect (Ingestion).', tech: 'Native Connectors', type: 'source', x: 50, y: 350, badge: 'INGEST' },
    { id: 'node-stream', title: 'STREAM', desc: 'Continuous data ingestion stream.', tech: 'Spark Stream', type: 'source', x: 200, y: 350, badge: 'MICRO-BATCH' },
    { id: 'node-bronze', title: 'BRONZE', desc: 'Raw ingestion table. Append only.', tech: 'Delta Lake', type: 'bronze', x: 360, y: 350, badge: 'AUTO LOAD' },
    { id: 'node-quality', title: 'QUALITY', desc: 'Constraint validation & Quarantine.', tech: 'Expectations', type: 'quality', x: 500, y: 350, badge: 'VALIDATE' },
    { id: 'node-silver', title: 'SILVER', desc: 'Cleaned, Refined, Validated Data.', tech: 'Delta Lake', type: 'silver', x: 640, y: 350, badge: 'CLEAN' },
    { id: 'node-gold', title: 'GOLD', desc: 'Aggregated Business Metrics.', tech: 'Delta Lake', type: 'gold', x: 800, y: 350, badge: 'AGG' },
    { id: 'node-serve', title: 'SERVING', desc: 'Real-time Dashboards.', tech: 'DBSQL', type: 'serve', x: 1000, y: 350, badge: 'REPORT' },
    { id: 'node-dlt', title: 'LAKEFLOW PIPELINES', desc: 'Spark Declarative Pipelines (SDP).', tech: 'Orchestrator', type: 'control', x: 490, y: 100 },
    { id: 'node-unity', title: 'GOVERNANCE', desc: 'Lineage, Access Control, Discovery.', tech: 'Unity Catalog', type: 'gov', x: 520, y: 550 },
];

export default function ArchitectureDiagramDLT() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const isFocused = (id: string) => {
        if (!hoveredNode) return false;
        if (hoveredNode === id) return true;
        return CONNECTIONS[hoveredNode]?.includes(id);
    };

    const getOpacity = (id: string) => {
        if (!hoveredNode) return 0.5; // Default lower opacity
        return isFocused(id) ? 1 : 0.1;
    };

    const getStroke = (id: string, defaultColor: string) => {
        if (isFocused(id)) return defaultColor;
        return '#262626';
    };

    return (
        <div className="w-full h-[500px] md:h-auto md:aspect-[2/1] relative bg-neutral-950 rounded-none overflow-hidden font-mono group">

            {/* Scrollable Container for Mobile */}
            <div className="w-full h-full overflow-x-auto pb-6 md:pb-0 scrollbar-hide">
                <div className="min-w-[800px] md:min-w-full h-full relative">

                    {/* Background Grid - Monochrome */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Header Overlay */}
                    <div className="absolute top-8 left-8 z-20 pointer-events-none border-l-2 border-white pl-4">
                        <h3 className="text-xl font-bold text-white tracking-widest uppercase">Lakeflow Architecture</h3>
                        <p className="text-xs text-neutral-500 mt-1">LAKEFLOW PIPELINES • CONNECT • CONTINUOUS</p>
                        <p className="text-[10px] text-blue-500 mt-1">● DECLARATIVE VIEW</p>
                    </div>

                    <svg className="w-full h-full relative z-10" viewBox="0 0 1200 600">
                        <defs>
                            <marker id="arrow-dlt" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#525252" />
                            </marker>
                        </defs>

                        {/* --- ZONES --- */}
                        {/* Orchestration Zone */}
                        <rect x="320" y="40" width="520" height="150" fill="none" stroke="#333" strokeDasharray="4,4" />
                        <text x="330" y="60" className="text-[10px] fill-neutral-500 tracking-widest uppercase">Orchestration & State Management</text>

                        {/* Streaming Zone */}
                        <rect x="300" y="270" width="600" height="160" fill="none" stroke="#333" />
                        <text x="310" y="290" className="text-[10px] fill-neutral-600 tracking-widest uppercase">Continuous Flow (Stream)</text>


                        {/* --- CONNECTIONS --- */}
                        <g className="transition-all duration-500 ease-out">

                            {/* Streaming Flow */}
                            <path id="link-source-stream" d="M 120 350 L 200 350" stroke={getStroke('link-source-stream', '#fff')} strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrow-dlt)" style={{ opacity: getOpacity('link-source-stream') }} />
                            <path id="link-stream-bronze" d="M 270 350 L 360 350" stroke={getStroke('link-stream-bronze', '#fff')} strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrow-dlt)" style={{ opacity: getOpacity('link-stream-bronze') }} />

                            <path id="link-bronze-quality" d="M 430 350 L 500 350" stroke={getStroke('link-bronze-quality', '#F59E0B')} strokeWidth="1" markerEnd="url(#arrow-dlt)" style={{ opacity: getOpacity('link-bronze-quality') }} />
                            <path id="link-quality-silver" d="M 570 350 L 640 350" stroke={getStroke('link-quality-silver', '#fff')} strokeWidth="1" markerEnd="url(#arrow-dlt)" style={{ opacity: getOpacity('link-quality-silver') }} />

                            <path id="link-silver-gold" d="M 710 350 L 800 350" stroke={getStroke('link-silver-gold', '#fff')} strokeWidth="1" markerEnd="url(#arrow-dlt)" style={{ opacity: getOpacity('link-silver-gold') }} />
                            <path id="link-gold-serve" d="M 870 350 L 1000 350" stroke={getStroke('link-gold-serve', '#fff')} strokeWidth="1" markerEnd="url(#arrow-dlt)" style={{ opacity: getOpacity('link-gold-serve') }} />

                            {/* DLT Management Links (Top Down) - Connected to Node Bottom (130) */}
                            <path id="link-dlt-bronze" d="M 580 130 L 580 220 L 400 220 L 400 290" fill="none" stroke={getStroke('link-dlt-bronze', '#3B82F6')} strokeWidth="1" strokeDasharray="4,4" style={{ opacity: getOpacity('link-dlt-bronze') }} />
                            <path id="link-dlt-silver" d="M 580 130 L 580 220 L 680 220 L 680 290" fill="none" stroke={getStroke('link-dlt-silver', '#3B82F6')} strokeWidth="1" strokeDasharray="4,4" style={{ opacity: getOpacity('link-dlt-silver') }} />
                            <path id="link-dlt-gold" d="M 580 130 L 580 220 L 840 220 L 840 290" fill="none" stroke={getStroke('link-dlt-gold', '#3B82F6')} strokeWidth="1" strokeDasharray="4,4" style={{ opacity: getOpacity('link-dlt-gold') }} />


                            {/* Governance Links (Unity Catalog) */}
                            <path id="link-unity-bronze" d="M 580 550 L 400 550 L 400 480" fill="none" stroke={getStroke('link-unity-bronze', '#10B981')} strokeWidth="1" strokeDasharray="2,2" style={{ opacity: getOpacity('link-unity-bronze') }} />
                            <path id="link-unity-silver" d="M 580 550 L 680 550 L 680 480" fill="none" stroke={getStroke('link-unity-silver', '#10B981')} strokeWidth="1" strokeDasharray="2,2" style={{ opacity: getOpacity('link-unity-silver') }} />
                            <path id="link-unity-gold" d="M 580 550 L 840 550 L 840 480" fill="none" stroke={getStroke('link-unity-gold', '#10B981')} strokeWidth="1" strokeDasharray="2,2" style={{ opacity: getOpacity('link-unity-gold') }} />

                        </g>


                        {/* --- NODES --- */}
                        {NODES.map((node) => {
                            const isActive = hoveredNode === node.id;
                            const isDimmed = hoveredNode && !isFocused(node.id);

                            let activeColor = '#ffffff';
                            if (node.type === 'control') activeColor = '#3B82F6'; // Blue for DLT
                            if (node.type === 'quality') activeColor = '#F59E0B'; // Amber for Quality
                            if (node.type === 'gov') activeColor = '#10B981';

                            // Compute width based on type
                            let w = 140;
                            if (node.id === 'node-dlt') w = 180; // WIDER for long text

                            let h = 60;
                            if (node.type === 'bronze' || node.type === 'silver' || node.type === 'gold') { w = 80; h = 80; } // Smaller squares
                            if (node.type === 'quality') { w = 80; h = 80; }
                            if (node.type === 'source') { w = 80; h = 80; }
                            if (node.type === 'gov') { w = 120; h = 40; }

                            return (
                                <g
                                    key={node.id}
                                    id={node.id}
                                    transform={`translate(${node.x}, ${node.y - (h / 2)})`} // Centered Y roughly
                                    className="cursor-pointer transition-all duration-300"
                                    style={{ opacity: isDimmed ? 0.3 : 1 }}
                                    onMouseEnter={() => setHoveredNode(node.id)}
                                    onMouseLeave={() => setHoveredNode(null)}
                                >
                                    <rect
                                        x="0" y="0" width={w} height={h}
                                        fill={isActive ? '#000' : '#0A0A0A'}
                                        stroke={isActive ? activeColor : '#333'}
                                        strokeWidth="1"
                                        rx={node.type === 'quality' ? 40 : 2} // Circle for Quality
                                        className="transition-colors duration-300"
                                    />

                                    {/* Inner Content */}
                                    {node.type === 'source' && (
                                        <text x={w / 2} y={h / 2 + 4} fill={isActive ? '#fff' : '#666'} textAnchor="middle" className="text-[10px] font-bold tracking-widest">SRC</text>
                                    )}

                                    {node.type === 'quality' && (
                                        <text x={w / 2} y={h / 2 + 4} fill={isActive ? '#F59E0B' : '#666'} textAnchor="middle" className="text-[10px] font-bold tracking-widest">?</text>
                                    )}

                                    {(node.type === 'bronze' || node.type === 'silver' || node.type === 'gold') && (
                                        <>
                                            <text x={w / 2} y={20} fill={isActive ? '#fff' : '#666'} textAnchor="middle" className="text-[10px] font-bold tracking-widest">{node.title.substring(0, 1)}</text>
                                            <rect x={w / 2 - 10} y={h / 2 - 5} width="20" height="20" fill="none" stroke={isActive ? '#fff' : '#333'} />
                                        </>
                                    )}


                                    {/* Labels for small nodes */}
                                    {(node.type === 'control' || node.type === 'gov' || node.type === 'serve') && (
                                        <text x={w / 2} y={h / 2 + 4} fill={isActive ? activeColor : '#666'} textAnchor="middle" className="text-[10px] font-bold tracking-widest uppercase">{node.title}</text>
                                    )}
                                    {(node.type !== 'control' && node.type !== 'gov' && node.type !== 'serve') && (
                                        <text x={w / 2} y={h + 15} fill={isActive ? '#fff' : '#444'} textAnchor="middle" className="text-[9px] uppercase tracking-wider">{node.title}</text>
                                    )}

                                </g>
                            );
                        })}

                    </svg>


                    {/* Float Tooltip - Technical Spec Style */}
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
                                                {node.badge && (
                                                    <div className="pt-2">
                                                        <span className="text-[9px] bg-white/10 px-2 py-1 rounded text-white font-mono">{node.badge}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
}
