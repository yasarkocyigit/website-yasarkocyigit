import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import '@/app/globals.css'

type Params = { slug: string }

export async function generateStaticParams() {
    const posts = getAllPosts('blog')
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    try {
        const { slug } = await params
        const post = getPostBySlug('blog', slug)
        return {
            title: `${post.frontmatter.title} | Yasar Kocyigit`,
            description: post.frontmatter.description,
        }
    } catch {
        return { title: 'Not Found' }
    }
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
    try {
        const { slug } = await params
        const post = getPostBySlug('blog', slug)

        return (
            <article className="max-w-2xl mx-auto">
                <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Journal
                </Link>

                <header className="mb-12 space-y-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <time>{post.frontmatter.date}</time>
                        <span>·</span>
                        <span>{post.readingTime}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight text-foreground">
                        {post.frontmatter.title}
                    </h1>
                    <div className="flex gap-2">
                        {post.frontmatter.tags?.map(tag => (
                            <span key={tag} className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none prose-headings:font-medium prose-a:text-foreground prose-a:no-underline prose-a:border-b prose-a:border-border hover:prose-a:border-foreground transition-all">
                    <MDXRemote
                        source={post.content}
                        options={{
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
                </div>
            </article>
        )
    } catch {
        notFound()
    }
}
