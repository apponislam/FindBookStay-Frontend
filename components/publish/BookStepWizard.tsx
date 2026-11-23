"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Hotel,
    MapPin,
    Banknote,
    Users,
    Bed,
    UploadCloud,
    Check,
    PhoneCall,
    User,
    ArrowRight,
    ArrowLeft,
    Trash2,
    Palmtree,
    Coffee,
    ChevronDown,
} from "@/components/Icons";
import { PublishStepper, StepItem } from "./PublishStepper";
import { PublishLiveCard, LivePreviewData } from "./PublishLiveCard";
import { PublishSuccess } from "./PublishSuccess";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";

export const BookStepWizard = () => {
    const { isBn } = useLocale();

    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [referenceId, setReferenceId] = useState("");

    // Form State
    const [category, setCategory] = useState("Boutique Resort");
    const [title, setTitle] = useState("");
    const [destination, setDestination] = useState("");
    const [area, setArea] = useState("");
    const [address, setAddress] = useState("");
    const [maxGuests, setMaxGuests] = useState(2);
    const [bedCount, setBedCount] = useState(1);
    const [checkInTime, setCheckInTime] = useState("01:00 PM");
    const [checkOutTime, setCheckOutTime] = useState("11:30 AM");
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [imageUrlInput, setImageUrlInput] = useState("");
    const [nightlyRate, setNightlyRate] = useState("");
    const [weekendRate, setWeekendRate] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactWhatsApp, setContactWhatsApp] = useState(true);

    const bookSteps: StepItem[] = [
        { id: 1, title: isBn ? "থাকার ধরন" : "Stay Type", icon: Hotel },
        { id: 2, title: isBn ? "অবস্থান" : "Location", icon: MapPin },
        { id: 3, title: isBn ? "রুম ও সুবিধা" : "Rooms & Amenities", icon: Users },
        { id: 4, title: isBn ? "ছবি গ্যালারি" : "Gallery", icon: UploadCloud },
        { id: 5, title: isBn ? "ভাড়া ও প্রকাশ" : "Nightly Rates", icon: Banknote },
    ];

    const stayCategories = [
        { id: "Boutique Resort", label: isBn ? "বুটিক রিসোর্ট ও স্পা" : "Boutique Resort & Spa", badge: isBn ? "অবকাশ যাপন" : "Vacation", icon: Palmtree },
        { id: "Luxury Hotel", label: isBn ? "স্টার লাক্সারি হোটেল" : "Star Luxury Hotel", badge: isBn ? "শহর / এক্সিকিউটিভ" : "City / Executive", icon: Hotel },
        { id: "Private Villa", label: isBn ? "প্রাইভেট হলিডে ভিলা" : "Private Holiday Villa", badge: isBn ? "একান্ত নিজস্ব" : "Exclusive", icon: Hotel },
        { id: "Eco Cottage", label: isBn ? "ইকো কটেজ / ট্রি-হাউস" : "Eco Cottage / Treehouse", badge: isBn ? "প্রকৃতির সান্নিধ্য" : "Nature Stay", icon: Coffee },
        { id: "Serviced Suite", label: isBn ? "সার্ভিসড স্টুডিও স্যুট" : "Serviced Studio Suite", badge: isBn ? "স্বল্পমেয়াদী থাকা" : "Short Stay", icon: Bed },
    ];

    const destinations = [
        { en: "Cox's Bazar", bn: "কক্সবাজার" },
        { en: "Sylhet & Sreemangal", bn: "সিলেট ও শ্রীমঙ্গল" },
        { en: "Sajek Valley", bn: "সাজেক ভ্যালি" },
        { en: "Bandarban", bn: "বান্দরবান" },
        { en: "Kuakata", bn: "কুয়াকাটা" },
        { en: "Dhaka City", bn: "ঢাকা শহর" },
        { en: "Chittagong", bn: "চট্টগ্রাম" },
        { en: "Saint Martin's Island", bn: "সেন্ট মার্টিন দ্বীপ" },
        { en: "Gazipur Resorts", bn: "গাজীপুর রিসোর্ট অঞ্চল" },
    ];

    const resortAmenities = [
        { id: "Infinity Swimming Pool", label: isBn ? "ইনফিনিটি সুইমিং পুল" : "Infinity Swimming Pool" },
        { id: "Complimentary Breakfast", label: isBn ? "কমপ্লিমেন্টারি ব্রেকফাস্ট" : "Complimentary Breakfast" },
        { id: "High Speed Free WiFi", label: isBn ? "উচ্চগতির ফ্রি ওয়াইফাই" : "High Speed Free WiFi" },
        { id: "Air Conditioned Rooms", label: isBn ? "শীতাতপ নিয়ন্ত্রিত কক্ষ (এসি)" : "Air Conditioned Rooms" },
        { id: "Free Valet Parking", label: isBn ? "ফ্রি ভ্যালেট পার্কিং" : "Free Valet Parking" },
        { id: "24/7 Room Service", label: isBn ? "২৪/৭ রুম সার্ভিস" : "24/7 Room Service" },
        { id: "Private Balcony / Sea View", label: isBn ? "ব্যক্তিগত বারান্দা / সি ভিউ" : "Private Balcony / Sea View" },
        { id: "Kids Play Zone", label: isBn ? "শিশুদের খেলার জায়গা" : "Kids Play Zone" },
        { id: "BBQ & Campfire Facility", label: isBn ? "বারবিকিউ ও ক্যাম্পফায়ার" : "BBQ & Campfire Facility" },
        { id: "Airport Shuttle Pickup", label: isBn ? "বিমানবন্দর শাটল পিকআপ" : "Airport Shuttle Pickup" },
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
        if (images.length >= 2) score += 20;
        if (Number(nightlyRate) > 0 && contactPhone.length > 5) score += 20;
        return score;
    };

    const selectedCategoryObj = stayCategories.find((c) => c.id === category);
    const categoryLabel = selectedCategoryObj ? selectedCategoryObj.label : category;

    const livePreviewData: LivePreviewData = {
        pillar: "book",
        title: title || (isBn ? "রিসোর্ট ও স্টের নাম" : "Resort & Stay Property Name"),
        category: categoryLabel,
        division: destination,
        area,
        price: nightlyRate ? Number(nightlyRate) : 0,
        priceUnit: isBn ? "/ রাত" : "/ night",
        coverImage: images[0] || "",
        specs: [
            { label: isBn ? "অতিথি" : "Guests", value: maxGuests },
            { label: isBn ? "বেড" : "Beds", value: bedCount },
            { label: isBn ? "চেক-ইন" : "Check-in", value: checkInTime },
        ],
        amenitiesCount: selectedAmenities.length,
    };

    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 120, behavior: "smooth" });
        } else {
            setReferenceId(`FBS-STAY-${Date.now().toString().slice(-6)}`);
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
                    title={title || (isBn ? "বুটিক রিসোর্ট ও স্যুট" : "Boutique Resort & Spa")}
                    summary={`${categoryLabel} in ${destination || (isBn ? "কক্সবাজার" : "Cox's Bazar")}. ৳${isBn ? toBengaliDigits(nightlyRate || "0") : nightlyRate}/${isBn ? "রাত" : "night"}.`}
                    price={`৳${isBn ? toBengaliDigits(Number(nightlyRate || 0).toLocaleString()) : Number(nightlyRate || 0).toLocaleString()} / ${isBn ? "রাত" : "night"}`}
                    referenceId={referenceId || "FBS-STAY-902143"}
                    pillar={isBn ? "রিসোর্ট ও হোটেল" : "Stay & Resort"}
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
                steps={bookSteps}
                currentStep={currentStep}
                onSelectStep={(stepId) => setCurrentStep(stepId)}
                pillarTitle={isBn ? "রিসোর্ট বা হোটেল প্রকাশ করুন" : "Post Resort, Stay or Hotel"}
                pillarBadge={isBn ? "বুক রিসোর্ট ও হোটেল" : "Book Stays & Resorts"}
            />

            <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                    {/* Left Form Column */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                        {/* Step 1: Stay Category & Title */}
                        {currentStep === 1 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-5 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ১: থাকার ক্যাটাগরি ও প্রতিষ্ঠানের নাম" : "Step 1: Stay Category & Property Name"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "ভ্রমণকারী ও পর্যটকদের আকৃষ্ট করতে আপনার আবাসনের ধরন নির্বাচন করুন।"
                                            : "Highlight your accommodation style to travelers and vacationers."}
                                    </p>
                                </div>

                                {/* Category Cards */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "প্রপার্টির শ্রেণীকরণ *" : "Property Classification *"}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {stayCategories.map((cat) => {
                                            const Icon = cat.icon;
                                            const isSelected = category === cat.id;
                                            return (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setCategory(cat.id)}
                                                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                                                        isSelected
                                                            ? "bg-teal-500/10 border-accent ring-1 ring-accent/30 shadow-xs"
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

                                {/* Property Title */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "রিসোর্ট বা স্টের শিরোনাম *" : "Resort / Stay Headline *"}
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
                                                ? "যেমন: ইনানী বিচে গ্র্যান্ড ওয়াটারফ্রন্ট লাক্সারি ভিলা ও স্পা"
                                                : "e.g. Grand Waterfront Oceanfront Luxury Villa & Spa in Inani Beach"
                                        }
                                        maxLength={100}
                                        className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Location & Destination */}
                        {currentStep === 2 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-5 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ২: পর্যটন গন্তব্য ও অবস্থান" : "Step 2: Tourist Destination & Road"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "সারা দেশ থেকে আগত ভ্রমণপিপাসুদের কাছে পৌঁছাতে সঠিক গন্তব্য নির্ধারণ করুন।"
                                            : "Connect with travelers searching for getaways across Bangladesh."}
                                    </p>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "প্রধান পর্যটন গন্তব্য / অঞ্চল *" : "Major Destination / Region *"}
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 focus:bg-white dark:bg-surface dark:focus:bg-card border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground transition-all cursor-pointer appearance-none pr-10"
                                        >
                                            <option value="" disabled>
                                                {isBn ? "গন্তব্য / অঞ্চল নির্বাচন করুন" : "Select Destination / Region"}
                                            </option>
                                            {destinations.map((dest) => (
                                                <option key={dest.en} value={dest.en}>
                                                    {isBn ? dest.bn : dest.en}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "এলাকা / সৈকত / পাহাড়ী অঞ্চল *" : "Area / Beach / Hill Track *"}
                                    </label>
                                    <input
                                        type="text"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        placeholder={isBn ? "যেমন: মেরিন ড্রাইভ, ইনানী সৈকত / কলাতলী পয়েন্ট" : "e.g. Marine Drive, Inani Beach / Kolatoli Point"}
                                        className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "সুনির্দিষ্ট ঠিকানা *" : "Exact Street Address *"}
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder={isBn ? "যেমন: মেরিন ড্রাইভ রোড, ইনানী, কক্সবাজার" : "e.g. Marine Drive Road, Inani, Cox's Bazar"}
                                            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Capacity & Amenities */}
                        {currentStep === 3 && (
                            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৩: ধারণক্ষমতা, সময়সূচি ও সুবিধাসমূহ" : "Step 3: Capacity, Timing & Amenities"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "অতিথি সংখ্যা, বেড এবং সুযোগ-সুবিধার ওপর ভিত্তি করে অতিথিরা রুম পছন্দ করেন।"
                                            : "Guests select stays based on guest limits, beds, and leisure facilities."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground">
                                            <Users className="size-3.5 text-accent" />
                                            <span>{isBn ? "সর্বোচ্চ অতিথি" : "Max Guests"}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setMaxGuests(Math.max(1, maxGuests - 1))}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-black text-foreground w-6">
                                                {isBn ? toBengaliDigits(maxGuests) : maxGuests}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setMaxGuests(maxGuests + 1)}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground">
                                            <Bed className="size-3.5 text-accent" />
                                            <span>{isBn ? "বেড সংখ্যা" : "Beds"}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setBedCount(Math.max(1, bedCount - 1))}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-black text-foreground w-6">
                                                {isBn ? toBengaliDigits(bedCount) : bedCount}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setBedCount(bedCount + 1)}
                                                className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="text-xs font-bold text-muted-foreground">{isBn ? "চেক-ইন সময়" : "Check-In"}</div>
                                        <input
                                            type="text"
                                            value={checkInTime}
                                            onChange={(e) => setCheckInTime(e.target.value)}
                                            className="w-full text-center text-sm font-black text-foreground bg-transparent outline-hidden"
                                        />
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="text-xs font-bold text-muted-foreground">{isBn ? "চেক-আউট সময়" : "Check-Out"}</div>
                                        <input
                                            type="text"
                                            value={checkOutTime}
                                            onChange={(e) => setCheckOutTime(e.target.value)}
                                            className="w-full text-center text-sm font-black text-foreground bg-transparent outline-hidden"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        {isBn ? "রিসোর্ট ও হোটেলের সুবিধাসমূহ" : "Resort & Hotel Amenities"}
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {resortAmenities.map((am) => {
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

                        {/* Step 4: High-Res Photos */}
                        {currentStep === 4 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৪: রিসোর্ট ও রুমের বাস্তব ছবি" : "Step 4: Real Resort & Room Photos"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "পুল, রুম ও চারপাশের সুন্দর দৃশ্যের স্পষ্ট ছবি তাৎক্ষণিক বুকিং বৃদ্ধি করে।"
                                            : "Clear photos of your pool, rooms, and views drive instant bookings."}
                                    </p>
                                </div>

                                <div className="p-6 rounded-3xl border-2 border-dashed border-border hover:border-accent/60 bg-surface-secondary/20 dark:bg-surface/30 text-center space-y-3 transition-colors">
                                    <div className="size-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mx-auto shadow-xs">
                                        <UploadCloud className="size-6" />
                                    </div>
                                    <h4 className="text-sm font-black text-foreground">
                                        {isBn ? "হাই-রেজোলিউশন ছবি আপলোড করুন" : "Upload High-Resolution Photos"}
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
                                                    alt={`Resort photo ${i + 1}`}
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

                        {/* Step 5: Nightly Rates & Host Info */}
                        {currentStep === 5 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                                        {isBn ? "ধাপ ৫: প্রতি রাতের ভাড়া ও বুকিং যোগাযোগ" : "Step 5: Nightly Rates & Reservation Contact"}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                        {isBn
                                            ? "আপনার প্রতি রাতের আবাসন ভাড়া এবং রিজার্ভেশন যোগাযোগের তথ্য উল্লেখ করুন।"
                                            : "Set your nightly accommodation rates and reservation contact details."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "নিয়মিত দিনের ভাড়া (টাকা / রাত) *" : "Weekday Rate (BDT / Night) *"}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground select-none">৳</span>
                                            <input
                                                type="number"
                                                value={nightlyRate}
                                                onChange={(e) => setNightlyRate(e.target.value)}
                                                placeholder="0"
                                                className="w-full pl-8 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-base font-black text-foreground"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "ছুটির দিনের ভাড়া (টাকা / রাত)" : "Weekend Rate (BDT / Night)"}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground select-none">৳</span>
                                            <input
                                                type="number"
                                                value={weekendRate}
                                                onChange={(e) => setWeekendRate(e.target.value)}
                                                placeholder="0"
                                                className="w-full pl-8 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-base font-black text-foreground"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                            {isBn ? "হোস্ট / রিজার্ভেশন ডেস্কের নাম *" : "Host / Reservation Desk Name *"}
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={contactName}
                                                onChange={(e) => setContactName(e.target.value)}
                                                placeholder={isBn ? "যেমন: ফ্রন্ট ডেস্ক রিজার্ভেশন" : "e.g. Front Desk Reservations"}
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
                                                placeholder="018XXXXXXXX"
                                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border">
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-black text-foreground">
                                            {isBn ? "তাৎক্ষণিক হোয়াটসঅ্যাপ বুকিং সুবিধা" : "Instant WhatsApp Booking Concierge"}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground">
                                            {isBn
                                                ? "অতিথিদের সরাসরি অনুসন্ধান আপনার ব্যবসায়িক হোয়াটসঅ্যাপে গ্রহণ করুন"
                                                : "Receive guest room inquiries directly on your business WhatsApp"}
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
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-black shadow-md shadow-primary/20 hover:shadow-lg transition-all cursor-pointer ml-auto"
                            >
                                <span>{currentStep === 5 ? (isBn ? "রিসোর্ট বিজ্ঞাপন প্রকাশ করুন" : "Publish Resort Listing") : (isBn ? "পরবর্তী ধাপ" : "Continue")}</span>
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

export default BookStepWizard;
