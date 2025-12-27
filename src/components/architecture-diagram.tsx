"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Logic defining which nodes/paths light up when a specific node is hovered
const CONNECTIONS: Record<string, string[]> = {
    'node-source': ['link-source-bronze', 'part-1', 'node-bronze'],
    'node-bronze': ['link-source-bronze', 'link-bronze-silver', 'node-source', 'node-silver', 'part-1', 'part-2', 'link-adf-bronze', 'part-c2'],
    'node-silver': ['link-bronze-silver', 'link-silver-gold', 'node-bronze', 'node-gold', 'part-2', 'part-3', 'link-adf-silver'],
    'node-gold': ['link-silver-gold', 'link-gold-serve', 'node-silver', 'node-serve', 'part-3', 'part-4', 'link-adf-gold'],
    'node-serve': ['link-gold-serve', 'node-gold', 'part-4'],
    'node-meta': ['link-adf-meta', 'node-adf', 'part-c1'],
    'node-adf': ['link-adf-meta', 'link-adf-bronze', 'link-adf-silver', 'link-adf-gold', 'node-meta', 'node-bronze', 'node-silver', 'node-gold', 'part-c1', 'part-c2']
};

interface NodeData {
    id: string;
    title: string;
    desc: string;
    tech: string;
    type: 'source' | 'bronze' | 'silver' | 'gold' | 'serve' | 'control';
    x: number;
    y: number;
    badge?: string;
}

const NODES: NodeData[] = [
    { id: 'node-source', title: 'SOURCE', desc: 'ERP, CRM, and APIs providing raw data.', tech: 'REST / SQL', type: 'source', x: 50, y: 280, badge: 'INGEST' },
    { id: 'node-bronze', title: 'BRONZE', desc: 'Raw ingestion. History preservation in original format.', tech: 'Delta / JSON', type: 'bronze', x: 360, y: 280, badge: 'RAW' },
    { id: 'node-silver', title: 'SILVER', desc: 'Cleansed, deduplicated, and validated data.', tech: 'Delta Lake', type: 'silver', x: 540, y: 280, badge: 'CLEAN' },
    { id: 'node-gold', title: 'GOLD', desc: 'Business aggregates and Star Schemas.', tech: 'Delta Lake', type: 'gold', x: 720, y: 280, badge: 'AGG' },
    { id: 'node-serve', title: 'SERVING', desc: 'Dashboards and Apps consuming refined data.', tech: 'Power BI', type: 'serve', x: 1000, y: 280, badge: 'REPORT' },
    { id: 'node-meta', title: 'METADATA', desc: 'Stores pipeline configs and watermarks.', tech: 'Azure SQL', type: 'control', x: 420, y: 70 },
    { id: 'node-adf', title: 'ORCHESTRATOR', desc: 'Triggers compute based on metadata.', tech: 'Data Factory', type: 'control', x: 640, y: 70 },
];

