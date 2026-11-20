export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    category: "rent" | "book" | "sports" | "buy" | "system";
    unread: boolean;
    href: string;
    actionText?: string;
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
    {
        id: "notif-1",
        title: "Turf Slot Confirmed!",
        message: "Your match booking at Green Horizon Standard Football Ground is locked for Tonight (8:00 PM - 9:00 PM).",
        timestamp: "12m ago",
        category: "sports",
        unread: true,
        href: "/sports/turf-booking",
        actionText: "View Slot",
    },
    {
        id: "notif-2",
        title: "Rental Inquiry Approved",
        message: "The landlord for Modern 3BHK Family Flat in Bashundhara approved your inquiry and sent the lease draft.",
        timestamp: "2h ago",
        category: "rent",
        unread: true,
        href: "/rent/family-apartments",
        actionText: "Review Lease",
    },
    {
        id: "notif-3",
        title: "Price Drop Alert: Cox's Bazar",
        message: "The Grand Waterfront Luxury Resort & Spa just dropped room rates by 15% for upcoming weekend dates.",
        timestamp: "1d ago",
        category: "book",
        unread: false,
        href: "/book/resorts",
        actionText: "Book Now",
    },
    {
        id: "notif-4",
        title: "Title Deed Vetting Completed",
        message: "Institutional land mutation and RAJUK clearance for Lakefront Duplex Penthouse in Gulshan 2 was verified.",
        timestamp: "2d ago",
        category: "buy",
        unread: false,
        href: "/buy",
        actionText: "Inspect Deed",
    },
    {
        id: "notif-5",
        title: "Welcome to FindBookStay",
        message: "Your profile is verified. Enjoy zero broker scams, authenticated resorts, and instant slot turf bookings.",
        timestamp: "3d ago",
        category: "system",
        unread: false,
        href: "/about",
        actionText: "Learn More",
    },
];
