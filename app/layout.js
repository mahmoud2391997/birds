import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LayoutWrapper from "./LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Birds Marketing Agency",
  description:
    "Elevating brands through powerful marketing, communications, and creative excellence.",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" className={inter.className}>
        <Providers>
          <Navbar />
          <main>
            <LayoutWrapper>{children}</LayoutWrapper>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
