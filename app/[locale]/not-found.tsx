import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "@/components/Icons";

const NotFound = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-between p-6 sm:p-10 bg-background text-foreground relative overflow-hidden select-none">
            {/* Top Brand Logo */}
            <div className="w-full flex justify-center pt-2 z-10">
                <Link href="/" className="cursor-pointer transition-transform duration-200 hover:opacity-90">
                    <Image src="/findbookstay-logo.png" alt="FindBookStay" width={180} height={52} priority className="h-9 sm:h-10 w-auto object-contain dark:brightness-0 dark:invert" />
                </Link>
            </div>

            {/* Center Content: Simple, Beautiful, Glowing, No Card */}
            <main className="relative flex flex-col items-center justify-center text-center max-w-lg z-10 my-auto py-8">
                {/* Ethereal Glowing Ambient Light */}
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-120 h-80 sm:h-120 bg-linear-to-tr from-emerald-500/20 via-teal-500/15 to-primary/20 rounded-full blur-[90px] -z-10" />

                {/* Glowing 404 Number */}
                <h1
                    className="font-black text-8xl sm:text-9xl md:text-[150px] tracking-tight leading-none bg-linear-to-b from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent"
                    style={{
                        filter: "drop-shadow(0 0 35px rgba(16, 185, 129, 0.4))",
                    }}
                >
                    404
                </h1>

                {/* Clear Headline & Subtitle */}
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-4 tracking-tight">Page Not Found</h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs sm:max-w-sm leading-relaxed">The page you are looking for doesn’t exist or has been moved.</p>

                {/* Glowing Action Button */}
                <div className="mt-8">
                    <Link
                        href="/"
                        className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-primary-foreground bg-primary hover:bg-primary-hover shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <ArrowLeft className="size-4" />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </main>

            {/* Bottom Subtle Footer */}
            <div className="w-full text-center pb-2 z-10">
                <p className="text-xs text-muted-foreground/60 font-medium">&copy; 2026 FindBookStay.com &middot; All rights reserved.</p>
            </div>
        </div>
    );
};

export default NotFound;
