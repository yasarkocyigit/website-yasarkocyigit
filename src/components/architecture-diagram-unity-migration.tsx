"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Logic: Comparison between Legacy (Hive) and Modern (Unity)
const CONNECTIONS: Record<string, string[]> = {
    // Legacy Side
    'node-hms': ['link-hms-ext', 'node-ext-loc', 'part-legacy'],
    'node-ext-loc': ['link-hms-ext', 'node-hms', 'part-legacy'],
    'node-legacy-cluster': ['link-legacy-hms', 'node-hms'],

    // Migration Bridges
    'node-sync': ['link-sync', 'node-hms', 'node-uc'],
    'node-clone': ['link-clone', 'node-hms', 'node-uc'],

    // Modern Side
    'node-uc': ['link-uc-vol', 'node-vol', 'link-uc-share', 'node-share', 'part-modern', 'link-uc-gov'],
    'node-vol': ['link-uc-vol', 'node-uc', 'part-modern'],
    'node-share': ['link-uc-share', 'node-uc', 'part-modern'],
    'node-modern-cluster': ['link-modern-uc', 'node-uc']
};

interface NodeData {
    id: string;
    title: string;
    desc: string;
    tech: string;
    type: 'legacy' | 'modern' | 'migration' | 'resource';
    x: number;
    y: number;
    badge?: string;
}

const NODES: NodeData[] = [
    // Legacy (Left)
    { id: 'node-hms', title: 'HIVE METASTORE', desc: 'Legacy Metadata. No fine-grained ACLs.', tech: 'HMS', type: 'legacy', x: 200, y: 250, badge: 'LEGACY' },
    { id: 'node-ext-loc', title: 'EXTERNAL LOC', desc: 'S3/ADLS Root. Direct File Access.', tech: 'Cloud Storage', type: 'resource', x: 200, y: 450, badge: 'UNMANAGED' },
    { id: 'node-legacy-cluster', title: 'STANDARD CLUSTER', desc: 'No Unity Support. Instance Profile Auth.', tech: 'Compute', type: 'resource', x: 200, y: 100, badge: 'INSECURE' },

    // Migration Tools (Center)
    { id: 'node-sync', title: 'SYNC', desc: 'Syncs metadata for Ext Tables.', tech: 'SYNC TOOL', type: 'migration', x: 600, y: 200, badge: 'META ONLY' },
    { id: 'node-clone', title: 'DEEP CLONE', desc: 'Copies Data + Meta for Managed.', tech: 'DELTA CLONE', type: 'migration', x: 600, y: 300, badge: 'FULL COPY' },

    // Modern (Right)
    { id: 'node-uc', title: 'UNITY CATALOG', desc: 'Central Governance. Lineage & Audit.', tech: 'Unity Catalog', type: 'modern', x: 1000, y: 250, badge: 'GOVERNED' },
    { id: 'node-vol', title: 'MANAGED VOLUME', desc: 'Governed Storage. No direct file access.', tech: 'UC Volume', type: 'resource', x: 1000, y: 450, badge: 'MANAGED' },
    { id: 'node-share', title: 'DELTA SHARING', desc: 'Secure cross-organization sharing.', tech: 'Delta Share', type: 'resource', x: 1150, y: 250, badge: 'SHARE' },
    { id: 'node-modern-cluster', title: 'SHARED CLUSTER', desc: 'User Isolation. Row Level Security.', tech: 'UC Compute', type: 'resource', x: 1000, y: 100, badge: 'SECURE' },
];

