import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agentic Graph RAG: The Future of Knowledge Retrieval",
  description:
    "What happens when you combine graph-based knowledge with autonomous AI agents? A deep dive into the architecture that reasons its way to answers.",
  openGraph: {
    title: "Agentic Graph RAG: The Future of Knowledge Retrieval",
    description:
      "What happens when you combine graph-based knowledge with autonomous AI agents? A deep dive into the architecture that reasons its way to answers.",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
