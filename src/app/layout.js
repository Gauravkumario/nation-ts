import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "REST Countries API with color theme switcher",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className } dark:bg-[#202C37]`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
