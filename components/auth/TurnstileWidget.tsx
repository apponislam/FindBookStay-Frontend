"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface TurnstileWidgetProps {
    onVerify?: (token: string) => void;
    onError?: (error: unknown) => void;
    onExpire?: () => void;
    siteKey?: string;
    theme?: "light" | "dark" | "auto";
    className?: string;
}

declare global {
    interface Window {
        turnstile?: {
            render: (
                container: string | HTMLElement,
                options: {
                    sitekey: string;
                    callback?: (token: string) => void;
                    "error-callback"?: (error: unknown) => void;
                    "expired-callback"?: () => void;
                    theme?: "light" | "dark" | "auto";
                    size?: "normal" | "flexible" | "compact";
                }
            ) => string;
            reset: (widgetId: string) => void;
            remove: (widgetId: string) => void;
        };
    }
}

// Cloudflare official demo sitekey that always passes in development
const DEFAULT_SITE_KEY = "1x00000000000000000000AA";

export const TurnstileWidget = ({
    onVerify,
    onError,
    onExpire,
    siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || DEFAULT_SITE_KEY,
    theme = "auto",
    className = "",
}: TurnstileWidgetProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [scriptLoaded, setScriptLoaded] = useState(() => {
        return typeof window !== "undefined" && Boolean(window.turnstile);
    });

    useEffect(() => {
        if (!scriptLoaded || !containerRef.current || !window.turnstile) return;

        // Clean up previous widget if any
        if (widgetIdRef.current) {
            try {
                window.turnstile.remove(widgetIdRef.current);
            } catch {
                // ignore cleanup errors
            }
        }

        try {
            widgetIdRef.current = window.turnstile.render(containerRef.current, {
                sitekey: siteKey,
                theme: theme,
                size: "flexible",
                callback: (token: string) => {
                    if (onVerify) onVerify(token);
                },
                "error-callback": (err: unknown) => {
                    if (onError) onError(err);
                },
                "expired-callback": () => {
                    if (onExpire) onExpire();
                },
            });
        } catch {
            // Error rendering widget
        }

        return () => {
            if (widgetIdRef.current && window.turnstile) {
                try {
                    window.turnstile.remove(widgetIdRef.current);
                } catch {
                    // ignore
                }
            }
        };
    }, [scriptLoaded, siteKey, theme, onVerify, onError, onExpire]);

    return (
        <div className={`w-full min-h-16.25 ${className}`}>
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={() => setScriptLoaded(true)} />
            <div ref={containerRef} className="w-full flex items-center justify-start rounded-xl" />
        </div>
    );
};

export default TurnstileWidget;
