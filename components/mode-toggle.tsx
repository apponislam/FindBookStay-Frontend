"use client";

import * as React from "react";
import { Moon, Sun } from "@/components/Icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const emptySubscribe = () => () => {};

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const mounted = React.useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="outline" size="icon">
                        {mounted && resolvedTheme === "dark" ? (
                            <Moon className="h-[1.2rem] w-[1.2rem]" />
                        ) : (
                            <Sun className="h-[1.2rem] w-[1.2rem]" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                }
            />
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
