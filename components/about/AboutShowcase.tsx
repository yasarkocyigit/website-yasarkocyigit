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

    const lenis = new Lenis({
      wrapper: window,
      content: document.documentElement,
    });
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Ensure ScrollTrigger uses window as scroller
    ScrollTrigger.defaults({
      scroller: window,
    });

    // Text reveal animations
    container.querySelectorAll<HTMLElement>(".animate-text").forEach((textElement) => {
      textElement.setAttribute("data-text", textElement.textContent?.trim() ?? "");

      ScrollTrigger.create({
        trigger: textElement,
        start: "top 50%",
        end: "bottom 50%",
        scrub: 1,
        onUpdate: (self) => {
          const clipValue = Math.max(0, 100 - self.progress * 100);
          textElement.style.setProperty("--clip-value", `${clipValue}%`);
        },
      });
    });

    // Services slide-in animation
    ScrollTrigger.create({
      trigger: servicesSection,
      start: "top bottom",
      end: "top top",
      scrub: 1,
      onUpdate: (self) => {
        const headers = servicesSection.querySelectorAll<HTMLElement>(".services-header");
        gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
        gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
        gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
      },
    });

    // Services vertical movement and scale animation
    ScrollTrigger.create({
      trigger: servicesSection,
      start: "top top",
      end: `+=${window.innerHeight * 2}`,
      pin: true,
      scrub: 1,
      pinSpacing: false,
      onUpdate: (self) => {
        const headers = servicesSection.querySelectorAll<HTMLElement>(".services-header");

        if (self.progress <= 0.5) {
          const yProgress = self.progress / 0.5;
          gsap.set(headers[0], { y: `${yProgress * 100}%` });
          gsap.set(headers[2], { y: `${yProgress * -100}%` });
        } else {
          gsap.set(headers[0], { y: "100%" });
          gsap.set(headers[2], { y: "-100%" });

          const scaleProgress = (self.progress - 0.5) / 0.5;
          const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
          const scale = 1 - scaleProgress * (1 - minScale);

          headers.forEach((header) => gsap.set(header, { scale }));
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
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
              className={styles.servicesImage}
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
