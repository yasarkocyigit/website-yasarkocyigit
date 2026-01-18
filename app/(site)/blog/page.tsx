import BlogList from "@/components/BlogList";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  description: "All posts by Yasar Kocyigit",
};

export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="page-offset space-y-10">
      <header className="space-y-2">
        <p className="mono text-[0.65rem] tracking-[0.32em] text-muted">
          ARCHIVE
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight">Blog</h1>
        <p className="max-w-2xl text-muted">
          Field notes on governed metrics, Delta patterns, and data platform
          design.
        </p>
      </header>
      <BlogList posts={posts} />
    </div>
  );
}
