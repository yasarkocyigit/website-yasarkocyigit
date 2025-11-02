"use client";

import styles from "./AboutShowcase.module.css";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const SERVICES_IMAGES = ["/about-whatido.svg", "/about-whatido.svg", "/about-whatido.svg"];
const ABOUT_HEADLINE =
  "Designing cloud data platforms where clarity, governance, and velocity stay aligned; every engagement moves from concept to production with purpose.";
const SERVICES_COPY =
  "Delivering end-to-end Azure and Databricks solutions that span data engineering, applied AI, and executive reporting, keeping governance and speed in perfect balance.";

export default function AboutShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const servicesSection = servicesRef.current;
    if (!container || !servicesSection) return;

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const triggers: ScrollTrigger[] = [];

    const textBlocks = Array.from(container.querySelectorAll<HTMLElement>(".animate-text"));

    textBlocks.forEach((block) => {
      block.setAttribute("data-text", block.textContent?.trim() ?? "");
      triggers.push(
        ScrollTrigger.create({
          trigger: block,
          start: "top 50%",
          end: "bottom 50%",
          scrub: true,
          onUpdate: (self) => {
            const clipValue = Math.max(0, 100 - self.progress * 100);
            block.style.setProperty("--clip-value", `${clipValue}%`);
          },
        })
      );
    });

    const headers = Array.from(servicesSection.querySelectorAll<HTMLElement>(".services-header"));

    if (headers.length === 3) {
      const [first, middle, last] = headers;

      triggers.push(
        ScrollTrigger.create({
          trigger: servicesSection,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(first, { x: `${100 - self.progress * 100}%` });
            gsap.set(middle, { x: `${-100 + self.progress * 100}%` });
            gsap.set(last, { x: `${100 - self.progress * 100}%` });
          },
        })
      );

      triggers.push(
        ScrollTrigger.create({
          trigger: servicesSection,
          start: "top top",
          end: `+=${window.innerHeight * 2}`,
          pin: true,
          scrub: 1,
          pinSpacing: false,
          onUpdate: (self) => {
            if (self.progress <= 0.5) {
              const yProgress = self.progress / 0.5;
              gsap.set(first, { y: `${yProgress * 100}%` });
              gsap.set(last, { y: `${yProgress * -100}%` });
            } else {
              gsap.set(first, { y: "100%" });
              gsap.set(last, { y: "-100%" });

              const scaleProgress = (self.progress - 0.5) / 0.5;
              const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
              const scale = 1 - scaleProgress * (1 - minScale);
              headers.forEach((header) => gsap.set(header, { scale }));
            }
          },
        })
      );
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.root}>
      <section className={`${styles.hero} hero`}>
        <div className={styles.heroImg}>
          <Image
            src="/profile2.jpg"
            alt="Yasar Kocyigit portrait"
            width={600}
            height={840}
            priority
          />
        </div>
      </section>

      <section className={`${styles.about} about`}>
        <h1 className={`${styles.animateText} animate-text`} data-text={ABOUT_HEADLINE}>
          {ABOUT_HEADLINE}
        </h1>
      </section>

      <section ref={servicesRef} className={`${styles.services} services`}>
        {SERVICES_IMAGES.map((src, index) => (
          <div
            key={index}
            className={`${styles.servicesHeader} services-header`}
            aria-hidden="true"
          >
            <Image
              src={src}
              alt=""
              width={1600}
              height={320}
              priority={index === 1}
              className="h-full w-full object-contain invert dark:invert-0"
            />
          </div>
        ))}
      </section>

      <section className={`${styles.servicesCopy} services-copy`}>
        <h1 className={`${styles.animateText} animate-text`} data-text={SERVICES_COPY}>
          {SERVICES_COPY}
        </h1>
      </section>

      <section className={`${styles.outro} outro`}>
        <div className={styles.outroImg}>
          <Image
            src="/logo.png"
            alt="Yasar Kocyigit mark"
            width={600}
            height={840}
            className="h-auto w-full object-contain invert dark:invert-0"
          />
        </div>
      </section>
    </div>
  );
}
