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
    gsap.set(imageWrapper, { scale: window.innerWidth < 640 ? 1.2 : 1.5 });

    // Pinning animation for the image container
    const pinTimeline = gsap.to(imageContainer, {
      scrollTrigger: {
        trigger: imageContainer,
        start: "top 80%", // Adjusted for better mobile trigger
        end: window.innerWidth < 640 ? "+=50%" : "+=70%", // Shorter duration on mobile
        pin: true,
        scrub: 0.5,
      },
    });

    // Image parallax and scale animation
    const parallaxTimeline = gsap.to(imageWrapper, {
      scrollTrigger: {
        trigger: imageContainer,
        start: "top 70%",
        end: "top 10%",
        scrub: 0.3, // Slightly smoother scrub
      },
      y: window.innerWidth < 640 ? "-50%" : "-100%", // Reduced parallax on mobile
      scale: 1,
      ease: "power1.inOut",
    });

    // Handle resize to refresh ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      pinTimeline.kill();
      parallaxTimeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Text */}
      <section className="min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center items-center text-center w-full max-w-[90vw] sm:max-w-4xl lg:max-w-6xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 lg:mt-24 mb-8 sm:mb-12">
        <div
          className="text-left w-full"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <p
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-medium leading-tight text-white"
            style={{
              letterSpacing: "-0.05em",
            }}
          >
            Based in Egypt,
          </p>
          <p
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-medium leading-tight text-white"
            style={{
              letterSpacing: "-0.05em",
            }}
          >
            Partnering with Brands World Wide
          </p>
        </div>
      </section>

      {/* Image Section */}
      <section className="min-h-[30vh] sm:min-h-[40vh] lg:min-h-[50vh] flex justify-center items-center mt-12 sm:mt-16 lg:mt-20">
        <div
          ref={containerRef}
          className="image-container w-full max-w-[90vw] sm:max-w-[400px] lg:max-w-[500px]"
        >
          <div ref={imageWrapperRef} className="relative w-full aspect-[3/4]">
            <Image
              src="/about.svg"
              alt="Team Member"
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 400px, 500px"
              className="rounded-lg shadow-lg"
              style={{ objectFit: "cover", objectPosition: "left center" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Spacer for scroll breathing room */}
      <section className="h-[8vh] sm:h-[10vh] lg:h-[12vh]" />
    </div>
  );
}
