import { getAllPosts } from "@/lib/mdx"
import { NextResponse } from "next/server"

export async function GET() {
    const blogPosts = getAllPosts('blog')
    const caseStudies = getAllPosts('case-studies')

    const documents = [
        ...blogPosts.map(post => ({
            id: `blog-${post.slug}`,
            slug: `/blog/${post.slug}`,
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            type: 'Blog'
        })),
        ...caseStudies.map(post => ({
            id: `case-${post.slug}`,
            slug: `/case-studies/${post.slug}`,
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            type: 'Case Study'
        }))
    ]

    return NextResponse.json(documents)
}
