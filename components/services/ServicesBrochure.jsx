import React from "react";
import { FileText } from "lucide-react";

export default function ServicesBrochure() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center animate-section">
        <h2 className="text-3xl font-bold mb-6">
          Download Our Service Brochure
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          Get detailed information about our services, case studies, and pricing
          in our comprehensive brochure.
        </p>
        <a
          download
          href="/birdsb.pdf"
          target="_blank"
          className="inline-flex items-center bg-[#0373fb] text-white font-medium py-3 px-8 rounded-lg hover:bg-[#0d60fa] transition-colors"
          rel="noreferrer"
        >
          <FileText className="mr-2 h-5 w-5" />
          Download Brochure
        </a>
      </div>
    </section>
  );
}
