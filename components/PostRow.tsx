import type { Post } from "contentlayer/generated";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/posts";

interface PostRowProps {
  post: Post;
  className?: string;
}

export default function PostRow({ post, className }: PostRowProps) {
  return (
    <li className={cn("border-b border-dashed border-line", className)}>
      <Link
        href={`/blog/${post.slug}`}
        className="group grid gap-4 py-8 transition duration-300 ease-out lg:grid-cols-[90px_1fr]"
      >
        <span className="mono text-xs tracking-[0.32em] text-muted group-hover:text-foreground">
          [{post.index.toString().padStart(2, "0")}]
        </span>
        <div className="space-y-2">
          <h2 className="max-w-3xl text-[clamp(1.8rem,4vw,3.6rem)] font-extrabold leading-tight transition group-hover:underline">
            {post.title}
          </h2>
          <p className="mono text-[0.65rem] tracking-[0.32em] text-muted">
            {formatDate(post.date)}
          </p>
        </div>
      </Link>
    </li>
  );
}
