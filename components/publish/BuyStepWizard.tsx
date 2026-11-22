"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Building2, MapPin, DollarSign, Bed, Bath, UploadCloud, Check, PhoneCall, User, ArrowRight, ArrowLeft, Trash2, Home, Layers, ChevronDown } from "@/components/Icons";
import { PublishStepper, StepItem } from "./PublishStepper";
import { PublishLiveCard, LivePreviewData } from "./PublishLiveCard";
import { PublishSuccess } from "./PublishSuccess";

const BUY_STEPS: StepItem[] = [
    { id: 1, title: "Property Type", icon: Building2 },
    { id: 2, title: "Location", icon: MapPin },
    { id: 3, title: "Specs & Legal", icon: Layers },
    { id: 4, title: "Media Gallery", icon: UploadCloud },
    { id: 5, title: "Asking Price", icon: DollarSign },
];

const PROPERTY_CATEGORIES = [
    { id: "Residential Apartment", label: "Ready / Ongoing Flat", badge: "Most Inquired", icon: Building2 },
    { id: "Luxury Duplex", label: "Duplex / Penthouse", badge: "Luxury Living", icon: Home },
    { id: "Residential Plot", label: "Residential Plot / Land", badge: "Katha Basis", icon: MapPin },
    { id: "Commercial Space", label: "Commercial Floor / Office", badge: "High Yield", icon: Building2 },
];

const DIVISIONS = ["Dhaka", "Chittagong", "Sylhet", "Cox's Bazar", "Rajshahi", "Khulna"];

const BUY_POPULAR_AREAS = ["Gulshan 1 & 2", "Banani", "Dhanmondi", "Bashundhara R/A", "Uttara", "Baridhara DOHS", "Mirpur DOHS", "Mohakhali DOHS", "Badda", "Mohammadpur", "Khilkhet", "Purbachal New Town", "Aftabnagar"];

const LEGAL_FEATURES = ["RAJUK / CDA Approved Plan", "Mutation & CS/SA/RS Parcha Clear", "Direct Landowner Title Deed", "No Bank Mortgage / Clean Title", "Ready For Immediate Registration", "Bank Home Loan Available"];

