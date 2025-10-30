import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXContent } from "@/components/MDX";
import TableOfContents from "@/components/TOC";
import type { TOCHeading } from "@/components/TOC";
import {
  calculateReadingTime,
  formatDate,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
} from "@/lib/posts";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {};
  }

  const url = `https://yasarkocyigit.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url,
      authors: ["Yasar Kocyigit"],
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: `/api/og?title=${encodeURIComponent(post.title)}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [`/api/og?title=${encodeURIComponent(post.title)}`],
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.body.raw);
  const { newer, older } = getAdjacentPosts(post.slug);
  const headings = (post.headings ?? []) as TOCHeading[];

  return (
    <article className="page-offset space-y-12">
      <header className="space-y-4">
        <Link
          href="/blog"
          className="mono inline-flex items-center gap-2 text-[0.65rem] tracking-[0.32em] text-muted transition hover:text-foreground"
        >
          ← BACK TO BLOG
        </Link>
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-tight tracking-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="mono text-[0.65rem] tracking-[0.32em]">
            {formatDate(post.date)}
          </span>
          <span aria-hidden="true">•</span>
          <span className="mono text-[0.65rem] tracking-[0.32em]">
            {readingTime} min read
          </span>
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="mono rounded-full border border-line px-3 py-1 text-[0.6rem] tracking-[0.3em] text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-10">
          <MDXContent code={post.body.code} />
        </div>
        <TableOfContents headings={headings} />
      </div>

      <nav className="grid gap-6 border-t border-dashed border-line pt-6 text-sm text-muted md:grid-cols-2">
        {older ? (
          <Link
            href={`/blog/${older.slug}`}
            className="group rounded-lg border border-line bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="mono text-[0.6rem] tracking-[0.32em] text-muted">
              PREVIOUS
            </span>
            <p className="mt-2 text-lg font-semibold text-foreground group-hover:underline">
              {older.title}
            </p>
          </Link>
        ) : (
          <div className="rounded-lg border border-dashed border-line p-5 opacity-40">
            Start of archive
          </div>
        )}
        {newer ? (
          <Link
            href={`/blog/${newer.slug}`}
            className="group rounded-lg border border-line bg-card p-5 text-right transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="mono text-[0.6rem] tracking-[0.32em] text-muted">
              NEXT
            </span>
            <p className="mt-2 text-lg font-semibold text-foreground group-hover:underline">
              {newer.title}
            </p>
          </Link>
        ) : (
          <div className="rounded-lg border border-dashed border-line p-5 text-right opacity-40">
            Latest post
          </div>
        )}
      </nav>
    </article>
  );
}
