"use client";

import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-4 bg-no-repeat bg-center bg-responsive"
      style={{
        backgroundImage: "url('/gogo.png')",
      }}
    >
      {/* Text Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          LAUNCHING SOON
          <br />
          <br />
          Birds Marketing Blog...
        </motion.h1>
      </motion.div>
    </div>
  );
}
