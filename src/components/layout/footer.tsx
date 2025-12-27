import Link from "next/link"

export function Footer() {
    return (
        <footer className="relative z-10 bg-black text-neutral-500 py-24 flex flex-col items-center justify-center space-y-8">
            <div className="flex gap-8 text-xs tracking-widest uppercase font-light">
                <a href="https://linkedin.com/in/yasarkocyigit" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="mailto:yasarkocyigit@daqconsulting.com" className="hover:text-white transition-colors">Email</a>
            </div>

            <div className="text-center space-y-2">
                <p className="font-serif italic text-lg text-neutral-700">Designed & Engineered by Yasar Kocyigit</p>
            </div>
        </footer>
    )
}
