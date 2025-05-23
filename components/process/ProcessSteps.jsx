"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ProcessSteps = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const steps = containerRef.current.querySelectorAll(".step-container");
      const windowHeight = window.innerHeight;
      const containerTop = containerRef.current.getBoundingClientRect().top;

      const newVisibleSteps = [];
      let newActiveStep = 0;

      steps.forEach((step, index) => {
        const stepRect = step.getBoundingClientRect();

        // Step is in viewport
        if (stepRect.top < windowHeight * 0.9) {
          newVisibleSteps.push(index);

          // Update active step (for progress line)
          if (stepRect.top < windowHeight * 0.8) {
            newActiveStep = index;
          }
        }
      });

      setVisibleSteps(newVisibleSteps);
      setActiveStep(newActiveStep);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const steps = [
    {
      number: "01",
      title: "Book a Call",
      description:
        "Choose a date and time to book a discovery session, during which we'll define the project objectives, timeline, and budget.",
    },
    {
      number: "02",
      title: "Receive a Proposal",
      description:
        "We'll send you a bespoke project proposal including deliverables, project roadmap, and a quote in 1-2 business days.",
    },
    {
      number: "03",
      title: "Kickoff the Project",
      description:
        "Sign the contract, send the deposit, lean back, and let us do our thing. We'll invite you to a design review meeting in 5-7 business days.",
    },
  ];

  return (
    <section id="process" className="w-full bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="overflow-hidden rounded-3xl bg-white">
          <div
            className="relative flex flex-col lg:flex-row"
            ref={containerRef}
          >
            {/* Content Side */}
            <div className="w-full lg:w-3/5 p-8 md:p-16 lg:p-20">
              <div className="mb-16 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-[#0e0e0e] leading-tight">
                  The world moves fast, we keep pace. Cut through the noise with{" "}
                  <span className="text-[#b0a3ff]">our process.</span>
                </h2>
              </div>

              <div className="relative">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="step-container relative mb-24 last:mb-0"
                  >
                    <div className="flex">
                      {/* Number and Line */}
                      <div className="relative mr-8">
                        <div className="relative z-10 flex h-10 w-10 items-center justify-center p-3 rounded-full bg-white">
                          <span
                            className={`text-lg p-3 rounded-full font-medium ${
                              visibleSteps.includes(index)
                                ? "bg-black text-white"
                                : "text-gray-300 opacity-20"
                            }`}
                          >
                            {step.number}
                          </span>
                        </div>

                        {/* Vertical line */}
                        {index < steps.length - 1 && (
                          <div className="absolute left-1/2 top-10 bottom-0 w-px h-[calc(100%+1.5rem)] -translate-x-1/2">
                            <div className="h-full w-full bg-gray-200 opacity-20"></div>
                            <motion.div
                              className="absolute top-0 left-0 w-full bg-[#b0a3ff]"
                              initial={{ height: "0%" }}
                              animate={{
                                height: index < activeStep ? "100%" : "0%",
                              }}
                              transition={{ duration: 0.8, ease: "easeInOut" }}
                              style={{ originY: 0 }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, y: 32 }}
                        animate={{
                          opacity: visibleSteps.includes(index) ? 1 : 0,
                          y: visibleSteps.includes(index) ? 0 : 32,
                        }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <h3 className="mb-3 text-2xl font-bold text-[#0e0e0e]">
                          {step.title}
                        </h3>
                        <p className="text-[#0e0e0e] text-base opacity-80 max-w-lg">
                          {step.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
