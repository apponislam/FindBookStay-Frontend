export type TenantType = "family" | "bachelor" | "female" | "sublet" | "commercial";
export type PropertyType = "apartment" | "duplex" | "single_room" | "bachelor_seat" | "sublet_room" | "office";
export type GasType = "pipeline" | "cylinder" | "none";
export type ThemePreset = "classic_a4" | "modern_emerald" | "royal_navy" | "minimal_clean";

export interface ToletNoticeData {
    // Basic Details
    titleEn: string;
    titleBn: string;
    monthEn: string;
    monthBn: string;
    tenantType: TenantType;
    propertyType: PropertyType;
    
    // Space Specs
    bedrooms: number;
    bathrooms: number;
    balconies: number;
    floorEn: string;
    floorBn: string;
    totalFloorsEn: string;
    totalFloorsBn: string;
    hasDrawingDining: boolean;
    hasLift: boolean;
    hasGenerator: boolean;

    // Amenities
    gasType: GasType;
    hasParking: boolean;
    hasWifi: boolean;
    hasCctv: boolean;
    hasSecurityGuard: boolean;
    isSouthFacing: boolean;
    customNoteEn: string;
    customNoteBn: string;

    // Financials
    rentAmount: string;
    rentAmountBn: string;
    serviceCharge: string;
    serviceChargeBn: string;
    advanceDeposit: string;
    advanceDepositBn: string;
    isNegotiable: boolean;

    // Location
    addressEn: string;
    addressBn: string;
    areaEn: string;
    areaBn: string;
    cityEn: string;
    cityBn: string;

    // Contact
    contactNameEn: string;
    contactNameBn: string;
    phonePrimary: string;
    phoneSecondary: string;
    contactTimeEn: string;
    contactTimeBn: string;

    // Styling
    theme: ThemePreset;
    language: "bn" | "en";
    showQrCode: boolean;
}

export const INITIAL_TOLET_DATA: ToletNoticeData = {
    titleEn: "TO-LET",
    titleBn: "টু-লেট",
    monthEn: "From 1st Next Month",
    monthBn: "১লা তারিখ থেকে",
    tenantType: "family",
    propertyType: "apartment",

    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    floorEn: "4th Floor",
    floorBn: "৪র্থ তলা",
    totalFloorsEn: "7-Storey Building",
    totalFloorsBn: "৭ তলা ভবন",
    hasDrawingDining: true,
    hasLift: true,
    hasGenerator: true,

    gasType: "pipeline",
    hasParking: true,
    hasWifi: true,
    hasCctv: true,
    hasSecurityGuard: true,
    isSouthFacing: true,
    customNoteEn: "Well-ventilated sunny flat with 24/7 water and dedicated security.",
    customNoteBn: "পর্যাপ্ত আলো-বাতাসপূর্ণ মনোরম পরিবেশ, সার্বক্ষণিক পানি ও নিজস্ব দারোয়ান।",

    rentAmount: "28,000",
    rentAmountBn: "২৮,০০০",
    serviceCharge: "3,500 (Including gas & water)",
    serviceChargeBn: "৩,৫০০ (গ্যাস ও পানি সহ)",
    advanceDeposit: "2 Months",
    advanceDepositBn: "২ মাসের অগ্রিম",
    isNegotiable: true,

    addressEn: "House #12, Road #04, Block-C",
    addressBn: "বাসা নং ১২, রোড নং ০৪, ব্লক-সি",
    areaEn: "Bashundhara R/A",
    areaBn: "বসুন্ধরা আ/এ",
    cityEn: "Dhaka",
    cityBn: "ঢাকা",

    contactNameEn: "House Owner",
    contactNameBn: "বাড়িওয়ালা",
    phonePrimary: "01711-234567",
    phoneSecondary: "01822-345678",
    contactTimeEn: "10:00 AM - 09:00 PM",
    contactTimeBn: "সকাল ১০টা - রাত ৯টা",

    theme: "classic_a4",
    language: "bn",
    showQrCode: true,
};

export interface ThemeConfig {
    id: ThemePreset;
    nameEn: string;
    nameBn: string;
    bgClass: string;
    borderClass: string;
    headerBg: string;
    headerText: string;
    accentColor: string;
    tagClass: string;
    paperShadow: string;
}

export const THEME_CONFIGS: Record<ThemePreset, ThemeConfig> = {
    classic_a4: {
        id: "classic_a4",
        nameEn: "Classic Print (A4)",
        nameBn: "ক্লাসিক প্রিন্ট (A4)",
        bgClass: "bg-white text-black",
        borderClass: "border-4 border-black",
        headerBg: "bg-rose-700 text-white",
        headerText: "text-white",
        accentColor: "#be123c",
        tagClass: "bg-black text-white",
        paperShadow: "shadow-2xl ring-1 ring-black/10",
    },
    modern_emerald: {
        id: "modern_emerald",
        nameEn: "Modern Emerald",
        nameBn: "মডার্ন এমারেল্ড",
        bgClass: "bg-gradient-to-b from-white to-emerald-50/40 text-slate-900",
        borderClass: "border-4 border-emerald-600",
        headerBg: "bg-gradient-to-r from-emerald-700 to-teal-700 text-white",
        headerText: "text-white",
        accentColor: "#059669",
        tagClass: "bg-emerald-700 text-white",
        paperShadow: "shadow-2xl shadow-emerald-950/20 ring-1 ring-emerald-500/20",
    },
    royal_navy: {
        id: "royal_navy",
        nameEn: "Royal Navy & Gold",
        nameBn: "রয়্যাল নেভি ও গোল্ড",
        bgClass: "bg-white text-[#01244b]",
        borderClass: "border-4 border-[#01244b]",
        headerBg: "bg-[#01244b] text-amber-300",
        headerText: "text-amber-300",
        accentColor: "#01244b",
        tagClass: "bg-[#01244b] text-white",
        paperShadow: "shadow-2xl shadow-slate-900/30 ring-1 ring-[#01244b]/20",
    },
    minimal_clean: {
        id: "minimal_clean",
        nameEn: "Minimal Door Notice",
        nameBn: "মিনিমাল ডোর নোটিস",
        bgClass: "bg-white text-zinc-900",
        borderClass: "border-2 border-zinc-800",
        headerBg: "bg-zinc-900 text-white",
        headerText: "text-white",
        accentColor: "#18181b",
        tagClass: "bg-zinc-100 text-zinc-900 border border-zinc-300",
        paperShadow: "shadow-xl ring-1 ring-black/5",
    },
};
