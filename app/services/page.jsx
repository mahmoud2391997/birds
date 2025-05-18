"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesOverview from "@/components/services/ServicesOverview";
import BrochureSection from "@/components/services/ServicesBrochure";
import CTASection from "@/components/services/ServicesCTA";
import ServicesHero from "@/components/services/ServicesHero";

export default function Page() {
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
      <ServicesHero />
      <ServicesOverview />
      <BrochureSection />
      <CTASection />
      <style jsx global>{`
        .aurora-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            #1e3a8a 0%,
            #a855f7 50%,
            #3b82f6 100%
          );
          filter: blur(100px);
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
