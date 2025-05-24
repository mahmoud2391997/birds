import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export default function ServiceCard({ service, index }) {
  return (
    <div
      className={`grid md:grid-cols-2 gap-12 items-center ${
        index % 2 !== 0 ? "md:grid-flow-dense" : ""
      }`}
    >
      <motion.div
        className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-4 text-[#0373fb]">
          {service.title}
        </h3>
        <p className="text-gray-300 mb-6">{service.description}</p>
        <ul className="space-y-3 mb-6">
          {service.points.map((point, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-[#7ed957] mr-2 mt-1 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/contact`}
          className="inline-flex items-center text-[#0373fb] font-medium hover:text-[#0d60fa] transition-colors"
        >
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
