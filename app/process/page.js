"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessHero from "@/components/process/ProcessHero";
import ProcessSteps from "@/components/process/ProcessSteps";
import ProcessTestmo from "@/components/process/ProcessTestmo";
import ProcessCTA from "@/components/process/ProcessCTA";

export default function ProcessPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray(".animate-section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={pageRef}>
      <ProcessHero />
      <ProcessSteps />
      <ProcessCTA />
      <ProcessTestmo />
    </div>
  );
}
