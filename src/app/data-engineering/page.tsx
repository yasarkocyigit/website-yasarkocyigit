"use client";
import React from "react";
import ArchitectureDiagram from "@/components/architecture-diagram";
import StreamingArchitectureDiagram from "@/components/streaming-architecture-diagram";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { VelocityBlock } from "@/components/ui/velocity-block";

export default function DataEngineeringPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-white/20">

            {/* Header / Title Block */}
            <header className="pt-32 pb-24 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight mb-8">
                        <div className="block">
                            <BlurReveal delay={0.1}>System</BlurReveal>
                        </div>
                        <div className="block text-neutral-500">
                            <BlurReveal delay={0.2}>Architecture</BlurReveal>
                        </div>
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t border-white/10 pt-12">
                        <div className="md:col-span-2">
                            <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl">
                                An enterprise-grade Data Platform designed for scalability, reliability, and low-latency insights.
                                Integrating <span className="text-white border-b border-white/20">Batch</span> and <span className="text-white border-b border-white/20">Streaming</span> paradigms into a unified Lakehouse.
                            </p>
                        </div>
                        <div className="font-mono text-xs text-neutral-500 space-y-4">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>VERSION</span>
                                <span className="text-white">v3.0.1</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>STACK</span>
                                <span className="text-white">AZURE / DATABRICKS</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>STATUS</span>
                                <span className="text-green-500">● ONLINE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-neutral-900/10">
                <div className="max-w-[90rem] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                        <div className="lg:col-span-1">
                            <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4 sticky top-32">01 — Batch Pipeline</h2>
                        </div>
                        <div className="lg:col-span-3">
                            <h3 className="text-3xl font-serif mb-6">Medallion Architecture</h3>
                            <p className="text-neutral-400 max-w-2xl mb-12">
                                I implement a strict Multi-hop architecture where data quality improves as it flows through the system.
                                This isn't just folder organization; it's a rigorous <strong>Quality Guarantee</strong> contract.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                                <div className="space-y-4">
                                    <div className="w-8 h-8 rounded-full bg-orange-700/20 border border-orange-700/50 flex items-center justify-center text-orange-500 text-xs font-mono">Br</div>
                                    <h4 className="text-lg font-medium text-white">Bronze (Raw)</h4>
                                    <ul className="text-sm text-neutral-400 space-y-2 list-disc list-inside">
                                        <li>As-is ingestion (JSON/Parquet)</li>
                                        <li>Append-only history</li>
                                        <li>Replayability source of truth</li>
                                        <li>Zero validation (capture everything)</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-8 h-8 rounded-full bg-neutral-400/20 border border-neutral-400/50 flex items-center justify-center text-neutral-300 text-xs font-mono">Ag</div>
                                    <h4 className="text-lg font-medium text-white">Silver (Refined)</h4>
                                    <ul className="text-sm text-neutral-400 space-y-2 list-disc list-inside">
                                        <li>Deduplication & Merge logic</li>
                                        <li>Strong Schema Enforcement included</li>
                                        <li>Null checks & Type casting</li>
                                        <li>3rd Normal Form (3NF) modeling</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-yellow-500 text-xs font-mono">Au</div>
                                    <h4 className="text-lg font-medium text-white">Gold (Business)</h4>
                                    <ul className="text-sm text-neutral-400 space-y-2 list-disc list-inside">
                                        <li>Star Schema / Dimensional Models</li>
                                        <li>Pre-computed Aggregates</li>
                                        <li>Row-Level Security (RLS) applied</li>
                                        <li>Ready for PowerBI / Tableau</li>
                                    </ul>
                                </div>
                            </div>

                            <ArchitectureDiagram />
                        </div>
                    </div>
                </div>
            </section>

            {/* STREAMING SECTION */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-[90rem] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                        <div className="lg:col-span-1">
                            <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4 sticky top-32">02 — Real-Time</h2>
                        </div>
                        <div className="lg:col-span-3">
                            <h3 className="text-3xl font-serif mb-6">Streaming Ingestion</h3>
                            <p className="text-neutral-400 max-w-2xl mb-8">
                                For latency-sensitive workloads, I utilize Spark Structured Streaming and Delta Live Tables (DLT) to process events from Kafka/Event Hubs in near real-time.
                            </p>

                            <div className="bg-neutral-900 border border-white/5 p-8 rounded-lg mb-12">
                                <h4 className="font-mono text-sm text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-4">The Consistency Trade-off</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h5 className="text-blue-400 font-medium mb-2">Micro-Batch (Streaming)</h5>
                                        <p className="text-sm text-neutral-400 leading-relaxed">
                                            Prioritizes <span className="text-white">freshness (&lt;1s latency)</span>.
                                            Ideal for fraud detection and operational monitoring.
                                            Accepts eventual consistency in complex joins in exchange for speed.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="text-emerald-400 font-medium mb-2">Batch Processing</h5>
                                        <p className="text-sm text-neutral-400 leading-relaxed">
                                            Prioritizes <span className="text-white">completeness & accuracy</span>.
                                            Re-processes entire partitions to ensure perfect join consistency for financial reporting and regulatory compliance.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <StreamingArchitectureDiagram />
                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNICAL SPECS (BENTO GRID) */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-neutral-900/10">
                <div className="max-w-[90rem] mx-auto">
                    <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-12">03 — System Specifications</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                        {/* Box 1: Infrastructure */}
                        <div className="bg-neutral-950 p-8 md:p-12 hover:bg-neutral-900 transition-colors duration-500 group">
                            <h3 className="text-xl font-serif text-white mb-2 group-hover:text-amber-500 transition-colors">Infrastructure</h3>
                            <div className="h-px w-8 bg-neutral-800 my-6" />
                            <ul className="space-y-4 font-mono text-xs text-neutral-400">
                                <li className="flex justify-between">
                                    <span>IaC</span>
                                    <span className="text-white">Terraform / Bicep</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Compute</span>
                                    <span className="text-white">AKS / Databricks</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Registry</span>
                                    <span className="text-white">Azure SCR</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Network</span>
                                    <span className="text-white">Private VNET Injection</span>
                                </li>
                            </ul>
                        </div>

                        {/* Box 2: CI/CD */}
                        <div className="bg-neutral-950 p-8 md:p-12 hover:bg-neutral-900 transition-colors duration-500 group">
                            <h3 className="text-xl font-serif text-white mb-2 group-hover:text-blue-500 transition-colors">CI / CD</h3>
                            <div className="h-px w-8 bg-neutral-800 my-6" />
                            <ul className="space-y-4 font-mono text-xs text-neutral-400">
                                <li className="flex justify-between">
                                    <span>Pipeline</span>
                                    <span className="text-white">GitHub Actions</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Unit Tests</span>
                                    <span className="text-white">PyTest / Nutter</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Quality</span>
                                    <span className="text-white">SonarQube</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Deploy</span>
                                    <span className="text-white">Blue/Green</span>
                                </li>
                            </ul>
                        </div>

                        {/* Box 3: Observability */}
                        <div className="bg-neutral-950 p-8 md:p-12 hover:bg-neutral-900 transition-colors duration-500 group">
                            <h3 className="text-xl font-serif text-white mb-2 group-hover:text-purple-500 transition-colors">Observability</h3>
                            <div className="h-px w-8 bg-neutral-800 my-6" />
                            <ul className="space-y-4 font-mono text-xs text-neutral-400">
                                <li className="flex justify-between">
                                    <span>Logs</span>
                                    <span className="text-white">Log Analytics</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Metrics</span>
                                    <span className="text-white">Prometheus / Grafana</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Tracing</span>
                                    <span className="text-white">OpenTelemetry</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>SLA</span>
                                    <span className="text-green-500">99.99% Uptime</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Performance Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border-x border-b border-white/10">
                        <div className="bg-neutral-950 p-8 text-center">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Throughput</p>
                            <p className="text-3xl md:text-4xl font-light text-white">10 TB<span className="text-sm text-neutral-600 ml-1">/DAY</span></p>
                        </div>
                        <div className="bg-neutral-950 p-8 text-center">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Latency</p>
                            <p className="text-3xl md:text-4xl font-light text-white">&lt;500<span className="text-sm text-neutral-600 ml-1">MS</span></p>
                        </div>
                        <div className="bg-neutral-950 p-8 text-center">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Sources</p>
                            <p className="text-3xl md:text-4xl font-light text-white">45<span className="text-sm text-neutral-600 ml-1">+</span></p>
                        </div>
                        <div className="bg-neutral-950 p-8 text-center">
                            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Users</p>
                            <p className="text-3xl md:text-4xl font-light text-white">2.5K<span className="text-sm text-neutral-600 ml-1">DAU</span></p>
                        </div>
                    </div>
                </div>
            </section>
            {/* PHILOSOPHY & AGNOSTIC CORE */}
            <section className="py-32 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">

                    {/* Left: The Philosophy */}
                    <div>
                        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-8">04 — Methodology</h2>
                        <h3 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
                            I don't build pipelines. <br />
                            <span className="text-white">I build engines that generate them.</span>
                        </h3>
                        <div className="prose prose-invert text-neutral-400 text-lg leading-relaxed space-y-6">
                            <p>
                                Traditional data engineering relies on brittle, hand-coded pipelines for every table.
                                My approach handles the entire Data Lifecycle programmatically.
                                By abstracting logic into a <strong>Metadata-Driven Framework</strong>, I ingest, clean, and model thousands of tables with a single, unified codebase.
                            </p>
                            <ul className="list-none space-y-4 font-mono text-sm border-l border-white/10 pl-6 text-neutral-300">
                                <li>01. Schema Evolution Detection</li>
                                <li>02. Dynamic Quality Expectations</li>
                                <li>03. Auto-Healing Ingestion</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Platform Agnostic List */}
                    <div className="relative">
                        <div className="absolute top-0 right-0 p-4 border border-white/10 bg-neutral-900/50 backdrop-blur-sm rounded-full">
                            <span className="font-mono text-xs text-green-400">● RUNTIME AGNOSTIC</span>
                        </div>

                        <div className="space-y-12 mt-12 lg:mt-0">
                            <div className="group cursor-default">
                                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Azure Databricks</h4>
                                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-4">The Standard</p>
                                <p className="text-neutral-400 leading-relaxed">
                                    The reference implementation running on massive Spark clusters. Optimized for heavy batch processing and ML workloads via Unity Catalog.
                                </p>
                            </div>

                            <div className="h-px bg-white/10 w-full" />

                            <div className="group cursor-default">
                                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">Microsoft Fabric</h4>
                                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-4">The SaaS Evolution</p>
                                <p className="text-neutral-400 leading-relaxed">
                                    Zero-copy interaction with OneLake. The exact same logical architecture deployed as Fabric Items (Notebooks/Pipelines) without infrastructure management.
                                </p>
                            </div>

                            <div className="h-px bg-white/10 w-full" />

                            <div className="group cursor-default">
                                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-500 transition-colors">Apache Airflow</h4>
                                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-4">The Orchestrator</p>
                                <p className="text-neutral-400 leading-relaxed">
                                    Can run completely on Open Source. I decouple the <i>Control Plane</i> (Airflow) from the <i>Compute Plane</i> (Spark/Snowflake/DuckDB) for total portability.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            {/* 05. GOVERNANCE & UNITY CATALOG */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-neutral-900/10">
                <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
                    <div>
                        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-8">05 — Governance</h2>
                        <h3 className="text-4xl font-serif text-white mb-6">Unified Data Estate</h3>
                        <p className="text-neutral-400 leading-relaxed mb-8">
                            Governance is not an afterthought; it is the foundation. I utilize <span className="text-white">Unity Catalog</span> to implement a centralized permission model across all workspaces.
                            This enables Attribute-Based Access Control (ABAC) and provides granular lineage visualisation from source ingestion down to the specific BI dashboard widget.
                        </p>
                        <ul className="grid grid-cols-2 gap-4 font-mono text-xs text-neutral-300">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Access Control Lists (ACLs)
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Dynamic Masking
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Audit Logging
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Discovery / Search
                            </li>
                        </ul>
                    </div>
                    <div className="relative border border-white/10 bg-neutral-950 p-8 rounded-xl">
                        <div className="absolute top-4 right-4 text-xs font-mono text-neutral-500">CATALOG_EXPLORER</div>
                        <div className="space-y-6 mt-4">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded bg-blue-900/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                    <span className="text-xs">C</span>
                                </div>
                                <div className="h-px flex-1 bg-white/10" />
                                <span className="text-xs font-mono text-green-500">GRANTED</span>
                            </div>
                            <div className="flex items-center gap-4 pl-8">
                                <div className="w-8 h-8 rounded bg-yellow-900/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                                    <span className="text-xs">S</span>
                                </div>
                                <div className="h-px flex-1 bg-white/10" />
                                <span className="text-xs font-mono text-green-500">READ_VOLUME</span>
                            </div>
                            <div className="flex items-center gap-4 pl-16 opacity-50">
                                <div className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400">
                                    <span className="text-xs">T</span>
                                </div>
                                <div className="h-px flex-1 bg-neutral-800/50" />
                                <span className="text-xs font-mono text-red-500">DENIED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 06. OPTIMIZATION & INTERNALS */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-[90rem] mx-auto">
                    <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-16">06 — Performance Internals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-white/5 border border-white/10">
                        <div className="bg-neutral-950 p-12 hover:bg-neutral-900 transition-colors group">
                            <h4 className="text-lg font-serif text-white mb-4 group-hover:text-cyan-400">Photon Engine</h4>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Native vectorized execution engine written in C++. It bypasses the JVM for critical operations, delivering up to 12x performance on large aggregations and joins compared to standard Spark.
                            </p>
                        </div>
                        <div className="bg-neutral-950 p-12 hover:bg-neutral-900 transition-colors group">
                            <h4 className="text-lg font-serif text-white mb-4 group-hover:text-purple-400">Z-Ordering</h4>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Colocating related information in the same set of files. I enforce Z-Order indexing on high-cardinality join keys (e.g. CustomerID) to enable massive Data Skipping during read queries.
                            </p>
                        </div>
                        <div className="bg-neutral-950 p-12 hover:bg-neutral-900 transition-colors group">
                            <h4 className="text-lg font-serif text-white mb-4 group-hover:text-amber-400">The 1GB Checkpoint</h4>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Tuning <code>maxBytesPerTrigger</code> to ensure structured streaming micro-batches don't exceed driver memory. Optimized checkpointing strategies to prevent metadata bloat on S3/ADLS.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 07. DATA CONTRACTS */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-neutral-900/10">
                <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-last lg:order-first font-mono text-xs bg-[#0d1117] p-6 rounded-lg border border-white/10">
                        <pre className="text-neutral-300">
                            {`dataset: "orders_global"
owner: "checkout_team@company.com"
sla: "4 hours"
quality:
  - check: "row_count > 0"
  - check: "null_percentage(user_id) < 0.01"
schema:
  - name: "order_id"
    type: "string"
    primary_key: true
  - name: "amount"
    type: "decimal(10,2)"
    pii: false
    constraints: ["min_value(0)"]`}
                        </pre>
                    </div>
                    <div>
                        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">07 — Data Contracts</h2>
                        <h3 className="text-3xl font-serif text-white mb-6">API-First Data Engineering</h3>
                        <p className="text-neutral-400 leading-relaxed mb-6">
                            I treat data producers and consumers as microservices. Before a pipeline is deployed, a <strong>Data Contract (YAML)</strong> must be defined and versioned in Git.
                        </p>
                        <p className="text-neutral-400 leading-relaxed">
                            This contract is enforced in the CI/CD pipeline. If a schema change violates the contract (e.g., changing a column type without versioning), the PR is automatically blocked. This prevents "silent failures" in downstream dashboards.
                        </p>
                    </div>
                </div>
            </section>

            {/* 08. FINOPS */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-[90rem] mx-auto text-center max-w-4xl">
                    <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-8">08 — FinOps & Cost Strategy</h2>
                    <h3 className="text-4xl font-serif text-white mb-8">Performance at the Right Price</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <p className="text-5xl font-light text-white mb-2">70%</p>
                            <p className="text-xs font-mono text-neutral-500 uppercase">Spot Instance Usage</p>
                        </div>
                        <div>
                            <p className="text-5xl font-light text-white mb-2">Auto</p>
                            <p className="text-xs font-mono text-neutral-500 uppercase">Scaling Clusters</p>
                        </div>
                        <div>
                            <p className="text-5xl font-light text-white mb-2">TTL</p>
                            <p className="text-xs font-mono text-neutral-500 uppercase">Lifecycle Policy</p>
                        </div>
                        <div>
                            <p className="text-5xl font-light text-white mb-2">Tags</p>
                            <p className="text-xs font-mono text-neutral-500 uppercase">Cost Attribution</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 overflow-hidden">
                <VelocityBlock className="py-8">
                    <span className="text-8xl md:text-[10rem] font-bold text-neutral-900 uppercase whitespace-nowrap px-8">
                        Spark Kafka Delta Airflow Python SQL Scala
                    </span>
                </VelocityBlock>
                <VelocityBlock className="py-8">
                    <span className="text-8xl md:text-[10rem] font-bold text-neutral-800 uppercase whitespace-nowrap px-8">
                        Data Engineering Systems Reliability
                    </span>
                </VelocityBlock>
            </section>

        </div >
    );
}
