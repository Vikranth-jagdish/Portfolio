"use client"

import { motion } from "framer-motion";
import SpotifyCard from "./ui/spotify-card";

export function GlobalSpotifyCard() {
    return (
        <motion.div
            drag
            dragMomentum={false}
            whileHover={{ scale: 0.8 }}
            whileTap={{ scale: 0.75, cursor: "grabbing" }}
            initial={{ scale: 0.75 }}
            className="fixed top-20 right-5 z-[100] cursor-grab hidden lg:block select-none"
            style={{
                touchAction: "none",
                transformOrigin: "top right"
            }}
        >
            <SpotifyCard />
        </motion.div>
    );
}
