import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Real-time Voice Applications with LiveKit",
  description:
    "From telehealth to online education — how LiveKit makes real-time voice accessible, scalable, and production-ready.",
  openGraph: {
    title: "Building Real-time Voice Applications with LiveKit",
    description:
      "From telehealth to online education — how LiveKit makes real-time voice accessible, scalable, and production-ready.",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
