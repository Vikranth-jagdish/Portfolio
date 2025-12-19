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
        artist: "HEALTHPILOT.AI",
        album: "AI-NATIVE PLATFORM",
        category: "NEXT.JS",
        label: "LIVE",
        year: "2025",
        image: "https://images.unsplash.com/photo-1576091160550-217359f4ebf4?q=80&w=2670&auto=format&fit=crop",
        link: "https://healthpilot.ai",
        techLogos: [
            "https://cdn.worldvectorlogo.com/logos/next-js.svg",
            "https://cdn.worldvectorlogo.com/logos/typescript.svg",
            "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
            "https://cdn.worldvectorlogo.com/logos/supabase.svg"
        ],
        description: "An AI-native platform designed specifically for obesity physicians to monitor patient progress and personalize weight-loss journeys with surgical precision. It handles complex medical datasets, treatment protocols, and real-time biometric monitoring.\n\nKey achievements:\n- Orchestrated a medical-grade data pipeline for real-time patient tracking.\n- Integrated AI-driven analytics to predict treatment outcomes.\n- Built a high-security environment for healthcare data management using Clerk and Supabase.\n\nTech Stack Overview:\n⚛️ Next.js (App Router) for high-performance frontend architecture.\n📘 TypeScript for robust, type-safe development.\n🎨 Tailwind CSS for a sleek, medical-grade UI.\n🛡️ Clerk Authentication for secure physician portals.\n🗄️ Supabase (PostgreSQL) for scalable backend infrastructure."
    },
    {
        id: 2,
        artist: "AGENTIC GRAPH RAG",
        album: "ICMR DOCUMENTS",
        category: "AGENTIC AI",
        label: "R&D",
        year: "2024",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        techLogos: [
            "https://cdn.worldvectorlogo.com/logos/python-5.svg",
            "https://cdn.worldvectorlogo.com/logos/fastapi-1.svg",
            "https://cdn.worldvectorlogo.com/logos/neo4j.svg",
            "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
            "https://cdn.worldvectorlogo.com/logos/openai-2.svg"
        ],
        description: "Medical Knowledge Graph RAG - Clinical Decision Support System. An advanced AI-powered clinical system that combines traditional RAG with knowledge graph capabilities to provide evidence-based differential diagnosis and treatment planning based on ICMR guidelines.\n\nSystem Capabilities:\n- Document Ingestion Pipeline: Processes ICMR medical guidelines with semantic chunking and medical entity extraction.\n- Knowledge Graph Architecture: Built using Neo4j and Graphiti to map temporal connections between conditions, medications, and protocols.\n- AI Clinical Agent: A Pydantic AI-powered conversational agent capable of cross-referencing vector databases and knowledge graphs.\n\nTech Stack:\n🐍 Python 3.11+\n🤖 Pydantic AI (Agent Framework)\n⚙️ FastAPI (Streaming API)\n🔗 Neo4j & Graphiti (Temporal Knowledge Graph)\n🐘 PostgreSQL & PGVector (Vector Database)\n⚡ GPT-4 / Gemini / Ollama"
    },
    {
        id: 3,
        artist: "CODECHEF CLONE",
        album: "WEBSITE CLONE",
        category: "REACT",
        label: "STUDY",
        year: "2024",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop",
        techLogos: [
            "https://cdn.worldvectorlogo.com/logos/react-2.svg",
            "https://cdn.worldvectorlogo.com/logos/typescript.svg",
            "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
            "https://cdn.worldvectorlogo.com/logos/framer-motion.svg"
        ],
        description: "A high-fidelity clone of the Codechef competitive programming platform. This project serves as a deep dive into complex UI components and high-performance real-time data handling.\n\nFeatures:\n- Real-time Leaderboards: Synchronized competitive programming rankings.\n- Problem Editor: A sophisticated code editor environment for practice.\n- Responsive Architecture: Optimized for all devices to ensure a seamless coding experience.\n\nTech Stack:\n⚛️ React.js (Component Architecture)\n📘 TypeScript (Type Safety)\n💨 Tailwind CSS (Styling)\n⚡ Framer Motion (Micro-interactions)\n🧩 Custom UI Library tailored for high-density information display."
    },
    {
        id: 4,
        artist: "VOICE AGENT",
        album: "LIVEKIT AI",
        category: "HEALTHCARE",
        label: "NEW",
        year: "2024",
        image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2670&auto=format&fit=crop",
        techLogos: [
            "https://cdn.worldvectorlogo.com/logos/python-5.svg",
            "https://cdn.worldvectorlogo.com/logos/openai-2.svg",
            "https://cdn.worldvectorlogo.com/logos/fastapi-1.svg",
            "https://cdn.worldvectorlogo.com/logos/livekit.svg"
        ],
        description: "A voice-activated AI agent built with LiveKit that interactively asks patients questions during website visits and securely relays answers to healthcare providers. It streamlines the intake process and optimizes physician time.\n\nKey Components:\n- Real-time Voice Streaming: Low-latency communication using LiveKit Cloud.\n- AI Patient Assessment: Natural language understanding using GPT-4.\n- Healthcare Provider Dashboard: Securely relayed data for immediate physician review.\n\nTech Stack:\n🐍 Python (Backend Logic)\n🎙️ LiveKit AI (Voice Streaming & WebRTC)\n🤖 OpenAI GPT-4 / Gemini (Conversation Engine)\n⚙️ FastAPI (Asynchronous Data Handling)\n🐳 Docker (Deployment Strategy)"
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
    {
        id: 1,
        artist: "FE!N",
        album: "VALORANT EDIT",
        category: "LOCAL",
        label: "4K",
        year: "2024",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
        videoSrc: "/videos/FE!N (VALORANT EDIT)_1 logo edning.mp4"
    },
    {
        id: 2,
        artist: "TUTORIAL",
        album: "REACT GSAP",
        category: "GUIDE",
        label: "4K",
        year: "2023",
        image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2574&auto=format&fit=crop",
        videoSrc: "/videos/FE!N (VALORANT EDIT)_1 logo edning.mp4"
    }
];

export const LABS_DATA = [
    {
        id: 1,
        artist: "N8N",
        album: "AUTOMATION",
        category: "WORKFLOW",
        label: "SELF-HOSTED",
        year: "2024",
        image: "https://images.unsplash.com/photo-1518433278981-16773f84841d?q=80&w=2564&auto=format&fit=crop",
        link: "https://n8n.vikranth.space"
    },
    {
        id: 2,
        artist: "SUPABASE",
        album: "BACKEND",
        category: "DATABASE",
        label: "CLOUD",
        year: "2024",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
        link: "https://supabase.vikranth.space"
    }
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
