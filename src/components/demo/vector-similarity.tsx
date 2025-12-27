"use client"

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

function cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

export function VectorSimilarity() {
    const [vecA, setVecA] = useState("0.1, 0.5, 0.8")
    const [vecB, setVecB] = useState("0.2, 0.4, 0.9")

    const parseVec = (s: string) => s.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n))

    const arrayA = parseVec(vecA)
    const arrayB = parseVec(vecB)

    // Pad checks
    const isValid = arrayA.length > 0 && arrayB.length > 0 && arrayA.length === arrayB.length

    let similarity = 0
    if (isValid) {
        similarity = cosineSimilarity(arrayA, arrayB)
    }

    return (
        <div className="rounded-xl border bg-card p-6 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
                Vector Similarity Playground
                <Badge variant="outline">Math</Badge>
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Vector A</label>
                    <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors cursor-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" value={vecA} onChange={e => setVecA(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Vector B</label>
                    <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors cursor-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" value={vecB} onChange={e => setVecB(e.target.value)} />
                </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-lg flex justify-between items-center">
                <span className="text-sm font-medium">Cosine Similarity:</span>
                <span className="text-xl font-mono font-bold text-primary">
                    {isValid ? similarity.toFixed(4) : "Dimension Mismatch"}
                </span>
            </div>
            <p className="text-xs text-muted-foreground">
                Enter comma-separated numbers. Cosine similarity measures the cosine of the angle between two vectors. 1.0 is identical direction.
            </p>
        </div>
    )
}
