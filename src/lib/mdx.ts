import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const root = process.cwd()

export type Post = {
    slug: string
    content: string
    frontmatter: {
        title: string
        description: string
        date: string
        tags?: string[]
        published?: boolean
    }
    readingTime?: string
}

export function getFiles(type: 'blog' | 'case-studies') {
    const dir = path.join(root, 'src', 'content', type)
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir)
}

export function getPostBySlug(type: 'blog' | 'case-studies', slug: string): Post {
    const source = fs.readFileSync(path.join(root, 'src', 'content', type, `${slug}.mdx`), 'utf8')
    const { data, content } = matter(source)

    return {
        slug,
        content,
        frontmatter: data as Post['frontmatter'],
        readingTime: `${Math.ceil(content.split(/\s+/).length / 200)} min read`
    }
}

export function getAllPosts(type: 'blog' | 'case-studies'): Post[] {
    const files = getFiles(type)

    return files.map((postSlug) => {
        const source = fs.readFileSync(path.join(root, 'src', 'content', type, postSlug), 'utf8')
        const { data, content } = matter(source)

        return {
            slug: postSlug.replace('.mdx', ''),
            content: content,
            frontmatter: data as Post['frontmatter'],
            readingTime: `${Math.ceil(content.split(/\s+/).length / 200)} min read`
        }
    }).sort((a, b) => Number(new Date(b.frontmatter.date)) - Number(new Date(a.frontmatter.date)))
}
