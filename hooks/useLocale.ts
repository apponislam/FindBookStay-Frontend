"use client";

import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/navigation";

// Helper function to get locale from pathname
export const getLocaleFromPath = (pathname: string): Locale => {
    if (!pathname) return "bn";
    const pathSegments = pathname.split("/");
    const firstSegment = pathSegments[1];
    if (locales.includes(firstSegment as Locale)) {
        return firstSegment as Locale;
    }
    return "bn";
};

// Helper function to prepend locale to path
export const getPathWithLocale = (path: string, locale: string): string => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${cleanPath}`;
};

export function useLocale() {
    const pathname = usePathname() || "";
    const locale = getLocaleFromPath(pathname);

    const getPath = (path: string) => getPathWithLocale(path, locale);

    return {
        locale,
        isBn: locale === "bn",
        getPath,
        getPathWithLocale: (path: string, targetLocale: string) => getPathWithLocale(path, targetLocale),
    };
}

export default useLocale;
