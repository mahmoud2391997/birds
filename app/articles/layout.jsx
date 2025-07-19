import { Inter } from "next/font/google";
import { Providers } from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog System",
  description: "A modern blog system with Redux Toolkit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
