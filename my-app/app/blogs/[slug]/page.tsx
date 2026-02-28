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
    <div
      className="min-h-screen w-full relative"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        background: "#fafaf9",
        color: "#1c1917",
      }}
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-stone-50/80 border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>

          <a
            href="https://www.linkedin.com/in/vikranth-jagdish-b37798126/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            LinkedIn <ExternalLink size={14} />
          </a>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-stone-400 text-sm tracking-wide">
              Loading...
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm">
            Failed to load blog post. Please try again later.
          </div>
        ) : data ? (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <header className="mb-10">
              <h1
                className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-stone-900"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {data.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-stone-400">
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
            <div className="prose prose-stone prose-lg max-w-none">
              <div
                className="whitespace-pre-wrap leading-relaxed text-stone-700"
                style={{ fontSize: "1.125rem", lineHeight: "1.85" }}
              >
                {data.content}
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-stone-200">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to all blogs
              </Link>
            </footer>
          </motion.article>
        ) : (
          <div className="text-red-500 text-sm">Blog post not found.</div>
        )}
      </main>
    </div>
  );
}
