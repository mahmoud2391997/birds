"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import FancyButton from "../ui/FancyButton";
import Image from "next/image";

export default function ServicesSection() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const handleGetProposal = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDownloadBrochure = () => {
    window.open("/brochure.pdf", "_blank");
  };

  return (
    <section
      id="services-section"
      className="section-padding bg-[#0c0c0c] text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 mb-16 animate-section">
          {/* Left Side - Text Content */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Real Solutions to Help Your Brand Grow and Lead
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-2xl mb-12">
              In a competitive marketing landscape, we offer a range of
              solutions you can choose from, tailored to meet your specific
              needs. If you&apos;re looking for a comprehensive, all-in-one
              strategy, we also provide full marketing solutions to elevate your
              brand.
            </h2>

            <div className="text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                What We Offer
              </h3>
              <ul className="list-disc list-inside max-w-md space-y-4 text-gray-300 text-lg md:text-xl">
                <li>Customized marketing strategies</li>
                <li>Enhanced brand visibility</li>
                <li>Targeted audience engagement</li>
                <li>Data-driven insights</li>
                <li>Comprehensive support services</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4 italic">
                *Proposal provided in Word format
              </p>

              <FancyButton onClick={handleDownloadBrochure} className="mt-6">
                Download Brochure <FileText className="ml-2 h-5 w-5" />
              </FancyButton>
            </div>
          </div>

          {/* Right Side - Phone Image */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-[300px] h-[600px] rounded-3xl overflow-hidden shadow-lg border-4 border-[#7ed957]">
              <Image
                width={300}
                height={600}
                src="/phone-mockup.jpg" // Replace with actual image path
                alt="Mobile Interface"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA with Proposal Form */}
        <div className="text-center animate-section">
          <div className="bg-[#121212] border border-[#2b58b4] rounded-xl p-8 md:p-12 text-white inline-block w-full max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#7ed957]">
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
                    className="w-full px-4 py-3 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ed957]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Industry"
                    className="w-full px-4 py-3 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7ed957]"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ed957]"
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
