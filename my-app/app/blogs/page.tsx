"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import BlogsList from "@/components/ui/blogs-list";

export default function BlogsPage() {
    return (
        <div className="min-h-screen w-full font-mono selection:bg-[var(--color-accent)] selection:text-black relative">
            {/* Navigation */}
            <nav className="fixed top-4 left-4 right-4 z-50 mix-blend-difference flex justify-between items-center">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-[var(--color-accent)] hover:opacity-80 transition-opacity uppercase"
                >
                    <ArrowLeft size={16} />
                    Back
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

            <main className="container mx-auto px-4 py-20 max-w-5xl">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-white">
                        BLOGS
                    </h1>
                    <p className="text-gray-400">
                        Thoughts, insights, and deep dives into technology.
                    </p>
                </header>

                <div className="space-y-12">
                    <section className="space-y-6">
                        <h2 className="text-xl font-bold border-b border-gray-800 pb-2 flex items-center gap-2 text-white">
                            LATEST POSTS
                            <span className="text-xs text-gray-500 ml-auto uppercase tracking-widest">
                                {new Date().getFullYear()}
                            </span>
                        </h2>

                        <BlogsList />
                    </section>
                </div>
            </main>
        </div>
    );
}
