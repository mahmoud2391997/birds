"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import FancyButton from "../ui/FancyButton";

export default function HeroSection() {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  // GSAP text animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
      .fromTo(
        ".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.6"
      )
      .fromTo(
        ".hero-button",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

    return () => tl.kill();
  }, []);

  // Vanta background effect
  useEffect(() => {
    let mounted = true;

    const loadVanta = async () => {
      try {
        const THREE = await import("three");
        if (typeof window !== "undefined") {
          window.THREE = THREE;
          // Check WebGL availability
          const canvas = document.createElement("canvas");
          const gl =
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");
        }

        const VANTA = await import("vanta/dist/vanta.birds.min.js");

        if (vantaRef.current && !vantaEffectRef.current && mounted) {
          vantaEffectRef.current = VANTA.default({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x0,
            color1: 0xdf00ff,
            color2: 0xff42,
            birdSize: 2.1,
            wingSpan: 19.0,
            speedLimit: 4.0,
            separation: 46.0,
            alignment: 25.0,
          });
        } else {
          console.warn(
            "Vanta BIRDS not initialized: ref or component unmounted"
          );
        }
      } catch (error) {
        console.error("Vanta BIRDS initialization error:", error);
      }
    };

    if (typeof window !== "undefined") {
      loadVanta();
    }

    return () => {
      mounted = false;
      if (
        vantaEffectRef.current &&
        typeof vantaEffectRef.current.destroy === "function"
      ) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  // Scroll function
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services-section");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={vantaRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1
          className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Elevating brands through powerful marketing, communications, and
          creative excellence.
        </motion.h1>

        <motion.p
          className="hero-subtitle text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We build and elevate brands through expert communications, strategic
          planning, creative solutions, and measurable results.
        </motion.p>

        <motion.div
          className="hero-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FancyButton onClick={scrollToServices} className="">
            Get Started
          </FancyButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.2,
        }}
      >
        <ArrowDown className="h-8 w-8 text-white" />
      </motion.div>
    </section>
  );
}
