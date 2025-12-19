"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import TopTracksList from "@/components/ui/top-tracks-list";
import GithubStats from "@/components/ui/github-stats";

export default function StatsPage() {
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
                        STATS
                    </h1>
                    <p className="text-gray-400">Live metrics from across the multiverse.</p>
                </header>

                <div className="space-y-12">
                    {/* Github Section */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-bold border-b border-gray-800 pb-2 flex items-center gap-2 text-white">
                            GITHUB ACTIVITY
                            <a href="https://github.com/Vikranth-jagdish" target="_blank" className="text-[var(--color-accent)] hover:underline ml-auto text-xs flex items-center gap-1">
                                PROFILE <ExternalLink size={10} />
                            </a>
                        </h2>

                        <GithubStats />
                    </section>

                    {/* Grid for Monkeytype and Spotify */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Monkeytype Section */}
                        <section className="space-y-6">
                            <h2 className="text-xl font-bold border-b border-gray-800 pb-2 flex items-center gap-2 text-white">
                                TYPING SPEED
                                <a href="https://monkeytype.com/profile/VikranthJagdish" target="_blank" className="text-[var(--color-accent)] hover:underline ml-auto text-xs flex items-center gap-1">
                                    MONKEYTYPE <ExternalLink size={10} />
                                </a>
                            </h2>

                            <div className="w-full flex justify-start group cursor-pointer relative pt-4">
                                <a href="https://monkeytype.com/profile/VikranthJagdish" target="_blank" rel="noreferrer" className="w-full">
                                    <img
                                        alt="My Monkeytype stats"
                                        src="https://monkeytype-readme.zeabur.app/generate-svg/VikranthJagdish/serika_dark?lbpb=true"
                                        className="w-full h-auto object-contain"
                                    />
                                </a>
                            </div>
                        </section>

                        {/* Top Tracks Section */}
                        <section className="space-y-6">
                            <h2 className="text-xl font-bold border-b border-gray-800 pb-2 flex items-center gap-2 text-white">
                                TOP TRACKS
                                <span className="text-xs text-gray-500 ml-auto uppercase">Spotify (Last 4 Weeks)</span>
                            </h2>
                            <TopTracksList />
                        </section>
                    </div>

                    {/* Spotify Playlist Embed */}
                    <section className="space-y-6 text-white">
                        <h2 className="text-xl font-bold border-b border-gray-800 pb-2 flex items-center gap-2">
                            PLAYLIST
                            <span className="text-xs text-gray-500 ml-auto uppercase tracking-widest">Recommendations</span>
                        </h2>
                        <div className="w-full bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
                            <iframe
                                title="Spotify Embed: Recommendation Playlist "
                                src={`https://open.spotify.com/embed/playlist/3inAeOAlPSTP3favtJ7dF7?utm_source=generator&theme=0`}
                                width="100%"
                                height="100%"
                                style={{ minHeight: '360px' }}
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
