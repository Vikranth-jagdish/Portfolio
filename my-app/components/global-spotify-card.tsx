"use client"

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import SpotifyCard from "./ui/spotify-card";

export function GlobalSpotifyCard() {
    const pathname = usePathname();

    // Hide on all blog pages
    if (pathname.startsWith("/blogs/")) return null;

    return (
        <motion.div
            drag
            dragMomentum={false}
            whileHover={{ scale: 0.65 }}
            whileTap={{ scale: 0.55, cursor: "grabbing" }}
            initial={{ scale: 0.6 }}
            className="fixed top-24 right-5 z-[100] cursor-grab select-none"
            style={{
                touchAction: "none",
                transformOrigin: "top right"
            }}
        >
            <SpotifyCard />
        </motion.div>
    );
}
