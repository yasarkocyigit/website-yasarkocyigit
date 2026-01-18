import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://yasarkocyigit.com";

function toRssDate(date: string) {
  return new Date(date).toUTCString();
}

export async function GET() {
  const posts = getAllPosts().slice(0, 20);

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `<item>
<title><![CDATA[${post.title}]]></title>
<link>${url}</link>
<guid>${url}</guid>
<description><![CDATA[${post.summary}]]></description>
<pubDate>${toRssDate(post.date)}</pubDate>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Yasar Kocyigit</title>
    <link>${SITE_URL}</link>
    <description>Data engineering insights from Yasar Kocyigit.</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=1800",
    },
  });
}
