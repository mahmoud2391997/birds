"use client";
import React, { use, useState } from "react";

export default function WorkHistory() {
  const [showMission, setShowMission] = useState(false);
  const [showVision, setShowVision] = useState(false);

  const missionText =
    "To create a future defined by innovative brands and foster a vibrant global community of forward-thinking marketers.";
  const visionText =
    "To become the most inspiring marketing agency in the Middle East and beyond, building brands and uncovering unique marketers with original, visionary minds.";

  return (
    <div className="bg-black text-white flex flex-col mb-10 items-center py-12 px-4">
      <section className="w-full max-w-5xl mb-8">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12">
          OUR MISSION & VISION
        </h1>

        <div className="space-y-6 text-left">
          {/* Mission */}
          <div className="border-b-2 border-white/10 pb-4">
            <button
              onClick={() => setShowMission(!showMission)}
              className="text-3xl md:text-4xl font-semibold flex items-center justify-between w-full focus:outline-none"
            >
              <span>→ Our Mission</span>
              <span className="text-xl">{showMission ? "−" : "+"}</span>
            </button>
            {showMission && (
              <p className="mt-4 text-lg text-gray-300">{missionText}</p>
            )}
          </div>

          {/* Vision */}
          <div className="border-b-2 border-white/10 pb-4">
            <button
              onClick={() => setShowVision(!showVision)}
              className="text-3xl md:text-4xl font-semibold flex items-center justify-between w-full focus:outline-none"
            >
              <span>→ Our Vision</span>
              <span className="text-xl">{showVision ? "−" : "+"}</span>
            </button>
            {showVision && (
              <p className="mt-4 text-lg text-gray-300">{visionText}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
