import { defineDocumentType, makeSource } from "contentlayer/source-files";
import GithubSlugger from "github-slugger";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const extractHeadings = (raw: string) => {
  const headings: Array<{ level: number; text: string; slug: string }> = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  const slugger = new GithubSlugger();

  let match: RegExpExecArray | null;
  while ((match = regex.exec(raw)) !== null) {
    const depth = match[1].length;
    const text = match[2]
      .replace(/`/g, "")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .trim();
    headings.push({
      level: depth,
      text,
      slug: slugger.slug(text),
    });
  }

  return headings;
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    index: { type: "number", required: true },
    summary: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    draft: { type: "boolean", default: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^posts\//, ""),
    },
    headings: {
      type: "json",
      resolve: (doc) => extractHeadings(doc.body.raw),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
});
