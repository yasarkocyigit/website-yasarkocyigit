"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function PostCard({ title, description, date, slug, tags, delay }: { title: string, description: string, date: string, slug: string, tags?: string[], delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <Link href={`/blog/${slug}`} className="group block">
                <article className="h-full rounded-2xl border border-border/50 bg-card/50 p-6 transition-all hover:bg-card hover:border-border hover:shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex flex-col h-full relative z-10">
                        <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                            <time dateTime={date}>{date}</time>
                        </div>

                        <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                            {title}
                        </h3>

                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {tags?.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="secondary" className="text-[10px] px-2 h-5 font-normal bg-secondary/50 group-hover:bg-secondary transition-colors">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    )
}
