"use client"

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

export function RAGEval() {
    // tp = Relevant & Retrieved
    // fp = Irrelevant & Retrieved
    // fn = Relevant & Not Retrieved

    // Let's simulate a simple matrix
    const [retrieved, setRetrieved] = useState([true, true, false, true, false]) // 5 docs retrieved
    const [relevance, setRelevance] = useState([true, false, false, true, false]) // Ground truth for these 5 slots

    // We need "Total Relevant In Corpus" to calc Recall accurately, let's assume it's fixed
    const totalRelevantInCorpus = 5

    const tp = retrieved.filter((r, i) => r && relevance[i]).length
    const fp = retrieved.filter((r, i) => r && !relevance[i]).length
    // fn = totalRelevant - tp
    const fn = totalRelevantInCorpus - tp

    const precision = tp / (tp + fp) || 0
    const recall = tp / (tp + fn) || 0
    const f1 = 2 * ((precision * recall) / (precision + recall)) || 0

    const toggleRelevance = (i: number) => {
        const newRel = [...relevance]
        newRel[i] = !newRel[i]
        setRelevance(newRel)
    }

    return (
        <div className="rounded-xl border bg-card p-6 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
                RAG Retrieval Eval
                <Badge variant="outline">AI/ML</Badge>
            </h3>

            <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Retrieved Documents (Click to toggle relevance)</p>
                <div className="flex gap-2">
                    {relevance.map((isRel, i) => (
                        <button
                            key={i}
                            onClick={() => toggleRelevance(i)}
                            className={`w-12 h-16 rounded border text-xs flex items-center justify-center font-bold transition-all ${isRel ? 'bg-green-500/20 border-green-500 text-green-600' : 'bg-red-500/10 border-red-200 text-red-400'}`}
                        >
                            Doc {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-secondary/50 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Precision</div>
                    <div className="text-lg font-mono font-bold text-primary">{precision.toFixed(2)}</div>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">Recall</div>
                    <div className="text-lg font-mono font-bold text-primary">{recall.toFixed(2)}</div>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg text-center">
                    <div className="text-xs text-muted-foreground">F1 Score</div>
                    <div className="text-lg font-mono font-bold text-primary">{f1.toFixed(2)}</div>
                </div>
            </div>
            <p className="text-xs text-muted-foreground">
                In this toy example, we assume Total Relevant Documents in corpus = {totalRelevantInCorpus}. Toggle the "Relevance" of the retrieved docs to see metrics change.
            </p>
        </div>
    )
}
