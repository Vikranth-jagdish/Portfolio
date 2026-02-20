"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GLOBAL_SOCIAL_LINKS, GLOBAL_CONFIG } from "@/lib/data";
import { playClickSound } from "@/lib/sound-utils";

const PINTEREST_BOARD_URL = "https://www.pinterest.com/unbalanceddiode/my-pictures/";

// Time Display (matching portfolio style)
const TimeDisplay = ({ CONFIG = {} }: any) => {
    const [time, setTime] = useState({ hours: "", minutes: "", dayPeriod: "" });

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour12: true,
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                ...(CONFIG.timeZone ? { timeZone: CONFIG.timeZone } : {}),
            };
            const formatter = new Intl.DateTimeFormat("en-US", options);
            const parts = formatter.formatToParts(now);
            setTime({
                hours: parts.find((p) => p.type === "hour")?.value || "",
                minutes: parts.find((p) => p.type === "minute")?.value || "",
                dayPeriod:
                    parts.find((p: any) => p.type === "dayPeriod")?.value || "",
            });
        };
        updateTime();
        const interval = setInterval(updateTime, CONFIG.timeUpdateInterval || 1000);
        return () => clearInterval(interval);
    }, [CONFIG.timeZone, CONFIG.timeUpdateInterval]);

    return (
        <time
            className="fixed bottom-4 right-4 font-mono text-xs z-50 text-[var(--color-accent)]"
            id="current-time"
        >
            {time.hours}
            <span className="time-blink animate-pulse">:</span>
            {time.minutes} {time.dayPeriod}
        </time>
    );
};

export default function PhotoGallery() {
    const router = useRouter();
    const embedContainerRef = useRef<HTMLDivElement>(null);

    // Load the Pinterest SDK and render the embed
    useEffect(() => {
        const loadPinterest = () => {
            // Clean up any previous script
            const existingScript = document.getElementById("pinterest-sdk");
            if (existingScript) {
                existingScript.remove();
            }

            // If Pinterest SDK is already loaded, just re-render
            if ((window as any).PinUtils) {
                (window as any).PinUtils.build();
                return;
            }

            const script = document.createElement("script");
            script.id = "pinterest-sdk";
            script.src = "https://assets.pinterest.com/js/pinit.js";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        };

        // Small delay to ensure the embed anchor is in the DOM
        const timer = setTimeout(loadPinterest, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-transparent text-white font-mono">
            {/* Scroll container */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-24 md:py-28">
                {/* Header */}
                <motion.div
                    className="mb-12 flex flex-col gap-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                playClickSound();
                                router.push("/");
                            }}
                            className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-[var(--color-accent)] transition-colors font-bold"
                        >
                            &larr; BACK
                        </button>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="flex items-end justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                                PHOTOS
                            </h1>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mt-2">
                                A curated collection of moments
                            </p>
                        </div>
                        <a
                            href={PINTEREST_BOARD_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--color-accent)] text-[10px] uppercase tracking-[0.2em] font-bold transition-all group"
                        >
                            <span>VIEW ON PINTEREST</span>
                            <span className="text-[var(--color-accent)] group-hover:translate-x-1 transition-transform">
                                &rarr;
                            </span>
                        </a>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-[var(--color-accent)]/50 via-white/10 to-transparent" />
                </motion.div>

                {/* Pinterest Board Embed */}
                <motion.div
                    ref={embedContainerRef}
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                >
                    <a
                        data-pin-do="embedBoard"
                        data-pin-board-width="900"
                        data-pin-scale-height="800"
                        data-pin-scale-width="115"
                        href={PINTEREST_BOARD_URL}
                    />
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                        PINTEREST GALLERY
                    </p>
                    <a
                        href={PINTEREST_BOARD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-[var(--color-accent)] transition-colors"
                    >
                        PINTEREST &rarr;
                    </a>
                </motion.div>
            </div>

            {/* Corner elements (matching portfolio layout) */}
            <aside className="fixed inset-0 pointer-events-none p-6 z-50">
                <div className="fixed top-4 left-4 z-50">
                    <div
                        className="w-2 h-2 bg-[var(--color-accent)]"
                        aria-hidden="true"
                    />
                    <p className="mt-2 text-xs text-[var(--color-accent)] font-bold">
                        VIKRANTH JAGDISH
                    </p>
                </div>
                <nav className="fixed top-4 right-4 z-50 pointer-events-auto text-xs flex gap-3 text-[var(--color-accent)] uppercase">
                    {GLOBAL_SOCIAL_LINKS.linkedin && (
                        <>
                            <a
                                href={GLOBAL_SOCIAL_LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                LinkedIn
                            </a>{" "}
                            |
                        </>
                    )}
                    {GLOBAL_SOCIAL_LINKS.email && (
                        <>
                            <a
                                href={GLOBAL_SOCIAL_LINKS.email}
                                className="hover:underline"
                            >
                                Email
                            </a>{" "}
                            |
                        </>
                    )}
                    {GLOBAL_SOCIAL_LINKS.instagram && (
                        <>
                            <a
                                href={GLOBAL_SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Instagram
                            </a>{" "}
                            |
                        </>
                    )}
                    {GLOBAL_SOCIAL_LINKS.x && (
                        <a
                            href={GLOBAL_SOCIAL_LINKS.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            X
                        </a>
                    )}
                </nav>
                <div className="fixed bottom-4 left-4 z-50 text-xs text-[var(--color-accent)] font-mono">
                    CHENNAI, INDIA
                </div>
                <TimeDisplay CONFIG={GLOBAL_CONFIG} />
            </aside>
        </div>
    );
}