export default function ArchitectureDiagram() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const isFocused = (id: string) => {
        if (!hoveredNode) return false;
        if (hoveredNode === id) return true;
        return CONNECTIONS[hoveredNode]?.includes(id);
    };

    const getOpacity = (id: string) => {
        if (!hoveredNode) return 0.5; // Default lower opacity for clean look
        return isFocused(id) ? 1 : 0.1;
    };

    const getStroke = (id: string, defaultColor: string) => {
        if (isFocused(id)) return defaultColor;
        return '#262626'; // Very subtle neutral-800 for inactive
    };

    return (
        <div className="w-full relative bg-neutral-950 rounded-none overflow-hidden font-mono group">
            {/* Header Overlay - Architectural labeling */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none border-l-2 border-white pl-4">
                <h3 className="text-lg font-bold text-white tracking-widest uppercase">System Architecture</h3>
                <p className="text-[10px] text-neutral-500 mt-1">BATCH PROCESSING • MEDALLION ARCHITECTURE</p>
            </div>

            {/* Background Grid - Monochrome */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Desktop & Mobile Unified - Horizontal Scroll on Mobile */}
            <div className="w-full overflow-x-auto pb-6 md:pb-0 scrollbar-hide">
                <div className="min-w-[800px] md:min-w-full aspect-[2/1]">
                    <svg className="w-full h-full relative z-10" viewBox="0 0 1200 600">
                        <defs>
                            <marker id="arrow-arch" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#525252" />
                            </marker>
                        </defs>

                        {/* Zones */}
                        <rect x="380" y="40" width="440" height="120" fill="none" stroke="#333" strokeDasharray="4,4" />
                        <text x="390" y="60" className="text-[10px] fill-neutral-600 tracking-widest uppercase">Control Plane</text>

                        <rect x="320" y="200" width="560" height="320" fill="none" stroke="#333" />
                        <text x="330" y="500" className="text-[10px] fill-neutral-600 tracking-widest uppercase">Lakehouse Storage</text>

                        {/* Paths */}
                        <g className="transition-all duration-500 ease-out">
                            <path id="link-source-bronze" d="M 190 350 L 360 350" stroke={getStroke('link-source-bronze', '#fff')} strokeWidth="1" markerEnd="url(#arrow-arch)" style={{ opacity: getOpacity('link-source-bronze') }} />
                            <path id="link-bronze-silver" d="M 480 350 L 540 350" stroke={getStroke('link-bronze-silver', '#fff')} strokeWidth="1" markerEnd="url(#arrow-arch)" style={{ opacity: getOpacity('link-bronze-silver') }} />
                            <path id="link-silver-gold" d="M 660 350 L 720 350" stroke={getStroke('link-silver-gold', '#fff')} strokeWidth="1" markerEnd="url(#arrow-arch)" style={{ opacity: getOpacity('link-silver-gold') }} />
                            <path id="link-gold-serve" d="M 840 350 L 1000 350" stroke={getStroke('link-gold-serve', '#fff')} strokeWidth="1" markerEnd="url(#arrow-arch)" style={{ opacity: getOpacity('link-gold-serve') }} />

                            <path id="link-adf-meta" d="M 640 100 L 560 100" stroke={getStroke('link-adf-meta', '#A855F7')} strokeWidth="1" strokeDasharray="4,4" markerEnd="url(#arrow-arch)" style={{ opacity: getOpacity('link-adf-meta') }} />
                            <path id="link-adf-bronze" d="M 710 130 L 710 160 L 420 160 L 420 280" fill="none" stroke={getStroke('link-adf-bronze', '#A855F7')} strokeWidth="1" strokeDasharray="4,4" style={{ opacity: getOpacity('link-adf-bronze') }} />
                            <path id="link-adf-silver" d="M 710 130 L 710 160 L 600 160 L 600 280" fill="none" stroke={getStroke('link-adf-silver', '#A855F7')} strokeWidth="1" strokeDasharray="4,4" style={{ opacity: getOpacity('link-adf-silver') }} />
                            <path id="link-adf-gold" d="M 710 130 L 710 160 L 780 160 L 780 280" fill="none" stroke={getStroke('link-adf-gold', '#A855F7')} strokeWidth="1" strokeDasharray="4,4" style={{ opacity: getOpacity('link-adf-gold') }} />
                        </g>

                        {/* Nodes */}
                        {NODES.map((node) => (
                            <NodeGroup key={node.id} node={node} isActive={hoveredNode === node.id} isDimmed={hoveredNode && !isFocused(node.id) || false} setHoveredNode={setHoveredNode} />
                        ))}
                    </svg>
                </div>
            </div>

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

// Extracted for cleaner duplicate rendering
function NodeGroup({ node, isActive, isDimmed, setHoveredNode }: { node: NodeData, isActive: boolean, isDimmed: boolean, setHoveredNode: (id: string | null) => void }) {
    let activeColor = '#ffffff';
    if (node.type === 'control') activeColor = '#A855F7';

    return (
        <g
            id={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            className="cursor-pointer transition-all duration-300"
            style={{ opacity: isDimmed ? 0.3 : 1 }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            // For mobile tap
            onClick={() => setHoveredNode(isActive ? null : node.id)}
        >
            {/* Node Box */}
            <rect
                x="0" y="0"
                width={node.type === 'control' ? 140 : (node.type === 'bronze' || node.type === 'silver' || node.type === 'gold' ? 120 : 140)}
                height={node.type === 'control' ? 60 : 140}
                fill={isActive ? '#000' : '#0A0A0A'}
                stroke={isActive ? activeColor : '#333'}
                strokeWidth={isActive ? 1 : 1}
                className="transition-colors duration-300"
            />

            {/* Inner Content */}
            {node.type === 'bronze' && (
                <>
                    <text x="10" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">BRONZE</text>
                    <circle cx="60" cy="70" r="20" fill="none" stroke={isActive ? '#D97706' : '#333'} strokeWidth="1" />
                    <text x="60" y="74" textAnchor="middle" fill={isActive ? '#fff' : '#333'} className="text-[10px]">RAW</text>
                </>
            )}
            {node.type === 'silver' && (
                <>
                    <text x="10" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">SILVER</text>
                    <rect x="40" y="50" width="40" height="40" fill="none" stroke={isActive ? '#94A3B8' : '#333'} strokeWidth="1" />
                    <text x="60" y="74" textAnchor="middle" fill={isActive ? '#fff' : '#333'} className="text-[10px]">CLN</text>
                </>
            )}
            {node.type === 'gold' && (
                <>
                    <text x="10" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">GOLD</text>
                    <path d="M 60 45 L 80 85 L 40 85 Z" fill="none" stroke={isActive ? '#EAB308' : '#333'} strokeWidth="1" />
                    <text x="60" y="78" textAnchor="middle" fill={isActive ? '#fff' : '#333'} className="text-[10px]">AGG</text>
                </>
            )}
            {node.type === 'serve' && (
                <>
                    <text x="10" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">BI & AI</text>
                    <rect x="35" y="50" width="15" height="40" fill={isActive ? '#10B981' : '#333'} className="opacity-50" />
                    <rect x="55" y="40" width="15" height="50" fill={isActive ? '#10B981' : '#333'} className="opacity-70" />
                    <rect x="75" y="30" width="15" height="60" fill={isActive ? '#10B981' : '#333'} />
                </>
            )}
            {node.type === 'source' && (
                <>
                    <text x="10" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">SRC</text>
                    <text x="70" y="70" fill={isActive ? '#fff' : '#333'} textAnchor="middle" className="text-xs">SYSTEMS</text>
                </>
            )}
            {node.type === 'control' && (
                <>
                    <text x="70" y="35" fill={isActive ? '#A855F7' : '#666'} textAnchor="middle" className="text-[10px] font-bold tracking-widest uppercase">{node.title}</text>
                </>
            )}
        </g>
    );
}
