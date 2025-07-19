// app/auth/layout.js

import React from "react";

export default function AuthLayout({ children }) {
  return (
    <>
        <main className="min-h-screen bg-gray-100 m-auto">
          {children}
        </main>
   </>
  );
}
