import { VectorSimilarity } from "@/components/demo/vector-similarity"
import { StreamingWindow } from "@/components/demo/streaming-window"
import { RAGEval } from "@/components/demo/rag-eval"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Lab | Yasar Kocyigit",
    description: "Interactive playground for technical concepts.",
}

export default function Lab() {
    return (
        <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">The Lab</h1>
                <p className="text-xl text-muted-foreground">Interactive visualizations of algorithms and systems concepts.</p>
            </div>

            <div className="space-y-8">
                <VectorSimilarity />
                <StreamingWindow />
                <RAGEval />
            </div>
        </div>
    )
}
