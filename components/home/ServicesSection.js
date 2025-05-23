"use client";

import FancyButton from "../ui/FancyButton";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const cardData = [
  {
    id: "01",
    title: "Horere Cronus",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae porro dicta autem asperiores odio unde excepturi.",
  },
  {
    id: "02",
    title: "Nobe Fis",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum commodi ducimus obcaecati excepturi eos!",
  },
  {
    id: "03",
    title: "Urmamod Piliee",
    description:
      "Unde ratione reiciendis. Neque nobis ratione necessitatibus nulla repellat accusantium.",
  },
  {
    id: "04",
    title: "Zentra Pro",
    description:
      "Voluptatem explicabo doloremque at, nisi accusantium perspiciatis quasi aut sapiente officiis.",
  },
  {
    id: "05",
    title: "Lexora AI",
    description:
      "Distinctio dignissimos hic tempora, obcaecati eos deserunt recusandae reiciendis ut.",
  },
  {
    id: "06",
    title: "Nova Vision",
    description:
      "Sit optio officiis vel accusantium quae consequatur veniam ipsa ratione.",
  },
  {
    id: "07",
    title: "Core Path",
    description:
      "Minima unde nobis quaerat, temporibus dolorem deleniti quam blanditiis autem.",
  },
  {
    id: "08",
    title: "Prime Pulse",
    description:
      "Inventore sint quas saepe qui animi error obcaecati, nihil nobis!",
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
    }, 100);
  };

  const handleDownloadBrochure = () => {
    window.open("/brochure.pdf", "_blank");
  };

  return (
    <section className="text-white py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto mt-10 py-12">
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
              strategy.
            </p>
            <FancyButton
              onClick={handleDownloadBrochure}
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
                <p className="text-gray-300 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
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
