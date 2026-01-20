"use client";

import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { FileText, Calendar, Loader2 } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Blog {
  slug: string;
  title: string;
  preview: string;
  fileName: string;
  createdAt: string;
  modifiedAt: string;
}

export default function BlogsList() {
  const { data, error, isLoading } = useSWR('/api/blogs', fetcher);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--color-accent)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-sm">
        Failed to load blogs. Please try again later.
      </div>
    );
  }

  const blogs: Blog[] = data?.blogs || [];

  if (blogs.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        No blogs found. Add .txt files to the /blogs directory.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/blogs/${encodeURIComponent(blog.slug)}`}>
            <div className="group cursor-pointer bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-[var(--color-accent)]/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[var(--color-accent)]">
                  <FileText size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                    {blog.preview}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>
                      {new Date(blog.modifiedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
