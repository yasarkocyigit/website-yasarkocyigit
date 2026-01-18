import { Github, Linkedin } from "lucide-react";
import type { SVGProps } from "react";

const MediumIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    <path d="M4.21 0A4.2 4.2 0 0 0 0 4.21v15.58A4.2 4.2 0 0 0 4.21 24h15.58A4.2 4.2 0 0 0 24 19.79v-1.093c-.137.013-.278.02-.422.02-2.577 0-4.027-2.146-4.09-4.832a7.64 7.64 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.88 3.88 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023c.101 0 .202.004.303.01V4.211A4.2 4.2 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146h-.002c-.705.16-1.063.397-1.063 1.254l.003 10.274c.06.676.424.885 1.063 1.03h.02v.145h-4.923v-.145h.019c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253h.02v.147H4.405v-.147h.019c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254h-.018zM23.658 9.251c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.37 1.37 0 0 0-.342-.047Zm-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z" />
  </svg>
);

const YEAR = new Date().getFullYear();

const LINKS = [
  {
    href: "https://github.com/yasarkocyigit",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/yasarkocyigit/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://medium.com/@kocyigityasar",
    label: "Medium",
    icon: MediumIcon,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-dashed border-line bg-background/80">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="mono tracking-[0.22em] text-[0.6rem] text-muted sm:text-xs sm:tracking-[0.25em]">
          © Yasar Kocyigit {YEAR}.
        </p>
        <div className="flex items-center gap-3">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-card transition hover:-translate-y-0.5 hover:shadow-lift sm:h-12 sm:w-12"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
