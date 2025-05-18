import AboutHeroSection from "@/components/about/AboutHero";
import AboutSection from "@/components/about/AboutSection";
import FaQ from "@/components/about/FaQ";
import WorkHistory from "@/components/about/WorkHistory";
import WorkWithUs from "@/components/about/WorkWithUs";
import React from "react";

const page = () => {
  return (
    <div>
      <AboutHeroSection />
      <AboutSection />
      <WorkHistory />
      <FaQ />
      <WorkWithUs />
    </div>
  );
};

export default page;
