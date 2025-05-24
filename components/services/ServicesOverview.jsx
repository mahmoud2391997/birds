import React from "react";
import { services } from "./ServicesData";
import Serviceard from "./Servicesard"; // <-- Fixed typo

export default function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-section">
          <h2 className="text-3xl font-bold mb-4">
            Real Solutions to Help Your Brand Grow and Lead
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            In a competitive marketing landscape, we offer a range of solutions
            you can choose from, tailored to meet your specific needs. However,
            if you're looking for a comprehensive, all-in-one strategy, we also
            provide full marketing solutions to elevate your brand.
          </p>
        </div>

        <div className="space-y-24 animate-section">
          {services.map((service, index) => (
            <Serviceard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
