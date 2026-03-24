import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How AI Actually Works: Why It Has No Memory",
  description:
    "An interactive exploration of how LLMs are stateless black boxes, and how context passing creates the illusion of memory.",
  openGraph: {
    title: "How AI Actually Works: Why It Has No Memory",
    description:
      "An interactive exploration of how LLMs are stateless black boxes, and how context passing creates the illusion of memory.",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
