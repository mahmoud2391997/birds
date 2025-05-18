import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Image
              src="/logo-white.png"
              alt="Birds Marketing Agency"
              width={150}
              height={50}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-300 mt-4">
              Elevating brands through powerful marketing, communications, and creative excellence.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#7ed957] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#7ed957] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-[#7ed957] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-gray-300 hover:text-[#7ed957] transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-300 hover:text-[#7ed957] transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#7ed957] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-[#7ed957]" />
                <a
                  href="mailto:Info@birds-marketingag.com"
                  className="text-gray-300 hover:text-[#7ed957] transition-colors"
                >
                  Info@birds-marketingag.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-[#7ed957]" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-[#7ed957] transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-[#7ed957]" />
                <span className="text-gray-300">123 Marketing Street, Creative District, Design City</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#0373fb] transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#0373fb] transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#0373fb] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#0373fb] transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-black"
                />
                <button className="bg-[#0373fb] hover:bg-[#0d60fa] px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Birds Marketing Agency. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
