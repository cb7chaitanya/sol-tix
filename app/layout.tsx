import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from '@/components/Footer';
import Appbar from "@/components/Appbar";
import { Providers } from "./providers";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#101aa7] to-[#01053c] flex flex-col scrollbar-thin scrollbar-thumb-fuchsia-500 scrollbar-track-#000000 h-full`}>
        <Appbar />
        <div className="flex flex-col justify-center items-center">
            {children}
            <div className="md:w-4/5 w-full">
              <Footer />
            </div>
          </div>
      </body>
      </Providers>
    </html>
  );
}
