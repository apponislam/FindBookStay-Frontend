"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Trophy,
    MapPin,
    Banknote,
    Clock,
    UploadCloud,
    Check,
    PhoneCall,
    User,
    ArrowRight,
    ArrowLeft,
    Trash2,
    Activity,
    Dumbbell,
    ChevronDown,
} from "@/components/Icons";
import { PublishStepper, StepItem } from "./PublishStepper";
import { PublishLiveCard, LivePreviewData } from "./PublishLiveCard";
import { PublishSuccess } from "./PublishSuccess";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

export const SportsStepWizard = () => {
    const { isBn } = useLocale();

    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [referenceId, setReferenceId] = useState("");

    // Form State
    const [category, setCategory] = useState("Football Turf");
    const [title, setTitle] = useState("");
    const [matchFormat, setMatchFormat] = useState("7v7 FIFA Standard Pitch");
    const [division, setDivision] = useState("");
    const [area, setArea] = useState("");
    const [address, setAddress] = useState("");
    const [surfaceType, setSurfaceType] = useState("Artificial Grass");
    const [openingHours, setOpeningHours] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [imageUrlInput, setImageUrlInput] = useState("");
    const [dayHourlyRate, setDayHourlyRate] = useState("");
    const [nightHourlyRate, setNightlyHourlyRate] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactWhatsApp, setContactWhatsApp] = useState(true);

    const sportsSteps: StepItem[] = [
        { id: 1, title: isBn ? "টার্ফের ধরন" : "Turf Type", icon: Trophy },
        { id: 2, title: isBn ? "লোকেশন" : "Location", icon: MapPin },
        { id: 3, title: isBn ? "স্পেসিফিকেশন" : "Venue Specs", icon: Activity },
        { id: 4, title: isBn ? "মাঠের ছবি" : "Arena Photos", icon: UploadCloud },
        { id: 5, title: isBn ? "স্লট রেট ও প্রকাশ" : "Slot Pricing", icon: Banknote },
    ];

    const sportCategories = [
        { id: "Football Turf", label: isBn ? "ফুটবল / সকার টার্ফ" : "Football / Soccer Turf", badge: isBn ? "৫v৫ / ৭v৭" : "5v5 / 7v7", icon: Trophy },
        { id: "Cricket Arena", label: isBn ? "ইনডোর ক্রিকেট এরিনা" : "Indoor Cricket Arena", badge: isBn ? "বক্স ক্রিকেট" : "Box Cricket", icon: Activity },
        { id: "Badminton Court", label: isBn ? "উডেন / সিন্থেটিক ব্যাডমিন্টন" : "Wooden / Synthetic Badminton", badge: isBn ? "ডাবল / সিঙ্গেল" : "Double / Single", icon: Dumbbell },
        { id: "Multi-Sport Complex", label: isBn ? "মাল্টি-স্পোর্ট এরিনা" : "Multi-Sport Arena", badge: isBn ? "টুর্নামেন্ট উপযোগী" : "Tournament Ready", icon: Trophy },
    ];

    const divisions = [
        { en: "Dhaka", bn: "ঢাকা" },
        { en: "Chittagong", bn: "চট্টগ্রাম" },
        { en: "Sylhet", bn: "সিলেট" },
        { en: "Rajshahi", bn: "রাজশাহী" },
        { en: "Khulna", bn: "খুলনা" },
        { en: "Cox's Bazar", bn: "কক্সবাজার" },
    ];

    const turfFacilities = [
        { id: "FIFA Grade Artificial Turf", label: isBn ? "ফিফা গ্রেড কৃত্রিম টার্ফ" : "FIFA Grade Artificial Turf" },
        { id: "LED Floodlights (Day & Night)", label: isBn ? "এলইডি ফ্লাডলাইট (দিন ও রাত)" : "LED Floodlights (Day & Night)" },
        { id: "Air Conditioned Dugouts", label: isBn ? "শীতাতপ নিয়ন্ত্রিত ডাগআউট" : "Air Conditioned Dugouts" },
        { id: "Clean Changing Rooms & Showers", label: isBn ? "পরিচ্ছন্ন চেঞ্জিং রুম ও শাওয়ার" : "Clean Changing Rooms & Showers" },
        { id: "Dedicated Free Parking", label: isBn ? "নিজস্ব ফ্রি পার্কিং স্পেস" : "Dedicated Free Parking" },
        { id: "Spectator Seating Gallery", label: isBn ? "দর্শক গ্যালারি" : "Spectator Seating Gallery" },
        { id: "Chilled Mineral Water & Energy Drinks", label: isBn ? "ঠান্ডা পানি ও এনার্জি ড্রিংকস" : "Chilled Mineral Water & Energy Drinks" },
        { id: "Referees & Ball Boys Available", label: isBn ? "রেফারি ও বল বয় সুবিধা" : "Referees & Ball Boys Available" },
        { id: "Bibs & Match Balls Provided", label: isBn ? "বিবস ও ম্যাচ বল সরবরাহ" : "Bibs & Match Balls Provided" },
        { id: "First Aid Emergency Kit", label: isBn ? "জরুরি প্রাথমিক চিকিৎসা কিট" : "First Aid Emergency Kit" },
    ];

    const matchFormats = [
        { id: "5v5 Futsal / Turf", label: isBn ? "৫v৫ ফুটসাল / টার্ফ (কমপ্যাক্ট ফাস্ট খেলা)" : "5v5 Futsal / Turf (Compact Fast Play)" },
        { id: "7v7 FIFA Standard Pitch", label: isBn ? "৭v৭ ফিফা স্ট্যান্ডার্ড পিচ" : "7v7 FIFA Standard Pitch" },
        { id: "9v9 Tournament Ground", label: isBn ? "৯v৯ টুর্নামেন্ট মাঠ" : "9v9 Tournament Ground" },
        { id: "Box Cricket Standard", label: isBn ? "বক্স ক্রিকেট স্ট্যান্ডার্ড (নেট ঘেরা)" : "Box Cricket Standard (Net Enclosed)" },
    ];

    const toggleAmenity = (item: string) => {
        setSelectedAmenities((prev) => (prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]));
    };

    const handleAddImage = () => {
        if (imageUrlInput.trim() && !images.includes(imageUrlInput.trim())) {
            setImages((prev) => [...prev, imageUrlInput.trim()]);
            setImageUrlInput("");
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const calculateScore = () => {
        let score = 20;
        if (title.length > 10) score += 20;
        if (address.length > 5) score += 20;
        if (images.length >= 1) score += 20;
        if (Number(dayHourlyRate) > 0 && contactPhone.length > 5) score += 20;
        return score;
    };

    const selectedCategoryObj = sportCategories.find((c) => c.id === category);
    const categoryLabel = selectedCategoryObj ? selectedCategoryObj.label : category;

    const livePreviewData: LivePreviewData = {
        pillar: "sports",
        title: title || (isBn ? "টার্ফ ও স্পোর্টস অ্যারেনার নাম" : "Turf & Sports Arena Name"),
        category: categoryLabel,
        division,
        area,
        price: dayHourlyRate ? Number(dayHourlyRate) : 0,
        priceUnit: isBn ? "/ ঘণ্টা" : "/ hour",
        coverImage: images[0] || "",
        specs: [
            { label: isBn ? "ফরম্যাট" : "Format", value: matchFormat.split(" ")[0] || "Turf" },
            { label: isBn ? "সারফেস" : "Surface", value: surfaceType || (isBn ? "ঘাস" : "Grass") },
        ],
        amenitiesCount: selectedAmenities.length,
    };

    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 120, behavior: "smooth" });
        } else {
            setReferenceId(`FBS-TURF-${Date.now().toString().slice(-6)}`);
            setIsSuccess(true);
            window.scrollTo({ top: 80, behavior: "smooth" });
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 120, behavior: "smooth" });
        }
    };

    if (isSuccess) {
        return (
            <div className="container mx-auto px-4 py-8">
                <PublishSuccess
                    title={title || (isBn ? "স্পোর্টস টার্ফ এরিনা" : "Sports Turf Arena")}
                    summary={`${categoryLabel} in ${area || (isBn ? "ঢাকা" : "Dhaka")}, ${division}. ৳${isBn ? toBengaliDigits(dayHourlyRate || "0") : dayHourlyRate}/${isBn ? "ঘণ্টা" : "hour"}.`}
                    price={`৳${isBn ? toBengaliDigits(Number(dayHourlyRate || 0).toLocaleString()) : Number(dayHourlyRate || 0).toLocaleString()} / ${isBn ? "ঘণ্টা" : "hour"}`}
                    referenceId={referenceId || "FBS-TURF-742918"}
                    pillar={isBn ? "স্পোর্টস টার্ফ" : "Sports Turf"}
                    onReset={() => {
                        setIsSuccess(false);
                        setCurrentStep(1);
                        setTitle("");
                    }}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1">
            <PublishStepper
                steps={sportsSteps}
                currentStep={currentStep}
                onSelectStep={(stepId) => setCurrentStep(stepId)}
                pillarTitle={isBn ? "টার্ফ বা স্পোর্টস গ্রাউন্ড প্রকাশ করুন" : "Post Sports Turf or Arena"}
                pillarBadge={isBn ? "স্পোর্টস ও টার্ফ বুকিং" : "Sports & Turfs"}
            />

            <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                    <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                        {/* Step 1: Turf Category & Headline */}
                        {currentStep === 1 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-5 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ১: খেলার ধরন ও অ্যারেনার নাম" : "Step 1: Sports Category & Arena Name"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "নিয়মিত স্লট বুকিং করা টিম, ক্লাব ও করপোরেট খেলোয়াড়দের সাথে সরাসরি যুক্ত হন।"
                                            : "Connect directly with teams, clubs, and corporate players booking weekly slots."}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "খেলার ধরন *" : "Sport Type *"}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {sportCategories.map((cat) => {
                                            const Icon = cat.icon;
                                            const isSelected = category === cat.id;
                                            return (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setCategory(cat.id)}
                                                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                                                        isSelected
                                                            ? "bg-amber-500/10 border-accent ring-1 ring-accent/30 shadow-xs"
                                                            : "bg-surface-secondary/40 hover:bg-surface-secondary dark:bg-surface/40 border-border"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`size-9 rounded-xl flex items-center justify-center ${
                                                                isSelected ? "bg-accent text-white" : "bg-surface-secondary text-primary"
                                                            }`}
                                                        >
                                                            <Icon className="size-4" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-extrabold text-foreground">{cat.label}</h4>
                                                            <span className="text-[11px] text-muted-foreground">{cat.badge}</span>
                                                        </div>
                                                    </div>
                                                    {isSelected && <Check className="size-4 text-accent stroke3" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "টার্ফ বা অ্যারেনার নাম *" : "Turf / Arena Name *"}
                                        </label>
                                        <span className="text-[11px] text-muted-foreground font-semibold">
                                            {isBn ? toBengaliDigits(title.length) : title.length} / {isBn ? "১০০" : "100"} {isBn ? "অক্ষর" : "characters"}
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder={
                                            isBn
                                                ? "যেমন: গ্রিন হরাইজন ফিফা স্ট্যান্ডার্ড ৭v৭ ফ্লাডলিট অ্যারেনা"
                                                : "e.g. Green Horizon FIFA-Standard 7v7 Floodlit Arena"
                                        }
                                        maxLength={100}
                                        className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "পিচ ফরম্যাট ও স্কোয়াড সাইজ" : "Pitch Format / Squad Dimensions"}
                                    </label>
                                    <select
                                        value={matchFormat}
                                        onChange={(e) => setMatchFormat(e.target.value)}
                                        className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                    >
                                        {matchFormats.map((mf) => (
                                            <option key={mf.id} value={mf.id}>
                                                {mf.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Location & Address */}
                        {currentStep === 2 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-5 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ২: অ্যারেনার অবস্থান ও যাতায়াত" : "Step 2: Arena Location & Access"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "খেলোয়াড় ও আয়োজকদের সহজে পৌঁছানোর সুবিধার্থে সঠিক অবস্থান উল্লেখ করুন।"
                                            : "Make it effortless for players and tournament organizers to navigate to your venue."}
                                    </p>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "শহর ও বিভাগ *" : "City Division *"}
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={division}
                                            onChange={(e) => setDivision(e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 focus:bg-white dark:bg-surface dark:focus:bg-card border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground transition-all cursor-pointer appearance-none pr-10"
                                        >
                                            <option value="" disabled>
                                                {isBn ? "বিভাগ নির্বাচন করুন" : "Select Division"}
                                            </option>
                                            {divisions.map((div) => (
                                                <option key={div.en} value={div.en}>
                                                    {isBn ? div.bn : div.en}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "এলাকা *" : "Neighborhood Area *"}
                                    </label>
                                    <input
                                        type="text"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        placeholder={isBn ? "যেমন: সেক্টর ৪, উত্তরা / বনানী ডিওএইচএস" : "e.g. Sector 4, Uttara / Banani DOHS"}
                                        className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "সুনির্দিষ্ট মাঠের ঠিকানা *" : "Exact Venue Address *"}
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder={isBn ? "যেমন: প্লট ১২, রোড ৭, সেক্টর ৪, উত্তরা, ঢাকা" : "e.g. Plot 12, Road 7, Sector 4, Uttara, Dhaka"}
                                            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Turf Specifications & Facilities */}
                        {currentStep === 3 && (
                            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৩: পিচ স্পেকস ও সুবিধা" : "Step 3: Surface Specs & Facilities"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "টার্ফের মান, ফ্লাডলাইটের ব্যবস্থা ও খেলোয়াড়দের সুবিধাসমূহ উল্লেখ করুন।"
                                            : "State turf quality, floodlight capability, and team amenities."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "টার্ফ সারফেসের গুণমান" : "Turf Surface Quality"}
                                        </label>
                                        <input
                                            type="text"
                                            value={surfaceType}
                                            onChange={(e) => setSurfaceType(e.target.value)}
                                            placeholder={isBn ? "যেমন: ৫০মিমি মনোফিলামেন্ট কৃত্রিম ঘাস" : "e.g. 50mm Monofilament Synthetic Grass"}
                                            className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "দৈনিক কার্যকাল ও সময়" : "Daily Operating Hours"}
                                        </label>
                                        <div className="relative">
                                            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={openingHours}
                                                onChange={(e) => setOpeningHours(e.target.value)}
                                                placeholder={isBn ? "যেমন: সকাল ০৬:০০ - রাত ০২:০০" : "e.g. 06:00 AM - 02:00 AM"}
                                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "টার্ফ ও অ্যারেনার সুবিধাসমূহ" : "Turf & Arena Facilities"}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {turfFacilities.map((fac) => {
                                            const isSelected = selectedAmenities.includes(fac.id);
                                            return (
                                                <button
                                                    key={fac.id}
                                                    type="button"
                                                    onClick={() => toggleAmenity(fac.id)}
                                                    className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 text-xs font-bold transition-all cursor-pointer ${
                                                        isSelected
                                                            ? "bg-accent/15 border-accent text-accent shadow-xs"
                                                            : "bg-surface-secondary/30 dark:bg-surface/40 border-border text-foreground hover:bg-surface-secondary"
                                                    }`}
                                                >
                                                    <span>{fac.label}</span>
                                                    <div
                                                        className={`size-4 rounded-md flex items-center justify-center border ${
                                                            isSelected ? "bg-accent border-accent text-white" : "border-border bg-surface"
                                                        }`}
                                                    >
                                                        {isSelected && <Check className="size-3 stroke3" />}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: High-Res Turf Photos */}
                        {currentStep === 4 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৪: টার্ফ ও ফ্লাডলাইটের ছবি" : "Step 4: Turf & Floodlit Photos"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "খেলোয়াড়দের কাছে মাঠের গ্রাস কোয়ালিটি, সন্ধ্যার ফ্লাডলাইট ও গোলপোস্ট প্রদর্শন করুন।"
                                            : "Show players your pitch quality, evening lighting, and goalposts."}
                                    </p>
                                </div>

                                <div className="p-6 rounded-3xl border-2 border-dashed border-border hover:border-accent/60 bg-surface-secondary/20 dark:bg-surface/30 text-center space-y-3 transition-colors">
                                    <div className="size-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mx-auto shadow-xs">
                                        <UploadCloud className="size-6" />
                                    </div>
                                    <h4 className="text-sm font-black text-foreground">
                                        {isBn ? "টার্ফের হাই-রেজোলিউশন ছবি আপলোড করুন" : "Upload High-Resolution Turf Photos"}
                                    </h4>
                                    <div className="flex gap-2 max-w-md mx-auto pt-2">
                                        <input
                                            type="url"
                                            value={imageUrlInput}
                                            onChange={(e) => setImageUrlInput(e.target.value)}
                                            placeholder={isBn ? "ছবির লিঙ্ক দিন (যেমন: Unsplash বা সরাসরি ছবি লিঙ্ক)" : "Paste image URL (Unsplash or direct image link)"}
                                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-secondary dark:bg-surface border border-border text-xs font-medium text-foreground outline-hidden focus:border-accent"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddImage}
                                            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover shadow-xs cursor-pointer"
                                        >
                                            {isBn ? "যোগ করুন" : "Add"}
                                        </button>
                                    </div>
                                </div>

                                {images.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {images.map((img, i) => (
                                            <div key={i} className="group relative aspect-4/3 rounded-2xl overflow-hidden border border-border shadow-xs bg-surface">
                                                <Image
                                                    src={img}
                                                    alt={`Turf photo ${i + 1}`}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    sizes="(max-width: 768px) 50vw, 250px"
                                                />
                                                {i === 0 && (
                                                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-accent text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                                                        {isBn ? "কভার ছবি" : "Cover Photo"}
                                                    </span>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(i)}
                                                    className="absolute top-2 right-2 size-7 rounded-lg bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                                                    title={isBn ? "ছবি মুছে ফেলুন" : "Remove photo"}
                                                >
                                                    <Trash2 className="size-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 5: Slot Pricing & Booking Phone */}
                        {currentStep === 5 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৫: ঘণ্টার স্লট রেট ও ম্যানেজার হটলাইন" : "Step 5: Hourly Slot Rates & Manager Hotline"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "খেলোয়াড় ও ক্যাপ্টেনের সাথে সরাসরি স্লট বুকিং ও সময় নিশ্চিত করতে যোগাযোগ নম্বর দিন।"
                                            : "Players call or message you directly to book slots and confirm play times."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "দিনের স্লট (টাকা / ঘণ্টা) *" : "Daytime Slot (BDT / Hour) *"}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground select-none">৳</span>
                                            <input
                                                type="number"
                                                value={dayHourlyRate}
                                                onChange={(e) => setDayHourlyRate(e.target.value)}
                                                placeholder="0"
                                                className="w-full pl-8 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-base font-black text-foreground"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "রাতের ফ্লাডলাইট স্লট (টাকা / ঘণ্টা) *" : "Night Floodlit Slot (BDT / Hour) *"}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground select-none">৳</span>
                                            <input
                                                type="number"
                                                value={nightHourlyRate}
                                                onChange={(e) => setNightlyHourlyRate(e.target.value)}
                                                placeholder="0"
                                                className="w-full pl-8 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-base font-black text-foreground"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "অ্যারেনা ম্যানেজার / যোগাযোগের নাম *" : "Arena Manager / Contact Name *"}
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={contactName}
                                                onChange={(e) => setContactName(e.target.value)}
                                                placeholder={isBn ? "যেমন: তানভীর আহমেদ" : "e.g. Tanvir Ahmed"}
                                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "বুকিং হটলাইন ফোন নম্বর *" : "Booking Hotline Phone *"}
                                        </label>
                                        <div className="relative">
                                            <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <input
                                                type="tel"
                                                value={contactPhone}
                                                onChange={(e) => setContactPhone(e.target.value)}
                                                placeholder="017XXXXXXXX"
                                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border">
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-black text-foreground">
                                            {isBn ? "হোয়াটসঅ্যাপ ম্যাচ স্লট বুকিং" : "WhatsApp Match Slot Booking"}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground">
                                            {isBn
                                                ? "ক্যাপ্টেন ও খেলোয়াড়রা সরাসরি হোয়াটসঅ্যাপে বার্তা পাঠিয়ে স্লট রিজার্ভ করতে পারবেন"
                                                : "Captains and players can message directly on WhatsApp to reserve slots"}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setContactWhatsApp(!contactWhatsApp)}
                                        className={`size-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                                            contactWhatsApp ? "bg-accent text-white" : "bg-surface-secondary border border-border text-transparent"
                                        }`}
                                    >
                                        <Check className="size-4 stroke3" />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-2 sm:gap-3 pt-4 border-t border-border/60">
                            {currentStep > 1 ? (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-border bg-white dark:bg-card hover:bg-surface-secondary text-foreground text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
                                >
                                    <ArrowLeft className="size-4" />
                                    <span>{isBn ? "পেছনে" : "Back"}</span>
                                </button>
                            ) : (
                                <div />
                            )}

                            <button
                                type="button"
                                onClick={handleNext}
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-black shadow-md shadow-primary/20 hover:shadow-lg transition-all cursor-pointer ml-auto"
                            >
                                <span>{currentStep === 5 ? (isBn ? "টার্ফ অ্যারেনা প্রকাশ করুন" : "Publish Turf Arena") : (isBn ? "পরবর্তী ধাপ" : "Continue")}</span>
                                <ArrowRight className="size-4" />
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-5 xl:col-span-4">
                        <PublishLiveCard data={livePreviewData} completenessScore={calculateScore()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SportsStepWizard;
