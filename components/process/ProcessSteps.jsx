import { ArrowUp, Calendar, FileCheck } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const ProcessSteps = () => {
  const steps = [
    {
      number: "01",
      title: "Schedule a Meeting",
      description:
        "Choose a date from the available calendar with our Marketing director directly.",
      icon: <Calendar className="h-12 w-12 text-[#0373fb]" />,
    },
    {
      number: "02",
      title: "Receive an Offer",
      description:
        "Within 48hrs, we'll provide a customized project proposal with detailed deliverables, a clear roadmap, and a quote.",
      icon: <FileCheck className="h-12 w-12 text-[#7ed957]" />,
    },
    {
      number: "03",
      title: "Welcome Up Here!",
      description:
        "Sign the contract, submit the deposit, and relax. We've got it from here—no need to worry about marketing. We'll get your brand soaring.",
      icon: <ArrowUp className="h-12 w-12 text-[#cb6ce6]" />,
    },
  ];
  return (
    <div id="process-steps">
      {/* Process Steps */}
      <section className="py-20  md:py-24 bg-black text-white">
        <div className="container py-20 h-min-screen mx-auto px-4">
          <div className="max-w-4xl mx-auto py-20 animate-section">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative mb-16 last:mb-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center py-20 mb-2">
                      <span className="text-4xl font-bold text-gray-200 mr-4">
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-gray-300 text-lg">{step.description}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute left-10 top-20 bottom-[-4rem] w-0.5 bg-gray-200 z-0"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      s
    </div>
  );
};

export default ProcessSteps;
