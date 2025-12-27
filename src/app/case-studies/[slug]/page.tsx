import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import ArchitectureDiagram from "@/components/architecture-diagram"
import ArchitectureDiagramDetailed from "@/components/architecture-diagram-detailed"
import ArchitectureDiagramDLT from "@/components/architecture-diagram-dlt"
import ArchitectureDiagramUnityMigration from "@/components/architecture-diagram-unity-migration"
import ArchitectureDiagramAgent from "@/components/architecture-diagram-agent"
import { McpAgentDemo } from "@/components/mcp-agent-demo"
import { MDXRemote } from "next-mdx-remote/rsc"

import { notFound } from "next/navigation"
import { Metadata } from "next"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"
import { BlurReveal } from "@/components/ui/blur-reveal"

import '@/app/globals.css'

type Params = { slug: string }

export async function generateStaticParams() {
    const posts = getAllPosts('case-studies')
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    try {
        const { slug } = await params
        const post = getPostBySlug('case-studies', slug)
        return {
            title: `${post.frontmatter.title} | Case Study`,
            description: post.frontmatter.description,
        }
    } catch {
        return { title: 'Not Found' }
    }
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
    try {
        const { slug } = await params
        const post = getPostBySlug('case-studies', slug)

        return (
            <div className="min-h-screen bg-neutral-950 text-white selection:bg-white/20">
                {/* Header / Title Block */}
                <header className="pt-32 pb-24 px-6 md:px-12 border-b border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight mb-8">
                            <BlurReveal delay={0.1}>
                                {post.frontmatter.title}
                            </BlurReveal>
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t border-white/10 pt-12">
                            <div className="md:col-span-2">
                                <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl">
                                    {post.frontmatter.description}
                                </p>
                            </div>
                            <div className="font-mono text-xs text-neutral-500 space-y-4">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>TIMESTAMP</span>
                                    <span className="text-white">{post.frontmatter.date}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>TYPE</span>
                                    <span className="text-white">ARCHITECTURE</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span>STATUS</span>
                                    <span className="text-green-500">● PUBLISHED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Section */}
                <section className="py-24 px-6 md:px-12 border-b border-white/5 bg-neutral-900/10">
                    <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24 items-start">

                        {/* Left Column: Context */}
                        <div className="lg:col-span-1 lg:sticky lg:top-32 space-y-12">
                            <div>
                                <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">01 — Context</h2>
                                <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                                    The following documentation covers the architectural decisions, trade-offs, and implementation details for this system.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {post.frontmatter.tags?.map(tag => (
                                        <span key={tag} className="px-3 py-1 border border-white/10 text-[10px] font-mono text-neutral-400 uppercase tracking-widest bg-neutral-950">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: MDX Content */}
                        <div className="lg:col-span-3">
                            <article className="prose prose-invert prose-lg max-w-none 
                                prose-headings:font-serif prose-headings:font-light prose-headings:tracking-tight prose-headings:mb-8 prose-headings:mt-16
                                prose-p:text-neutral-400 prose-p:font-light prose-p:leading-relaxed prose-p:max-w-3xl
                                prose-strong:text-white prose-strong:font-semibold
                                prose-ul:text-neutral-400 prose-li:marker:text-neutral-600 prose-ul:max-w-3xl
                                prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-white/10 prose-pre:font-mono prose-pre:text-xs prose-pre:max-w-3xl
                                prose-code:text-amber-200 prose-code:bg-transparent prose-code:font-light
                                prose-hr:border-white/10
                                prose-img:rounded-xl prose-img:border prose-img:border-white/10
                            ">
                                <MDXRemote
                                    source={post.content}
                                    components={{
                                        ArchitectureDiagram: (props) => (
                                            <div className="my-32 not-prose relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen">
                                                <div className="max-w-[100rem] mx-auto relative px-6 md:px-12">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl opacity-20" />
                                                    <div className="bg-neutral-950 border-y border-white/10 p-0 md:p-12 overflow-hidden relative group shadow-2xl">
                                                        <div className="absolute top-6 right-8 z-20 flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden md:block">
                                                                Live Architecture
                                                            </span>
                                                        </div>
                                                        <ArchitectureDiagram {...props} />
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                        ArchitectureDiagramUnityMigration: (props: any) => (
                                            <div className="my-32 not-prose relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen">
                                                <div className="max-w-[100rem] mx-auto relative px-6 md:px-12">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 blur-3xl opacity-20" />
                                                    <div className="bg-neutral-950 border-y border-white/10 p-0 md:p-12 overflow-hidden relative group shadow-2xl">
                                                        <div className="absolute top-6 right-8 z-20 flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                                                            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden md:block">
                                                                Migration Map
                                                            </span>
                                                        </div>
                                                        <ArchitectureDiagramUnityMigration {...props} />
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                        ArchitectureDiagramDetailed: (props) => (
                                            <div className="my-32 not-prose relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen">
                                                <div className="max-w-[100rem] mx-auto relative px-6 md:px-12">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl opacity-20" />
                                                    <div className="bg-neutral-950 border-y border-white/10 p-0 md:p-12 overflow-hidden relative group shadow-2xl">
                                                        <div className="absolute top-6 right-8 z-20 flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                                                            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden md:block">
                                                                Detailed View
                                                            </span>
                                                        </div>
                                                        <ArchitectureDiagramDetailed {...props} />
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                        ArchitectureDiagramDLT: (props) => (
                                            <div className="my-32 not-prose relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen">
                                                <div className="max-w-[100rem] mx-auto relative px-6 md:px-12">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-amber-500/10 blur-3xl opacity-20" />
                                                    <div className="bg-neutral-950 border-y border-white/10 p-0 md:p-12 overflow-hidden relative group shadow-2xl">
                                                        <div className="absolute top-6 right-8 z-20 flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden md:block">
                                                                Declarative Pipeline
                                                            </span>
                                                        </div>
                                                        <ArchitectureDiagramDLT {...props} />
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                        ArchitectureDiagramAgent: (props: any) => (
                                            <div className="my-32 not-prose relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen">
                                                <div className="max-w-[100rem] mx-auto relative px-6 md:px-12">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 blur-3xl opacity-20" />
                                                    <div className="bg-neutral-950 border-y border-white/10 p-0 md:p-12 overflow-hidden relative group shadow-2xl">
                                                        <div className="absolute top-6 right-8 z-20 flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                                            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden md:block">
                                                                Agent Runtime
                                                            </span>
                                                        </div>
                                                        <ArchitectureDiagramAgent {...props} />
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                        McpAgentDemo: (props: any) => (
                                            <div className="my-24 w-full h-[450px] border-none bg-transparent relative">
                                                <div className="absolute -top-12 left-0 z-20 px-2 py-1 text-[10px] font-mono text-green-500 uppercase tracking-widest flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                                    LIVE RECORDING: AGENT_LOGS
                                                </div>
                                                <McpAgentDemo {...props} />
                                            </div>
                                        )
                                    }}
                                    options={{
                                        parseFrontmatter: true,
                                        mdxOptions: {
                                            remarkPlugins: [remarkGfm],
                                            rehypePlugins: [
                                                rehypeHighlight,
                                                rehypeSlug,
                                                [rehypeAutolinkHeadings, { behavior: 'wrap' }]
                                            ]
                                        }
                                    }}
                                />
                            </article >
                        </div >
                    </div >
                </section >
            </div >
        )
    } catch {
        notFound()
    }
}