export default function ArchitectureDiagramUnityMigration() {
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

    return (
        <div className="w-full h-[500px] md:h-auto md:aspect-[2/1] relative bg-neutral-950 rounded-none overflow-hidden font-mono group">

            {/* Scrollable Container for Mobile */}
            <div className="w-full h-full overflow-x-auto pb-6 md:pb-0 scrollbar-hide">
                <div className="min-w-[800px] md:min-w-full h-full relative">

                    {/* Background Split */}
                    <div className="absolute inset-0 flex pointer-events-none">
                        <div className="w-1/2 h-full bg-red-900/5 border-r border-red-900/20 relative">
                            <div className="absolute bottom-4 left-4 text-red-500/20 text-[100px] font-bold leading-none select-none">LEGACY</div>
                        </div>
                        <div className="w-1/2 h-full bg-blue-900/5 relative">
                            <div className="absolute bottom-4 right-4 text-blue-500/20 text-[100px] font-bold leading-none select-none">MODERN</div>
                        </div>
                    </div>

                    {/* Header Overlay */}
                    <div className="absolute top-8 left-8 z-20 pointer-events-none border-l-2 border-white pl-4">
                        <h3 className="text-xl font-bold text-white tracking-widest uppercase">Metastore Migration</h3>
                        <p className="text-xs text-neutral-500 mt-1">HIVE METASTORE ➔ UNITY CATALOG</p>
                        <p className="text-[10px] text-amber-500 mt-1">● MIGRATION PATH</p>
                    </div>

                    <svg className="w-full h-full relative z-10" viewBox="0 0 1200 600">
                        <defs>
                            <marker id="arrow-mig" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#525252" />
                            </marker>
                            <marker id="arrow-mig-active" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#fff" />
                            </marker>
                        </defs>

                        {/* --- CONNECTIONS --- */}
                        <g className="transition-all duration-500 ease-out">

                            {/* Legacy Stack */}
                            <path id="link-legacy-hms" d="M 200 130 L 200 210" stroke={getStroke('link-legacy-hms', '#ef4444')} strokeWidth="1" markerEnd="url(#arrow-mig)" style={{ opacity: getOpacity('link-legacy-hms') }} />
                            <path id="link-hms-ext" d="M 200 290 L 200 410" stroke={getStroke('link-hms-ext', '#ef4444')} strokeWidth="1" strokeDasharray="4,4" markerEnd="url(#arrow-mig)" style={{ opacity: getOpacity('link-hms-ext') }} />

                            {/* Migration Bridges */}
                            <path id="link-sync" d="M 260 250 L 540 200 L 940 250" fill="none" stroke={getStroke('link-sync', '#F59E0B')} strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrow-mig-active)" style={{ opacity: getOpacity('link-sync') }} />
                            <text x="600" y="190" fill="#F59E0B" textAnchor="middle" className="text-[10px] tracking-wider opacity-50">SYNC (EXTERNAL)</text>

                            <path id="link-clone" d="M 260 250 L 540 300 L 940 250" fill="none" stroke={getStroke('link-clone', '#10B981')} strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrow-mig-active)" style={{ opacity: getOpacity('link-clone') }} />
                            <text x="600" y="340" fill="#10B981" textAnchor="middle" className="text-[10px] tracking-wider opacity-50">CLONE (MANAGED)</text>


                            {/* Modern Stack */}
                            <path id="link-modern-uc" d="M 1000 130 L 1000 210" stroke={getStroke('link-modern-uc', '#3B82F6')} strokeWidth="1" markerEnd="url(#arrow-mig)" style={{ opacity: getOpacity('link-modern-uc') }} />
                            <path id="link-uc-vol" d="M 1000 290 L 1000 410" stroke={getStroke('link-uc-vol', '#3B82F6')} strokeWidth="1" markerEnd="url(#arrow-mig)" style={{ opacity: getOpacity('link-uc-vol') }} />
                            <path id="link-uc-share" d="M 1060 250 L 1150 250" stroke={getStroke('link-uc-share', '#3B82F6')} strokeWidth="1" strokeDasharray="2,2" markerEnd="url(#arrow-mig)" style={{ opacity: getOpacity('link-uc-share') }} />

                        </g>

                        {/* --- NODES --- */}
                        {NODES.map((node) => {
                            const isActive = hoveredNode === node.id;
                            const isDimmed = hoveredNode && !isFocused(node.id);

                            let activeColor = '#ffffff';
                            if (node.type === 'legacy') activeColor = '#ef4444';
                            if (node.type === 'modern') activeColor = '#3B82F6';
                            if (node.type === 'migration') activeColor = '#F59E0B';

                            // Size
                            let w = 120;
                            let h = 80;
                            if (node.type === 'migration') { w = 100; h = 40; }
                            if (node.id === 'node-share') { w = 80; h = 80; }

                            return (
                                <g
                                    key={node.id}
                                    id={node.id}
                                    transform={`translate(${node.x - w / 2}, ${node.y - h / 2})`}
                                    className="cursor-pointer transition-all duration-300"
                                    style={{ opacity: isDimmed ? 0.3 : 1 }}
                                    onMouseEnter={() => setHoveredNode(node.id)}
                                    onMouseLeave={() => setHoveredNode(null)}
                                >
                                    <rect
                                        x="0" y="0" width={w} height={h}
                                        fill={isActive ? '#000' : '#0A0A0A'}
                                        stroke={isActive ? activeColor : '#333'}
                                        strokeWidth={isActive ? 2 : 1}
                                        className="transition-colors duration-300"
                                    />

                                    {/* Content */}
                                    <text x={w / 2} y={h / 2 - 5} fill={isActive ? activeColor : '#888'} textAnchor="middle" className="text-[10px] font-bold tracking-widest uppercase">{node.title.split(' ')[0]}</text>
                                    <text x={w / 2} y={h / 2 + 10} fill={isActive ? '#fff' : '#666'} textAnchor="middle" className="text-[10px] font-bold tracking-widest uppercase">{node.title.split(' ')[1]}</text>

                                    {node.badge && (
                                        <rect x={w - 40} y="-10" width="50" height="20" rx="2" fill={activeColor} className="opacity-80" />
                                    )}
                                    {node.badge && (
                                        <text x={w - 15} y="3" fill="#000" textAnchor="middle" className="text-[9px] font-bold">{node.badge}</text>
                                    )}
                                </g>
                            );
                        })}

                    </svg>

                    {/* Tooltip */}
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
                                                <p className="text-[10px] text-neutral-500 font-mono mt-1">TYPE: {node.type.toUpperCase()}</p>
                                            </div>
                                            <p className="text-xs text-neutral-300 leading-relaxed">{node.desc}</p>
                                            <p className="text-[10px] text-neutral-500 font-mono mt-2">TECH: {node.tech}</p>
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
