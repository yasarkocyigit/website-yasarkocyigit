import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Now | Yasar Kocyigit',
    description: 'What I am currently working on.',
}

export default function Now() {
    return (
        <div className="prose dark:prose-invert max-w-none">
            <h1>Now</h1>
            <p className="text-sm text-muted-foreground">Updated Dec 2024</p>

            <h3>Building</h3>
            <p>
                I'm currently focused on scaling <strong>Vector RAG Systems</strong> for a large fintech client. We are moving from prototype to production with 10M+ documents.
            </p>

            <h3>Learning</h3>
            <p>
                Diving deep into <strong>Rust</strong> for high-performance data engineering tools.
            </p>

            <h3>Reading</h3>
            <p>
                "Designing Data-Intensive Applications" (Re-reading for the 3rd time).
            </p>
        </div>
    )
}
