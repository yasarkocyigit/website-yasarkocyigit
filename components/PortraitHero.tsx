import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Intensity = "soft" | "medium" | "hard";

const INTENSITY_MAP: Record<Intensity, string> = {
  soft: "var(--vig-soft)",
  medium: "var(--vig-medium)",
  hard: "var(--vig-hard)",
};

interface PortraitHeroProps {
  src: string;
  alt: string;
  focalX?: string;
  focalY?: string;
  className?: string;
  intensity?: Intensity;
  showNoise?: boolean;
}

export default function PortraitHero({
  src,
  alt,
  focalX = "50%",
  focalY = "35%",
  className,
  intensity = "medium",
  showNoise = false,
}: PortraitHeroProps) {
  const style = {
    "--vignette": INTENSITY_MAP[intensity],
  } as CSSProperties;

  return (
    <section
      className={cn(
        "relative isolate h-[80vh] min-h-[560px] overflow-hidden bg-neutral-950 dark:bg-neutral-950",
        className
      )}
      style={style}
      role="img"
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover contrast-[1.1] brightness-[0.9] saturate-[0.9]"
        style={{ objectPosition: `${focalX} ${focalY}` }}
      />
      <div className="pointer-events-none absolute inset-0 z-10 portrait-vignette" />
      {showNoise && (
        <div
          className="pointer-events-none absolute inset-0 z-20 portrait-noise"
          aria-hidden="true"
        />
      )}
    </section>
  );
}
