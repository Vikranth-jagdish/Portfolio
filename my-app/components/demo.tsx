"use client";
import React, { useState } from 'react';
import MusicPortfolio from "@/components/ui/music-portfolio";
import { DitheringShader } from "@/components/ui/dithering-shader";

// Data for different sections
const ROOT_CATEGORIES = [
    {
        id: "projects",
        artist: "PROJECTS",
        album: "THE WORK",
        category: "SELECT WORKS",
        label: "2024",
        year: "->",
        image: "", // No image for root categories to keep Dithering visible, or use subtle abstract
        action: "projects"
    },
    {
        id: "experience",
        artist: "EXPERIENCE",
        album: "THE JOURNEY",
        category: "CAREER",
        label: "2020-24",
        year: "->",
        image: "",
        action: "experience"
    },
    {
        id: "videos",
        artist: "VIDEOS",
        album: "VISUALS",
        category: "MEDIA",
        label: "YOUTUBE",
        year: "->",
        image: "",
        action: "videos"
    },
    {
        id: "labs",
        artist: "LABS",
        album: "EXPERIMENTS",
        category: "R&D",
        label: "CODE",
        year: "->",
        image: "",
        action: "labs"
    },
    {
        id: "stats",
        artist: "STATS",
        album: "METRICS",
        category: "DATA",
        label: "LIVE",
        year: "->",
        image: "",
        action: "stats"
    }
];

const PROJECTS_DATA_DETAILED = [
    {
        id: 1,
        artist: "E-COMMERCE",
        album: "FULL STACK",
        category: "NEXT.JS",
        label: "LIVE",
        year: "2024",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop"
    },
    {
        id: 2,
        artist: "AI ANALYTICS",
        album: "DASHBOARD",
        category: "REACT",
        label: "BETA",
        year: "2024",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 3,
        artist: "FINANCE APP",
        album: "MOBILE",
        category: "REACT NATIVE",
        label: "APP STORE",
        year: "2023",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2671&auto=format&fit=crop"
    }
];

const EXPERIENCE_DATA = [
    {
        id: 1,
        artist: "SENIOR DEV",
        album: "TECH CORP",
        category: "FULLTIME",
        label: "US",
        year: "2022-24",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 2,
        artist: "WEB LEAD",
        album: "STARTUP INC",
        category: "CONTRACT",
        label: "REMOTE",
        year: "2021-22",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"
    }
];

const VIDEOS_DATA = [
    { id: 1, artist: "DEV VLOG 01", album: "SETUP", category: "YOUTUBE", label: "HD", year: "2024", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop" },
    { id: 2, artist: "TUTORIAL", album: "REACT GSAP", category: "GUIDE", label: "4K", year: "2023", image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2574&auto=format&fit=crop" }
];

const LABS_DATA = [
    { id: 1, artist: "SHADER 01", album: "WEBGL", category: "THREE.JS", label: "EXP", year: "2024", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
    { id: 2, artist: "PARTICLES", album: "CANVAS", category: "PHYSICS", label: "TEST", year: "2023", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" }
];

const STATS_DATA = [
    { id: 1, artist: "GITHUB", album: "COMMITS", category: "CODE", label: "ACTIVE", year: "STATS", image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2688&auto=format&fit=crop" },
    { id: 2, artist: "MONKEYTYPE", album: "SPEED", category: "WPM", label: "FAST", year: "STATS", image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2574&auto=format&fit=crop" },
    { id: 3, artist: "SPOTIFY", album: "TOP ARTISTS", category: "MUSIC", label: "VIBE", year: "STATS", image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop" }
];

export default function DemoPortfolio() {
    const [currentView, setCurrentView] = useState("root"); // root, projects, experience, videos, labs, stats

    const getActiveData = () => {
        switch (currentView) {
            case "projects": return PROJECTS_DATA_DETAILED;
            case "experience": return EXPERIENCE_DATA;
            case "videos": return VIDEOS_DATA;
            case "labs": return LABS_DATA;
            case "stats": return STATS_DATA;
            default: return ROOT_CATEGORIES;
        }
    };

    const handleNavigation = (item: any) => {
        if (currentView === "root" && item.action) {
            setCurrentView(item.action);
        } else if (currentView !== "root") {
            // If clicking an item in detail view, maybe go to link? 
            // For now, let's keep it simple.
        }
    };

    // Callback to handle Back navigation could be added to corner elements in future
    // For now, clicking the logo/name resets to root?
    // Let's add that logic if I can update the component, but I can't easily modify the internal logic of MusicPortfolio from here 
    // without passing a specific "onLogoClick" which isn't in my prop interface I just made.
    // Wait, I can pass a "Back" item or similar.
    // Or users can just reload.
    // Actually, I'll add a "Back" item to the top of sub-lists?

    // Better: Add a "Back ->" item at the end of lists?
    const dataWithBack = currentView === "root" ? ROOT_CATEGORIES : [
        { id: "back", artist: "<- BACK", album: "RETURN", category: "", label: "", year: "", action: "back", image: "" },
        ...getActiveData()
    ];

    const handleProjectClick = (item: any) => {
        if (item.action === "back") {
            setCurrentView("root");
            return;
        }
        handleNavigation(item);
    };

    const config = {
        timeZone: "Asia/Kolkata",
        timeUpdateInterval: 1000,
        idleDelay: 4000,
        debounceDelay: 100
    };

    const socialLinks = {
        linkedin: "https://www.linkedin.com/in/vikranth-jagdish",
        email: "mailto:contact@vikranth.dev",
        x: "https://x.com/vikranth_j"
    };

    const location = {
        display: true
    };

    const callbacks = {
        onProjectHover: (project: any) => {
            // Optional: Change shader params on hover?
        },
        onProjectClick: (project: any) => handleProjectClick(project)
    };

    return (
        <MusicPortfolio
            PROJECTS_DATA={dataWithBack}
            CONFIG={config}
            SOCIAL_LINKS={socialLinks}
            LOCATION={location}
            CALLBACKS={callbacks}
            CustomBackground={
                <DitheringShader
                    shape="swirl"
                    type="4x4"
                    colorBack="#000000"
                    colorFront="#222222" // Subtle grey for background
                    pxSize={4}
                    speed={0.2} // Slow ambient movement
                    className="w-full h-full"
                />
            }
        />
    );
}
