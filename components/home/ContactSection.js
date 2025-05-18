import { Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-16 md:py-24 bg-black animate-section">
      <div className="container mx-auto px-4 text-start">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
          Contact
        </h2>

        <a
          href="mailto:Info@birds-marketingag.com"
          aria-label="Send an email to Info@birds-marketingag.com"
          className="inline-flex flex-col items-start group"
        >
          <div className="flex items-center">
            <Mail className="h-10 w-10 md:h-16 md:w-16 lg:h-20 lg:w-20 text-[#cb6ce6] mr-4" />
            <span className="text-[#cb6ce6] text-4xl md:text-5xl lg:text-6xl font-bold">
              Info@
            </span>
          </div>

          <span className="text-[#7ed957] text-3xl md:text-4xl lg:text-5xl font-bold pl-[4.5rem]">
            birds-marketingag
            <span className="text-[#0373fb]">.com</span>
          </span>
        </a>
      </div>
    </section>
  );
}
