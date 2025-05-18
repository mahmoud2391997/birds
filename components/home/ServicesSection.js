"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Check } from "lucide-react";
import FancyButton from "../ui/FancyButton";

export default function ServicesSection() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const handleGetProposal = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section
      id="services-section"
      className="section-padding bg-black text-white"
    >
      <div className="container mx-auto px-4">
        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16 animate-section">
          {/* Left Section (Text Content) */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-4">
                Real Solutions to Help Your Brand Grow and Lead
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0">
                In a competitive marketing landscape, we offer a range of
                solutions you can choose from, tailored to meet your specific
                needs. However, if youre looking for a comprehensive, all-in-one
                strategy, we also provide full marketing solutions to elevate
                your brand.
              </p>
            </div>
            <div className="text-center lg:text-left mt-8">
              <h3 className="text-2xl font-bold mb-4">
                Services Displayed as an Element
              </h3>
              <ul className="list-disc list-inside max-w-md mx-auto lg:mx-0 space-y-2 text-gray-400">
                <li>Under it 4-5 Bullet Points</li>
                <li>Data will be provided in a word document*</li>
              </ul>
              <p className="text-sm text-gray-400 mt-2">
                *Data will be provided in a word document
              </p>
            </div>
          </div>

          {/* Right Section (Phone Mockup) */}
          <div className="flex-1 flex justify-center items-center">
            <div className="mockup-phone border-primary shadow-xl scale-75 lg:scale-90">
              <div className="mockup-phone-camera" />

              <div className="mockup-phone-display p-4">
                <div className="h-full w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white flex flex-col justify-between p-4 relative overflow-hidden">
                  {/* Overlay Phone UI */}
                  <div className="bg-black bg-opacity-50 rounded-lg p-3 mt-4">
                    <div className="flex justify-between items-center mb-2 text-xs text-white">
                      <span className="font-semibold">toffee</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-gray-700 px-2 py-0.5 rounded-full">
                          08:41
                        </span>
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-md p-2 text-sm">
                      <p className="font-semibold mb-1">Latest activity</p>
                      <div className="space-y-1 text-xs">
                        <p>
                          Match 3 gems{" "}
                          <span className="float-right">- $3.00</span>
                        </p>
                        <p>
                          Top up <span className="float-right">+ $5.50</span>
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Top Content */}
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      Generate more $$ from your game with Toffee
                    </h3>
                    <p className="text-sm">
                      Our end-to-end fintech platform enables game developers to
                      boost retention 3X
                    </p>
                  </div>
                  {/* CTA & Partners */}
                  <div className="mt-4">
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full mb-3">
                      Get in touch
                    </button>
                    <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-white">
                      <p className="font-semibold">Trusted by:</p>
                      <span>A16Z GAMES</span>
                      <span>SPEEDRUN</span>
                      <span>WCV</span>
                      <span>MIDDLEGAME</span>
                      <span>DRIVE</span>
                      <span>SHARP ALPHA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA + Form (Centered Below) */}
        <div className="text-center animate-section">
          <div className="bg-gradient-to-r from-[#0373fb] to-[#2b58b4] rounded-xl p-8 md:p-12 text-white inline-block">
            <h2 className="text-3xl font-bold mb-6">
              Go Further with Us as Your Trusted Marketing Partner
            </h2>
            <FancyButton
              onClick={handleGetProposal}
              className="btn bg-white text-[#0373fb] hover:bg-[#7ed957] hover:text-white transition-all duration-300 font-bold py-3 px-8 rounded-lg"
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
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#7ed957]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Industry"
                    className="w-full px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#7ed957]"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#7ed957]"
                    required
                  />
                  <FancyButton type="submit">Submit</FancyButton>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
