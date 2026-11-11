import React from "react";
import {
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    User,
    Plus,
    Heart,
    Bell,
    Settings,
    LogOut,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    HelpCircle,
    PhoneCall,
    SlidersHorizontal,
    CalendarDays,
    Building,
    Home,
    Building2,
    Warehouse,
    MapPin,
    Sparkles,
    Search,
    BedDouble,
    Users,
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
    Clock,
    ShieldCheck,
    Info,
    Mail,
    Globe,
    CreditCard,
    Zap,
    Send,
    type LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    className?: string;
}

// Custom brand and platform SVG icon components
export const Facebook = ({ size = 24, className = "", ...props }: CustomIconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
    >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

export const TwitterX = ({ size = 24, className = "", ...props }: CustomIconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);
export const Twitter = TwitterX;

export const Instagram = ({ size = 24, className = "", ...props }: CustomIconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
    >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

export const LinkedIn = ({ size = 24, className = "", ...props }: CustomIconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
    >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

export const Apple = ({ size = 24, className = "", ...props }: CustomIconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
    >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.85-.9.04-1.98.6-2.62 1.35-.57.65-1.07 1.71-1.02 2.73.99.08 2.01-.48 2.63-1.23z" />
    </svg>
);
export const AppStore = Apple;

export const GooglePlay = ({ size = 24, className = "", ...props }: CustomIconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
    >
        <path d="M3.22 1.63c-.15.2-.22.48-.22.84v19.06c0 .36.07.64.22.84l.06.06 10.68-10.68v-.25L3.28 1.57l-.06.06zM17.52 14.97l-3.56-3.56v-.25l3.56-3.56.08.05 4.22 2.4c1.2.68 1.2 1.8 0 2.48l-4.22 2.4-.08.04zM13.96 11.16L3.89 21.23c.39.41 1.05.47 1.8.04l11.83-6.72-3.56-3.39zM13.96 12.84l3.56-3.39L5.69 2.73c-.75-.43-1.41-.37-1.8.04l10.07 10.07z" />
    </svg>
);
export const PlayStore = GooglePlay;

export {
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    User,
    Plus,
    Heart,
    Bell,
    Settings,
    LogOut,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    HelpCircle,
    PhoneCall,
    SlidersHorizontal,
    CalendarDays,
    Building,
    Home,
    Building2,
    Warehouse,
    MapPin,
    Sparkles,
    Search,
    BedDouble,
    Users,
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
    Clock,
    ShieldCheck,
    Info,
    Mail,
    Globe,
    CreditCard,
    Zap,
    Send,
};

export const Icons = {
    chevronDown: ChevronDown,
    menu: Menu,
    close: X,
    user: User,
    plus: Plus,
    heart: Heart,
    bell: Bell,
    settings: Settings,
    logout: LogOut,
    arrowRight: ArrowRight,
    checkCircle: CheckCircle2,
    help: HelpCircle,
    phone: PhoneCall,
    sliders: SlidersHorizontal,
    calendar: CalendarDays,
    building: Building,
    home: Home,
    building2: Building2,
    warehouse: Warehouse,
    mapPin: MapPin,
    sparkles: Sparkles,
    bedDouble: BedDouble,
    users: Users,
    briefcase: Briefcase,
    hotel: Hotel,
    palmtree: Palmtree,
    coffee: Coffee,
    tent: Tent,
    compass: Compass,
    crown: Crown,
    trophy: Trophy,
    shield: Shield,
    dumbbell: Dumbbell,
    activity: Activity,
    award: Award,
    star: Star,
    clock: Clock,
    shieldCheck: ShieldCheck,
    info: Info,
    facebook: Facebook,
    twitter: TwitterX,
    twitterX: TwitterX,
    instagram: Instagram,
    linkedin: LinkedIn,
    apple: Apple,
    appStore: Apple,
    googlePlay: GooglePlay,
    playStore: GooglePlay,
};

export default Icons;
