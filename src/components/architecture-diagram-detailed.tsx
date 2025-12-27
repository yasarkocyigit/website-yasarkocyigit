"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Logic defining which nodes/paths light up when a specific node is hovered
const CONNECTIONS: Record<string, string[]> = {
    'node-source': ['link-source-bronze', 'part-1', 'node-bronze'],
    'node-bronze': ['link-source-bronze', 'link-bronze-silver', 'node-source', 'node-silver', 'part-1', 'part-2', 'link-adf-bronze', 'part-c2', 'link-unity-bronze'],
    'node-silver': ['link-bronze-silver', 'link-silver-gold', 'node-bronze', 'node-gold', 'part-2', 'part-3', 'link-adf-silver', 'link-unity-silver'],
    'node-gold': ['link-silver-gold', 'link-gold-serve', 'node-silver', 'node-serve', 'part-3', 'part-4', 'link-adf-gold', 'link-unity-gold'],
    'node-serve': ['link-gold-serve', 'node-gold', 'part-4'],
    'node-meta': ['link-adf-meta', 'node-adf', 'part-c1', 'link-kv-adf'], // KV linked to ADF/Meta often via secrets
    'node-adf': ['link-adf-meta', 'link-adf-bronze', 'link-adf-silver', 'link-adf-gold', 'node-meta', 'node-bronze', 'node-silver', 'node-gold', 'part-c1', 'part-c2', 'link-kv-adf', 'node-kv'],
    'node-kv': ['link-kv-adf', 'node-adf', 'link-kv-dbx', 'node-bronze', 'node-silver'], // KV serves secrets to DBX
    'node-unity': ['link-unity-bronze', 'link-unity-silver', 'link-unity-gold', 'node-bronze', 'node-silver', 'node-gold']
};

interface NodeData {
    id: string;
    title: string;
    desc: string;
    tech: string;
    type: 'source' | 'bronze' | 'silver' | 'gold' | 'serve' | 'control' | 'security' | 'gov';
    x: number;
    y: number;
    badge?: string;
}

const NODES: NodeData[] = [
    { id: 'node-source', title: 'SOURCE', desc: 'ERP, CRM, and APIs providing raw data.', tech: 'REST / SQL', type: 'source', x: 50, y: 390, badge: 'INGEST' },
    { id: 'node-bronze', title: 'BRONZE', desc: 'Raw ingestion. History preservation in original format.', tech: 'Delta / JSON', type: 'bronze', x: 360, y: 350, badge: 'RAW' },
    { id: 'node-silver', title: 'SILVER', desc: 'Cleansed, deduplicated, and validated data.', tech: 'Delta Lake', type: 'silver', x: 540, y: 350, badge: 'CLEAN' },
    { id: 'node-gold', title: 'GOLD', desc: 'Business aggregates and Star Schemas.', tech: 'Delta Lake', type: 'gold', x: 720, y: 350, badge: 'AGG' },
    { id: 'node-serve', title: 'SERVING', desc: 'Dashboards and Apps consuming refined data.', tech: 'Power BI', type: 'serve', x: 1000, y: 390, badge: 'REPORT' },
    { id: 'node-meta', title: 'METADATA', desc: 'Stores pipeline configs and watermarks.', tech: 'Azure SQL', type: 'control', x: 360, y: 100 },
    { id: 'node-adf', title: 'ORCHESTRATOR', desc: 'Triggers Compute via Notebook Activity.', tech: 'ADF + Databricks', type: 'control', x: 580, y: 100 },
    { id: 'node-kv', title: 'SECRETS', desc: 'Manages credentials and connection strings.', tech: 'Key Vault', type: 'security', x: 800, y: 100 },
    { id: 'node-unity', title: 'GOVERNANCE', desc: 'Centralized ACLs, Audit, and Lineage.', tech: 'Unity Catalog', type: 'gov', x: 540, y: 550 },
];

