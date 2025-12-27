"use client"

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'

type Event = { id: number, value: number, timestamp: number }

export function StreamingWindow() {
    const [events, setEvents] = useState<Event[]>([])
    const [windowSum, setWindowSum] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        if (!isRunning) return

        const interval = setInterval(() => {
            const newEvent = { id: Date.now(), value: Math.floor(Math.random() * 10), timestamp: Date.now() }
            setEvents(prev => [...prev, newEvent].slice(-20)) // Keep last 20 for visual
        }, 1000)

        return () => clearInterval(interval)
    }, [isRunning])

    // Tumbling window simulation (simplified for visual)
    // Actually, let's do a sliding window sum of the last 10 seconds
    useEffect(() => {
        const now = Date.now()
        const recent = events.filter(e => now - e.timestamp < 10000)
        setWindowSum(recent.reduce((acc, curr) => acc + curr.value, 0))
    }, [events])

    return (
        <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    Streaming Window
                    <Badge variant="outline">Stream Processing</Badge>
                </h3>
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-md"
                >
                    {isRunning ? 'Stop' : 'Start Stream'}
                </button>
            </div>

            <div className="h-24 bg-background border rounded-md relative overflow-hidden flex items-center px-4 gap-2">
                {events.map(e => (
                    <div key={e.id} className="w-8 h-8 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs font-mono animate-in slide-in-from-right duration-300">
                        {e.value}
                    </div>
                ))}
                {events.length === 0 && <span className="text-muted-foreground text-sm">No events...</span>}
            </div>

            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rolling Sum (10s):</span>
                <span className="font-mono font-bold">{windowSum}</span>
            </div>
            <p className="text-xs text-muted-foreground">
                Simulates a Flink-style sliding aggregate. New events arrive every second. Sum calculated over last 10s.
            </p>
        </div>
    )
}
