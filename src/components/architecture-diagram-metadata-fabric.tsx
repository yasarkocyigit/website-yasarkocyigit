"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Dependency graph for highlighting
const DEPENDENCIES: Record<string, string[]> = {
    'node-config': ['link-meta', 'node-pipeline'],
    'node-pipeline': ['link-trigger-nb', 'link-trigger-ingest', 'node-notebook'],
    'node-source-file': ['link-ingest-2', 'node-bronze'],
    'node-bronze': ['link-nb-read', 'node-notebook'],
    'node-notebook': ['link-nb-write', 'node-silver'],
    'node-silver': ['link-gold', 'node-gold', 'link-read-silver-curate'],
    'node-gold': ['link-dl', 'link-sql', 'link-wh', 'node-pbi', 'node-sql', 'node-warehouse'],
    'node-pbi': [],
    'node-sql': ['link-import', 'node-pbi', 'link-sql-pbi'],
    'node-warehouse': ['link-dq', 'node-pbi']
};

interface NodeData {
    id: string;
    title: string;
    desc: string;
    tech: string;
    color: string;
    x: number;
    y: number;
    width: number;
    height: number;
    icon: string;
    badge: string;
}

// Refined Professional Palette (Less Neon, More Corporate Premium)
const COLORS = {
    Control: '#8B5CF6',    // Violet-500
    Orchestrator: '#3B82F6', // Blue-500
    Compute: '#06B6D4',    // Cyan-500
    Bronze: '#F97316',     // Orange-500
    Silver: '#94A3B8',     // Slate-400
    Gold: '#EAB308',       // Yellow-500
    Source: '#64748B',     // Slate-500
    Analytics: '#14B8A6',  // Teal-500
    PowerBI: '#F59E0B'     // Amber-500
};

const NODES: NodeData[] = [
    {
        id: 'node-config', title: 'Config DB', desc: 'Central connection strings & watermarks.', tech: 'Azure SQL', color: COLORS.Control,
        x: 600, y: 100, width: 140, height: 80, icon: '/icons/sql_database_48_item.png', badge: 'CONTROL'
    },
    {
        id: 'node-pipeline', title: 'Orchestrator', desc: 'Metadata-driven dynamic pipelines.', tech: 'Data Factory', color: COLORS.Orchestrator,
        x: 840, y: 100, width: 140, height: 80, icon: '/icons/pipeline_48_item.png', badge: 'PIPELINE'
    },
    {
        id: 'node-notebook', title: 'Transform', desc: 'Generic notebook processing logic.', tech: 'Spark', color: COLORS.Compute,
        x: 610, y: 240, width: 180, height: 90, icon: '/icons/notebook_48_item.png', badge: 'NOTEBOOK'
    },
    {
        id: 'node-bronze', title: 'Bronze', desc: 'Raw Parquet ingestion.', tech: 'OneLake', color: COLORS.Bronze,
        x: 350, y: 460, width: 130, height: 100, icon: '/icons/one_lake_48_color.png', badge: 'RAW'
    },
    {
        id: 'node-silver', title: 'Silver', desc: 'Delta Lake (Validated).', tech: 'OneLake', color: COLORS.Silver,
        x: 640, y: 460, width: 130, height: 100, icon: '/icons/one_lake_48_color.png', badge: 'CLEAN'
    },
    {
        id: 'node-gold', title: 'Gold', desc: 'Star Schema (Curated).', tech: 'OneLake', color: COLORS.Gold,
        x: 950, y: 460, width: 130, height: 100, icon: '/icons/one_lake_48_color.png', badge: 'CURATED'
    },
    {
        id: 'node-notebook-gold', title: 'Curate', desc: 'Silver to Gold transformation.', tech: 'Spark', color: COLORS.Compute,
        x: 800, y: 600, width: 180, height: 90, icon: '/icons/notebook_48_item.png', badge: 'NOTEBOOK'
    },
    {
        id: 'node-source-db', title: 'SQL Source', desc: 'On-premise SQL Server.', tech: 'Database', color: COLORS.Source,
        x: 60, y: 200, width: 130, height: 80, icon: '/icons/sql_database_48_item.png', badge: 'SOURCE'
    },
    {
        id: 'node-source-file', title: 'File Source', desc: 'CSV/JSON Exports.', tech: 'Storage', color: COLORS.Source,
        x: 60, y: 320, width: 130, height: 80, icon: '/icons/folder_48_non-item.png', badge: 'SOURCE'
    },
    {
        id: 'node-sql', title: 'SQL Endpoint', desc: 'Ad-hoc T-SQL Analytics.', tech: 'T-SQL', color: COLORS.Analytics,
        x: 1220, y: 150, width: 140, height: 80, icon: '/icons/data_warehouse_48_color.png', badge: 'QUERY'
    },
    {
        id: 'node-pbi', title: 'Power BI', desc: 'Direct Lake Reporting.', tech: 'Power BI', color: COLORS.PowerBI,
        x: 1220, y: 360, width: 140, height: 120, icon: '/icons/power_bi_48_color.png', badge: 'REPORT'
    }
];

