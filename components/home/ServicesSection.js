"use client";

import FancyButton from "../ui/FancyButton";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function ServicesSection() {
  const handleGetProposal = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const [showForm, setShowForm] = useState(false);

  // Ref to the form container to scroll into view
  const formRef = useRef(null);
  const handleDownloadBrochure = () => {
    window.open("/brochure.pdf", "_blank");
  };

  return (
    <section className=" text-white py-20 px-6 lg:px-12" id="services-section">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Text */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Real Solutions to <br /> Help Your Brand <br /> Grow and Lead
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-6">
              In a competitive marketing landscape, we offer a range of
              solutions you can choose from, tailored to meet your specific
              needs. If you&apos;re looking for a comprehensive, all-in-one
              strategy, needs. If you&#39;re looking for a comprehensive,
              all-in-one strategy,
            </p>

            <FancyButton
              onClick={handleDownloadBrochure}
              className="mt-4 bg-gradient-to-r from-[#3b27ff] to-[#6d3eff] text-white font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform ease-in duration-[3000ms] shadow-lg"
            >
              Download Brochure
            </FancyButton>
          </div>

          {/* Right Side Images */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <Image
              src="/assets/landscape1.png"
              width={300}
              height={200}
              alt="Landscape 1"
              className="w-full h-auto rounded-xl object-cover"
            />
            <Image
              src="/assets/landscape2.png"
              width={300}
              height={200}
              alt="Landscape 2"
              className="w-full h-auto rounded-xl object-cover"
            />
            <Image
              src="/assets/landscape3.png"
              width={300}
              height={200}
              alt="Landscape 3"
              className="w-full h-auto rounded-xl object-cover col-span-2"
            />
          </div>
        </div>
        {/* Bottom Cards Section - All in one glassy container */}
        <div className="relative mt-16 rounded-2xl p-6 overflow-hidden shadow-inner">
          {/* Glassy gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-400/30 to-blue-900/10 backdrop-blur-lg z-0" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Card 1 */}
            <div className="p-6">
              <h3 className="text-white font-semibold text-xl mb-2">
                Horere Cronus
              </h3>
              <p className="text-gray-300 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                porro dicta autem asperiores odio unde excepturi.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6">
              <h3 className="text-white font-semibold text-xl mb-2">
                Nobe Fis
              </h3>
              <p className="text-gray-300 text-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum
                commodi ducimus obcaecati excepturi eos!
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6">
              <h3 className="text-white font-semibold text-xl mb-2">
                Urmamod Piliee
              </h3>
              <p className="text-gray-300 text-sm">
                Unde ratione reiciendis. Neque nobis ratione necessitatibus
                nulla repellat accusantium.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center animate-section">
        <div className="rounded-xl p-8 md:p-12 text-white inline-block w-full max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Go Further with Us as Your Trusted Marketing Partner
          </h2>
          <FancyButton
            onClick={handleGetProposal}
            className="font-bold py-3 px-8 rounded-lg"
          >
            Get Your Free Proposal
          </FancyButton>

          {showForm && (
            <motion.div
              ref={formRef}
              className="mt-8 max-w-md mx-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <form className="space-y-4 text-gray-300">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#340171]"
                  required
                />
                <input
                  type="text"
                  placeholder="Industry"
                  className="w-full px-4 py-3 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#340171]"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#340171]"
                  required
                />
                <FancyButton type="submit">Submit</FancyButton>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
