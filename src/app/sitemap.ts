import { getAllPosts } from "@/lib/mdx"

export default function sitemap() {
    const baseUrl = 'https://yasarkocyigit.com'
    const blogPosts = getAllPosts('blog')
    const caseStudies = getAllPosts('case-studies')

    const blogs = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.frontmatter.date,
    }))

    const cases = caseStudies.map((post) => ({
        url: `${baseUrl}/case-studies/${post.slug}`,
        lastModified: post.frontmatter.date,
    }))

    const routes = ['', '/blog', '/case-studies', '/projects', '/lab', '/about', '/contact', '/uses', '/now'].map(
        (route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date().toISOString().split('T')[0],
        })
    )

    return [...routes, ...blogs, ...cases]
}
