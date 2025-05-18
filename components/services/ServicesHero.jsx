import React from "react";
import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden text-white">
      <div className="aurora-bg"></div>
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="text-xl text-white/90 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Comprehensive marketing solutions tailored to your unique business
          needs.
        </motion.p>
      </div>
    </section>
  );
}
