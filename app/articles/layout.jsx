import { Inter } from "next/font/google";
import { ReduxProvider } from "@/components/providers/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog System",
  description: "A modern blog system with Redux Toolkit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
