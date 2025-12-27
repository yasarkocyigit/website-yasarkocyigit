"use client"

import * as React from "react"
import { Command } from "cmdk"
import { Search, File, Laptop, User, Home, Moon, Sun } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const { setTheme } = useTheme()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50 md:hidden">
                <button
                    onClick={() => setOpen(true)}
                    className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg"
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>

            <Command.Dialog
                open={open}
                onOpenChange={setOpen}
                label="Global Command Menu"
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 pt-[20vh] flex items-start justify-center"
                onClick={(e) => {
                    if (e.target === e.currentTarget) setOpen(false)
                }}
            >
                <div className="bg-popover text-popover-foreground w-full max-w-lg rounded-xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center border-b border-border px-4 py-3" cmdk-input-wrapper="">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="flex h-6 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <Command.List className="max-h-[300px] overflow-y-auto p-2">
                        <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>

                        <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/"))}
                                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
                                <Home className="mr-2 h-4 w-4" />
                                <span>Home</span>
                            </Command.Item>

                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/projects"))}
                                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
                                <Laptop className="mr-2 h-4 w-4" />
                                <span>Projects</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/about"))}
                                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
                                <User className="mr-2 h-4 w-4" />
                                <span>About</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Separator className="my-1 h-px bg-border" />

                        <Command.Group heading="Theme" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                            <Command.Item
                                onSelect={() => runCommand(() => setTheme("light"))}
                                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
                                <Sun className="mr-2 h-4 w-4" />
                                <span>Light Mode</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => setTheme("dark"))}
                                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
                                <Moon className="mr-2 h-4 w-4" />
                                <span>Dark Mode</span>
                            </Command.Item>
                        </Command.Group>
                    </Command.List>
                </div>
            </Command.Dialog>
        </>
    )
}
