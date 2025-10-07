// /app/articles/layout.tsx
export default function ArticlesLayout({ children }) {
  return (
    <div className="pt-24 px-4 bg-white text-black"> {/* padding-top علشان الـNavbar الثابت */}
      {children}
    </div>
  );
}
