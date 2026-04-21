"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function LinkedInBadge() {
    const [expanded, setExpanded] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        if (expanded && scriptLoaded && typeof window !== "undefined") {
            const w = window as any;
            if (w.LIRenderAll) {
                w.LIRenderAll();
            }
        }
    }, [expanded, scriptLoaded]);

    return (
        <>
            <div className="fixed bottom-12 left-4 z-50 pointer-events-auto flex flex-col items-start gap-2">
                {expanded && (
                    <div>
                        <div
                            className="badge-base LI-profile-badge"
                            data-locale="en_US"
                            data-size="medium"
                            data-theme="dark"
                            data-type="VERTICAL"
                            data-vanity="vikranthjagdish"
                            data-version="v1"
                        >
                            <a
                                className="badge-base__link LI-simple-link"
                                href="https://in.linkedin.com/in/vikranthjagdish?trk=profile-badge"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Vikranth Jagdish
                            </a>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="text-xs text-[var(--color-accent)] font-mono uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                    [ {expanded ? "HIDE" : "SHOW"} LINKEDIN ]
                </button>
            </div>
            <Script
                src="https://platform.linkedin.com/badges/js/profile.js"
                strategy="afterInteractive"
                onLoad={() => setScriptLoaded(true)}
                async
                defer
            />
        </>
    );
}