export default function ArchitectureDiagramDetailed() {
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

                    {/* Header Overlay - Architectural labeling */}
                    <div className="absolute top-8 left-8 z-20 pointer-events-none border-l-2 border-white pl-4">
                        <h3 className="text-xl font-bold text-white tracking-widest uppercase">System Architecture</h3>
                        <p className="text-xs text-neutral-500 mt-1">BATCH PROCESSING • MEDALLION ARCHITECTURE</p>
                        <p className="text-[10px] text-green-500 mt-1">● DETAILED VIEW</p>
                    </div>

                    <svg className="w-full h-full relative z-10" viewBox="0 0 1200 600">
                        <defs>
                            <marker id="arrow-arch" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#525252" />
                            </marker>
                        </defs>

                        {/* --- ZONES --- */}

                        {/* Control Plane Zone */}
                        <rect x="320" y="40" width="600" height="150" fill="none" stroke="#333" strokeDasharray="4,4" />
                        <text x="330" y="60" className="text-[10px] fill-neutral-600 tracking-widest uppercase">Control & Security Plane</text>

                        {/* Lakehouse Zone */}
                        <rect x="320" y="270" width="560" height="160" fill="none" stroke="#333" />
                        <text x="330" y="290" className="text-[10px] fill-neutral-600 tracking-widest uppercase">Lakehouse Storage</text>


                        {/* --- CONNECTIONS --- */}
                        <g className="transition-all duration-500 ease-out">
                            {/* Main Pipeline - Always Visible */}
                            <path id="link-source-bronze" d="M 190 420 L 360 420" stroke={getStroke('link-source-bronze', '#fff')} strokeWidth="1" markerEnd="url(#arrow-arch)" style={{ opacity: getOpacity('link-source-bronze') }} />
                            <path id="link-bronze-silver" d="M 480 420 L 540 420" stroke={getStroke('link-bronze-silver', '#fff')} strokeWidth="1" markerEnd="url(#arrow-arch)" style={{ opacity: getOpacity('link-bronze-silver') }} />
                            <path id="link-silver-gold" d="M 660 420 L 720 420" stroke={getStroke('link-silver-gold', '#fff')} strokeWidth="1" markerEnd="url(#arrow-arch)" style={{ opacity: getOpacity('link-silver-gold') }} />
                            <path id="link-gold-serve" d="M 840 420 L 1000 420" stroke={getStroke('link-gold-serve', '#fff')} strokeWidth="1" markerEnd="url(#arrow-arch)" style={{ opacity: getOpacity('link-gold-serve') }} />

                            {/* Basic Orchestration - Always Visible */}
                            <path id="link-adf-meta" d="M 580 130 L 500 130" stroke={getStroke('link-adf-meta', '#A855F7')} strokeWidth="1" strokeDasharray="4,4" markerEnd="url(#arrow-arch)" style={{ opacity: getOpacity('link-adf-meta') }} />

                            <path id="link-adf-bronze" d="M 650 160 L 650 220 L 420 220 L 420 350" fill="none" stroke={getStroke('link-adf-bronze', '#A855F7')} strokeWidth="1" strokeDasharray="4,4" style={{ opacity: getOpacity('link-adf-bronze') }} />
                            <path id="link-adf-silver" d="M 650 160 L 650 220 L 600 220 L 600 350" fill="none" stroke={getStroke('link-adf-silver', '#A855F7')} strokeWidth="1" strokeDasharray="4,4" style={{ opacity: getOpacity('link-adf-silver') }} />
                            <path id="link-adf-gold" d="M 650 160 L 650 220 L 780 220 L 780 350" fill="none" stroke={getStroke('link-adf-gold', '#A855F7')} strokeWidth="1" strokeDasharray="4,4" style={{ opacity: getOpacity('link-adf-gold') }} />


                            {/* Governance Links (Unity Catalog) */}
                            <path id="link-unity-bronze" d="M 540 550 L 420 550 L 420 470" fill="none" stroke={getStroke('link-unity-bronze', '#10B981')} strokeWidth="1" strokeDasharray="2,2" style={{ opacity: getOpacity('link-unity-bronze') }} />
                            <path id="link-unity-silver" d="M 600 550 L 600 470" fill="none" stroke={getStroke('link-unity-silver', '#10B981')} strokeWidth="1" strokeDasharray="2,2" style={{ opacity: getOpacity('link-unity-silver') }} />
                            <path id="link-unity-gold" d="M 660 550 L 780 550 L 780 470" fill="none" stroke={getStroke('link-unity-gold', '#10B981')} strokeWidth="1" strokeDasharray="2,2" style={{ opacity: getOpacity('link-unity-gold') }} />

                            {/* Key Vault */}
                            <path id="link-kv-adf" d="M 720 130 L 800 130" stroke={getStroke('link-kv-adf', '#F59E0B')} strokeWidth="1" strokeDasharray="4,4" style={{ opacity: getOpacity('link-kv-adf') }} />

                        </g>


                        {/* --- NODES --- */}
                        {NODES.map((node) => {
                            const isActive = hoveredNode === node.id;
                            const isDimmed = hoveredNode && !isFocused(node.id);

                            let activeColor = '#ffffff';
                            if (node.type === 'control') activeColor = '#A855F7';
                            if (node.type === 'security') activeColor = '#F59E0B';
                            if (node.type === 'gov') activeColor = '#10B981';

                            // Compute width based on type
                            let w = 140;
                            let h = 60;
                            if (node.type === 'bronze' || node.type === 'silver' || node.type === 'gold') { w = 120; h = 120; }
                            if (node.type === 'gov') { w = 120; h = 40; }

                            return (
                                <g
                                    key={node.id}
                                    id={node.id}
                                    transform={`translate(${node.x}, ${node.y})`}
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
                                        className="transition-colors duration-300"
                                    />

                                    {/* Inner Content Config */}
                                    {node.type === 'security' && <text x="10" y="20" fill="#F59E0B">KV</text>}

                                    {/* Standard Layers */}
                                    {(node.type === 'bronze' || node.type === 'silver' || node.type === 'gold') && (
                                        <>
                                            <text x="10" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">{node.title}</text>
                                            <rect x="40" y="50" width="40" height="40" fill="none" stroke={isActive ? '#fff' : '#333'} />
                                            <text x="60" y="74" textAnchor="middle" fill={isActive ? '#fff' : '#333'} className="text-[10px]">DELTA</text>
                                        </>
                                    )}

                                    {node.type === 'serve' && (
                                        <>
                                            <text x="10" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">BI & AI</text>
                                            <rect x="35" y="40" width="15" height="40" fill={isActive ? '#10B981' : '#333'} className="opacity-50" />
                                            <rect x="55" y="30" width="15" height="50" fill={isActive ? '#10B981' : '#333'} className="opacity-70" />
                                            <rect x="75" y="20" width="15" height="60" fill={isActive ? '#10B981' : '#333'} />
                                        </>
                                    )}
                                    {node.type === 'source' && (
                                        <>
                                            <text x="10" y="20" fill={isActive ? '#fff' : '#666'} className="text-[10px] font-bold tracking-widest">SRC</text>
                                            <text x="70" y="40" fill={isActive ? '#fff' : '#333'} textAnchor="middle" className="text-xs">SYSTEMS</text>
                                        </>
                                    )}

                                    {/* Control / Security / Gov */}
                                    {(node.type === 'control' || node.type === 'security' || node.type === 'gov') && (
                                        <text x={w / 2} y={h / 2 + 4} fill={isActive ? activeColor : '#666'} textAnchor="middle" className="text-[10px] font-bold tracking-widest uppercase">{node.title}</text>
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
