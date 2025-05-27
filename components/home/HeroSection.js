"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import FancyButton from "../ui/FancyButton";

export default function HeroSection() {



  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
      .fromTo(
        ".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        ".hero-button",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        ".hero-arrow",
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        }
      );

    return () => tl.kill();
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services-section");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://fizfn76jbvluqpsz.public.blob.vercel-storage.com/Herovideo-iksycZkgCCoTNe46ug2YR1AmZ0AY62.webm"
          type="video/webm"
        />
        {/* <source src="/HeroVideo.mp4" type="video/mp4" /> */}
      </video>
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Empowering Brands to Soar with Strategic Marketing, Communications,
          and Creative Excellence.
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          From strategy to storytelling, we elevate your brand and help it land
          with the audience that matters most.
        </p>
        <div className="hero-button">
          <FancyButton onClick={scrollToServices}>Get Started</FancyButton>
        </div>
      </div>
      <div className="hero-arrow absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <ArrowDown className="h-8 w-8 text-white" />
      </div>
    </section>
  );
}
