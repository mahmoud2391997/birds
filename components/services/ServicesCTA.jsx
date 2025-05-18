import React from "react";
import Link from "next/link";

export default function ServicesCTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-[#0373fb] to-[#2b58b4] text-white">
      <div className="container mx-auto px-4 text-center animate-section">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Elevate Your Brand?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Partner with Birds Marketing Agency and take your brand to new
          heights.
        </p>
        <Link
          href="/contact"
          className="bg-white text-[#0373fb] hover:bg-[#7ed957] hover:text-white transition-all duration-300 font-bold py-3 px-8 rounded-lg inline-block"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