export const BuyStepWizard = () => {
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
            return `৳${crore} Crore`;
        }
        return `৳${lakhs} Lakh`;
    };

    const livePreviewData: LivePreviewData = {
        pillar: "buy",
        title: title || "Real Estate Property Headline",
        category,
        division,
        area,
        price: askingPriceLakh ? formatBanglaPrice(Number(askingPriceLakh)) : "৳0",
        priceUnit: isNegotiable ? "(Negotiable)" : "(Fixed)",
        coverImage: images[0] || "",
        specs: [
            { label: "Beds", value: bedrooms },
            { label: "Baths", value: bathrooms },
            { label: "Sqft", value: sizeSqft || "0" },
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
                    title={title || "Real Estate Listing"}
                    summary={`${category} in ${area}, ${division}. ${formatBanglaPrice(Number(askingPriceLakh))}.`}
                    price={formatBanglaPrice(Number(askingPriceLakh))}
                    referenceId={referenceId || "FBS-BUY-631902"}
                    pillar="Real Estate"
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
            <PublishStepper steps={BUY_STEPS} currentStep={currentStep} onSelectStep={(stepId) => setCurrentStep(stepId)} pillarTitle="Post Property For Sale" pillarBadge="Buy Real Estate" />

            <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                    <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                        {/* Step 1: Property Type & Title */}
                        {currentStep === 1 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-sm space-y-6 animate-fadeIn">
                                <div className="pb-5 border-b border-border">
                                    <div className="space-y-1">
                                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-accent/15 text-accent border border-accent/25">STEP 01 OF 05</span>
                                        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">Real Estate Classification & Title</h2>
                                        <p className="text-xs sm:text-sm text-muted-foreground">Reach qualified investors and direct buyers with verified ownership.</p>
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Asset Classification *</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {PROPERTY_CATEGORIES.map((cat) => {
                                            const Icon = cat.icon;
                                            const isSelected = category === cat.id;
                                            return (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setCategory(cat.id)}
                                                    className={`p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all duration-200 cursor-pointer ${isSelected ? "bg-accent/10 border-accent ring-2 ring-accent/30 shadow-xs" : "bg-surface-secondary/40 hover:bg-surface-secondary dark:bg-surface/40 dark:hover:bg-surface/70 border-border text-muted-foreground"}`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-accent text-white" : "bg-white dark:bg-card border border-border text-foreground"}`}>
                                                            <Icon className="size-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-black text-foreground">{cat.label}</h4>
                                                            <span className="text-[11px] font-semibold text-muted-foreground block mt-0.5">{cat.badge}</span>
                                                        </div>
                                                    </div>
                                                    <div className={`size-5 rounded-full flex items-center justify-center shrink-0 border ${isSelected ? "bg-accent border-accent text-white" : "border-border bg-white dark:bg-card"}`}>{isSelected && <Check className="size-3 stroke3" />}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Property Title / Headline *</label>
                                        <span className="text-[11px] text-muted-foreground font-semibold">{title.length} / 100 characters</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Luxury 4BHK South-Facing Penthouse Apartment in Gulshan 2"
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
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">Step 2: Location & Precise Area</h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Select the city division and neighborhood to connect with qualified buyers.</p>
                                </div>

                                {/* Division & Area Dropdowns */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Division *</label>
                                        <div className="relative">
                                            <select value={division} onChange={(e) => setDivision(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 focus:bg-white dark:bg-surface dark:focus:bg-card border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground transition-all cursor-pointer appearance-none pr-10">
                                                <option value="" disabled>
                                                    Select Division
                                                </option>
                                                {DIVISIONS.map((div) => (
                                                    <option key={div} value={div}>
                                                        {div}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Popular Neighborhood Area *</label>
                                        <div className="relative">
                                            <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 focus:bg-white dark:bg-surface dark:focus:bg-card border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground transition-all cursor-pointer appearance-none pr-10">
                                                <option value="" disabled>
                                                    Select Area / Neighborhood
                                                </option>
                                                {BUY_POPULAR_AREAS.map((a) => (
                                                    <option key={a} value={a}>
                                                        {a}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Plot / Road / Street Details *</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. Road 12, Sector 4" className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Specs & Legal Status */}
                        {currentStep === 3 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">Step 3: Dimensions & Legal Vetting</h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Disclose legal clearances (RAJUK, CDA, Mutation) for accelerated buyer confidence.</p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="text-xs font-bold text-muted-foreground">Size (Sqft)</div>
                                        <input type="number" value={sizeSqft} onChange={(e) => setSizeSqft(e.target.value)} placeholder="2450" className="w-full text-center text-lg font-black text-foreground bg-transparent outline-hidden" />
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground">
                                            <Bed className="size-3.5 text-accent" />
                                            <span>Bedrooms</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <button type="button" onClick={() => setBedrooms(Math.max(1, bedrooms - 1))} className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer">
                                                -
                                            </button>
                                            <span className="text-lg font-black text-foreground w-6">{bedrooms}</span>
                                            <button type="button" onClick={() => setBedrooms(bedrooms + 1)} className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer">
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground">
                                            <Bath className="size-3.5 text-accent" />
                                            <span>Bathrooms</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <button type="button" onClick={() => setBathrooms(Math.max(1, bathrooms - 1))} className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer">
                                                -
                                            </button>
                                            <span className="text-lg font-black text-foreground w-6">{bathrooms}</span>
                                            <button type="button" onClick={() => setBathrooms(bathrooms + 1)} className="size-7 rounded-lg bg-surface border border-border font-black text-sm cursor-pointer">
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                                        <div className="text-xs font-bold text-muted-foreground">Ready Status</div>
                                        <select value={readyStatus} onChange={(e) => setReadyStatus(e.target.value)} className="w-full text-center text-xs font-black text-foreground bg-transparent outline-hidden">
                                            <option value="Ready To Move">Ready To Move</option>
                                            <option value="Under Construction">Under Construction</option>
                                            <option value="Upcoming Project">Upcoming</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Legal Approvals & Documentation Status</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {LEGAL_FEATURES.map((item) => {
                                            const isSelected = selectedLegal.includes(item);
                                            return (
                                                <button
                                                    key={item}
                                                    type="button"
                                                    onClick={() => toggleLegal(item)}
                                                    className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 text-xs font-bold transition-all cursor-pointer ${isSelected ? "bg-accent/15 border-accent text-accent shadow-xs" : "bg-surface-secondary/30 dark:bg-surface/40 border-border text-foreground hover:bg-surface-secondary"}`}
                                                >
                                                    <span>{item}</span>
                                                    <div className={`size-4 rounded-md flex items-center justify-center border ${isSelected ? "bg-accent border-accent text-white" : "border-border bg-surface"}`}>{isSelected && <Check className="size-3 stroke3" />}</div>
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
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">Step 4: Architectural Photos & Elevation</h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">High quality interior and building elevation shots attract verified buyers.</p>
                                </div>

                                <div className="p-6 rounded-3xl border-2 border-dashed border-border hover:border-accent/60 bg-surface-secondary/20 dark:bg-surface/30 text-center space-y-3 transition-colors">
                                    <div className="size-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mx-auto shadow-xs">
                                        <UploadCloud className="size-6" />
                                    </div>
                                    <h4 className="text-sm font-black text-foreground">Upload Property Photos & Floorplans</h4>
                                    <div className="flex gap-2 max-w-md mx-auto pt-2">
                                        <input type="url" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} placeholder="Paste image URL (Unsplash or direct image link)" className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-secondary dark:bg-surface border border-border text-xs font-medium text-foreground outline-hidden focus:border-accent" />
                                        <button type="button" onClick={handleAddImage} className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-hover shadow-xs cursor-pointer">
                                            Add
                                        </button>
                                    </div>
                                </div>

                                {images.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {images.map((img, i) => (
                                            <div key={i} className="group relative aspect-4/3 rounded-2xl overflow-hidden border border-border shadow-xs bg-surface">
                                                <Image src={img} alt={`Property photo ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 250px" />
                                                {i === 0 && <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-accent text-white text-[10px] font-black uppercase tracking-wider shadow-md">Cover Photo</span>}
                                                <button type="button" onClick={() => handleRemoveImage(i)} className="absolute top-2 right-2 size-7 rounded-lg bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer">
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
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">Step 5: Asking Price & Direct Owner Contact</h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Set your asking price and direct owner contact information.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Asking Price in Lakh BDT (100 Lakh = 1 Crore) *</label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground select-none">৳</span>
                                            <input type="number" value={askingPriceLakh} onChange={(e) => setAskingPriceLakh(e.target.value)} placeholder="375" className="w-full pl-8 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-base font-black text-foreground" />
                                        </div>
                                        <span className="text-xs font-extrabold text-primary block">Formatted: {formatBanglaPrice(Number(askingPriceLakh || 0))}</span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pricing Flexibility</label>
                                        <select value={isNegotiable ? "yes" : "no"} onChange={(e) => setIsNegotiable(e.target.value === "yes")} className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground">
                                            <option value="yes">Slightly Negotiable upon visit</option>
                                            <option value="no">Strictly Fixed Asking Price</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Landowner / Seller Name *</label>
                                        <div className="relative">
                                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="e.g. Barrister Tariqul Hasan" className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Phone Number *</label>
                                        <div className="relative">
                                            <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="017XXXXXXXX" className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border">
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-black text-foreground">Direct WhatsApp Inquiries</div>
                                        <div className="text-[11px] text-muted-foreground">Buyers can connect directly with the landowner on WhatsApp</div>
                                    </div>
                                    <button type="button" onClick={() => setContactWhatsApp(!contactWhatsApp)} className={`size-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${contactWhatsApp ? "bg-accent text-white" : "bg-surface-secondary border border-border text-transparent"}`}>
                                        <Check className="size-4 stroke-3" />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-2 sm:gap-3 pt-4 border-t border-border/60">
                            {currentStep > 1 ? (
                                <button type="button" onClick={handleBack} className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-border bg-white dark:bg-card hover:bg-surface-secondary text-foreground text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer">
                                    <ArrowLeft className="size-4" />
                                    <span>Back</span>
                                </button>
                            ) : (
                                <div />
                            )}

                            <button type="button" onClick={handleNext} className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-black shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer ml-auto">
                                <span>{currentStep === 5 ? "Publish Property" : "Continue"}</span>
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
