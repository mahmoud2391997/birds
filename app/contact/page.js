"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin } from "lucide-react";
import FancyButton from "@/components/ui/FancyButton";

export default function ContactPage() {
  const pageRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      let token = null;

      // Only try to get reCAPTCHA token if it's properly loaded
      if (
        recaptchaLoaded &&
        window.grecaptcha &&
        typeof window.grecaptcha.execute === "function"
      ) {
        try {
          console.log("Attempting to generate reCAPTCHA token...");
          token = await window.grecaptcha.execute(
            process.env.NEXT_PUBLIC_SITE_KEY,
            {
              action: "submit",
            }
          );
          console.log("reCAPTCHA token generated successfully");
        } catch (recaptchaError) {
          console.warn("reCAPTCHA token generation failed:", recaptchaError);
          // Continue without token - the server will handle this gracefully
        }
      } else {
        console.warn("reCAPTCHA not ready, submitting without token");
      }

      // Prepare form data
      const formData = {
        name: e.target.name.value,
        title: e.target.title.value,
        email: e.target.email.value,
        company: e.target.company.value,
        mau: e.target.mau.value,
        captchaToken: token,
      };

      console.log("Submitting form data:", {
        ...formData,
        captchaToken: token ? "present" : "missing",
      });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok) {
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });
      e.target.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: `Failed to send message: ${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle reCAPTCHA script loading
  const handleRecaptchaLoad = () => {
    console.log("reCAPTCHA script loaded");

    // Wait a bit for reCAPTCHA to fully initialize
    setTimeout(() => {
      if (
        window.grecaptcha &&
        typeof window.grecaptcha.execute === "function"
      ) {
        console.log("reCAPTCHA is ready");
        setRecaptchaLoaded(true);
      } else {
        console.warn("reCAPTCHA not properly initialized");
        // Try again after a longer delay
        setTimeout(() => {
          if (
            window.grecaptcha &&
            typeof window.grecaptcha.execute === "function"
          ) {
            console.log("reCAPTCHA is ready (second attempt)");
            setRecaptchaLoaded(true);
          } else {
            console.error("reCAPTCHA failed to initialize");
            // Still allow form submission without reCAPTCHA
            setRecaptchaLoaded(false);
          }
        }, 2000);
      }
    }, 1000);
  };

  const handleRecaptchaError = (e) => {
    console.error("Failed to load reCAPTCHA script:", e);
    setRecaptchaLoaded(false);
  };

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
      {/* Load reCAPTCHA v3 script */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_SITE_KEY}`}
        strategy="afterInteractive"
        onLoad={handleRecaptchaLoad}
        onError={handleRecaptchaError}
      />

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
            {/* Contact Info (left side) */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Contact us</h2>
              <p className="text-gray-300 mb-8">
                Get in touch – we&apos;re here to help!
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
                      +20 155635421
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-white mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1 text-white">Address</h3>
                    <p className="text-gray-300">
                      643, Touristic District A, October Gardens, Giza, Egypt{" "}
                    </p>
                  </div>
                </div>
              </div>

              {/* reCAPTCHA Status Indicator */}
              {/* <div className="mt-8 p-4 rounded-lg bg-white/10">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      recaptchaLoaded ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-300">
                    {recaptchaLoaded
                      ? "Security verification ready"
                      : "Loading security verification..."}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Form will work even if security verification fails to load
                </p>
              </div> */}
            </div>

            {/* Contact Form (right side) */}
            <div>
              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-500/20 border border-green-500/50 text-green-300"
                      : "bg-red-500/20 border border-red-500/50 text-red-300"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Your name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 rounded-xl bg-[#8B5CF6]/70 border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Your title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="w-full px-4 py-3 rounded-xl bg-[#8B5CF6]/70 border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder="Your title"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Work email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl bg-[#8B5CF6]/70 border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Work email"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Company name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-xl bg-[#8B5CF6]/70 border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Company name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="mau"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    MAU in the US *
                  </label>
                  <input
                    type="text"
                    id="mau"
                    name="mau"
                    className="w-full px-4 py-3 rounded-xl bg-[#8B5CF6]/70 border-none text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Monthly Active Users in the US"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="pt-4">
                  <FancyButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </FancyButton>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    className="underline"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
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

      {/* Background Style */}
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
