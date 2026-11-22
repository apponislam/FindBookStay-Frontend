"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Suppress React 19 false-positive development warning for next-themes script tag
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
        const fullMessage = args
            .map((arg) => (typeof arg === "string" ? arg : arg instanceof Error ? arg.message : ""))
            .join(" ");

        if (
            fullMessage.includes("Encountered a script tag") ||
            fullMessage.includes("Scripts inside React components are never executed")
        ) {
            return;
        }
        originalConsoleError.apply(console, args);
    };
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default ThemeProvider;
