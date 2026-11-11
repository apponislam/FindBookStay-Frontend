import React from "react";
import {
  Home,
  Building2,
  Building,
  Warehouse,
  MapPin,
  Sparkles,
  BedDouble,
  Users,
  CalendarDays,
  Briefcase,
  Hotel,
  Palmtree,
  Coffee,
  Tent,
  Compass,
  Crown,
  Trophy,
  Shield,
  Dumbbell,
  Activity,
  Award,
  Star,
  Heart,
  Clock,
  ShieldCheck,
  Info,
} from "@/components/Icons";

export interface SubItem {
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
}

export interface CategoryMenu {
  id: string;
  label: string;
  href: string;
  items: SubItem[];
}

export const CATEGORIES: CategoryMenu[] = [
  {
    id: "buy",
    label: "Buy",
    href: "/buy",
    items: [
      {
        name: "Residential Properties",
        desc: "Flats, townhouses & homes in prime neighborhoods",
        icon: Home,
        href: "/buy/residential",
      },
      {
        name: "Commercial Properties",
        desc: "Offices, retail spaces, plazas & commercial plots",
        icon: Building2,
        href: "/buy/commercial",
      },
      {
        name: "Apartments & Flats",
        desc: "Modern luxury high-rise units & cozy apartments",
        icon: Building,
        href: "/buy/apartments",
      },
      {
        name: "Houses & Villas",
        desc: "Independent duplexes, standalone homes & villas",
        icon: Warehouse,
        href: "/buy/houses",
      },
      {
        name: "Land & Plots",
        desc: "Verified residential, commercial & farmland plots",
        icon: MapPin,
        href: "/buy/land",
      },
      {
        name: "New Developments",
        desc: "Pre-launch gated communities & off-plan deals",
        icon: Sparkles,
        href: "/buy/new-developments",
        badge: "New",
      },
    ],
  },
  {
    id: "rent",
    label: "Rent",
    href: "/rent",
    items: [
      {
        name: "Family Apartments",
        desc: "2 to 4-bedroom rental flats in secure areas",
        icon: Home,
        href: "/rent/family-apartments",
      },
      {
        name: "Family Houses",
        desc: "Full independent duplexes, villas & standalone homes",
        icon: Building2,
        href: "/rent/family-houses",
      },
      {
        name: "Bachelor Seats",
        desc: "Single & shared seats with WiFi, food & utilities",
        icon: BedDouble,
        href: "/rent/bachelor-seats",
        badge: "Popular",
      },
      {
        name: "Shared Rooms",
        desc: "Budget-friendly shared spaces with verified flatmates",
        icon: Users,
        href: "/rent/shared-rooms",
      },
      {
        name: "Monthly Sublets",
        desc: "Furnished short and medium term monthly leases",
        icon: CalendarDays,
        href: "/rent/sublets",
      },
      {
        name: "Commercial Rentals",
        desc: "Corporate office spaces, showrooms & storefronts",
        icon: Briefcase,
        href: "/rent/commercial",
      },
    ],
  },
  {
    id: "book",
    label: "Book",
    href: "/book",
    items: [
      {
        name: "Hotels",
        desc: "Handpicked 5-star, boutique & budget city hotels",
        icon: Hotel,
        href: "/book/hotels",
      },
      {
        name: "Resorts",
        desc: "Scenic lakeside, beach & mountain nature getaways",
        icon: Palmtree,
        href: "/book/resorts",
        badge: "Hot",
      },
      {
        name: "Guest Houses",
        desc: "Cozy home-style bed & breakfast stays with warm hosts",
        icon: Coffee,
        href: "/book/guest-houses",
      },
      {
        name: "Holiday Homes",
        desc: "Private seaside villas, cabins & vacation cottages",
        icon: Tent,
        href: "/book/holiday-homes",
      },
      {
        name: "Short-Stay Apartments",
        desc: "Serviced executive suites with kitchens & workspaces",
        icon: Compass,
        href: "/book/short-stay",
      },
      {
        name: "Luxury VIP Suites",
        desc: "Exclusive penthouses & premium weekend stays",
        icon: Crown,
        href: "/book/luxury",
      },
    ],
  },
  {
    id: "sports",
    label: "Sports & Activities",
    href: "/sports",
    items: [
      {
        name: "Turf Booking",
        desc: "Artificial grass soccer & cricket turfs with floodlights",
        icon: Trophy,
        href: "/sports/turf-booking",
        badge: "Trending",
      },
      {
        name: "Football Grounds",
        desc: "Full standard size grass grounds for club matches",
        icon: Shield,
        href: "/sports/football-grounds",
      },
      {
        name: "Indoor Sports Courts",
        desc: "Badminton, basketball, table tennis & futsal arenas",
        icon: Dumbbell,
        href: "/sports/indoor-sports",
      },
      {
        name: "Swimming & Wellness",
        desc: "Olympic training pools, health clubs & leisure hubs",
        icon: Activity,
        href: "/sports/swimming",
      },
      {
        name: "Tournament Venues",
        desc: "Book complete tournament complexes & corporate leagues",
        icon: Award,
        href: "/sports/tournaments",
      },
      {
        name: "Other Activities",
        desc: "Paintball, bowling alleys, go-karting & arcades",
        icon: Compass,
        href: "/sports/other-activities",
      },
    ],
  },
  {
    id: "explore",
    label: "Explore",
    href: "/explore",
    items: [
      {
        name: "Popular Locations",
        desc: "Explore top cities, metropolitan hubs & scenic regions",
        icon: Compass,
        href: "/explore/locations",
      },
      {
        name: "Featured Properties",
        desc: "Curated premium listings with top ratings & reviews",
        icon: Star,
        href: "/explore/featured",
      },
      {
        name: "Popular Hotels",
        desc: "Traveler favorite stays across premier tourist destinations",
        icon: Heart,
        href: "/explore/popular-hotels",
      },
      {
        name: "Recently Added",
        desc: "Latest verified listings updated daily across all categories",
        icon: Clock,
        href: "/explore/recently-added",
        badge: "Live",
      },
      {
        name: "Verified Guarantee",
        desc: "How we inspect 100% of properties to eliminate scams",
        icon: ShieldCheck,
        href: "/explore/guarantee",
      },
      {
        name: "About FindBookStay",
        desc: "Our story, vision, partner program & support team",
        icon: Info,
        href: "/explore/about",
      },
    ],
  },
];

