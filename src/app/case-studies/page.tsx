import { getAllPosts } from "@/lib/mdx"
import Link from "next/link"
import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
    title: "Case Studies | Yasar Kocyigit",
    description: "Detailed walkthroughs of complex technical problems and solutions.",
}

export default function CaseStudiesIndex() {
    const studies = getAllPosts('case-studies')

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
                <p className="text-xl text-muted-foreground">Deep dives into real-world production systems.</p>
            </div>

            <div className="grid gap-8">
                {studies.map((study) => (
                    <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group">
                        <article className="border rounded-2xl bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg">
                            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                                <div className="space-y-4 flex-1">
                                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{study.frontmatter.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed">{study.frontmatter.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {study.frontmatter.tags?.map(tag => (
                                            <Badge key={tag} variant="secondary">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground whitespace-nowrap pt-1">
                                    {study.frontmatter.date}
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
}
