"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calendar, X, Loader2 } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Blog {
  slug: string;
  title: string;
  preview: string;
  fileName: string;
  createdAt: string;
  modifiedAt: string;
}

interface BlogContent {
  slug: string;
  title: string;
  content: string;
  fileName: string;
  createdAt: string;
  modifiedAt: string;
}

export default function BlogsList() {
  const { data, error, isLoading } = useSWR('/api/blogs', fetcher);
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);
  const [blogContent, setBlogContent] = useState<BlogContent | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);

  const handleBlogClick = async (slug: string) => {
    setSelectedBlog(slug);
    setLoadingContent(true);

    try {
      const response = await fetch(`/api/blogs/${slug}`);
      const content = await response.json();
      setBlogContent(content);
    } catch (error) {
      console.error('Error loading blog:', error);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleClose = () => {
    setSelectedBlog(null);
    setBlogContent(null);
  };

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
    <>
      <div className="space-y-4">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleBlogClick(blog.slug)}
            className="group cursor-pointer bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-[var(--color-accent)]/50 transition-all duration-300"
          >
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
          </motion.div>
        ))}
      </div>

      {/* Blog Content Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/20 rounded-lg max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">
                  {blogContent?.title || selectedBlog}
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
                {loadingContent ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" />
                  </div>
                ) : blogContent ? (
                  <div className="prose prose-invert prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 max-w-none">
                    <div className="whitespace-pre-wrap text-gray-300 font-mono text-sm leading-relaxed">
                      {blogContent.content}
                    </div>
                    <div className="mt-8 pt-4 border-t border-white/10 text-xs text-gray-500">
                      Last updated:{' '}
                      {new Date(blogContent.modifiedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
