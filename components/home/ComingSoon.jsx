"use client";

import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/gogo.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1
          className="text-6xl md:text-4xl font-extrabold mb-6 bg-clip-text text-white"
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
