import { createNavigation } from "next-intl/navigation";

export const locales = ["bn", "en"] as const;
export type Locale = (typeof locales)[number];

export const { Link, usePathname, useRouter, redirect, permanentRedirect } = createNavigation({
    locales,
    defaultLocale: "bn",
});
