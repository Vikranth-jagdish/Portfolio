"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import useSWR from "swr";
import { motion } from "framer-motion";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

interface BlogContent {
  slug: string;
  title: string;
  content: string;
  fileName: string;
  createdAt: string;
  modifiedAt: string;
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const decodedSlug = decodeURIComponent(slug);
  const { data, error, isLoading } = useSWR<BlogContent>(
    `/api/blogs/${decodedSlug}`,
    fetcher
  );

  return (
    <div className="min-h-screen w-full font-mono selection:bg-[var(--color-accent)] selection:text-black relative">
      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50 mix-blend-difference flex justify-between items-center">
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-sm text-[var(--color-accent)] hover:opacity-80 transition-opacity uppercase"
        >
          <ArrowLeft size={16} />
          Back to Blogs
        </Link>

        <a
          href="https://www.linkedin.com/in/vikranth-jagdish-b37798126/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sm text-[var(--color-accent)] hover:opacity-80 transition-opacity uppercase"
        >
          LinkedIn <ExternalLink size={14} />
        </a>
      </nav>

      <main className="container mx-auto px-4 py-20 max-w-4xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-[var(--color-accent)] text-sm uppercase tracking-widest">
              Loading...
            </div>
          </div>
        ) : error ? (
          <div className="text-red-400 text-sm">
            Failed to load blog post. Please try again later.
          </div>
        ) : data ? (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white">
                {data.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Calendar size={16} />
                <span>
                  {new Date(data.modifiedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 max-w-none">
              <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-base">
                {data.content}
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-white/10">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:opacity-80 transition-opacity uppercase"
              >
                <ArrowLeft size={16} />
                Back to all blogs
              </Link>
            </footer>
          </motion.article>
        ) : (
          <div className="text-red-400 text-sm">Blog post not found.</div>
        )}
      </main>
    </div>
  );
}
