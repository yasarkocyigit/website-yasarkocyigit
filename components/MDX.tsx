/* eslint-disable @next/next/no-img-element */
"use client";

import { isValidElement, useMemo, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { cn } from "@/lib/utils";

function AnchorHeading({
  as: Tag,
  id,
  children,
  ...props
}: {
  as: "h2" | "h3";
  id?: string;
  children?: ReactNode;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "group scroll-mt-20 font-extrabold tracking-tight text-foreground",
        Tag === "h2"
          ? "mt-10 text-3xl"
          : "mt-8 text-2xl text-foreground/90 transition group-hover:text-foreground"
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

function CodeBlock({ children, className, ...props }: ComponentProps<"pre">) {
  const [copied, setCopied] = useState(false);

  const element = useMemo(() => (isValidElement(children) ? children : null), [children]);

  const code = useMemo(() => {
    const node = element?.props?.children;
    return typeof node === "string" ? node.trim() : "";
  }, [element]);

  const language = useMemo(() => {
    const classValue = typeof element?.props?.className === "string" ? element.props.className : undefined;
    if (!classValue) return "";
    const match = classValue.match(/language-(?<lang>[\w-]+)/);
    return match?.groups?.lang?.toUpperCase() ?? "";
  }, [element]);

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        className="copy-indicator"
        data-copied={copied}
        style={{ opacity: copied ? 1 : 0.65 }}
      >
        {copied ? "COPIED" : language || "COPY"}
      </button>
      <pre
        className={cn(
          "mt-6 overflow-x-auto rounded-2xl border border-line bg-card p-6 text-sm leading-relaxed",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

const components = {
  h2: (props: ComponentProps<"h2">) => <AnchorHeading as="h2" {...props} />,
  h3: (props: ComponentProps<"h3">) => <AnchorHeading as="h3" {...props} />,
  a: ({ className, href = "", ...props }: ComponentProps<"a">) => {
    const isExternal = href.startsWith("http");
    return (
      <a
        className={cn(
          "font-medium text-foreground underline-offset-4 transition hover:text-foreground/80 hover:underline",
          className
        )}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        {...props}
      />
    );
  },
  pre: (props: ComponentProps<"pre">) => <CodeBlock {...props} />,
  table: (props: ComponentProps<"table">) => (
    <div className="my-8 overflow-hidden rounded-xl border border-line">
      <table className="min-w-full divide-y divide-line text-left text-sm" {...props} />
    </div>
  ),
  th: ({ className, ...props }: ComponentProps<"th">) => (
    <th
      className={cn("bg-card px-4 py-3 font-semibold text-muted", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentProps<"td">) => (
    <td className={cn("px-4 py-3", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps<"blockquote">) => (
    <blockquote
      className={cn(
        "my-8 border-l-4 border-line pl-6 text-lg italic text-muted",
        className
      )}
      {...props}
    />
  ),
  img: ({ className, ...props }: ComponentProps<"img">) => (
    <img
      className={cn("my-8 w-full rounded-2xl border border-line", className)}
      {...props}
      alt={props.alt ?? ""}
    />
  ),
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose prose-lg max-w-none">
      <Component components={components} />
    </div>
  );
}
