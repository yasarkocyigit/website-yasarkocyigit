import { getAllPosts } from "@/lib/mdx"

export async function GET() {
    const posts = getAllPosts('blog')
    const siteUrl = 'https://yasarkocyigit.com'

    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Yasar Kocyigit</title>
    <link>${siteUrl}</link>
    <description>AI, Data Engineering, and Product Design.</description>
    <language>en</language>
    ${posts.map(post => `
      <item>
        <title>${post.frontmatter.title}</title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <description>${post.frontmatter.description}</description>
        <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
        <guid>${siteUrl}/blog/${post.slug}</guid>
      </item>
    `).join('')}
  </channel>
</rss>`

    return new Response(feed, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}
