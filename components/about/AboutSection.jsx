"use client";

import React from "react";

export default function AboutSection() {
  return (
    <section className="min-h-screen px-8 py-24 flex flex-col lg:flex-row items-start justify-center gap-12 font-sans">
      {/* Left: Dot + Label */}
      <div className="flex flex-col items-start pt-3">
        <span className="flex items-center text-white font-medium text-base">
          <span className="w-2 h-2 rounded-full bg-white inline-block mr-2" />
          About
        </span>
      </div>

      {/* Right: Text Content */}
      <div className="max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight text-white tracking-tight">
          Hi, I'm Connelly — an OKC-based Product & Web Designer. I take on
          freelance projects in various industries, offering brand, web design,
          and development.
        </h1>
        <p className="text-lg mt-6 text-white">
          Currently working as Director of UX at{" "}
          <span className="font-semibold">GiANT</span>.
        </p>
      </div>
    </section>
  );
}
