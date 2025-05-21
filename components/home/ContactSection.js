import { Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-20 md:py-28 bg-black animate-section">
      <div className="container mx-auto px-4 text-start">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12">
          Contact
        </h2>

        <a
          href="mailto:Info@birds-marketingag.com"
          aria-label="Send an email to Info@birds-marketingag.com"
          className="inline-flex flex-col items-start space-y-2 group"
        >
          <div className="flex items-center">
            <Mail className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 text-[#cb6ce6] mr-4" />
            <span className="text-[#cb6ce6] text-5xl md:text-6xl lg:text-7xl font-bold">
              Info@
            </span>
          </div>

          <span className="pl-16 md:pl-20 text-4xl md:text-5xl lg:text-6xl font-bold text-[#7ed957] leading-tight">
            birds-marketingag
            <span className="text-[#0373fb]">.com</span>
          </span>
        </a>
      </div>
    </section>
  );
}
