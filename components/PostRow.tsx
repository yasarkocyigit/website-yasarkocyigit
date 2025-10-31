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
        className="group grid gap-4 py-7 transition duration-300 ease-out sm:grid-cols-[80px_1fr] lg:grid-cols-[90px_1fr]"
      >
        <span className="mono text-[0.6rem] tracking-[0.24em] text-muted transition group-hover:text-foreground sm:text-xs sm:tracking-[0.32em]">
          [{post.index.toString().padStart(2, "0")}]
        </span>
        <div className="space-y-2">
          <h2 className="max-w-3xl text-[clamp(1.5rem,5.2vw,3.4rem)] font-extrabold leading-tight transition group-hover:underline">
            {post.title}
          </h2>
          <p className="mono text-[0.55rem] tracking-[0.24em] text-muted sm:text-[0.65rem] sm:tracking-[0.32em]">
            {formatDate(post.date)}
          </p>
        </div>
      </Link>
    </li>
  );
}
