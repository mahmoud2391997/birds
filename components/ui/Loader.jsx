"use client";

import { motion } from "framer-motion";

export function Loader({ size = "default", className = "" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    default: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClass} rounded-full border-4 border-t-[#7ED967] border-r-[#FFC56D] border-b-[#7ED967] border-l-[#FFC56D]`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Loader size="lg" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-white font-medium"
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
}
