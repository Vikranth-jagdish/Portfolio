import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Data Exports
export const ROOT_CATEGORIES = [
    {
        id: "projects",
        artist: "PROJECTS",
        album: "THE WORK",
        category: "SELECT WORKS",
        label: "2024",
        year: "->",
        image: "",
        action: "/projects"
    },
    {
        id: "experience",
        artist: "EXPERIENCE",
        album: "THE JOURNEY",
        category: "CAREER",
        label: "2020-24",
        year: "->",
        image: "",
        action: "/experience"
    },
    {
        id: "videos",
        artist: "VIDEOS",
        album: "VISUALS",
        category: "MEDIA",
        label: "YOUTUBE",
        year: "->",
        image: "",
        action: "/videos"
    },
    {
        id: "labs",
        artist: "LABS",
        album: "EXPERIMENTS",
        category: "R&D",
        label: "CODE",
        year: "->",
        image: "",
        action: "/labs"
    },
    {
        id: "stats",
        artist: "STATS",
        album: "METRICS",
        category: "DATA",
        label: "LIVE",
        year: "->",
        image: "",
        action: "/stats"
    }
];

export const PROJECTS_DATA_DETAILED = [
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

export const EXPERIENCE_DATA = [
    {
        id: 1,
        artist: "SOFTWARE ENGINEER",
        album: "HEALTHPILOT.AI",
        category: "FULL-TIME",
        label: "REMOTE",
        year: "2025-PRES",
        description: "Building HealthPilot—an AI-native platform for obesity physicians to track patients and personalize weight-loss journeys. Specialized in SNOMED and FHIR healthcare standards.",
        image: "https://images.unsplash.com/photo-1576091160550-217359f4ebf4?q=80&w=2670&auto=format&fit=crop",
        link: "https://healthpilot.ai"
    },
    {
        id: 2,
        artist: "AI SOFTWARE DEV",
        album: "BOTCODE TECHNOLOGIES",
        category: "FULL-TIME",
        label: "ON-SITE",
        year: "2025-PRES",
        description: "Developing autonomous, agentic AI tools for advanced healthcare systems using FastAPI and DevOps practices.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
        link: "https://botcode.com"
    },
    {
        id: 3,
        artist: "VICE PRESIDENT",
        album: "DAO COMMUNITY VIT",
        category: "LEADERSHIP",
        label: "VITC",
        year: "2023-PRES",
        description: "Overseeing department operations and strategy as Vice President. Previously led Web Development and Content divisions, scaling the community's digital presence.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format&fit=crop",
        link: "https://daocommunity.in"
    },
    {
        id: 4,
        artist: "STRATEGY LEAD",
        album: "V-NEST",
        category: "STARTUP INC",
        label: "VITC",
        year: "2025-PRES",
        description: "Leading Strategy and Brand Management for VIT Chennai's startup incubator, supporting early-stage ventures.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop",
        link: "https://vnest.org"
    },
    {
        id: 5,
        artist: "AI DEVELOPER",
        album: "THINKROOT",
        category: "INTERNSHIP",
        label: "REMOTE",
        year: "2025",
        description: "Designed and built an agentic AI astrology engine for personalized predictions, integrating Telegram and WhatsApp APIs.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
        link: "https://thinkroot.in"
    }
];

export const VIDEOS_DATA = [
    { id: 1, artist: "DEV VLOG 01", album: "SETUP", category: "YOUTUBE", label: "HD", year: "2024", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop" },
    { id: 2, artist: "TUTORIAL", album: "REACT GSAP", category: "GUIDE", label: "4K", year: "2023", image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2574&auto=format&fit=crop" }
];

export const LABS_DATA = [
    { id: 1, artist: "SHADER 01", album: "WEBGL", category: "THREE.JS", label: "EXP", year: "2024", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
    { id: 2, artist: "PARTICLES", album: "CANVAS", category: "PHYSICS", label: "TEST", year: "2023", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" }
];

export const STATS_DATA = [
    { id: 1, artist: "GITHUB", album: "COMMITS", category: "CODE", label: "ACTIVE", year: "STATS", image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2688&auto=format&fit=crop" },
    { id: 2, artist: "MONKEYTYPE", album: "SPEED", category: "WPM", label: "FAST", year: "STATS", image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2574&auto=format&fit=crop" },
    { id: 3, artist: "SPOTIFY", album: "TOP ARTISTS", category: "MUSIC", label: "VIBE", year: "STATS", image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop" }
];

export const GLOBAL_CONFIG = {
    timeZone: "Asia/Kolkata",
    timeUpdateInterval: 1000,
    idleDelay: 4000,
    debounceDelay: 100
};

export const GLOBAL_SOCIAL_LINKS = {
    linkedin: "https://www.linkedin.com/in/vikranth-jagdish-b37798126/",
    instagram: "https://www.instagram.com/vikranth_jagdish/",
    email: "mailto:vicky@botcode.com",
    x: "https://x.com/vikranth_j"
};

export const GLOBAL_LOCATION = {
    display: true
};
