import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

import { DitheringShader } from "@/components/ui/dithering-shader";

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Vikranth Jagdish | Portfolio",
  description: "Portfolio of Vikranth Jagdish, Full Stack Developer & Designer based in Chennai.",
  keywords: ["Vikranth Jagdish", "Portfolio", "Full Stack", "Developer", "Chennai", "Next.js"],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

import { GlobalSpotifyCard } from "@/components/global-spotify-card";

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
        <div className="fixed inset-0 pointer-events-none -z-10 opacity-40">
          <DitheringShader
            shape="swirl"
            type="4x4"
            colorBack="#050505"
            colorFront="#4a4200"
            pxSize={4}
            speed={0.2}
            className="w-full h-full"
          />
        </div>
        {children}
        <GlobalSpotifyCard />
      </body>
    </html>
  );
}
