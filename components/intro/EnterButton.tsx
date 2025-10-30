"use client";

import type { KeyboardEvent } from "react";

interface EnterButtonProps {
  onActivate: () => void;
  disabled?: boolean;
}

export default function EnterButton({
  onActivate,
  disabled = false,
}: EnterButtonProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (disabled) return;
      onActivate();
    }
  };

  return (
    <button
      type="button"
      aria-label="Enter site"
      onClick={() => {
        if (disabled) return;
        onActivate();
      }}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className="fixed left-6 bottom-6 flex h-11 items-center gap-3 rounded-md border border-line bg-background px-4 font-mono text-[0.7rem] uppercase tracking-[0.32em] text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 md:left-8 md:bottom-8 md:text-sm"
    >
      <span>Enter</span>
      <span className="flex h-[18px] w-[18px] items-center justify-center border border-current text-[11px] leading-none">
        ▷
      </span>
    </button>
  );
}
