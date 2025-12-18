import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Vikranth Jagdish | Portfolio",
  description: "Portfolio of Vikranth Jagdish, Full Stack Developer & Designer based in Chennai.",
  keywords: ["Vikranth Jagdish", "Portfolio", "Full Stack", "Developer", "Chennai", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${spaceMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
