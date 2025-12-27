"use client";
import React from "react";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { VelocityBlock } from "@/components/ui/velocity-block";
import { McpFileTree } from "@/components/mcp-file-tree";
import { McpChatInterface } from "@/components/mcp-chat-interface";

export default function AiEngineeringPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-white/20">

            {/* Header / Title Block */}
            <header className="pt-32 pb-24 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight mb-8">
                        <div className="block">
                            <BlurReveal delay={0.1}>Model Context</BlurReveal>
                        </div>
                        <div className="block text-neutral-500">
                            <BlurReveal delay={0.2}>Protocol</BlurReveal>
                        </div>
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t border-white/10 pt-12">
                        <div className="md:col-span-2">
                            <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl">
                                Standardizing the connection between AI models and datasets.
                                I build <span className="text-white border-b border-white/20">MCP Servers</span> that expose local resources and tools to LLMs securely.
                            </p>
                        </div>
                        <div className="font-mono text-xs text-neutral-500 space-y-4">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>PROTOCOL</span>
                                <span className="text-white">MCP v1.0</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>LANG</span>
                                <span className="text-white">PYTHON / TYPESCRIPT</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>STATUS</span>
                                <span className="text-green-500">● ACTIVE DEV</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* PROJECT STRUCTURE SECTION */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-neutral-900/10">
                <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    <div className="lg:sticky lg:top-32">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">01 — Official Structure</h2>
                        <h3 className="text-3xl font-serif mb-6">Standardized Server Layout</h3>
                        <p className="text-neutral-400 leading-relaxed mb-8">
                            A robust MCP server requires a clean separation of concerns.
                            I adhere to the official Python SDK structure, ensuring scalability for tool definitions, resource handling, and prompt templates.
                        </p>
                        <ul className="space-y-4 font-mono text-xs text-neutral-400 border-l border-white/10 pl-6">
                            <li className="flex items-center gap-2">
                                <span className="text-blue-400">●</span> src/tools: Executable functions
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-yellow-500">●</span> src/resources: Data contexts
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">●</span> tests: Integration reliability
                            </li>
                        </ul>
                    </div>
                    <div>
                        <McpFileTree />
                    </div>
                </div>
            </section>

            {/* INTERACTIVE DEMO SECTION & CODE SNIPPETS */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Visual Interface - REMOVED, moving to full screen below */}
                    <div>
                        <div className="mt-8 p-6 bg-neutral-900 border border-white/5 rounded">
                            <h4 className="font-mono text-xs text-neutral-500 uppercase mb-4">Security Protocol (Localhost)</h4>
                            <div className="flex flex-col gap-4 text-sm font-mono text-neutral-300">
                                <div className="flex gap-4 items-center group">
                                    <span className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-xs group-hover:bg-neutral-700 transition-colors">1</span>
                                    <span>Transport: Stdio / SSE</span>
                                </div>
                                <div className="h-4 w-px bg-white/10 ml-3" />
                                <div className="flex gap-4 items-center group">
                                    <span className="w-6 h-6 rounded bg-red-500/20 text-red-400 flex items-center justify-center text-xs group-hover:bg-red-500/30 transition-colors">2</span>
                                    <span>Human-in-the-loop Approval</span>
                                </div>
                                <div className="h-4 w-px bg-white/10 ml-3" />
                                <div className="flex gap-4 items-center group">
                                    <span className="w-6 h-6 rounded bg-green-500/20 text-green-400 flex items-center justify-center text-xs group-hover:bg-green-500/30 transition-colors">3</span>
                                    <span>Sandboxed Execution</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Breakdown & Code */}
                    <div className="lg:sticky lg:top-32 order-first lg:order-last">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">02 — Implementation & Logic</h2>
                        <h3 className="text-3xl font-serif mb-6">Type-Safe Tool Definitions</h3>
                        <p className="text-neutral-400 leading-relaxed mb-8">
                            Building an MCP server isn't just about exposing functions. It's about defining <span className="text-white">rigid schemas</span> that the Model can understand without ambiguity.
                            I use the <code>FastMCP</code> framework to decorate Python functions with Pydantic models, automatically generating the JSON-RPC interfaces required by the protocol.
                        </p>

                        <div className="bg-[#0d1117] border border-white/10 p-6 rounded-lg font-mono text-xs overflow-x-auto selection:bg-white/20">
                            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                                <span className="text-neutral-500">src/server.py</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                </div>
                            </div>
                            <pre className="text-neutral-300">
                                {`from mcp.server.fastmcp import FastMCP
from pydantic import Field

# Initialize Server
mcp = FastMCP("MyDataEngine")

@mcp.tool()
def query_metrics(
    metric_name: str = Field(..., description="Target metric (e.g. 'dau')"),
    range: str = Field("7d", description="Time range string")
) -> dict:
    """Safely retrieves aggregated metrics from Gold Layer."""
    
    # Internal validation logic
    if metric_name not in ALLOWED_METRICS:
        raise ValueError("Metric restricted via Governance Policy")

    return backend.fetch(metric_name, range)

@mcp.resource("config://pipeline_status")
def get_status() -> str:
    """Exposes real-time pipeline health as a readable resource."""
    return system.check_health()
`}
                            </pre>
                        </div>

                        <p className="mt-8 text-neutral-500 text-sm leading-relaxed">
                            <span className="text-white">Note:</span> The <code>@mcp.tool()</code> decorator automatically handles the JSON Schema conversion. When Claude calls <code>query_metrics</code>, the server validates inputs against the Pydantic field definitions before any code executes.
                        </p>
                    </div>
                </div>
            </section>

            {/* FULL SCREEN CHAT INTERFACE - NOW 80% & FRAMED */}
            <section className="h-[85vh] w-full max-w-[90rem] mx-auto mb-24 relative bg-neutral-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <McpChatInterface />
            </section>

            {/* 3. VECTOR ARCHITECTURE */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-neutral-900/10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-16">03 — Vector Architecture</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div className="md:col-span-1">
                            <h3 className="text-3xl font-serif text-white mb-6">Retrieval Engine</h3>
                            <p className="text-neutral-400 leading-relaxed text-sm">
                                Context window limits are no longer the bottleneck; retrieval accuracy is. I implement <strong>Hybrid Search</strong> architectures that combine dense vector similarity with sparse lexical matching (BM25) to capture both semantic meaning and exact keyword matches.
                            </p>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="border-l border-white/10 pl-6">
                                <h4 className="text-lg font-medium text-white mb-2">HNSW Indexing</h4>
                                <p className="text-sm text-neutral-500">
                                    Hierarchical Navigable Small World graphs implementation for sub-millisecond approximate nearest neighbor (<span className="font-mono text-xs text-green-500">ANN</span>) search across billion-scale vectors.
                                </p>
                            </div>
                            <div className="border-l border-white/10 pl-6">
                                <h4 className="text-lg font-medium text-white mb-2">Re-Ranking Models</h4>
                                <p className="text-sm text-neutral-500">
                                    Deploying cross-encoder models (e.g. BGE-Reranker) as a second-stage pass to strictly order retrieved chunks by relevance before context injection.
                                </p>
                            </div>
                            <div className="border-l border-white/10 pl-6">
                                <h4 className="text-lg font-medium text-white mb-2">Embedding Strategy</h4>
                                <p className="text-sm text-neutral-500">
                                    Fine-tuned sentence-transformers on domain-specific corpora to align vector space with enterprise vernacular (e.g. medical or legal taxonomies).
                                </p>
                            </div>
                            <div className="border-l border-white/10 pl-6">
                                <h4 className="text-lg font-medium text-white mb-2">Metadata Filtering</h4>
                                <p className="text-sm text-neutral-500">
                                    Pre-filtering vector queries using scalar metadata (Time, Author, Category) to drastically reduce search space and improve precision.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. AGENTIC PATTERNS */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-16">04 — Agentic Patterns</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <h3 className="text-4xl font-serif leading-tight mb-8">
                                Beyond simple chains. <br />
                                <span className="text-white">Cognitive loops.</span>
                            </h3>
                            <p className="text-neutral-400 leading-relaxed mb-6">
                                I design autonomous agents utilizing the <strong>ReAct (Reasoning + Acting)</strong> paradigm.
                                Instead of linear execution, these agents maintain a "Thought" trace, observe tool outputs, and iteratively refine their approach to solve multi-step problems.
                            </p>
                            <ul className="space-y-4 font-mono text-xs text-neutral-300">
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    <span>Plan Formulation & Self-Correction</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                    <span>Long-term Memory (Vector Stores)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    <span>Tool-use Capability with Error Handling</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative p-8 border border-white/10 rounded-2xl bg-neutral-900/50 backdrop-blur-sm">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 rounded-t-2xl" />
                            <div className="font-mono text-xs text-neutral-400 space-y-4">
                                <div className="border-l-2 border-green-500/30 pl-4 py-1">
                                    <span className="text-green-500 block mb-1">Thought:</span>
                                    User asked for Q3 sales. I need to query the database.
                                </div>
                                <div className="border-l-2 border-amber-500/30 pl-4 py-1">
                                    <span className="text-amber-500 block mb-1">Action:</span>
                                    <span className="bg-neutral-800 px-1 py-0.5 rounded text-neutral-200">sql_tool.execute("SELECT sum(sales) FROM...")</span>
                                </div>
                                <div className="border-l-2 border-blue-500/30 pl-4 py-1">
                                    <span className="text-blue-500 block mb-1">Observation:</span>
                                    Error: Table 'sales' not found.
                                </div>
                                <div className="border-l-2 border-green-500/30 pl-4 py-1">
                                    <span className="text-green-500 block mb-1">Thought:</span>
                                    Ah, schema lookup shows table is 'revenue_q3'. Retrying.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. EVALUATION FRAMEWORKS */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-neutral-900/10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-16">05 — Evaluation & Metrics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-6 border border-white/10 bg-neutral-950 hover:border-white/20 transition-colors">
                            <h4 className="text-lg font-serif text-white mb-4">RAGAS</h4>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                                A framework to quantify RAG pipeline performance. Measuring 'Faithfulness' and 'Answer Relevancy'.
                            </p>
                            <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-[85%]" />
                            </div>
                            <span className="text-[10px] font-mono text-neutral-500 mt-2 block">Score: 0.85</span>
                        </div>
                        <div className="p-6 border border-white/10 bg-neutral-950 hover:border-white/20 transition-colors">
                            <h4 className="text-lg font-serif text-white mb-4">TruLens</h4>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                                Feedback functions to detect hallucinations and bias in real-time. The "RAG Triad" validator.
                            </p>
                            <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full w-[92%]" />
                            </div>
                            <span className="text-[10px] font-mono text-neutral-500 mt-2 block">Score: 0.92</span>
                        </div>
                        <div className="p-6 border border-white/10 bg-neutral-950 hover:border-white/20 transition-colors">
                            <h4 className="text-lg font-serif text-white mb-4">DeepEval</h4>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                                Unit testing for LLMs. Asserting that outputs match expected semantic meaning, not just text.
                            </p>
                            <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full w-[78%]" />
                            </div>
                            <span className="text-[10px] font-mono text-neutral-500 mt-2 block">Score: 0.78</span>
                        </div>
                        <div className="p-6 border border-white/10 bg-neutral-950 hover:border-white/20 transition-colors">
                            <h4 className="text-lg font-serif text-white mb-4">Arize Phoenix</h4>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                                Production observability. Tracing spans, latency breakdown, and token usage cost analysis.
                            </p>
                            <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-amber-500 h-full w-[99%]" />
                            </div>
                            <span className="text-[10px] font-mono text-neutral-500 mt-2 block">Uptime: 99.9%</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. PRODUCTION DEPLOYMENT */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-8 sticky top-32">06 — Deployment</h2>
                    </div>
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h3 className="text-2xl font-serif text-white mb-4">Containerization Strategy</h3>
                            <p className="text-neutral-400 leading-relaxed text-sm">
                                MCP servers are stateless. I wrap them in optimized <span className="text-white">Docker</span> images (Distroless/Alpine) to minimize attack surface.
                                These containers are orchestrated via Kubernetes, allowing horizontal scaling based on request queue depth.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-mono text-xs">
                            <div className="bg-neutral-900 p-4 rounded border border-white/5">
                                <span className="text-neutral-500 block mb-2">Dockerfile</span>
                                <span className="text-green-500">FROM</span> python:3.11-slim <br />
                                <span className="text-green-500">COPY</span> . /app <br />
                                <span className="text-green-500">RUN</span> pip install uv <br />
                                <span className="text-green-500">CMD</span> ["uv", "run", "server.py"]
                            </div>
                            <div className="bg-neutral-900 p-4 rounded border border-white/5">
                                <span className="text-neutral-500 block mb-2">Helm Chart</span>
                                <span className="text-blue-500">apiVersion:</span> v1 <br />
                                <span className="text-blue-500">kind:</span> Deployment <br />
                                <span className="text-blue-500">replicas:</span> 3 <br />
                                <span className="text-blue-500">strategy:</span> RollingUpdate
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 overflow-hidden">
                <VelocityBlock className="py-8">
                    <span className="text-8xl md:text-[10rem] font-bold text-neutral-900 uppercase whitespace-nowrap px-8">
                        Anthropic Claude OpenAPI Python SDK
                    </span>
                </VelocityBlock>
                <VelocityBlock className="py-8">
                    <span className="text-8xl md:text-[10rem] font-bold text-neutral-800 uppercase whitespace-nowrap px-8">
                        Model Context Protocol Server Client
                    </span>
                </VelocityBlock>
            </section>

        </div>
    );
}
