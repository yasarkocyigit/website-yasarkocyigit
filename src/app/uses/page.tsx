import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Uses | Yasar Kocyigit',
    description: 'Software, gadgets, and tools I use.',
}

export default function Uses() {
    return (
        <div className="prose dark:prose-invert max-w-none">
            <h1>Uses</h1>
            <p className="lead">A curated list of the tech I use to build things.</p>

            <h3>Hardware</h3>
            <ul>
                <li><strong>MacBook Pro 14"</strong> (M1 Pro) - The best laptop ever made.</li>
                <li><strong>LG UltraFine 4K</strong> - Crisp text is mandatory.</li>
                <li><strong>Keychron K2</strong> - Mechanical, tactical, wireless.</li>
            </ul>

            <h3>Editor & Terminal</h3>
            <ul>
                <li><strong>VS Code</strong> - Theme: GitHub Dark Dimmed.</li>
                <li><strong>Warp</strong> - The terminal for the 21st century.</li>
                <li><strong>JetBrains Mono</strong> - Ligatures make code readable.</li>
            </ul>

            <h3>Software</h3>
            <ul>
                <li><strong>Raycast</strong> - Spotlight on steroids.</li>
                <li><strong>Obsidian</strong> - Second brain.</li>
                <li><strong>Figma</strong> - Design tool of choice.</li>
            </ul>
        </div>
    )
}
