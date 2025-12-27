"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Logic: Warehouse -> Semantic Layer -> Viz
const CONNECTIONS: Record<string, string[]> = {
    'node-wh': ['link-wh-sem', 'node-sem', 'part-1'],
    'node-sem': ['link-wh-sem', 'link-sem-rep', 'link-sem-dash', 'link-sem-excel', 'node-wh', 'node-rep', 'node-dash', 'node-excel', 'part-1', 'part-2'],
    'node-rep': ['link-sem-rep', 'node-sem'],
    'node-dash': ['link-sem-dash', 'node-sem'],
    'node-excel': ['link-sem-excel', 'node-sem'],
    'node-gov': ['node-sem', 'node-rep', 'node-dash']
};

interface NodeData {
    id: string;
    title: string;
    desc: string;
    tech: string;
    type: 'source' | 'semantic' | 'viz' | 'gov';
    x: number;
    y: number;
    badge?: string;
}

const NODES: NodeData[] = [
    { id: 'node-wh', title: 'WAREHOUSE', desc: 'Gold Layer (Star Schema).', tech: 'Delta Lake', type: 'source', x: 150, y: 300, badge: 'SOURCE' },
    { id: 'node-sem', title: 'SEMANTIC MODEL', desc: 'The "One Truth". KPIs & Measures.', tech: 'Power BI / AAS', type: 'semantic', x: 500, y: 300, badge: 'MODEL' },
    { id: 'node-rep', title: 'REPORTS', desc: 'Pixel-perfect interactive reports.', tech: 'Power BI', type: 'viz', x: 850, y: 150, badge: 'INTERACTIVE' },
    { id: 'node-dash', title: 'DASHBOARDS', desc: 'Executive high-level KPIs.', tech: 'Power BI App', type: 'viz', x: 850, y: 300, badge: 'EXECUTIVE' },
    { id: 'node-excel', title: 'SELF SERVICE', desc: 'Ad-hoc analysis via "Analyze in Excel".', tech: 'Excel', type: 'viz', x: 850, y: 450, badge: 'AD-HOC' },
    { id: 'node-gov', title: 'GOVERNANCE', desc: 'Row-Level Security (RLS) & OLS.', tech: 'Purview', type: 'gov', x: 500, y: 500 },
];

export default function AnalyticsArchitectureDiagram() {
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

                    {/* Background Grid */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Header Overlay */}
                    <div className="absolute top-8 left-8 z-20 pointer-events-none border-l-2 border-white pl-4">
                        <h3 className="text-xl font-bold text-white tracking-widest uppercase">Analytics Platform</h3>
                        <p className="text-xs text-neutral-500 mt-1">SEMANTIC LAYER • SELF SERVICE</p>
                        <p className="text-[10px] text-yellow-500 mt-1">● BI ARCHITECTURE</p>
                    </div>

                    <svg className="w-full h-full relative z-10" viewBox="0 0 1000 600">
                        <defs>
                            <marker id="arrow-bi" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#525252" />
                            </marker>
                        </defs>

                        {/* --- ZONES --- */}
                        <rect x="380" y="50" width="240" height="500" fill="none" stroke="#333" strokeDasharray="4,4" />
                        <text x="390" y="70" className="text-[10px] fill-neutral-600 tracking-widest uppercase">Semantic Zone</text>

                        {/* --- CONNECTIONS --- */}
                        <g className="transition-all duration-500 ease-out">
                            {/* Warehouse to Semantic */}
                            <path id="link-wh-sem" d="M 230 300 L 420 300" stroke={getStroke('link-wh-sem', '#fff')} strokeWidth="2" markerEnd="url(#arrow-bi)" style={{ opacity: getOpacity('link-wh-sem') }} />

                            {/* Semantic to Viz */}
                            <path id="link-sem-rep" d="M 580 300 L 700 300 L 700 150 L 770 150" fill="none" stroke={getStroke('link-sem-rep', '#F59E0B')} strokeWidth="1" markerEnd="url(#arrow-bi)" style={{ opacity: getOpacity('link-sem-rep') }} />
                            <path id="link-sem-dash" d="M 580 300 L 770 300" stroke={getStroke('link-sem-dash', '#F59E0B')} strokeWidth="1" markerEnd="url(#arrow-bi)" style={{ opacity: getOpacity('link-sem-dash') }} />
                            <path id="link-sem-excel" d="M 580 300 L 700 300 L 700 450 L 770 450" fill="none" stroke={getStroke('link-sem-excel', '#10B981')} strokeWidth="1" strokeDasharray="4,4" markerEnd="url(#arrow-bi)" style={{ opacity: getOpacity('link-sem-excel') }} />
                        </g>

                        {/* --- NODES --- */}
                        {NODES.map((node) => {
                            const isActive = hoveredNode === node.id;
                            const isDimmed = hoveredNode && !isFocused(node.id);

                            let activeColor = '#ffffff';
                            if (node.type === 'semantic') activeColor = '#F59E0B'; // Yellow/Amber
                            if (node.type === 'gov') activeColor = '#8B5CF6'; // Purple

                            let w = 160;
                            let h = 80;
                            if (node.type === 'viz') { w = 160; h = 60; }
                            if (node.id === 'node-gov') { w = 120; h = 40; }

                            return (
                                <g
                                    key={node.id}
                                    id={node.id}
                                    transform={`translate(${node.x - (w / 2)}, ${node.y - (h / 2)})`}
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
                                    <text x={w / 2} y={h / 2 - 5} fill={isActive ? activeColor : '#888'} textAnchor="middle" className="text-[10px] font-bold tracking-widest uppercase">{node.title}</text>

                                    {node.badge && (
                                        <rect x={w - 50} y="-10" width="60" height="20" rx="2" fill={activeColor} className="opacity-80" />
                                    )}
                                    {node.badge && (
                                        <text x={w - 20} y="3" fill="#000" textAnchor="middle" className="text-[9px] font-bold">{node.badge}</text>
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
