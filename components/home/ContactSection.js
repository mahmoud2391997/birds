import { Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="section-padding bg-black animate-section">
      <div className="container mx-auto px-4 text-start">
        <h2 className="text-3xl font-bold text-white mb-6">
          Stay in Contact Directly
        </h2>
        <a
          href="mailto:Info@birds-marketingag.com"
          className="inline-flex items-center text-5xl max-w-0.5 font-medium text-[#0373fb] hover:text-[#0d60fa] transition-colors"
        >
          <Mail className="mr-2 h-6 w-6" />
          Info@birds-marketingag.com
        </a>
      </div>
    </section>
  );
}
