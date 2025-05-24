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
          Birds is a marketing and communications agency based in Egypt,
          partnering with brands worldwide to deliver creative, measurable
          impact. Creativity isn’t a layer, it’s how we think, perform, and
          lead. We don’t follow trends. We craft original concepts, custom
          strategies, and use our own theories to help brands stand out and
          perform. With a team of sharp marketing strategies and creatives, we
          turn distinctive ideas into results. Your brand doesn’t just grow, it
          evolves with purpose.
        </h1>
        <p className="text-lg mt-6 text-white">
          The sky isn’t the limit. It’s the beginning. See you up there.
          <span className="font-semibold">GiANT</span>.
        </p>
      </div>
    </section>
  );
}
