import Link from "next/link";
import React from "react";
import FancyButton from "../ui/FancyButton";

const ProcessCTA = () => {
  return (
    <div>
      <section className="py-16 md:py-24 bg-gradient-to-t from-black via-[#0373fb]/50 to-black text-white">
        <div className="container mx-auto px-4 text-center animate-section">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Schedule a meeting with our marketing director and take the first
            step towards elevating your brand.
          </p>
          <FancyButton
            href="/contact"
            className="btn bg-white text-[#0373fb] hover:bg-[#7ed957] hover:text-white transition-all duration-300 font-bold py-3 px-8 rounded-lg inline-block"
          >
            Schedule a Meeting
          </FancyButton>
        </div>
      </section>
    </div>
  );
};

export default ProcessCTA;
