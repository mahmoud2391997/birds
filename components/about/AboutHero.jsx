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

    // Set initial scale and position for image
    gsap.set(imageWrapper, { scale: 1.3, y: 0 });

    // Pinning animation for the image container
    gsap.to(imageContainer, {
      scrollTrigger: {
        trigger: imageContainer,
        start: "top 90%", // Start earlier to allow overlap with hero text
        end: "+=50%", // Shorter pin duration to focus on overlap
        pin: true,
        scrub: 0.5,
        onEnter: () => {
          imageContainer.style.zIndex = "20"; // Higher z-index to appear above text
        },
        onLeave: () => {
          imageContainer.style.zIndex = "0";
        },
        onEnterBack: () => {
          imageContainer.style.zIndex = "20";
        },
      },
    });

    // Image parallax and scale animation to move over hero text
    gsap.to(imageWrapper, {
      scrollTrigger: {
        trigger: imageContainer,
        start: "top 90%", // Start earlier to align with pinning
        end: "top 10%", // End when image reaches hero text
        scrub: 0.3,
      },
      y: "-150%", // Move up significantly to overlap hero text
      scale: 1, // Scale down to normal size
      ease: "power1.inOut",
    });

    // Refresh ScrollTrigger on window resize
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="flex flex-col items-center relative">
      {/* Hero Text */}
      <section className="min-h-[40vh] sm:min-h-[60vh] flex flex-col justify-center items-center text-center w-full max-w-5xl px-4 mt-16 sm:mt-20 mb-8">
        <div
          className="text-left w-full"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <p
            className="text-3xl sm:text-5xl md:text-7xl lg:text-[120px] font-medium leading-[1.1em] text-white"
            style={{
              letterSpacing: "-0.05em",
            }}
          >
            Based in Egypt,
          </p>
          <p
            className="text-3xl sm:text-5xl md:text-7xl lg:text-[120px] font-medium leading-[1.1em] text-white"
            style={{
              letterSpacing: "-0.05em",
            }}
          >
            Partnering with Brands World Wide
          </p>
        </div>
        <h1
          className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl font-medium leading-relaxed text-black"
          style={{
            fontFamily: "Inter, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          (And by small, we mean tiny)
        </h1>
      </section>

      {/* Image Section */}
      <section className="min-h-[40vh] sm:min-h-[50vh] flex justify-center items-center mt-12 sm:mt-16">
        <div
          ref={containerRef}
          className="image-container"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <div ref={imageWrapperRef}>
            <Image
              src="/about.svg"
              alt="Team Member"
              width={440}
              height={200}
              className="w-full h-auto rounded-lg shadow-lg"
              style={{ objectFit: "cover", objectPosition: "left center" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Spacer for scroll breathing room */}
      <section className="h-[8vh] sm:h-[12vh]" />
    </div>
  );
}
