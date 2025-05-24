"use client";

import FancyButton from "../ui/FancyButton";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const cardData = [
  {
    id: "01",
    title: "Full Marketing Management",
    description: [
      "Insight-driven strategies tailored to your goals",
      "Custom campaigns with execution and optimization",
      "Continuous tracking for maximum impact",
    ],
  },
  {
    id: "02",
    title: "Digital Marketing",
    description: [
      "Social media strategies, ads, and influencer campaigns",
      "SEO/SEA to boost Google rankings",
      "Engaging email/SMS and video content",
    ],
  },
  {
    id: "03",
    title: "Graphic Design",
    description: [
      "Eye-catching social media design packages",
      "UX designs for engaging websites",
      "Custom Canva templates for teams",
    ],
  },
  {
    id: "04",
    title: "Creative Campaigns & UGC Videos",
    description: [
      "Bold campaigns to create buzz",
      "Authentic UGC videos for trust",
      "Targeted content for audience connection",
    ],
  },
  {
    id: "05",
    title: "Media Buying",
    description: [
      "Targeted ads on social media and Google",
      "Optimized for clicks and conversions",
      "Maximized ROI for your budget",
    ],
  },
  {
    id: "06",
    title: "PR & Communications",
    description: [
      "Crafted stories for brand reputation",
      "Strategic messaging for wide reach",
      "Consistent communication strategies",
    ],
  },
  {
    id: "07",
    title: "Printing House",
    description: [
      "Flyers, brochures, and business cards",
      "Banners, stickers, and custom packaging",
      "High-quality prints for brand presence",
    ],
  },
  {
    id: "08",
    title: "Web Design & Development",
    description: [
      "User-friendly e-commerce and portfolio sites",
      "Custom designs to reflect your brand",
      "Optimized for conversions and usability",
    ],
  },
];

export default function ServicesSection() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  const handleGetProposal = () => {
    setShowForm(true);
    setTimeout(() => {
      const offset = -80;
      const element = formRef.current;
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 90);
  };

  const handleDownloadBrochure = () => {
    const link = document.createElement("a");
    link.href = "/birdsb.pdf";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="text-white py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto mt-10 py-12">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Text */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              In a crowded marketing world,
              <br />
              one-size-fits-all <br /> doesn’t cut it.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-6">
              That&apos;s why we offer flexible, tailored solutions to match
              your exact goals. Need the full package? We&apos;re ready with a
              complete, all-in-one strategy that takes your brand higher from
              every angle! Proudly serving businesses in Egypt and across the
              globe.
            </p>
            <FancyButton
              onClick={handleDownloadBrochure}
              download
              className="mt-4 bg-gradient-to-r from-[#3b27ff] to-[#6d3eff] text-white font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform ease-in duration-[3000ms] shadow-lg"
            >
              Download Brochure
            </FancyButton>
          </div>

          {/* Images */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <Image
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
              width={300}
              height={200}
              alt="Landscape 1"
              className="w-full h-auto rounded-xl object-cover"
            />
            <Image
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
              width={300}
              height={200}
              alt="Landscape 2"
              className="w-full h-auto rounded-xl object-cover"
            />
            <Image
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
              width={300}
              height={200}
              alt="Landscape 3"
              className="w-full h-auto rounded-xl object-cover col-span-2"
            />
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div
        id="services-section"
        className="relative rounded-2xl mt-6 p-6 overflow-hidden shadow-inner"
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-400/30 to-blue-900/10 backdrop-blur-lg z-0" />
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-white/10 divide-white/10">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="relative p-6 border-b border-white/10 last:border-b-0 md:border-b-0 md:border-r last:md:border-r-0"
            >
              <span className="absolute top-4 left-4 text-sm font-bold text-blue-300">
                {card.id}
              </span>
              <h3 className="text-white font-semibold text-xl mb-2 mt-4">
                {card.title}
              </h3>
              <ul className="text-gray-300 text-sm list-disc list-inside">
                {card.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Form Section */}
      <div className="text-center animate-section ">
        <div className="rounded-xl p-8 md:p-12 text-white inline-block w-full max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
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
