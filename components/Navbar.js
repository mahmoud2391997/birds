"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Our Process", href: "/process" },
    { name: "Articles", href: "/articles" },
    { name: "Contact Us", href: "/contact" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300`}>
      {/* Simulated glow using Tailwind gradient/blur layers */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-radial  blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Birds Marketing Agency"
              width={400} // زودنا العرض شوية كمان
              height={100}
              priority // لسرعة التحميل
              sizes="(max-width: 768px) 180px, 400px"
              className="h-32 w-auto" // 🔥 اللوجو أكبر دلوقتي
            />
          </motion.div>
        </Link>

        {/* Nav Links */}
        <motion.div
          className="hidden md:flex items-center bg-gray-800/50 bg-opacity-80 rounded-full px-4 py-2 space-x-6"
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          {navLinks.map((link) => (
            <motion.div key={link.name} variants={itemVariants}>
              <Link
                href={link.href}
                className="text-sm text-white hover:text-[#7ed957] font-medium transition duration-200"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
        {/* Book Call Button */}
        <div className="hidden md:flex ml-4">
          <Link
            href="/book"
            className="bg-[#1f1f1f] border border-white text-white hover:bg-white hover:text-black px-4 py-2 rounded-full text-sm font-semibold transition duration-300"
          >
            + Schedule a meeting
          </Link>
        </div>
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-md ${
              scrolled ? "text-white" : "text-white"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-400/90 backdrop-blur-md shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium text-white hover:text-[#7ed957] py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
