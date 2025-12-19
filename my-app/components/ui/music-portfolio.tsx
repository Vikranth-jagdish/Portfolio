"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

// Register GSAP plugin
try {
    gsap.registerPlugin(ScrambleTextPlugin);
} catch (e) {
    console.warn("ScrambleTextPlugin not found " + e);
}

// Time Display Component
const TimeDisplay = ({ CONFIG = {} }: any) => {
    const [time, setTime] = useState({ hours: '', minutes: '', dayPeriod: '' });

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let options: Intl.DateTimeFormatOptions = {
                hour12: true,
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            };
            if (CONFIG.timeZone) {
                try {
                    options.timeZone = CONFIG.timeZone;
                } catch (e) {
                    // fallback to local if invalid timezone
                }
            }

            const formatter = new Intl.DateTimeFormat("en-US", options);
            const parts = formatter.formatToParts(now);

            setTime({
                hours: parts.find(part => part.type === "hour")?.value || '',
                minutes: parts.find(part => part.type === "minute")?.value || '',
                dayPeriod: parts.find((part: any) => part.type === "dayPeriod")?.value || ''
            });
        };

        updateTime();
        const interval = setInterval(updateTime, CONFIG.timeUpdateInterval || 1000);
        return () => clearInterval(interval);
    }, [CONFIG.timeZone, CONFIG.timeUpdateInterval]);

    return (
        <time className="corner-item bottom-right fixed bottom-4 right-4 font-mono text-xs z-50 text-[var(--color-accent)]" id="current-time">
            {time.hours}<span className="time-blink animate-pulse">:</span>{time.minutes} {time.dayPeriod}
        </time>
    );
};

// Project Item Component
const ProjectItem = ({ project, index, onMouseEnter, onMouseLeave, isActive, isIdle }: any) => {
    const itemRef = useRef(null);
    const textRefs = {
        artist: useRef<HTMLElement>(null),
        album: useRef<HTMLElement>(null),
        category: useRef<HTMLElement>(null),
        label: useRef<HTMLElement>(null),
        year: useRef<HTMLElement>(null),
    };

    // Custom Scramble Animation Fallback
    const scramble = (ref: HTMLElement, targetText: string) => {
        const chars = "!<>-_\\/[]{}—=+*^?#________";
        let iteration = 0;
        const speed = 2; // Iterations per frame

        const interval = setInterval(() => {
            if (!ref) return;
            ref.innerText = targetText
                .split("")
                .map((char, index) => {
                    if (index < iteration / speed) {
                        return targetText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iteration >= targetText.length * speed) {
                clearInterval(interval);
                ref.innerText = targetText;
            }

            iteration++;
        }, 30);

        return interval;
    };

    // Custom Sound Effect
    const playHoverSound = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) { }
    };

    useEffect(() => {
        const intervals: any[] = [];
        if (isActive) {
            playHoverSound();
            Object.entries(textRefs).forEach(([key, ref]) => {
                if (ref.current) {
                    const originalText = project[key];
                    const interval = scramble(ref.current, originalText);
                    intervals.push(interval);
                }
            });
        } else {
            Object.entries(textRefs).forEach(([key, ref]) => {
                if (ref.current) {
                    ref.current.textContent = project[key];
                }
            });
        }

        return () => {
            intervals.forEach(clearInterval);
        };
    }, [isActive, project]);

    return (
        <li
            ref={itemRef}
            className={`project-item group relative flex items-center justify-between py-2 border-b border-white/10 cursor-pointer transition-all duration-300 ${isActive ? 'active opacity-100' : 'opacity-70'} ${isIdle ? 'idle' : ''} hover:opacity-100 hover:pl-4`}
            onMouseEnter={() => onMouseEnter(index, project.image)}
            onMouseLeave={onMouseLeave}
            data-image={project.image}
        >
            <span className="project-data artist hover-text w-1/4 truncate font-bold">
                <span ref={textRefs.artist}>{project.artist}</span>
            </span>
            <span className="project-data album hover-text w-1/4 truncate">
                <span ref={textRefs.album}>{project.album}</span>
            </span>
            <span className="project-data category hover-text w-1/6 hidden md:block">
                <span ref={textRefs.category}>{project.category}</span>
            </span>
            <span className="project-data label hover-text w-1/6 hidden md:block">
                <span ref={textRefs.label}>{project.label}</span>
            </span>
            <span className="project-data year hover-text w-1/12 text-right">
                <span ref={textRefs.year}>{project.year}</span>
            </span>
        </li>
    );
};

