"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Building2,
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
    Home,
    Layers,
    ChevronDown,
} from "@/components/Icons";
import { PublishStepper, StepItem } from "./PublishStepper";
import { PublishLiveCard, LivePreviewData } from "./PublishLiveCard";
import { PublishSuccess } from "./PublishSuccess";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

export const BuyStepWizard = () => {
    const { isBn } = useLocale();

    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [referenceId, setReferenceId] = useState("");

    // Form State
    const [category, setCategory] = useState("Residential Apartment");
    const [title, setTitle] = useState("");
    const [division, setDivision] = useState("");
    const [area, setArea] = useState("");
    const [address, setAddress] = useState("");
    const [sizeSqft, setSizeSqft] = useState("");
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [readyStatus, setReadyStatus] = useState("Ready To Move");
    const [selectedLegal, setSelectedLegal] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [imageUrlInput, setImageUrlInput] = useState("");
    const [askingPriceLakh, setAskingPriceLakh] = useState("");
    const [isNegotiable, setIsNegotiable] = useState(true);
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactWhatsApp, setContactWhatsApp] = useState(true);

    const buySteps: StepItem[] = [
        { id: 1, title: isBn ? "প্রপার্টির ধরন" : "Property Type", icon: Building2 },
        { id: 2, title: isBn ? "অবস্থান" : "Location", icon: MapPin },
        { id: 3, title: isBn ? "স্পেকস ও আইনি স্থিতি" : "Specs & Legal", icon: Layers },
        { id: 4, title: isBn ? "মিডিয়া গ্যালারি" : "Media Gallery", icon: UploadCloud },
        { id: 5, title: isBn ? "বিক্রয়মূল্য ও প্রকাশ" : "Asking Price", icon: Banknote },
    ];

    const propertyCategories = [
        { id: "Residential Apartment", label: isBn ? "রেডি / নির্মাণাধীন ফ্ল্যাট" : "Ready / Ongoing Flat", badge: isBn ? "সর্বাধিক অনুসন্ধানকৃত" : "Most Inquired", icon: Building2 },
        { id: "Luxury Duplex", label: isBn ? "ডুপ্লেক্স / পেন্টহাউস" : "Duplex / Penthouse", badge: isBn ? "বিলাসবহুল জীবন" : "Luxury Living", icon: Home },
        { id: "Residential Plot", label: isBn ? "আবাসিক প্লট / জমি" : "Residential Plot / Land", badge: isBn ? "কাঠা ভিত্তিক" : "Katha Basis", icon: MapPin },
        { id: "Commercial Space", label: isBn ? "বাণিজ্যিক স্পেস / অফিস" : "Commercial Floor / Office", badge: isBn ? "উচ্চ মুনাফা" : "High Yield", icon: Building2 },
    ];

    const divisions = [
        { en: "Dhaka", bn: "ঢাকা" },
        { en: "Chittagong", bn: "চট্টগ্রাম" },
        { en: "Sylhet", bn: "সিলেট" },
        { en: "Cox's Bazar", bn: "কক্সবাজার" },
        { en: "Rajshahi", bn: "রাজশাহী" },
        { en: "Khulna", bn: "খুলনা" },
    ];

    const buyPopularAreas = [
        { en: "Gulshan 1 & 2", bn: "গুলশান ১ ও ২" },
        { en: "Banani", bn: "বনানী" },
        { en: "Dhanmondi", bn: "ধানমন্ডি" },
        { en: "Bashundhara R/A", bn: "বসুন্ধরা আ/এ" },
        { en: "Uttara", bn: "উত্তরা" },
        { en: "Baridhara DOHS", bn: "বারিধারা ডিওএইচএস" },
        { en: "Mirpur DOHS", bn: "মিরপুর ডিওএইচএস" },
        { en: "Mohakhali DOHS", bn: "মহাখালী ডিওএইচএস" },
        { en: "Badda", bn: "বাড্ডা" },
        { en: "Mohammadpur", bn: "মোহাম্মদপুর" },
        { en: "Khilkhet", bn: "খিলক্ষেত" },
        { en: "Purbachal New Town", bn: "পূর্বাচল নতুন শহর" },
        { en: "Aftabnagar", bn: "আফতাবনগর" },
    ];

    const legalFeatures = [
        { id: "RAJUK / CDA Approved Plan", label: isBn ? "রাজউক / সিডিএ অনুমোদিত প্ল্যান" : "RAJUK / CDA Approved Plan" },
        { id: "Mutation & CS/SA/RS Parcha Clear", label: isBn ? "নামজারি ও সিএস/এসএ/আরএস পর্চা হালনাগাদ" : "Mutation & CS/SA/RS Parcha Clear" },
        { id: "Direct Landowner Title Deed", label: isBn ? "সরাসরি জমির মালিকানা ও মূল সাফ-কবলা দলিল" : "Direct Landowner Title Deed" },
        { id: "No Bank Mortgage / Clean Title", label: isBn ? "ব্যাংক দায়মুক্ত ও নির্ভেজাল দলিল" : "No Bank Mortgage / Clean Title" },
        { id: "Ready For Immediate Registration", label: isBn ? "তাৎক্ষণিক রেজিস্ট্রেশন উপযোগী" : "Ready For Immediate Registration" },
        { id: "Bank Home Loan Available", label: isBn ? "ব্যাংক হোম লোন সুবিধা বিদ্যমান" : "Bank Home Loan Available" },
    ];

    const toggleLegal = (item: string) => {
        setSelectedLegal((prev) => (prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]));
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
        if (Number(askingPriceLakh) > 0 && contactPhone.length > 5) score += 20;
        return score;
    };

    // Format BDT Crore / Lakh
    const formatBanglaPrice = (lakhs: number) => {
        if (lakhs >= 100) {
            const crore = (lakhs / 100).toFixed(2);
            return `৳${isBn ? toBengaliDigits(crore) : crore} ${isBn ? "কোটি" : "Crore"}`;
        }
        return `৳${isBn ? toBengaliDigits(lakhs) : lakhs} ${isBn ? "লাখ" : "Lakh"}`;
    };

    const selectedCategoryObj = propertyCategories.find((c) => c.id === category);
    const categoryLabel = selectedCategoryObj ? selectedCategoryObj.label : category;

    const livePreviewData: LivePreviewData = {
        pillar: "buy",
        title: title || (isBn ? "প্রপার্টির বিক্রয় শিরোনাম" : "Real Estate Property Headline"),
        category: categoryLabel,
        division,
        area,
        price: askingPriceLakh ? formatBanglaPrice(Number(askingPriceLakh)) : (isBn ? "৳০" : "৳0"),
        priceUnit: isNegotiable ? (isBn ? "(আলোচনা সাপেক্ষ)" : "(Negotiable)") : (isBn ? "(নির্দিষ্ট মূল্য)" : "(Fixed)"),
        coverImage: images[0] || "",
        specs: [
            { label: isBn ? "বেড" : "Beds", value: bedrooms },
            { label: isBn ? "বাথ" : "Baths", value: bathrooms },
            { label: isBn ? "বর্গফুট" : "Sqft", value: sizeSqft ? (isBn ? toBengaliDigits(sizeSqft) : sizeSqft) : (isBn ? "০" : "0") },
        ],
        amenitiesCount: selectedLegal.length,
    };

    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 120, behavior: "smooth" });
        } else {
            setReferenceId(`FBS-BUY-${Date.now().toString().slice(-6)}`);
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
                    title={title || (isBn ? "রিয়েল এস্টেট প্রপার্টি লিস্টিং" : "Real Estate Listing")}
                    summary={`${categoryLabel} in ${area || (isBn ? "ঢাকা" : "Dhaka")}, ${division}. ${formatBanglaPrice(Number(askingPriceLakh))}.`}
                    price={formatBanglaPrice(Number(askingPriceLakh))}
                    referenceId={referenceId || "FBS-BUY-631902"}
                    pillar={isBn ? "রিয়েল এস্টেট" : "Real Estate"}
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
                steps={buySteps}
                currentStep={currentStep}
                onSelectStep={(stepId) => setCurrentStep(stepId)}
                pillarTitle={isBn ? "বিক্রয় প্রপার্টি প্রকাশ করুন" : "Post Property For Sale"}
                pillarBadge={isBn ? "জমি ও ফ্ল্যাট ক্রয়-বিক্রয়" : "Buy Real Estate"}
            />

            <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                    <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                        {/* Step 1: Property Type & Title */}
                        {currentStep === 1 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-sm space-y-6 animate-fadeIn">
                                <div className="pb-5 border-b border-border">
                                    <div className="space-y-1">
                                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent/15 text-accent border border-accent/25">
                                            {isBn ? "ধাপ ০১ / ০৫" : "STEP 01 OF 05"}
                                        </span>
                                        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                                            {isBn ? "রিয়েল এস্টেট শ্রেণীকরণ ও শিরোনাম" : "Real Estate Classification & Title"}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                            {isBn
                                                ? "যাচাইকৃত মালিকানার মাধ্যমে প্রকৃত ক্রেতা ও বিনিয়োগকারীদের কাছে পৌঁছান।"
                                                : "Reach qualified investors and direct buyers with verified ownership."}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "সম্পদের শ্রেণীকরণ *" : "Asset Classification *"}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {propertyCategories.map((cat) => {
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

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "প্রপার্টির শিরোনাম *" : "Property Title / Headline *"}
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
                                                ? "যেমন: গুলশান ২-এ বিলাসবহুল ৪ বেডের দক্ষিণমুখী পেন্টহাউস অ্যাপার্টমেন্ট"
                                                : "e.g. Luxury 4BHK South-Facing Penthouse Apartment in Gulshan 2"
                                        }
                                        maxLength={100}
                                        className="w-full px-4 py-3.5 rounded-2xl bg-surface-secondary/40 focus:bg-white dark:bg-surface dark:focus:bg-card border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-hidden text-sm font-bold text-foreground transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Location & Address */}
                        {currentStep === 2 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-5 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ২: অবস্থান ও সুনির্দিষ্ট এলাকা" : "Step 2: Location & Precise Area"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "উপযুক্ত ক্রেতাদের সাথে সংযুক্ত হতে শহর, বিভাগ ও জনপ্রিয় এলাকা নির্বাচন করুন।"
                                            : "Select the city division and neighborhood to connect with qualified buyers."}
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
                                            {isBn ? "জনপ্রিয় এলাকা *" : "Popular Neighborhood Area *"}
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
                                                {buyPopularAreas.map((a) => (
                                                    <option key={a.en} value={a.en}>
                                                        {isBn ? a.bn : a.en}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "প্লট / রোড / রাস্তার বিবরণ *" : "Plot / Road / Street Details *"}
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder={isBn ? "যেমন: রোড ১২, সেক্টর ৪" : "e.g. Road 12, Sector 4"}
                                            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Specs & Legal Status */}
                        {currentStep === 3 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৩: আকার ও আইনি স্থিতি" : "Step 3: Dimensions & Legal Vetting"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "ক্রেতাদের আত্মবিশ্বাস বাড়াতে রাজউক, সিডিএ ও নামজারির অনুমোদন প্রকাশ করুন।"
                                            : "Disclose legal clearances (RAJUK, CDA, Mutation) for accelerated buyer confidence."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="text-xs font-bold text-muted-foreground">{isBn ? "সাইজ (বর্গফুট)" : "Size (Sqft)"}</div>
                                        <input
                                            type="number"
                                            value={sizeSqft}
                                            onChange={(e) => setSizeSqft(e.target.value)}
                                            placeholder="2450"
                                            className="w-full text-center text-lg font-black text-foreground bg-transparent outline-hidden"
                                        />
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground">
                                            <Bed className="size-3.5 text-accent" />
                                            <span>{isBn ? "বেডরুম" : "Bedrooms"}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-black text-foreground w-6">
                                                {isBn ? toBengaliDigits(bedrooms) : bedrooms}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setBedrooms(bedrooms + 1)}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground">
                                            <Bath className="size-3.5 text-accent" />
                                            <span>{isBn ? "বাথরুম" : "Bathrooms"}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-black text-foreground w-6">
                                                {isBn ? toBengaliDigits(bathrooms) : bathrooms}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setBathrooms(bathrooms + 1)}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="text-xs font-bold text-muted-foreground">{isBn ? "প্রস্তুতির অবস্থা" : "Ready Status"}</div>
                                        <select
                                            value={readyStatus}
                                            onChange={(e) => setReadyStatus(e.target.value)}
                                            className="w-full text-center text-xs font-black text-foreground bg-transparent outline-hidden"
                                        >
                                            <option value="Ready To Move">{isBn ? "রেডি ফ্ল্যাট" : "Ready To Move"}</option>
                                            <option value="Under Construction">{isBn ? "নির্মাণাধীন" : "Under Construction"}</option>
                                            <option value="Upcoming Project">{isBn ? "আসন্ন প্রকল্প" : "Upcoming"}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "আইনি অনুমোদন ও দলিলাদির স্থিতি" : "Legal Approvals & Documentation Status"}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {legalFeatures.map((item) => {
                                            const isSelected = selectedLegal.includes(item.id);
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => toggleLegal(item.id)}
                                                    className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 text-xs font-bold transition-all cursor-pointer ${
                                                        isSelected
                                                            ? "bg-accent/15 border-accent text-accent shadow-xs"
                                                            : "bg-surface-secondary/30 dark:bg-surface/40 border-border text-foreground hover:bg-surface-secondary"
                                                    }`}
                                                >
                                                    <span>{item.label}</span>
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

                        {/* Step 4: High-Res Media */}
                        {currentStep === 4 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৪: স্থাপত্য ও অভ্যন্তরীণ ছবি" : "Step 4: Architectural Photos & Elevation"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "ভবনের এক্সটেরিয়র ও ইন্টেরিয়রের মানসম্মত ছবি নিশ্চিত ক্রেতাদের দৃষ্টি আকর্ষণ করে।"
                                            : "High quality interior and building elevation shots attract verified buyers."}
                                    </p>
                                </div>

                                <div className="p-6 rounded-3xl border-2 border-dashed border-border hover:border-accent/60 bg-surface-secondary/20 dark:bg-surface/30 text-center space-y-3 transition-colors">
                                    <div className="size-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mx-auto shadow-xs">
                                        <UploadCloud className="size-6" />
                                    </div>
                                    <h4 className="text-sm font-black text-foreground">
                                        {isBn ? "ছবি ও ফ্লোরপ্ল্যান আপলোড করুন" : "Upload Property Photos & Floorplans"}
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
                                                    alt={`Property photo ${i + 1}`}
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

                        {/* Step 5: Asking Price & Direct Seller Info */}
                        {currentStep === 5 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৫: বিক্রয়মূল্য ও সরাসরি মালিকের যোগাযোগ" : "Step 5: Asking Price & Direct Owner Contact"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn ? "আপনার প্রত্যাশিত বিক্রয়মূল্য এবং সরাসরি মালিকের যোগাযোগের নম্বর দিন।" : "Set your asking price and direct owner contact information."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "প্রত্যাশিত মূল্য (লাখ টাকায় - ১০০ লাখ = ১ কোটি) *" : "Asking Price in Lakh BDT (100 Lakh = 1 Crore) *"}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground select-none">৳</span>
                                            <input
                                                type="number"
                                                value={askingPriceLakh}
                                                onChange={(e) => setAskingPriceLakh(e.target.value)}
                                                placeholder="0"
                                                className="w-full pl-8 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-base font-black text-foreground"
                                            />
                                        </div>
                                        <span className="text-xs font-extrabold text-primary block">
                                            {isBn ? "প্রদর্শিত রূপ:" : "Formatted:"} {formatBanglaPrice(Number(askingPriceLakh || 0))}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "মূল্য নমনীয়তা" : "Pricing Flexibility"}
                                        </label>
                                        <select
                                            value={isNegotiable ? "yes" : "no"}
                                            onChange={(e) => setIsNegotiable(e.target.value === "yes")}
                                            className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                        >
                                            <option value="yes">{isBn ? "পরিদর্শনের পর সামান্য আলোচনা সাপেক্ষ" : "Slightly Negotiable upon visit"}</option>
                                            <option value="no">{isBn ? "সম্পূর্ণ নির্দিষ্ট মূল্য (ফিক্সড)" : "Strictly Fixed Asking Price"}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "জমির মালিক / বিক্রেতার নাম *" : "Landowner / Seller Name *"}
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={contactName}
                                                onChange={(e) => setContactName(e.target.value)}
                                                placeholder={isBn ? "যেমন: ব্যারিস্টার তরিকুল হাসান" : "e.g. Barrister Tariqul Hasan"}
                                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "যোগাযোগের ফোন নম্বর *" : "Contact Phone Number *"}
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
                                            {isBn ? "হোয়াটসঅ্যাপে সরাসরি অনুসন্ধান" : "Direct WhatsApp Inquiries"}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground">
                                            {isBn
                                                ? "ক্রেতারা সরাসরি জমির মালিকের সাথে হোয়াটসঅ্যাপে যোগাযোগ করতে পারবেন"
                                                : "Buyers can connect directly with the landowner on WhatsApp"}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setContactWhatsApp(!contactWhatsApp)}
                                        className={`size-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                                            contactWhatsApp ? "bg-accent text-white" : "bg-surface-secondary border border-border text-transparent"
                                        }`}
                                    >
                                        <Check className="size-4 stroke-3" />
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
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-black shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer ml-auto"
                            >
                                <span>{currentStep === 5 ? (isBn ? "প্রপার্টি প্রকাশ করুন" : "Publish Property") : (isBn ? "পরবর্তী ধাপ" : "Continue")}</span>
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

export default BuyStepWizard;
