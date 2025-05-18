import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const ProcessTestmo = () => {
  return (
    <div>
      <section className="py-16 md:py-24 text-white">
        <div className="container mx-auto px-4 animate-section">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to
              say about working with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial) => (
              <motion.div
                key={testimonial}
                className="bg-black text-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (testimonial - 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div>
                    <h4 className="font-bold">Client Name</h4>
                    <p className="text-sm text-gray-500">Position, Company</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Working with Birds Marketing Agency has been a game-changer
                  for our brand. Their strategic approach and creative solutions
                  have helped us achieve remarkable results."
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProcessTestmo;
