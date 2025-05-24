"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHeroSection() {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useEffect(() => {
    const imageWrapper = imageWrapperRef.current;
    const imageContainer = containerRef.current;

    if (!imageWrapper || !imageContainer) return;

    // Set initial scale for image
    gsap.set(imageWrapper, { scale: 1.5 });

    // Pinning animation for the image container
    ScrollTrigger.create({
      trigger: imageContainer,
      start: "top center",
      end: "+=70%",
      pin: true,
      scrub: 0.5,
      onEnter: () => {
        imageContainer.style.zIndex = "10";
      },
      onLeave: () => {
        imageContainer.style.zIndex = "0";
      },
      onEnterBack: () => {
        imageContainer.style.zIndex = "10";
      },
    });

    // Image parallax and scale animation
    gsap.to(imageWrapper, {
      scrollTrigger: {
        trigger: imageContainer,
        start: "top center",
        end: "top top",
        scrub: 0.2,
      },
      y: "-100%",
      scale: 1,
      ease: "power1.inOut",
    });

    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Hero Text */}
      <section className="min-h-[50vh] sm:min-h-[70vh] flex flex-col justify-center w-full mt-32 mb-8 max-w-6xl">
        <div className="text-left" style={{ fontFamily: "Inter, sans-serif" }}>
          <p
            className="text-4xl sm:text-7xl md:text-[166.5px] font-medium leading-[0.8em] text-white tracking-tight"
            style={{ letterSpacing: "-0.07em" }}
          >
            Based in Egypt,
          </p>
          <p
            className="text-4xl sm:text-7xl md:text-[166.5px] font-medium leading-[0.8em] text-white tracking-tight"
            style={{ letterSpacing: "-0.07em" }}
          >
            Partnering with Brands World Wide
          </p>
        </div>
        <h1
          className="mt-4 sm:mt-8 text-lg sm:text-2xl font-medium leading-relaxed text-black"
          style={{
            fontFamily: "Inter, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          (And by small, we mean tiny)
        </h1>
      </section>

      {/* Image Section */}
      <section className="min-h-[50vh] sm:min-h-[70vh] flex justify-center items-center w-full max-w-md sm:max-w-lg md:max-w-xl mt-20">
        <div
          ref={containerRef}
          className="relative w-full rounded-lg shadow-lg overflow-hidden"
        >
          <div ref={imageWrapperRef} className="will-change-transform">
            <Image
              src="/about.svg"
              alt="Team Member"
              width={540}
              height={720}
              sizes="(max-width: 768px) 100vw, 540px"
              className="w-full h-auto object-cover object-left-center"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}