export default function ArchitectureDiagramMetadataFabric() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const isFocused = (id: string) => {
        if (!hoveredNode) return false;
        if (hoveredNode === id) return true;
        return DEPENDENCIES[hoveredNode]?.includes(id) ||
            (DEPENDENCIES[id] && DEPENDENCIES[id].includes(hoveredNode));
    };

    const isConnectionActive = (id: string) => {
        if (!hoveredNode) return false;
        const related = DEPENDENCIES[hoveredNode] || [];
        return related.includes(id);
    };

    const getConnectionColor = (id: string) => {
        if (isConnectionActive(id)) return '#ffffff';
        return '#3f3f46'; // Neutral-700
    };

    return (
        <div className="w-full relative bg-neutral-950 rounded-xl overflow-hidden font-display border border-white/5 shadow-2xl group select-none">

            {/* Subtle Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Header */}
            <div className="absolute top-6 left-6 z-30 pointer-events-none">
                <div className="flex items-center gap-3 bg-neutral-950/60 backdrop-blur-md p-3 rounded-xl border border-white/5 shadow-sm">
                    <div className="h-8 w-1 bg-cyan-500 rounded-full"></div>
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-wide uppercase">Fabric <span className="text-neutral-500">Metadata Architecture</span></h3>
                        <p className="text-[10px] text-neutral-500 font-mono tracking-widest mt-0.5">END-TO-END MIGRATION TOPOLOGY</p>
                    </div>
                </div>
            </div>

            {/* SVG Canvas */}
            <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="min-w-[1000px] w-full aspect-[16/8]">
                    <svg className="w-full h-full relative z-10" viewBox="0 0 1600 780">
                        <defs>
                            <marker id="arrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                                <polygon points="0 0, 6 2, 0 4" fill="#525252" />
                            </marker>
                            <marker id="arrow-active" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                                <polygon points="0 0, 6 2, 0 4" fill="#fff" />
                            </marker>
                        </defs>

                        {/* ZONES - Simplified */}
                        <g>
                            <rect x="250" y="60" width="900" height="680" fill="#171717" rx="16" /> {/* Unified Data Plane - Darker */}
                            <text x="700" y="40" textAnchor="middle" className="text-[10px] fill-neutral-600 font-mono uppercase tracking-[0.2em] font-bold">Unified Data Plane</text>

                            <rect x="20" y="160" width="200" height="280" fill="none" stroke="#262626" rx="8" strokeDasharray="4 4" />
                            <text x="120" y="140" textAnchor="middle" className="text-[10px] fill-neutral-600 font-mono uppercase tracking-[0.2em]">Sources</text>

                            <rect x="1180" y="60" width="300" height="680" fill="#171717" rx="16" />
                            <text x="1330" y="40" textAnchor="middle" className="text-[10px] fill-neutral-600 font-mono uppercase tracking-[0.2em]">Analytics</text>
                        </g>

                        {/* CONNECTIONS & PATHS - Sharp Lines */}
                        <g>
                            {[
                                { id: 'link-meta', d: 'M 740 140 L 840 140', dash: '4 4' },
                                { id: 'link-mb-trigger', d: 'M 910 180 L 910 210 L 700 210 L 700 240', dash: '0' },
                                { id: 'link-ingest-1', d: 'M 190 240 L 220 240 L 220 510 L 350 510', dash: '4 4' },
                                { id: 'link-ingest-2', d: 'M 190 360 L 220 360 L 220 510 L 350 510', dash: '4 4' },
                                { id: 'link-nb-read', d: 'M 420 460 L 420 285 L 610 285' },
                                { id: 'link-nb-write', d: 'M 700 330 L 700 460' },
                                { id: 'link-read-silver-curate', d: 'M 705 560 L 705 645 L 800 645' },
                                { id: 'link-write-gold-curate', d: 'M 980 645 L 1015 645 L 1015 560' },
                                { id: 'link-sql', d: 'M 1080 510 L 1150 510 L 1150 190 L 1220 190' },
                                { id: 'link-dl', d: 'M 1080 510 L 1150 510 L 1150 420 L 1220 420' },
                                { id: 'link-sql-pbi', d: 'M 1290 230 L 1290 360', dash: '4 4' }
                            ].map((path) => (
                                <path
                                    key={path.id}
                                    d={path.d}
                                    fill="none"
                                    stroke={getConnectionColor(path.id)}
                                    strokeWidth={isConnectionActive(path.id) ? 2 : 1}
                                    strokeDasharray={path.dash}
                                    markerEnd={isConnectionActive(path.id) ? "url(#arrow-active)" : "url(#arrow)"}
                                    className="transition-all duration-300"
                                    style={{ opacity: hoveredNode && !isConnectionActive(path.id) ? 0.1 : 1 }}
                                />
                            ))}
                        </g>

                        {/* NODES */}
                        {NODES.map((node) => (
                            <NodeGroup
                                key={node.id}
                                node={node}
                                isActive={hoveredNode === node.id}
                                isDimmed={!!hoveredNode && !isFocused(node.id)}
                                setHoveredNode={setHoveredNode}
                            />
                        ))}

                    </svg>
                </div>
            </div>

            {/* Hover Card */}
            <AnimatePresence>
                {hoveredNode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-6 right-6 w-72 bg-neutral-900 border border-white/10 p-5 rounded-lg shadow-2xl z-50"
                    >
                        {(() => {
                            const node = NODES.find(n => n.id === hoveredNode);
                            if (!node) return null;
                            return (
                                <>
                                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                                        <span className="text-xs font-mono text-neutral-500 uppercase">{node.badge}</span>
                                        <div className="h-2 w-2 rounded-full" style={{ background: node.color }}></div>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2">{node.title}</h4>
                                    <p className="text-neutral-400 text-xs leading-relaxed mb-4">{node.desc}</p>
                                    <div className="bg-white/5 py-1.5 px-3 rounded text-[10px] font-mono text-neutral-300 inline-block">
                                        {node.tech}
                                    </div>
                                </>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

function NodeGroup({ node, isActive, isDimmed, setHoveredNode }: { node: NodeData, isActive: boolean, isDimmed: boolean, setHoveredNode: (id: string | null) => void }) {
    return (
        <g
            id={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            className="cursor-pointer"
            style={{
                opacity: isDimmed ? 0.2 : 1,
                transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
        >
            {/* Base Shape */}
            <rect
                width={node.width}
                height={node.height}
                rx="6"
                fill={isActive ? '#171717' : '#0a0a0a'}
                stroke={isActive ? node.color : '#333'}
                strokeWidth={isActive ? 1.5 : 1}
                className="transition-colors duration-200"
            />

            {/* Color Accent Bar - Left */}
            <rect x="0" y="0" width="4" height={node.height} rx="2" fill={node.color} opacity={1} />

            {/* Icon - Larger (32px) and Full Color */}
            <image
                href={node.icon}
                x={14}
                y={(node.height - 32) / 2}
                width="32"
                height="32"
                style={{ opacity: 1, filter: 'none' }}
            />

            {/* Title - Right of Icon */}
            <text x={54} y={node.height / 2 - 4} className="font-sans font-bold text-[13px] fill-neutral-200 tracking-tight" style={{ pointerEvents: 'none' }}>
                {node.title}
            </text>

            {/* Subtitle/Tech - Right of Icon */}
            <text x={54} y={node.height / 2 + 10} className="font-mono text-[9px] fill-neutral-500 uppercase tracking-wider" style={{ pointerEvents: 'none' }}>
                {node.tech}
            </text>
        </g>
    );
}
