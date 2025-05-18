import React from "react";

const faqData = [
  {
    question: "What should I expect when starting a project?",
    answer:
      "The first step is our collaboration. We need to determine if we’re the right fit for your project. If so, we’ll schedule a call to dive deeper and help me understand your vision.",
  },
  {
    question: "Do you freelance (design) when reaching out?",
    answer:
      "Yes, we offer freelance design services. Reach out to discuss your needs, and we’ll determine how we can assist.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Costs vary depending on the project scope. After an initial consultation, we’ll provide a detailed estimate tailored to your needs.",
  },
  {
    question: "What are the payment terms for a project?",
    answer:
      "We typically require a 50% deposit upfront, with the remaining balance due upon project completion. Custom terms can be discussed.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Timelines depend on the project’s complexity. We’ll provide an estimated timeline during the initial consultation.",
  },
  {
    question: "Do you take on small hourly work?",
    answer:
      "Yes, we can accommodate small hourly tasks. Contact us to discuss your requirements.",
  },
];

const FaQ = () => {
  return (
    <div className=" bg-black text-white flex flex-col items-center py-2 px-4">
      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div className="space-y-6">
          {faqData.map((item, idx) => (
            <details key={idx} className="border-b border-gray-300 py-4">
              <summary className="text-lg md:text-xl font-medium cursor-pointer flex justify-between items-center">
                {item.question}
                <span className="text-2xl">+</span>
              </summary>
              <p className="mt-2 text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FaQ;
