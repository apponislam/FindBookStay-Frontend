"use client";

import * as React from "react";
import { Moon, Sun } from "@/components/Icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

export function ModeToggle({ className }: { className?: string }) {
    const { setTheme, resolvedTheme } = useTheme();
    const mounted = React.useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    const isDark = mounted && resolvedTheme === "dark";

    const handleToggle = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleToggle}
            className={`relative rounded-xl cursor-pointer transition-colors ${className ?? ""}`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <Sun className={`h-[1.15rem] w-[1.15rem] transition-all duration-300 ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
            <Moon className={`absolute h-[1.15rem] w-[1.15rem] transition-all duration-300 ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
