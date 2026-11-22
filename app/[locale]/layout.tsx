import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import { ReduxProviders } from "@/providers/ReduxProvider";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";

const raleway = Raleway({
    variable: "--font-sans",
    subsets: ["latin"],
    display: "swap",
});

const banglaFont = localFont({
    src: [
        {
            path: "../../public/fonts/bangla/EkusheyLalsalu-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/bangla/EkusheyLalsalu-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-sans",
    display: "swap",
});

export const viewport: Viewport = {
    themeColor: "#073B35",
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: "FindBookStay — Buy, Rent, Book Hotels & Sports Turfs",
        template: "%s | FindBookStay",
    },
    description: "FindBookStay.com is an all-in-one marketplace for property buying, selling, house rentals, bachelor seat rentals, turf bookings, and hotel reservations.",
    keywords: ["property buy sell", "house rental", "bachelor seat rental", "turf booking", "hotel reservation", "apartments for rent", "FindBookStay"],
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/icon.png", type: "image/png", sizes: "512x512" },
            { url: "/favicon.svg", type: "image/svg+xml" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
        shortcut: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const locale = await getLocale();
    const messages = await getMessages();
    return (
        <html lang={locale} className={`${locale === "bn" ? banglaFont.variable : raleway.variable} font-sans h-full antialiased`} suppressHydrationWarning>
            <body className="min-h-full flex flex-col bg-background text-foreground" cz-shortcut-listen="true" data-new-gr-c-s-check-loaded="14.1349.0">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <ReduxProviders>{children}</ReduxProviders>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
