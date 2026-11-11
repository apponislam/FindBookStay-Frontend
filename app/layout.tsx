import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-sans",
  subsets: ["latin"],
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
  description:
    "FindBookStay.com is an all-in-one marketplace for property buying, selling, house rentals, bachelor seat rentals, turf bookings, and hotel reservations.",
  keywords: [
    "property buy sell",
    "house rental",
    "bachelor seat rental",
    "turf booking",
    "hotel reservation",
    "apartments for rent",
    "FindBookStay",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html
      lang="en"
      className={`${raleway.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#172B2A]">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
