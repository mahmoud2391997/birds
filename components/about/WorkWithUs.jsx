import React from "react";

const WorkWithUs = () => {
  return (
    <div className="bg-black flex flex-col text-white items-center py-12 px-4 mb-8">
      <section className="w-full max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          WORK WITH US
        </h2>
        <p className="text-lg md:text-xl text-white">
          Reach out to collaborate or discuss your next project.
        </p>
        <a
          href="mailto:hello@emptyshelf.design"
          className="inline-block mt-4 text-xl md:text-2xl font-medium border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-black transition-colors"
        >
          hello@emptyshelf.design
        </a>
      </section>
    </div>
  );
};

export default WorkWithUs;
