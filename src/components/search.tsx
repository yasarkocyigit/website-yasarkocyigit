"use client"

import { useState, useEffect } from "react"
import MiniSearch from "minisearch"
import { Search as SearchIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Result = {
    id: string
    slug: string
    title: string
    description: string
    type: string
}

export function Search() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Result[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [miniSearch, setMiniSearch] = useState<MiniSearch | null>(null)
    const router = useRouter()

    useEffect(() => {
        fetch('/api/search')
            .then(res => res.json())
            .then(data => {
                const ms = new MiniSearch({
                    fields: ['title', 'description'],
                    storeFields: ['title', 'slug', 'description', 'type']
                })
                ms.addAll(data)
                setMiniSearch(ms)
                setIsLoaded(true)
            })
    }, [])

    useEffect(() => {
        if (!miniSearch || query.length < 2) {
            setResults([])
            return
        }
        const searchResults = miniSearch.search(query, { prefix: true, fuzzy: 0.2 })
        setResults(searchResults as any)
    }, [query, miniSearch])

    return (
        <div className="relative w-full max-w-sm">
            <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                    type="search"
                    placeholder="Search..."
                    className="flex h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>
            {query.length >= 2 && results.length > 0 && (
                <div className="absolute top-full mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md z-50 overflow-hidden">
                    <div className="max-h-[300px] overflow-y-auto py-1">
                        {results.map(result => (
                            <Link
                                key={result.id}
                                href={result.slug}
                                onClick={() => setQuery("")}
                                className="flex flex-col px-4 py-2 hover:bg-muted/50 text-sm"
                            >
                                <span className="font-medium">{result.title}</span>
                                <span className="text-xs text-muted-foreground">{result.type}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
