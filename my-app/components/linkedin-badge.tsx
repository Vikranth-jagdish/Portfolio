"use client";

import Script from "next/script";

export default function LinkedInBadge() {
    return (
        <div className="fixed bottom-12 left-4 z-50 pointer-events-auto">
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
            <Script
                src="https://platform.linkedin.com/badges/js/profile.js"
                strategy="afterInteractive"
                async
                defer
            />
        </div>
    );
}
