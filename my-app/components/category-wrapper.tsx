"use client";

import React from 'react';
import MusicPortfolio from "@/components/ui/music-portfolio";
import { useRouter } from 'next/navigation';
import { DitheringShader } from '@/components/ui/dithering-shader';
import {
    GLOBAL_CONFIG,
    GLOBAL_LOCATION,
    GLOBAL_SOCIAL_LINKS,
    ROOT_CATEGORIES,
    PROJECTS_DATA_DETAILED,
    EXPERIENCE_DATA,
    VIDEOS_DATA,
    LABS_DATA,
    STATS_DATA
} from '@/lib/data';

interface CategoryPageProps {
    category: "projects" | "experience" | "videos" | "labs" | "stats";
}

export default function CategoryPageWrapper({ category }: CategoryPageProps) {
    const router = useRouter();

    let data: any[] = [];
    let CustomBackground = <DitheringShader />;

    switch (category) {
        case "projects":
            data = PROJECTS_DATA_DETAILED;
            break;
        case "experience":
            data = EXPERIENCE_DATA;
            break;
        case "videos":
            data = VIDEOS_DATA;
            break;
        case "labs":
            data = LABS_DATA;
            break;
        case "stats":
            data = STATS_DATA;
            break;
        default:
            data = [];
    }

    // Add Back Button Logic
    const dataWithBack = [
        {
            id: "back",
            artist: "<- BACK",
            album: "RETURN",
            category: "",
            label: "",
            year: "",
            action: "/",
            image: ""
        },
        ...data
    ];

    const handleProjectClick = (item: any) => {
        if (item.action === "/" || item.id === "back") {
            router.push("/");
            return;
        }
        // Handle other clicks if necessary (external links?)
        if (item.link) {
            window.open(item.link, '_blank');
        }
    };

    const callbacks = {
        onProjectClick: handleProjectClick
    };

    return (
        <MusicPortfolio
            PROJECTS_DATA={dataWithBack}
            CONFIG={GLOBAL_CONFIG}
            SOCIAL_LINKS={GLOBAL_SOCIAL_LINKS}
            LOCATION={GLOBAL_LOCATION}
            CALLBACKS={callbacks}
            CustomBackground={CustomBackground}
        />
    );
}
