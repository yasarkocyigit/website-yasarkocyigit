"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingLinesProps {
  lines: string[];
  charDelay?: number;
  lineGap?: number;
  className?: string;
}

export default function TypingLines({
  lines,
  charDelay = 18,
  lineGap = 220,
  className,
}: TypingLinesProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let typingInterval: ReturnType<typeof setInterval> | null = null;
    let delayTimeout: ReturnType<typeof setTimeout> | null = null;
    let startTimeout: ReturnType<typeof setTimeout> | null = null;

    setCompleted([]);
    setCurrentLine("");
    setIsComplete(false);

    const typeNextLine = () => {
      if (lineIndex >= lines.length) {
        setIsComplete(true);
        return;
      }

      const line = lines[lineIndex];

      typingInterval = setInterval(() => {
        setCurrentLine((prev) => prev + line.charAt(charIndex));
        charIndex += 1;

        if (charIndex >= line.length) {
          if (typingInterval) {
            clearInterval(typingInterval);
            typingInterval = null;
          }

          setCompleted((prev) => [...prev, line]);
          setCurrentLine("");

          lineIndex += 1;
          charIndex = 0;

          if (lineIndex >= lines.length) {
            setIsComplete(true);
            return;
          }

          delayTimeout = setTimeout(() => {
            typeNextLine();
          }, Math.max(0, lineGap));
        }
      }, Math.max(1, charDelay));
    };

    startTimeout = setTimeout(typeNextLine, 60);

    return () => {
      if (typingInterval) clearInterval(typingInterval);
      if (delayTimeout) clearTimeout(delayTimeout);
      if (startTimeout) clearTimeout(startTimeout);
    };
  }, [charDelay, lineGap, lines]);

  return (
    <div
      className={cn(
        "space-y-4 font-mono text-base font-medium leading-relaxed tracking-[0.02em] md:text-lg",
        className
      )}
    >
      {completed.map((line, index) => (
        <p key={`${index}-${line}`} className="whitespace-pre-wrap">
          {line}
        </p>
      ))}
      {!isComplete && (
        <p className="whitespace-pre-wrap">
          {currentLine}
          <span className="caret-block">▌</span>
        </p>
      )}
    </div>
  );
}
