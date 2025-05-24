import React from "react";

const faqData = [
  {
    question: "Have you worked with businesses in our industry?",
    answer:
      "Our agency may be young—founded in 2024 with 2 years of solid experience—but the real strength lies in our founder. Ms. Nour Abbas brings over 6 years of proven success across industries like real estate, F&B, HR & recruitment, travel, beauty, fashion, construction, education, and more. As with any business, it’s important to know who’s behind the scenes. With us, you get expert leadership and a team that adapts like chameleons — no industry is too complex to understand or build a winning strategy for. That’s marketing done right.",
  },
  {
    question: "What makes your agency different from the others?",
    answer:
      "We stand out in the way we research and apply proven marketing and communication strategies. More importantly, we genuinely care about our clients. Our communication isn’t just professional — it’s personal. We see your brand as our own and treat your success as ours. We’ve got you!",
  },
  {
    question: "Who will be handling our account and what’s their experience?",
    answer:
      "Every client gets a dedicated marketing account manager — the eagle leading our creative team and your main day-to-day contact. You’ll also be in touch with our Marketing Director, Ms. Nour Abbas, who’s like the Anna Wintour of our agency. While your account manager handles the details, Nour stays closely involved to ensure everything stays on point.",
  },
  {
    question: "What services does your agency offer?",
    answer:
      "We offer a full suite of services — from complete marketing management to digital marketing, including social media, SEO, UX, email, video, PR, and communications. We even have our own in-house printing studio. Explore everything we offer on our Services page — click here to take a look.",
  },
  {
    question: "How often will we receive reports and what will they include?",
    answer:
      "Our clients receive reports at the end of every month. These include key statistics, performance insights, and a full evaluation of your brand’s growth with us.",
  },
  {
    question: "How will we communicate, and how often can we expect updates?",
    answer:
      "We’re flexible with communication! Whether you prefer emails, WhatsApp groups, or tools like Zoom, we’ll use what works best for you. Updates are shared based on your selected services and the nature of the project.",
  },
  {
    question: "What is your client onboarding process like?",
    answer:
      "We keep it fast and simple because we know time matters:\n1. Schedule a meeting\n2. Talk through your brand, goals, and needs\n3. Receive a tailored proposal\n4. Join the Birds family — that’s it!",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "Each service has its own starting price. If you opt for a full package, you’ll receive a discounted rate. Online payment options will be available soon!",
  },
  {
    question: "What happens if we’re not satisfied with the work?",
    answer:
      "Happy clients, happy life! If something’s off, we’ll talk it through and offer flexible solutions. We’re always ready with more than one option because your brand truly matters to us — you’re not just a client, and this isn’t just a deal.",
  },
  {
    question: "Where are you located?",
    answer:
      "Birds is a Marketing & Communications Agency based in 6th of October City, Egypt — proudly serving clients around the world. We’re Birds, after all — the sky isn’t the limit, it’s just the beginning.",
  },
  {
    question: "Do you partner with brands globally?",
    answer:
      "Yes, we do! Whether you’re based in the USA, Europe, the Middle East, or anywhere else — we’re happy to help and ready to collaborate.",
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
              <p className="whitespace-pre-line text-2xl text-gray-400">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FaQ;
