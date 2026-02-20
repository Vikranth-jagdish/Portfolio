"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { PHOTOS_DATA, GLOBAL_SOCIAL_LINKS, GLOBAL_CONFIG } from "@/lib/data";
import { playHoverSound, playClickSound } from "@/lib/sound-utils";

interface Photo {
    id: number;
    src: string;
    alt: string;
    span: "normal" | "wide" | "tall";
}

const PINTEREST_BOARD_URL = "https://pin.it/1G6IkvC1j";

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

// Lightbox modal for viewing a single photo
const Lightbox = ({
    photo,
    onClose,
    onPrev,
    onNext,
}: {
    photo: Photo;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose, onPrev, onNext]);

    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/95 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-[210] px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
                [ CLOSE ]
            </button>

            {/* Navigation arrows */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-lg transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
                &larr;
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-lg transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
                &rarr;
            </button>

            {/* Image */}
            <motion.div
                className="relative z-[205] max-w-[90vw] max-h-[85vh]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            >
                <img
                    src={photo.src}
                    alt={photo.alt}
                    className="max-w-full max-h-[85vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-mono">
                        {photo.alt}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Individual photo card
const PhotoCard = ({
    photo,
    index,
    onClick,
}: {
    photo: Photo;
    index: number;
    onClick: () => void;
}) => {
    const spanClasses = {
        normal: "",
        wide: "md:col-span-2",
        tall: "md:row-span-2",
    };

    return (
        <motion.div
            className={`group relative overflow-hidden cursor-pointer bg-white/[0.02] ${spanClasses[photo.span]}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.19, 1, 0.22, 1],
            }}
            whileHover={{ scale: 1.02 }}
            onClick={() => {
                playClickSound();
                onClick();
            }}
            onMouseEnter={() => playHoverSound()}
        >
            {/* Image */}
            <div className="relative w-full h-full min-h-[250px] md:min-h-[300px]">
                <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                    loading="lazy"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />

                {/* Top-left index badge */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[var(--color-accent)] bg-black/60 px-2 py-1 backdrop-blur-sm border border-white/10">
                        {String(photo.id).padStart(2, "0")}
                    </span>
                </div>

                {/* Bottom caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-mono">
                        {photo.alt}
                    </p>
                </div>

                {/* Corner accent lines */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[var(--color-accent)]/0 group-hover:border-[var(--color-accent)]/60 transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[var(--color-accent)]/0 group-hover:border-[var(--color-accent)]/60 transition-all duration-500" />
            </div>
        </motion.div>
    );
};

export default function PhotoGallery() {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [photos] = useState<Photo[]>(PHOTOS_DATA);
    const scrollRef = useRef<HTMLDivElement>(null);

    const openLightbox = useCallback((index: number) => {
        setSelectedIndex(index);
    }, []);

    const closeLightbox = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    const goToPrev = useCallback(() => {
        setSelectedIndex((prev) =>
            prev !== null ? (prev - 1 + photos.length) % photos.length : null
        );
    }, [photos.length]);

    const goToNext = useCallback(() => {
        setSelectedIndex((prev) =>
            prev !== null ? (prev + 1) % photos.length : null
        );
    }, [photos.length]);

    return (
        <div className="relative w-full min-h-screen bg-transparent text-white font-mono">
            {/* Lightbox */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <Lightbox
                        photo={photos[selectedIndex]}
                        onClose={closeLightbox}
                        onPrev={goToPrev}
                        onNext={goToNext}
                    />
                )}
            </AnimatePresence>

            {/* Scroll container */}
            <div
                ref={scrollRef}
                className="relative z-10 w-full max-w-6xl mx-auto px-4 py-24 md:py-28"
            >
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

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[280px]">
                    {photos.map((photo, index) => (
                        <PhotoCard
                            key={photo.id}
                            photo={photo}
                            index={index}
                            onClick={() => openLightbox(index)}
                        />
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                        {photos.length} PHOTOS
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
