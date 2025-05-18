"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Search, Play } from "lucide-react";

export default function ArticlesPage() {
  useEffect(() => {
    const animateAurora = () => {
      const aurora = document.querySelector(".aurora-bg");
      if (aurora) {
        aurora.style.background = `linear-gradient(135deg, #1e3a8a, #a855f7, #3b82f6, #f472b6, #ec4899)`;
        aurora.animate(
          [
            {
              background: "linear-gradient(135deg, #1e3a8a, #a855f7, #3b82f6)",
            },
            {
              background: "linear-gradient(135deg, #f472b6, #ec4899, #3b82f6)",
            },
          ],
          {
            duration: 10000,
            iterations: Infinity,
            easing: "ease-in-out",
          }
        );
      }
    };

    animateAurora();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900 text-white">
      <div className="aurora-bg absolute inset-0 z-0 opacity-80 blur-xl"></div>
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] via-[#a855f7] to-[#3b82f6]"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Coming Soon
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-300"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          We’re working hard to bring you something amazing. Stay tuned!
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <a
            href="info@birds-marektingag.com"
            className="bg-[#3b82f6] hover:bg-[#a855f7] text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
          >
            Contact Us
          </a>
          <a
            href="/contact"
            className="bg-transparent border-2 border-[#a855f7] hover:bg-[#a855f7] text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
          >
            Notify Me
          </a>
        </motion.div>
        <motion.div
          className="mt-12 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          © {new Date().getFullYear()} BIRDS. All rights reserved.
        </motion.div>
      </motion.div>
      <style jsx>{`
        .aurora-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1e3a8a, #a855f7, #3b82f6);
          animation: auroraFlow 10s ease-in-out infinite alternate;
        }
        @keyframes auroraFlow {
          0% {
            background: linear-gradient(135deg, #1e3a8a, #a855f7, #3b82f6);
          }
          50% {
            background: linear-gradient(135deg, #f472b6, #ec4899, #3b82f6);
          }
          100% {
            background: linear-gradient(135deg, #1e3a8a, #a855f6, #ec4899);
          }
        }
      `}</style>
    </div>
  );
}
