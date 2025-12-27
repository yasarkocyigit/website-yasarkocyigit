"use client";
import React from "react";
import AnalyticsArchitectureDiagram from "@/components/analytics-architecture-diagram";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { VelocityBlock } from "@/components/ui/velocity-block";

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-white/20">

            {/* Header / Title Block */}
            <header className="pt-32 pb-24 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight mb-8">
                        <div className="block">
                            <BlurReveal delay={0.1}>Analytics</BlurReveal>
                        </div>
                        <div className="block text-neutral-500">
                            <BlurReveal delay={0.2}>Engineering</BlurReveal>
                        </div>
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t border-white/10 pt-12">
                        <div className="md:col-span-2">
                            <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl">
                                Bridging the gap between Data and Decisions.
                                Building the <span className="text-white border-b border-white/20">Semantic Layer</span> that powers enterprise reporting and self-service BI.
                            </p>
                        </div>
                        <div className="font-mono text-xs text-neutral-500 space-y-4">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>VERSION</span>
                                <span className="text-white">v3.0.1</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>STACK</span>
                                <span className="text-white">POWER BI / FABRIC</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>STATUS</span>
                                <span className="text-green-500">● ONLINE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 01. THE SEMANTIC LAYER */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-neutral-900/10">
                <div className="max-w-[90rem] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                        <div className="lg:col-span-1">
                            <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4 sticky top-32">01 — The Core</h2>
                        </div>
                        <div className="lg:col-span-3">
                            <h3 className="text-3xl font-serif mb-6">The Semantic Layer</h3>
                            <p className="text-neutral-400 max-w-2xl mb-12">
                                The Warehouse contains data, but the Semantic Layer contains <strong>meaning</strong>.
                                I implement a centralized "Source of Truth" model that standardizes KPIs across the organization, preventing the "spreadsheets everywhere" chaos.
                            </p>

                            <AnalyticsArchitectureDiagram />
                        </div>
                    </div>
                </div>
            </section>

            {/* 02. TECHNICAL SPECS (BENTO GRID) */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5">
                <div className="max-w-[90rem] mx-auto">
                    <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-12">02 — Technologies</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                        {/* Box 1: Modeling */}
                        <div className="bg-neutral-950 p-8 md:p-12 hover:bg-neutral-900 transition-colors duration-500 group">
                            <h3 className="text-xl font-serif text-white mb-2 group-hover:text-amber-500 transition-colors">Data Modeling</h3>
                            <div className="h-px w-8 bg-neutral-800 my-6" />
                            <ul className="space-y-4 font-mono text-xs text-neutral-400">
                                <li className="flex justify-between">
                                    <span>Schema</span>
                                    <span className="text-white">Star Schema (Kimball)</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Language</span>
                                    <span className="text-white">DAX / M</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Tools</span>
                                    <span className="text-white">Tabular Editor 3</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Mode</span>
                                    <span className="text-white">Direct Lake / Import</span>
                                </li>
                            </ul>
                        </div>

                        {/* Box 2: Visualisation */}
                        <div className="bg-neutral-950 p-8 md:p-12 hover:bg-neutral-900 transition-colors duration-500 group">
                            <h3 className="text-xl font-serif text-white mb-2 group-hover:text-blue-500 transition-colors">Visualisation</h3>
                            <div className="h-px w-8 bg-neutral-800 my-6" />
                            <ul className="space-y-4 font-mono text-xs text-neutral-400">
                                <li className="flex justify-between">
                                    <span>Platform</span>
                                    <span className="text-white">Power BI Service</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Custom Viz</span>
                                    <span className="text-white">Deneb (Vega-Lite)</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Design</span>
                                    <span className="text-white">Figma Prototypes</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Delivery</span>
                                    <span className="text-white">Power BI Apps</span>
                                </li>
                            </ul>
                        </div>

                        {/* Box 3: Automation */}
                        <div className="bg-neutral-950 p-8 md:p-12 hover:bg-neutral-900 transition-colors duration-500 group">
                            <h3 className="text-xl font-serif text-white mb-2 group-hover:text-purple-500 transition-colors">Automation</h3>
                            <div className="h-px w-8 bg-neutral-800 my-6" />
                            <ul className="space-y-4 font-mono text-xs text-neutral-400">
                                <li className="flex justify-between">
                                    <span>Deployment</span>
                                    <span className="text-white">Deployment Pipelines</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Testing</span>
                                    <span className="text-white">PBI Inspector</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Refresh</span>
                                    <span className="text-white">Power Automate</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Version Ctrl</span>
                                    <span className="text-white">Git Integration (PBIP)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 03. METHODOLOGY */}
            <section className="py-32 px-6 md:px-12 border-b border-white/5 bg-neutral-900/10">
                <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">

                    <div>
                        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-8">03 — Philosophy</h2>
                        <h3 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
                            Reports are products. <br />
                            <span className="text-white">Treat them like software.</span>
                        </h3>
                        <div className="prose prose-invert text-neutral-400 text-lg leading-relaxed space-y-6">
                            <p>
                                Too often, BI is treated as "make it look pretty". I treat Analytics as a strict engineering discipline.
                            </p>
                            <p>
                                Every measure is code. Every report is a product release. I enforce <strong>Version Control, CI/CD, and Automated Testing</strong> on all Power BI artifacts.
                            </p>
                            <ul className="list-none space-y-4 font-mono text-sm border-l border-white/10 pl-6 text-neutral-300">
                                <li>01. Calculation Groups for DRY Code</li>
                                <li>02. OLS/RLS for Security</li>
                                <li>03. Incremental Refresh for Scale</li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute top-0 right-0 p-4 border border-white/10 bg-neutral-900/50 backdrop-blur-sm rounded-full">
                            <span className="font-mono text-xs text-yellow-400">● ENTERPRISE BI</span>
                        </div>

                        <div className="space-y-12 mt-12 lg:mt-0">
                            <div className="group cursor-default">
                                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">Direct Lake</h4>
                                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-4">Fabric Speed</p>
                                <p className="text-neutral-400 leading-relaxed">
                                    Bypassing the import engine. Directly querying Delta Parquet files from OneLake for near-instantaneous performance on massive datasets.
                                </p>
                            </div>

                            <div className="h-px bg-white/10 w-full" />

                            <div className="group cursor-default">
                                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-green-500 transition-colors">Self Service</h4>
                                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-4">Empowerment</p>
                                <p className="text-neutral-400 leading-relaxed">
                                    Enable business analysts to connect via "Analyze in Excel" or Composite Models. They build their own calculations; IT manages the core model.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 04. GOVERNANCE & SECURITY (RLS) */}
            <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-neutral-900/10">
                <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Explanation */}
                    <div>
                        <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">04 — Security</h2>
                        <h3 className="text-3xl font-serif text-white mb-6">Row-Level Security (RLS)</h3>
                        <p className="text-neutral-400 leading-relaxed mb-6">
                            Security is not a filter; it's a fundamental property of the data model. I implement <strong>Dynamic RLS</strong> to allow a single report to serve thousands of users, each seeing only their own data.
                        </p>
                        <p className="text-neutral-400 leading-relaxed mb-8">
                            Instead of creating 50 different "Regional Sales" reports, I build <strong>one</strong> report. The Semantic Layer intercepts the query, checks the user's identity via Azure Entra ID (Active Directory), and automatically injects security predicates into the SQL/DAX query.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded bg-purple-900/30 border border-purple-500/50 flex items-center justify-center text-purple-400 text-xs font-mono mt-1">1</div>
                                <div>
                                    <h4 className="text-white text-sm font-medium">U.P.N. Extraction</h4>
                                    <p className="text-neutral-500 text-xs">System identifies <code>john.doe@company.com</code>.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded bg-purple-900/30 border border-purple-500/50 flex items-center justify-center text-purple-400 text-xs font-mono mt-1">2</div>
                                <div>
                                    <h4 className="text-white text-sm font-medium">Bridge Table Filtering</h4>
                                    <p className="text-neutral-500 text-xs">Security table filters the <code>RegionBridge</code> based on user assignment.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded bg-purple-900/30 border border-purple-500/50 flex items-center justify-center text-purple-400 text-xs font-mono mt-1">3</div>
                                <div>
                                    <h4 className="text-white text-sm font-medium">Fact Propagation</h4>
                                    <p className="text-neutral-500 text-xs">Filter propagates to 100M+ row Fact table via relationship.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Code Block */}
                    <div className="rounded-lg border border-white/10 bg-[#0d1117] overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-mono text-neutral-400">Manage Roles &gt; DAX Expression</span>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                            </div>
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <pre className="text-xs md:text-sm font-mono leading-relaxed text-blue-200">
                                <span className="text-purple-400">VAR</span> CurrentUser = <span className="text-yellow-300">UserPrincipalName()</span>{"\n"}
                                <span className="text-purple-400">VAR</span> AccessLevel ={"\n"}
                                {"    "}<span className="text-blue-400">LOOKUPVALUE</span>({"\n"}
                                {"        "}'Security'[AccessType],{"\n"}
                                {"        "}'Security'[Email], CurrentUser{"\n"}
                                {"    "}){"\n\n"}
                                <span className="text-purple-400">RETURN</span>{"\n"}
                                {"    "}<span className="text-purple-400">IF</span>({"\n"}
                                {"        "}AccessLevel = <span className="text-green-300">"Admin"</span>,{"\n"}
                                {"        "}<span className="text-blue-400">TRUE</span>(),{"\n"}
                                {"        "}'Region'[RegionKey] <span className="text-purple-400">IN</span>{"\n"}
                                {"            "}<span className="text-blue-400">CALCULATETABLE</span>({"\n"}
                                {"                "}<span className="text-blue-400">VALUES</span>('Security'[RegionKey]),{"\n"}
                                {"                "}'Security'[Email] = CurrentUser{"\n"}
                                {"            "}){"\n"}
                                {"    "})
                            </pre>
                        </div>
                    </div>

                </div>
            </section>

            <section className="py-32 overflow-hidden">
                <VelocityBlock className="py-8">
                    <span className="text-8xl md:text-[10rem] font-bold text-neutral-900 uppercase whitespace-nowrap px-8">
                        DAX PowerBI Fabric Tabular SQL
                    </span>
                </VelocityBlock>
                <VelocityBlock className="py-8">
                    <span className="text-8xl md:text-[10rem] font-bold text-neutral-800 uppercase whitespace-nowrap px-8">
                        Analytics Visualisation Insights
                    </span>
                </VelocityBlock>
            </section>

        </div >
    );
}