// Main Portfolio Component
const MusicPortfolio = ({ PROJECTS_DATA = [], LOCATION = {}, CALLBACKS = {}, CONFIG = {}, SOCIAL_LINKS = {}, CustomBackground }: any) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isIdle, setIsIdle] = useState(true);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoveringVideo, setHoveringVideo] = useState(false);

    const backgroundRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef(null);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const idleAnimationRef = useRef<any>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const projectItemsRef = useRef<any[]>([]);

    // Preload images
    useEffect(() => {
        PROJECTS_DATA.forEach((project: any) => {
            if (project.image) {
                const img = new Image();
                img.src = project.image;
            }
        });
    }, [PROJECTS_DATA]);

    // Handle idle animation and timers
    const stopIdleAnimation = useCallback(() => {
        if (idleAnimationRef.current) {
            idleAnimationRef.current.kill();
            idleAnimationRef.current = null;
            projectItemsRef.current.forEach(item => {
                if (item) gsap.set(item, { opacity: 1 });
            });
        }
    }, []);

    const startIdleAnimation = useCallback(() => {
        if (idleAnimationRef.current || activeVideo) return;
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        projectItemsRef.current.forEach((item, index) => {
            if (!item) return;
            const hideTime = index * 0.05;
            const showTime = (PROJECTS_DATA.length * 0.025) + index * 0.05;
            timeline.to(item, { opacity: 0.05, duration: 0.1 }, hideTime);
            timeline.to(item, { opacity: 1, duration: 0.1 }, showTime);
        });
        idleAnimationRef.current = timeline;
    }, [PROJECTS_DATA.length, activeVideo]);

    const startIdleTimer = useCallback(() => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
            if (activeIndex === -1 && !activeVideo) {
                setIsIdle(true);
                startIdleAnimation();
            }
        }, CONFIG.idleDelay || 4000);
    }, [activeIndex, activeVideo, startIdleAnimation, CONFIG.idleDelay]);

    const stopIdleTimer = useCallback(() => {
        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
            idleTimerRef.current = null;
        }
    }, []);

    const handleProjectMouseEnter = useCallback((index: number, imageUrl: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        const project = PROJECTS_DATA[index];
        stopIdleAnimation();
        stopIdleTimer();
        setIsIdle(false);

        if (activeIndex === index) return;
        setActiveIndex(index);
        setHoveringVideo(!!project?.videoSrc);

        // ONLY show hover image if it's NOT a video item
        if (!activeVideo && !project?.videoSrc && imageUrl && backgroundRef.current) {
            const bg = backgroundRef.current;
            bg.style.transition = "none";
            bg.style.backgroundImage = `url(${imageUrl})`;
            bg.style.opacity = "1";
            bg.style.transform = "translate(-50%, -50%) scale(1.1)";
            requestAnimationFrame(() => {
                bg.style.transition = "opacity 0.6s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                bg.style.transform = "translate(-50%, -50%) scale(1.0)";
            });
        }
    }, [activeIndex, activeVideo, PROJECTS_DATA, stopIdleAnimation, stopIdleTimer]);

    const handleProjectMouseLeave = useCallback(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            // Cleanup on item leave handled by handleContainerMouseLeave
        }, 50);
    }, []);

    const handleContainerMouseLeave = useCallback(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        setActiveIndex(-1);
        setHoveringVideo(false);
        if (backgroundRef.current) backgroundRef.current.style.opacity = "0";
        startIdleTimer();
    }, [startIdleTimer]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    }, []);

    useEffect(() => {
        if (!activeVideo) startIdleTimer();
        return () => {
            stopIdleTimer();
            stopIdleAnimation();
        };
    }, [startIdleTimer, stopIdleTimer, stopIdleAnimation, activeVideo]);

    const handleProjectClick = (project: any) => {
        if (project.videoSrc) {
            setActiveVideo(project.videoSrc);
            setActiveIndex(-1);
            stopIdleAnimation();
            stopIdleTimer();
            if (backgroundRef.current) backgroundRef.current.style.opacity = "0";
        } else if (CALLBACKS.onProjectClick) {
            CALLBACKS.onProjectClick(project);
        }
    };

    return (
        <>
            <div className="container relative w-full h-screen overflow-hidden bg-transparent text-white font-mono p-4">
                {activeVideo && (
                    <button
                        onClick={() => setActiveVideo(null)}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-bold backdrop-blur-md transition-all animate-fade-in"
                    >
                        [ CLOSE VIDEO ]
                    </button>
                )}

                <main
                    ref={containerRef}
                    className={`portfolio-container relative z-40 w-full max-w-6xl mx-auto top-1/2 transform -translate-y-1/2 transition-all duration-700 ${activeIndex !== -1 || activeVideo ? 'has-active' : ''} ${activeVideo ? 'opacity-20 pointer-events-none scale-95 blur-sm' : 'opacity-100'}`}
                    onMouseLeave={handleContainerMouseLeave}
                    onMouseMove={handleMouseMove}
                >
                    <h1 className="sr-only">Vikranth Jagdish Portfolio</h1>
                    <ul className="project-list flex flex-col gap-1" role="list">
                        {PROJECTS_DATA.map((project: any, index: number) => (
                            <div key={project.id || index} onClick={() => handleProjectClick(project)}>
                                <ProjectItem
                                    project={project}
                                    index={index}
                                    onMouseEnter={handleProjectMouseEnter}
                                    onMouseLeave={handleProjectMouseLeave}
                                    isActive={activeIndex === index}
                                    isIdle={isIdle}
                                    ref={(el: any) => projectItemsRef.current[index] = el}
                                />
                            </div>
                        ))}
                    </ul>
                </main>

                <div className={`fixed inset-0 z-0 bg-black transition-opacity duration-1000 ${activeVideo ? 'opacity-100 shadow-[inset_0_0_200px_rgba(0,0,0,1)]' : 'opacity-0 pointer-events-none'}`}>
                    {activeVideo && (
                        <video
                            ref={videoRef}
                            src={activeVideo}
                            autoPlay
                            loop
                            playsInline
                            className="w-full h-full object-cover mix-blend-screen opacity-80"
                        />
                    )}
                </div>

                {CustomBackground && (
                    <div className={`fixed inset-0 pointer-events-none -z-10 transition-opacity duration-1000 ${activeIndex === -1 && !activeVideo ? 'opacity-100' : 'opacity-0'}`}>
                        {CustomBackground}
                    </div>
                )}

                <div
                    ref={backgroundRef}
                    className="background-image pointer-events-none fixed inset-0 -z-0 opacity-0 bg-cover bg-center object-cover mix-blend-screen transition-opacity duration-1000 ease-in-out"
                    id="backgroundImage"
                    role="img"
                    aria-hidden="true"
                />

                <aside className="corner-elements fixed inset-0 pointer-events-none p-6">
                    <div className="corner-item top-left fixed top-4 left-4 z-50">
                        <div className="corner-square w-3 h-3 bg-[var(--color-accent)]" aria-hidden="true"></div>
                        <p className="mt-2 text-xs text-[var(--color-accent)] font-bold">VIKRANTH JAGDISH</p>
                    </div>
                    <nav className="corner-item top-right fixed top-4 right-4 z-50 pointer-events-auto text-xs flex gap-3 text-[var(--color-accent)] uppercase">
                        {SOCIAL_LINKS.linkedin && (
                            <><a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a> |</>
                        )}
                        {SOCIAL_LINKS.email && (
                            <><a href={SOCIAL_LINKS.email} className="hover:underline">Email</a> |</>
                        )}
                        {SOCIAL_LINKS.instagram && (
                            <><a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a> |</>
                        )}
                        {SOCIAL_LINKS.x && (
                            <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" className="hover:underline">X</a>
                        )}
                    </nav>
                    <div className="corner-item bottom-left fixed bottom-4 left-4 z-50 text-xs text-[var(--color-accent)] font-mono">
                        CHENNAI, INDIA
                    </div>
                    <TimeDisplay CONFIG={CONFIG} />
                </aside>

                {/* Mouse Follower Tooltip */}
                {hoveringVideo && !activeVideo && (
                    <div
                        className="fixed z-[100] pointer-events-none flex flex-col items-center justify-center transition-transform duration-75 ease-out mix-blend-difference"
                        style={{
                            left: mousePos.x,
                            top: mousePos.y,
                            transform: 'translate(-50%, -150%)'
                        }}
                    >
                        <div className="bg-[var(--color-accent)] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] shadow-lg whitespace-nowrap border border-black/20">
                            CLICK TO PLAY
                        </div>
                        <div className="w-px h-8 bg-[var(--color-accent)] mt-1 opacity-50"></div>
                    </div>
                )}

                <style jsx>{`
                `}</style>
            </div>
        </>
    );
};

export default MusicPortfolio;
