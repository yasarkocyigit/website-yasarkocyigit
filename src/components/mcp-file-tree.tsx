"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Folder, FileCode, FileText, File } from 'lucide-react';
import { cn } from '@/lib/utils';

type FileNode = {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
    comment?: string;
};

const projectStructure: FileNode = {
    name: "my-mcp-server",
    type: "folder",
    children: [
        { name: "pyproject.toml", type: "file", comment: "Project metadata & dependencies" },
        { name: ".python-version", type: "file", comment: "Python version (3.10+)" },
        { name: "README.md", type: "file", comment: "Documentation" },
        { name: "requirements.txt", type: "file", comment: "Optional: pip dependencies" },
        {
            name: "src",
            type: "folder",
            children: [
                {
                    name: "my_mcp_server",
                    type: "folder",
                    children: [
                        { name: "__init__.py", type: "file" },
                        { name: "server.py", type: "file", comment: "MCP server implementation" },
                        {
                            name: "tools",
                            type: "folder",
                            children: [
                                { name: "__init__.py", type: "file" },
                                { name: "workspace_tools.py", type: "file" },
                                { name: "execution_tools.py", type: "file" },
                            ]
                        },
                        {
                            name: "resources",
                            type: "folder",
                            children: [
                                { name: "__init__.py", type: "file" },
                            ]
                        },
                        {
                            name: "prompts",
                            type: "folder",
                            children: [
                                { name: "__init__.py", type: "file" },
                            ]
                        },
                    ]
                }
            ]
        },
        {
            name: "tests",
            type: "folder",
            children: [
                { name: "test_tools.py", type: "file" },
                { name: "test_integration.py", type: "file" },
                { name: "conftest.py", type: "file" },
            ]
        },
        {
            name: "examples",
            type: "folder",
            children: [
                { name: "client_example.py", type: "file" },
            ]
        }
    ]
};

const FileIcon = ({ name }: { name: string }) => {
    if (name.endsWith('.py')) return <FileCode className="w-4 h-4 text-blue-400" />;
    if (name.endsWith('.md')) return <FileText className="w-4 h-4 text-neutral-400" />;
    if (name.endsWith('.toml') || name.startsWith('.')) return <File className="w-4 h-4 text-yellow-500" />;
    return <File className="w-4 h-4 text-neutral-500" />;
};

const TreeNode = ({ node, depth = 0 }: { node: FileNode; depth?: number }) => {
    return (
        <div className="font-mono text-sm leading-7">
            <div
                className={cn(
                    "flex items-center gap-2 py-0.5 hover:bg-white/5 transition-colors rounded px-2 cursor-default group",
                    depth === 0 && "mb-2"
                )}
                style={{ paddingLeft: `${depth * 1.5}rem` }}
            >
                {node.type === 'folder' ? (
                    <Folder className={cn("w-4 h-4 text-neutral-500 group-hover:text-amber-500 transition-colors", depth === 0 && "text-white")} />
                ) : (
                    <FileIcon name={node.name} />
                )}
                <span className={cn(
                    "transition-colors",
                    node.type === 'folder' ? "text-neutral-300 group-hover:text-white" : "text-neutral-400 group-hover:text-neutral-200"
                )}>
                    {node.name}
                </span>

                {node.comment && (
                    <span className="hidden md:inline-block ml-4 text-neutral-600 text-xs italic">
                        # {node.comment}
                    </span>
                )}
            </div>

            {node.children && (
                <div className="relative">
                    {/* Vertical line for visual hierarchy */}
                    <div
                        className="absolute left-0 w-px bg-white/5 h-full"
                        style={{ left: `${(depth * 1.5) + 0.95}rem` }}
                    />
                    {node.children.map((child, i) => (
                        <TreeNode key={child.name + i} node={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const McpFileTree = () => {
    return (
        <div className="bg-neutral-900/10 border border-white/5 rounded-lg p-6 md:p-8 backdrop-blur-sm max-w-2xl mx-auto overflow-hidden">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <span className="ml-4 font-mono text-xs text-neutral-500">project-explorer</span>
            </div>
            <TreeNode node={projectStructure} />
        </div>
    );
};
