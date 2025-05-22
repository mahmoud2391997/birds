"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import FancyButton from "@/components/ui/FancyButton";

export default function ContactPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray(".animate-section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-gradient-to-b from-black via-black to-purple-950 min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="aurora-bg"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in touch with our team to discuss how we can help elevate your
            brand.
          </motion.p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 animate-section">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Contact us</h2>
              <p className="text-gray-300 mb-8">
                Get in touch – we’re here to help!
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-white mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-white">Email</h3>
                    <a
                      href="mailto:Info@birds-marketingag.com"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Info@birds-marketingag.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-white mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-white">Phone</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-white mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-white">Address</h3>
                    <p className="text-gray-300">
                      123 Marketing Street, Creative District, Design City
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-4 text-white">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#6B21A8] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#6B21A8] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#6B21A8] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#6B21A8] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-xl bg-[#8B5CF6]/70 border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Your title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="w-full px-4 py-3 rounded-xl bg-[#8B5CF6]/70 border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder="Your title"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Work email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-xl bg-[#8B5CF6]/70 border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Work email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Company name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 rounded-xl bg-[#8B5CF6]/70 border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Company name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="mau"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    MAU in the US
                  </label>
                  <input
                    type="text"
                    id="mau"
                    className="w-full px-4 py-3 rounded-xl bg-[#8B5CF6]/70 border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="MAU in the US"
                    required
                  />
                </div>

                <FancyButton type="submit">Contact us</FancyButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 animate-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Location</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Visit our office or get in touch with us through the contact
              information provided.
            </p>
          </div>

          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <p className="text-gray-300">Google Maps Integration</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .aurora-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            #1e3a8a 0%,
            #a855f7 50%,
            #3b82f6 100%
          );
          filter: blur(100px);
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
