import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export default function ServiceCard({ service, index }) {
  // Determine if layout is reversed on md+ screens for odd index
  const isReversed = index % 2 !== 0;

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center ${
        isReversed ? "md:flex-row-reverse" : ""
      } max-w-7xl mx-auto py-6 sm:py-8`}
    >
      <motion.div
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl"
        initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
          className="object-cover"
          priority={index < 2}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className="px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
      >
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-[#0373fb]">
          {service.title}
        </h3>
        <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
          {service.description}
        </p>
        <ul className="space-y-3 mb-6 text-sm sm:text-base">
          {service.points.map((point, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-[#7ed957] mr-3 mt-1 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="inline-flex items-center text-[#0373fb] font-medium hover:text-[#0d60fa] transition-colors text-sm sm:text-base"
        >
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
