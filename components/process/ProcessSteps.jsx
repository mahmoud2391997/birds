"use client";

import { ArrowUp, Calendar, FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ProcessSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const steps = containerRef.current.querySelectorAll(".step-container");
      const windowHeight = window.innerHeight;

      steps.forEach((step, index) => {
        const stepTop = step.getBoundingClientRect().top;
        if (stepTop < windowHeight * 0.5) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const steps = [
    {
      number: "01",
      title: "Book a Call",
      description:
        "Choose a date and time to book a discovery session, during which we'll define the project objectives, timeline, and budget.",
      icon: <Calendar className="h-12 w-12 text-white" />,
    },
    {
      number: "02",
      title: "Receive a Proposal",
      description:
        "We'll send you a bespoke project proposal including deliverables, project roadmap, and a quote in 1-2 business days.",
      icon: <FileCheck className="h-12 w-12 text-white" />,
    },
    {
      number: "03",
      title: "Kickoff the Project",
      description:
        "Sign the contract, send the deposit, lean back, and let us do our thing. We'll invite you to a design review meeting in 5-7 business days.",
      icon: <ArrowUp className="h-12 w-12 text-white" />,
    },
  ];

  return (
    <div id="process-steps" className="bg-black py-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto" ref={containerRef}>
        {/* Heading */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            The world moves fast, we keep pace. Cut through the noise with{" "}
            <span className="text-[#b0a3ff]">our process.</span>
          </h2>
        </div>

        {/* Timeline Row */}
        <div className="relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-container relative mb-24 last:mb-24"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Progress Bar Wrapper */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      index <= activeStep
                        ? "bg-black border-[#b0a3ff]"
                        : "bg-transparent border-gray-600"
                    }`}
                  >
                    <span
                      className={`text-xl font-bold transition-colors duration-300 ${
                        index <= activeStep ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>
                  <div className="absolute left-8 top-16 w-0.5 h-[calc(100%+6rem)] bg-gray-600">
                    <motion.div
                      className="w-full bg-[#b0a3ff]"
                      initial={{ height: "0%" }}
                      animate={{
                        height: index <= activeStep ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      style={{ originY: 0 }}
                    />
                  </div>
                </div>

                {/* Content Wrapper */}
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    {step.icon}
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-white text-lg opacity-80 max-w-2xl">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;
