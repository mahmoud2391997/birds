import React from "react";

const workHistory = [
  {
    title: "Director of User Experience at GIANT",
  },
  {
    title: "Design Lead at dumbpunk",
  },
  {
    title: "Marketing Specialist at GIANT",
  },
  {
    title: "Bachelor of Administration, Marketing at OBU",
  },
];

function WorkHistoryItem({ title, isLast }) {
  return (
    <div className={`flex items-center${!isLast ? " border-b-2" : ""}`}>
      <span className="text-2xl mr-4">→</span>
      <p className="text-2xl md:text-4xl font-medium">{title}</p>
    </div>
  );
}

export default function WorkHistory() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-4">
      <section className="w-full max-w-5xl mb-8">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
          WORK HISTORY
        </h1>
        <div className="space-y-10 ml-20 border-b-2">
          {workHistory.map((item, idx) => (
            <WorkHistoryItem
              key={item.title}
              title={item.title}
              isLast={idx === workHistory.length - 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
