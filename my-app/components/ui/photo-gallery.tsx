"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GLOBAL_SOCIAL_LINKS, GLOBAL_CONFIG } from "@/lib/data";
import { playClickSound } from "@/lib/sound-utils";
import {
    fetchPinterestPhotos,
    type PinterestPin,
} from "@/app/photos/actions";

const PINTEREST_BOARD_URL =
    "https://www.pinterest.com/unbalanceddiode/my-pictures/";

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

// Lightbox component for viewing photos full-size
function Lightbox({
    photo,
    onClose,
    onPrev,
    onNext,
}: {
    photo: PinterestPin;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/60 hover:text-white text-xs uppercase tracking-[0.2em] font-bold z-10 transition-colors"
            >
                CLOSE [ESC]
            </button>

            {/* Nav buttons */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-2xl z-10 transition-colors p-4"
            >
                &larr;
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-2xl z-10 transition-colors p-4"
            >
                &rarr;
            </button>

            {/* Image */}
            <motion.div
                className="relative max-w-[90vw] max-h-[85vh] w-auto h-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={photo.src}
                    alt={photo.alt}
                    className="object-contain max-h-[85vh] max-w-[90vw] w-auto"
                />
                <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/40 mt-4">
                    {photo.alt}
                </p>
            </motion.div>
        </motion.div>
    );
}

export default function PhotoGallery() {
    const router = useRouter();
    const [photos, setPhotos] = useState<PinterestPin[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [status, setStatus] = useState<"loading" | "loaded" | "error">(
        "loading"
    );

    // Fetch Pinterest photos via server action
    useEffect(() => {
        let cancelled = false;

        fetchPinterestPhotos().then((pins) => {
            if (cancelled) return;
            if (pins.length > 0) {
                setPhotos(pins);
                setStatus("loaded");
            } else {
                setStatus("error");
            }
        });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleImageLoad = useCallback((id: number) => {
        setLoadedImages((prev) => new Set(prev).add(id));
    }, []);

    const openLightbox = useCallback((index: number) => {
        playClickSound();
        setSelectedIndex(index);
    }, []);

    const closeLightbox = useCallback(() => setSelectedIndex(null), []);

    const goPrev = useCallback(() => {
        setSelectedIndex((prev) =>
            prev !== null
                ? (prev - 1 + photos.length) % photos.length
                : null
        );
    }, [photos.length]);

    const goNext = useCallback(() => {
        setSelectedIndex((prev) =>
            prev !== null ? (prev + 1) % photos.length : null
        );
    }, [photos.length]);

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

                {/* Loading State */}
                {status === "loading" && (
                    <motion.div
                        className="flex flex-col items-center justify-center py-20 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-[var(--color-accent)]"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                            Loading Pinterest board...
                        </p>
                    </motion.div>
                )}

                {/* Error State */}
                {status === "error" && (
                    <motion.div
                        className="flex flex-col items-center justify-center py-20 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                            Could not load photos
                        </p>
                        <a
                            href={PINTEREST_BOARD_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--color-accent)] text-[10px] uppercase tracking-[0.2em] font-bold transition-all group"
                        >
                            <span>VIEW ON PINTEREST DIRECTLY</span>
                            <span className="text-[var(--color-accent)] group-hover:translate-x-1 transition-transform">
                                &rarr;
                            </span>
                        </a>
                    </motion.div>
                )}

                {/* Masonry Gallery */}
                {status === "loaded" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.19, 1, 0.22, 1],
                        }}
                    >
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                            {photos.map((photo, index) => (
                                <motion.div
                                    key={photo.id}
                                    className="break-inside-avoid relative group cursor-pointer overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.05,
                                        ease: [0.19, 1, 0.22, 1],
                                    }}
                                    onClick={() => openLightbox(index)}
                                >
                                    {/* Skeleton loader */}
                                    {!loadedImages.has(photo.id) && (
                                        <div className="absolute inset-0 bg-white/5 animate-pulse min-h-[200px]" />
                                    )}

                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        className={`w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                                            loadedImages.has(photo.id)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                        loading={index < 6 ? "eager" : "lazy"}
                                        onLoad={() =>
                                            handleImageLoad(photo.id)
                                        }
                                    />

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                                        <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/80">
                                                {photo.alt}
                                            </p>
                                            <div className="w-8 h-px bg-[var(--color-accent)] mt-2" />
                                        </div>
                                    </div>

                                    {/* Index badge */}
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-[9px] font-bold text-white/60 bg-black/50 px-2 py-1">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Footer */}
                <motion.div
                    className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                        GALLERY
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

            {/* Lightbox */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <Lightbox
                        photo={photos[selectedIndex]}
                        onClose={closeLightbox}
                        onPrev={goPrev}
                        onNext={goNext}
                    />
                )}
            </AnimatePresence>

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
