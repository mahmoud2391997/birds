import React from "react";
import { services } from "./ServicesData";
import ServiceCard from "./Servicesard"; // Fixed typo

export default function ServicesOverview() {
  return (
    <section className="py-12 md:py-24 text-white bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 animate-section max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Real Solutions to Help Your Brand Grow and Lead
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            In a competitive marketing landscape, we offer a range of solutions
            you can choose from, tailored to meet your specific needs. However,
            if you're looking for a comprehensive, all-in-one strategy, we also
            provide full marketing solutions to elevate your brand.
          </p>
        </div>

        <div className="space-y-20 md:space-y-24 animate-section">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
