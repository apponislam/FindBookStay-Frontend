"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Home,
    MapPin,
    Banknote,
    Bed,
    Bath,
    UploadCloud,
    Check,
    PhoneCall,
    User,
    ArrowRight,
    ArrowLeft,
    Trash2,
    Calendar,
    Layers,
    ChevronDown,
} from "@/components/Icons";
import { PublishStepper, StepItem } from "./PublishStepper";
import { PublishLiveCard, LivePreviewData } from "./PublishLiveCard";
import { PublishSuccess } from "./PublishSuccess";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

export const RentStepWizard = () => {
    const { isBn } = useLocale();

    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [referenceId, setReferenceId] = useState("");

    // Form State
    const [category, setCategory] = useState("Family Apartment");
    const [title, setTitle] = useState("");
    const [availableFrom, setAvailableFrom] = useState("");
    const [division, setDivision] = useState("");
    const [area, setArea] = useState("");
    const [address, setAddress] = useState("");
    const [floor, setFloor] = useState("");
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [balconies, setBalconies] = useState(0);
    const [sizeSqft, setSizeSqft] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [imageUrlInput, setImageUrlInput] = useState("");
    const [monthlyRent, setMonthlyRent] = useState("");
    const [serviceCharge, setServiceCharge] = useState("");
    const [depositMonths, setDepositMonths] = useState("1");
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactWhatsApp, setContactWhatsApp] = useState(true);
    const [description, setDescription] = useState("");

    const rentSteps: StepItem[] = [
        { id: 1, title: isBn ? "ক্যাটাগরি" : "Category", icon: Home },
        { id: 2, title: isBn ? "লোকেশন" : "Location", icon: MapPin },
        { id: 3, title: isBn ? "স্পেসিফিকেশন ও সুবিধা" : "Specs & Amenities", icon: Layers },
        { id: 4, title: isBn ? "ছবি" : "Photos", icon: UploadCloud },
        { id: 5, title: isBn ? "মূল্য ও প্রকাশ" : "Pricing & Publish", icon: Banknote },
    ];

    const categories = [
        { id: "Family Apartment", label: isBn ? "পারিবারিক অ্যাপার্টমেন্ট" : "Family Apartment", badge: isBn ? "সর্বাধিক জনপ্রিয়" : "Most Popular", icon: Home },
        { id: "Bachelor Seat", label: isBn ? "ব্যাচেলর সিট / মেস" : "Bachelor Seat / Mess", badge: isBn ? "সিঙ্গেল বেড" : "Single Beds", icon: Bed },
        { id: "Sublet Room", label: isBn ? "প্রাইভেট সাবলেট রুম" : "Private Sublet Room", badge: isBn ? "শেয়ার্ড ফ্ল্যাট" : "Shared Flat", icon: Layers },
        { id: "Luxury Duplex", label: isBn ? "ডুপ্লেক্স / পেন্টহাউস" : "Duplex / Penthouse", badge: isBn ? "প্রিমিয়াম" : "Premium", icon: Home },
        { id: "Studio Apartment", label: isBn ? "কমপ্যাক্ট স্টুডিও" : "Compact Studio", badge: isBn ? "একক / দম্পতি" : "Solo / Couple", icon: Home },
    ];

    const divisions = [
        { en: "Dhaka", bn: "ঢাকা" },
        { en: "Chittagong", bn: "চট্টগ্রাম" },
        { en: "Sylhet", bn: "সিলেট" },
        { en: "Cox's Bazar", bn: "কক্সবাজার" },
        { en: "Rajshahi", bn: "রাজশাহী" },
        { en: "Khulna", bn: "খুলনা" },
        { en: "Barisal", bn: "বরিশাল" },
    ];

    const dhakaAreas = [
        { en: "Bashundhara R/A", bn: "বসুন্ধরা আ/এ" },
        { en: "Gulshan 1 & 2", bn: "গুলশান ১ ও ২" },
        { en: "Banani", bn: "বনানী" },
        { en: "Dhanmondi", bn: "ধানমন্ডি" },
        { en: "Uttara", bn: "উত্তরা" },
        { en: "Mirpur DOHS", bn: "মিরপুর ডিওএইচএস" },
        { en: "Mohakhali DOHS", bn: "মহাখালী ডিওএইচএস" },
        { en: "Badda", bn: "বাড্ডা" },
        { en: "Mohammadpur", bn: "মোহাম্মদপুর" },
        { en: "Baridhara", bn: "বারিধারা" },
        { en: "Khilkhet", bn: "খিলক্ষেত" },
    ];

    const amenityOptions = [
        { id: "Lift / Elevator", label: isBn ? "লিফট / এলিভেটর" : "Lift / Elevator" },
        { id: "Generator Backup 24/7", label: isBn ? "২৪/৭ জেনারেটর ব্যাকআপ" : "Generator Backup 24/7" },
        { id: "Natural Gas Line", label: isBn ? "প্রাকৃতিক গ্যাস লাইন" : "Natural Gas Line" },
        { id: "24/7 Guard & CCTV", label: isBn ? "২৪/৭ সিকিউরিটি গার্ড ও সিসিটিভি" : "24/7 Guard & CCTV" },
        { id: "Car Parking Space", label: isBn ? "গাড়ি পার্কিং সুবিধা" : "Car Parking Space" },
        { id: "High Speed WiFi", label: isBn ? "উচ্চগতির ওয়াইফাই" : "High Speed WiFi" },
        { id: "Drawing & Dining Separate", label: isBn ? "আলাদা ড্রয়িং ও ডাইনিং স্পেস" : "Drawing & Dining Separate" },
        { id: "South Facing (Bright Sun)", label: isBn ? "দক্ষিণমুখী (আলো-বাতাসযুক্ত)" : "South Facing (Bright Sun)" },
        { id: "Deep Tube Well Water", label: isBn ? "ডিপ টিউবওয়েলের বিশুদ্ধ পানি" : "Deep Tube Well Water" },
        { id: "Prepaid Electricity Meter", label: isBn ? "প্রিপেইড বিদ্যুৎ মিটার" : "Prepaid Electricity Meter" },
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

    // Calculate score
    const calculateScore = () => {
        let score = 20;
        if (title.length > 10) score += 20;
        if (address.length > 5) score += 20;
        if (images.length >= 2) score += 20;
        if (Number(monthlyRent) > 0 && contactPhone.length > 5) score += 20;
        return score;
    };

    const selectedCategoryObj = categories.find((c) => c.id === category);
    const categoryLabel = selectedCategoryObj ? selectedCategoryObj.label : category;

    // Live preview data model
    const livePreviewData: LivePreviewData = {
        pillar: "rent",
        title: title || (isBn ? "ভাড়া বাসার বিজ্ঞাপনের শিরোনাম" : "Rental Space Headline"),
        category: categoryLabel,
        division,
        area,
        price: monthlyRent ? Number(monthlyRent) : 0,
        priceUnit: isBn ? "/ মাস" : "/ month",
        coverImage: images[0] || "",
        specs: [
            { label: isBn ? "বেড" : "Beds", value: bedrooms },
            { label: isBn ? "বাথ" : "Baths", value: bathrooms },
            { label: isBn ? "বর্গফুট" : "Sqft", value: sizeSqft ? (isBn ? toBengaliDigits(sizeSqft) : sizeSqft) : (isBn ? "০" : "0") },
        ],
        amenitiesCount: selectedAmenities.length,
    };

    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 120, behavior: "smooth" });
        } else {
            setReferenceId(`FBS-RENT-${Date.now().toString().slice(-6)}`);
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
                    title={title || (isBn ? "আধুনিক ৩ বেডের ভাড়া ফ্ল্যাট" : "Modern 3BHK Rental Flat")}
                    summary={`${categoryLabel} in ${area || (isBn ? "ঢাকা" : "Dhaka")}, ${division}. ৳${isBn ? toBengaliDigits(monthlyRent || "0") : monthlyRent}/${isBn ? "মাস" : "month"}.`}
                    price={`৳${isBn ? toBengaliDigits(Number(monthlyRent || 0).toLocaleString()) : Number(monthlyRent || 0).toLocaleString()} / ${isBn ? "মাস" : "month"}`}
                    referenceId={referenceId || "FBS-RENT-892104"}
                    pillar={isBn ? "ভাড়া প্রপার্টি" : "Rental Property"}
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
            {/* Top Stepper Track */}
            <PublishStepper
                steps={rentSteps}
                currentStep={currentStep}
                onSelectStep={(stepId) => setCurrentStep(stepId)}
                pillarTitle={isBn ? "ভাড়া প্রপার্টি প্রকাশ করুন" : "Post Property For Rent"}
                pillarBadge={isBn ? "বাসা ও ব্যাচেলর সিট ভাড়া" : "Rent Homes & Bachelor Seats"}
            />

            {/* Main 2-Column Work Area */}
            <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                    {/* Left Form Column (Steps 1 to 5) */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                        {/* Step 1: Category & Space Essentials */}
                        {currentStep === 1 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-5 animate-fadeIn">
                                <div className="pb-5 border-b border-border">
                                    <div className="space-y-1">
                                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent/15 text-accent border border-accent/25">
                                            {isBn ? "ধাপ ০১ / ০৫" : "STEP 01 OF 05"}
                                        </span>
                                        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                                            {isBn ? "স্পেসের ধরন ও বিজ্ঞাপনের শিরোনাম" : "Space Type & Rental Headline"}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                            {isBn
                                                ? "সঠিক ক্যাটাগরি নির্বাচন করুন যাতে উপযুক্ত ভাড়াটিয়ারা আপনার বিজ্ঞাপনটি সহজে খুঁজে পান।"
                                                : "Select the exact category to reach targeted tenants searching for your space."}
                                        </p>
                                    </div>
                                </div>

                                {/* Category Cards */}
                                <div className="space-y-2.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "ভাড়ার ক্যাটাগরি *" : "Rental Category *"}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {categories.map((cat) => {
                                            const Icon = cat.icon;
                                            const isSelected = category === cat.id;
                                            return (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setCategory(cat.id)}
                                                    className={`p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all duration-200 cursor-pointer ${
                                                        isSelected
                                                            ? "bg-accent/10 border-accent ring-2 ring-accent/30 shadow-xs"
                                                            : "bg-surface-secondary/40 hover:bg-surface-secondary dark:bg-surface/40 dark:hover:bg-surface/70 border-border text-muted-foreground"
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div
                                                            className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${
                                                                isSelected ? "bg-accent text-white" : "bg-white dark:bg-card border border-border text-foreground"
                                                            }`}
                                                        >
                                                            <Icon className="size-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-black text-foreground">{cat.label}</h4>
                                                            <span className="text-[11px] font-semibold text-muted-foreground block mt-0.5">{cat.badge}</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`size-5 rounded-full flex items-center justify-center shrink-0 border ${
                                                            isSelected ? "bg-accent border-accent text-white" : "border-border bg-white dark:bg-card"
                                                        }`}
                                                    >
                                                        {isSelected && <Check className="size-3 stroke3" />}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Listing Title */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "বিজ্ঞাপনের শিরোনাম *" : "Listing Headline / Title *"}
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
                                                ? "যেমন: বসুন্ধরা ডি ব্লকে ৩ বেডের দক্ষিণমুখী আলো-বাতাসপূর্ণ অ্যাপার্টমেন্ট"
                                                : "e.g. Modern 3BHK South-Facing Apartment with 2 Balconies in Bashundhara D Block"
                                        }
                                        maxLength={100}
                                        className="w-full px-4 py-3.5 rounded-2xl bg-surface-secondary/40 focus:bg-white dark:bg-surface dark:focus:bg-card border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-hidden text-sm font-bold text-foreground transition-all"
                                    />
                                    <p className="text-[11px] text-muted-foreground">
                                        {isBn
                                            ? "বেডরুম, ফেসিং এবং এলাকার নাম উল্লেখ করলে ৩.৪ গুণ বেশি অনুসন্ধান পাওয়া যায়।"
                                            : "A descriptive headline mentioning bedrooms, facing, and area receives 3.4x more inquiries."}
                                    </p>
                                </div>

                                {/* Available From */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "ওঠার সম্ভাব্য তারিখ *" : "Available For Move-In From *"}
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            value={availableFrom}
                                            onChange={(e) => setAvailableFrom(e.target.value)}
                                            placeholder={isBn ? "যেমন: অবিলম্বে / আগামী মাসের ১ তারিখ" : "e.g. Immediately / 1st of Next Month"}
                                            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Location & Address */}
                        {currentStep === 2 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-5 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ২: অবস্থান ও নির্দিষ্ট এলাকা" : "Step 2: Location & Precise Area"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "ভাড়াটিয়ারা সাধারণত শহর, বিভাগ ও সুনির্দিষ্ট এলাকা দিয়েই ফিল্টার করেন।"
                                            : "Tenants filter primarily by city division and neighborhood area."}
                                    </p>
                                </div>

                                {/* Division & Area Dropdowns */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "বিভাগ *" : "Division *"}
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
                                            {isBn ? "এলাকা / নেইবারহুড *" : "Area / Neighborhood *"}
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={area}
                                                onChange={(e) => setArea(e.target.value)}
                                                className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 focus:bg-white dark:bg-surface dark:focus:bg-card border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground transition-all cursor-pointer appearance-none pr-10"
                                            >
                                                <option value="" disabled>
                                                    {isBn ? "এলাকা নির্বাচন করুন" : "Select Area / Neighborhood"}
                                                </option>
                                                {dhakaAreas.map((ar) => (
                                                    <option key={ar.en} value={ar.en}>
                                                        {isBn ? ar.bn : ar.en}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Specific Address */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "রাস্তা ও বাড়ি নম্বর / ব্লক *" : "Street Address & Road / Block *"}
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder={isBn ? "যেমন: বাড়ি ১২, রোড ৫, ব্লক বি" : "e.g. House 12, Road 5, Block B"}
                                            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                        />
                                    </div>
                                </div>

                                {/* Floor Details */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "ফ্লোর নম্বর ও দিক" : "Floor Level & Orientation"}
                                    </label>
                                    <input
                                        type="text"
                                        value={floor}
                                        onChange={(e) => setFloor(e.target.value)}
                                        placeholder={isBn ? "যেমন: ৫ম তলা (ইউনিট ৫বি), দক্ষিণমুখী" : "e.g. 5th Floor (Unit 5B), South-Facing"}
                                        className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Specifications & Amenities */}
                        {currentStep === 3 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৩: স্পেসিফিকেশন ও সুবিধা" : "Step 3: Specifications & Amenities"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "রুমের সংখ্যা, মোট বর্গফুট এবং ভবনের সুবিধাসমূহ উল্লেখ করুন।"
                                            : "Specify room counts, total square footage, and building facilities."}
                                    </p>
                                </div>

                                {/* Room Counters */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {/* Bedrooms */}
                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-muted-foreground">
                                            <Bed className="size-3.5 text-accent" />
                                            <span>{isBn ? "বেডরুম" : "Bedrooms"}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm hover:bg-surface-secondary cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-black text-foreground w-6">
                                                {isBn ? toBengaliDigits(bedrooms) : bedrooms}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setBedrooms(bedrooms + 1)}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm hover:bg-surface-secondary cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bathrooms */}
                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-muted-foreground">
                                            <Bath className="size-3.5 text-accent" />
                                            <span>{isBn ? "বাথরুম" : "Bathrooms"}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm hover:bg-surface-secondary cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-black text-foreground w-6">
                                                {isBn ? toBengaliDigits(bathrooms) : bathrooms}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setBathrooms(bathrooms + 1)}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm hover:bg-surface-secondary cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Balconies */}
                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-muted-foreground">
                                            <Layers className="size-3.5 text-accent" />
                                            <span>{isBn ? "বারান্দা" : "Balconies"}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setBalconies(Math.max(0, balconies - 1))}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm hover:bg-surface-secondary cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-black text-foreground w-6">
                                                {isBn ? toBengaliDigits(balconies) : balconies}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setBalconies(balconies + 1)}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm hover:bg-surface-secondary cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Square Footage */}
                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="text-xs font-bold text-muted-foreground">{isBn ? "সাইজ (বর্গফুট)" : "Size (Sqft)"}</div>
                                        <input
                                            type="number"
                                            value={sizeSqft}
                                            onChange={(e) => setSizeSqft(e.target.value)}
                                            placeholder="1650"
                                            className="w-full text-center text-lg font-black text-foreground bg-transparent outline-hidden"
                                        />
                                    </div>
                                </div>

                                {/* Amenities Grid */}
                                <div className="space-y-2 pt-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "প্রাপ্ত সুবিধাসমূহ" : "Available Facilities & Amenities"}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {amenityOptions.map((am) => {
                                            const isSelected = selectedAmenities.includes(am.id);
                                            return (
                                                <button
                                                    key={am.id}
                                                    type="button"
                                                    onClick={() => toggleAmenity(am.id)}
                                                    className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 text-xs font-bold transition-all cursor-pointer ${
                                                        isSelected
                                                            ? "bg-accent/15 border-accent text-accent shadow-xs"
                                                            : "bg-surface-secondary/30 dark:bg-surface/40 border-border text-foreground hover:bg-surface-secondary"
                                                    }`}
                                                >
                                                    <span>{am.label}</span>
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

                        {/* Step 4: High-Res Photos & Media */}
                        {currentStep === 4 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৪: প্রপার্টির বাস্তব ছবি" : "Step 4: Real Property Photos"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "দিনের আলোয় তোলা পরিষ্কার ছবি যুক্ত করলে ৫.৮ গুণ বেশি ভাড়াটিয়ার কল আসে।"
                                            : "Listings with daylight photos get 5.8x more serious tenant calls."}
                                    </p>
                                </div>

                                {/* Drag and Drop / URL Uploader */}
                                <div className="p-6 rounded-3xl border-2 border-dashed border-border hover:border-accent/60 bg-surface-secondary/20 dark:bg-surface/30 text-center space-y-3 transition-colors">
                                    <div className="size-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mx-auto shadow-xs">
                                        <UploadCloud className="size-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black text-foreground">
                                            {isBn ? "হাই-রেজোলিউশন ছবি আপলোড করুন" : "Upload High-Resolution Photos"}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            {isBn
                                                ? "ছবি ড্র্যাগ করে আনুন অথবা নিচে ছবির সরাসরি লিঙ্ক দিন"
                                                : "Drag and drop your photos here, or enter image URLs below"}
                                        </p>
                                    </div>

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

                                {/* Photo Gallery Grid */}
                                {images.length > 0 && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "সংযুক্ত ছবি" : "Uploaded Photos"} ({isBn ? toBengaliDigits(images.length) : images.length})
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {images.map((img, i) => (
                                                <div key={i} className="group relative aspect-4/3 rounded-2xl overflow-hidden border border-border shadow-xs bg-surface">
                                                    <Image
                                                        src={img}
                                                        alt={`Listing photo ${i + 1}`}
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
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 5: Pricing, Direct Contact & Final Review */}
                        {currentStep === 5 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৫: মাসিক ভাড়া ও সরাসরি যোগাযোগ" : "Step 5: Rent & Direct Owner Contact"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn ? "ভাড়াটিয়াদের সুবিধার জন্য স্পষ্ট মাসিক ভাড়া নির্ধারণ করুন।" : "Set your monthly rent clearly for prospective tenants."}
                                    </p>
                                </div>

                                {/* Rent & Charges */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "মাসিক ভাড়া (টাকা) *" : "Monthly Rent (BDT) *"}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground select-none">৳</span>
                                            <input
                                                type="number"
                                                value={monthlyRent}
                                                onChange={(e) => setMonthlyRent(e.target.value)}
                                                placeholder="0"
                                                className="w-full pl-8 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-base font-black text-foreground"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "সার্ভিস চার্জ (টাকা)" : "Service Charge (BDT)"}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground select-none">৳</span>
                                            <input
                                                type="number"
                                                value={serviceCharge}
                                                onChange={(e) => setServiceCharge(e.target.value)}
                                                placeholder="0"
                                                className="w-full pl-8 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-base font-black text-foreground"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "জামানত / অগ্রিম" : "Security Deposit"}
                                        </label>
                                        <select
                                            value={depositMonths}
                                            onChange={(e) => setDepositMonths(e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                        >
                                            <option value="1">{isBn ? "১ মাসের অগ্রিম" : "1 Month Advance"}</option>
                                            <option value="2">{isBn ? "২ মাসের অগ্রিম" : "2 Months Advance"}</option>
                                            <option value="3">{isBn ? "৩ মাসের অগ্রিম" : "3 Months Advance"}</option>
                                            <option value="Negotiable">{isBn ? "আলোচনা সাপেক্ষ" : "Negotiable"}</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Landlord Contact Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "যোগাযোগকারীর নাম *" : "Contact Person Name *"}
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={contactName}
                                                onChange={(e) => setContactName(e.target.value)}
                                                placeholder={isBn ? "যেমন: মো: আনোয়ার হোসেন" : "e.g. Md. Anwar Hossain"}
                                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "মোবাইল ফোন নম্বর *" : "Mobile Phone Number *"}
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

                                {/* WhatsApp Toggle */}
                                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border">
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-black text-foreground">
                                            {isBn ? "হোয়াটসঅ্যাপে অনুসন্ধানের সুবিধা" : "Allow Inquiries via WhatsApp"}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground">
                                            {isBn
                                                ? "আগ্রহী ভাড়াটিয়ারা সরাসরি আপনার সাথে হোয়াটসঅ্যাপে চ্যাট করতে পারবেন"
                                                : "Prospective tenants can chat directly with you on WhatsApp"}
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

                                {/* Description */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "বাড়তি বিবরণ / বাড়ির নিয়মাবলী" : "Additional Notes / House Rules"}
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder={
                                            isBn
                                                ? "যেমন: ছোট পরিবার অগ্রাধিকারযোগ্য। শান্ত আবাসিক ভবন। সার্বক্ষণিক নিরাপত্তা।"
                                                : "e.g. Small family preferred. Quiet residential building. Strict security."
                                        }
                                        className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-medium text-foreground resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Navigation Actions Bar */}
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
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-black shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer ml-auto"
                            >
                                <span>{currentStep === 5 ? (isBn ? "বিজ্ঞাপন প্রকাশ করুন" : "Publish Listing") : (isBn ? "পরবর্তী ধাপ" : "Continue")}</span>
                                <ArrowRight className="size-4" />
                            </button>
                        </div>
                    </div>

                    {/* Right Sticky Live Card Preview Column */}
                    <div className="lg:col-span-5 xl:col-span-4">
                        <PublishLiveCard data={livePreviewData} completenessScore={calculateScore()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentStepWizard;
