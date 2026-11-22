"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trophy, MapPin, Banknote, Clock, UploadCloud, Check, PhoneCall, User, ArrowRight, ArrowLeft, Trash2, Activity, Dumbbell, ChevronDown } from "@/components/Icons";
import { PublishStepper, StepItem } from "./PublishStepper";
import { PublishLiveCard, LivePreviewData } from "./PublishLiveCard";
import { PublishSuccess } from "./PublishSuccess";

const SPORTS_STEPS: StepItem[] = [
    { id: 1, title: "Turf Type", icon: Trophy },
    { id: 2, title: "Location", icon: MapPin },
    { id: 3, title: "Venue Specs", icon: Activity },
    { id: 4, title: "Arena Photos", icon: UploadCloud },
    { id: 5, title: "Slot Pricing", icon: Banknote },
];

const SPORT_CATEGORIES = [
    { id: "Football Turf", label: "Football / Soccer Turf", badge: "5v5 / 7v7", icon: Trophy },
    { id: "Cricket Arena", label: "Indoor Cricket Arena", badge: "Box Cricket", icon: Activity },
    { id: "Badminton Court", label: "Wooden / Synthetic Badminton", badge: "Double / Single", icon: Dumbbell },
    { id: "Multi-Sport Complex", label: "Multi-Sport Arena", badge: "Tournament Ready", icon: Trophy },
];

const DIVISIONS = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Cox's Bazar"];

const TURF_FACILITIES = ["FIFA Grade Artificial Turf", "LED Floodlights (Day & Night)", "Air Conditioned Dugouts", "Clean Changing Rooms & Showers", "Dedicated Free Parking", "Spectator Seating Gallery", "Chilled Mineral Water & Energy Drinks", "Referees & Ball Boys Available", "Bibs & Match Balls Provided", "First Aid Emergency Kit"];

export const SportsStepWizard = () => {
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

    const livePreviewData: LivePreviewData = {
        pillar: "sports",
        title: title || "Turf & Sports Arena Name",
        category,
        division,
        area,
        price: dayHourlyRate ? Number(dayHourlyRate) : 0,
        priceUnit: "/ hour",
        coverImage: images[0] || "",
        specs: [
            { label: "Format", value: matchFormat.split(" ")[0] || "Turf" },
            { label: "Surface", value: surfaceType || "Grass" },
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
                    title={title || "Sports Turf Arena"}
                    summary={`${category} in ${area}, ${division}. ৳${dayHourlyRate}/hour.`}
                    price={`৳${Number(dayHourlyRate).toLocaleString()} / hour`}
                    referenceId={referenceId || "FBS-TURF-742918"}
                    pillar="Sports Turf"
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
            <PublishStepper steps={SPORTS_STEPS} currentStep={currentStep} onSelectStep={(stepId) => setCurrentStep(stepId)} pillarTitle="Post Sports Turf or Arena" pillarBadge="Sports & Turfs" />

            <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                    <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                        {/* Step 1: Turf Category & Headline */}
                        {currentStep === 1 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-5 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">Step 1: Sports Category & Arena Name</h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Connect directly with teams, clubs, and corporate players booking weekly slots.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sport Type *</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {SPORT_CATEGORIES.map((cat) => {
                                            const Icon = cat.icon;
                                            const isSelected = category === cat.id;
                                            return (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setCategory(cat.id)}
                                                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${isSelected ? "bg-amber-500/10 border-accent ring-1 ring-accent/30 shadow-xs" : "bg-surface-secondary/40 hover:bg-surface-secondary dark:bg-surface/40 border-border"}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`size-9 rounded-xl flex items-center justify-center ${isSelected ? "bg-accent text-white" : "bg-surface-secondary text-primary"}`}>
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
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Turf / Arena Name *</label>
                                        <span className="text-[11px] text-muted-foreground font-semibold">{title.length} / 100 characters</span>
                                    </div>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Green Horizon FIFA-Standard 7v7 Floodlit Arena" maxLength={100} className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground" />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pitch Format / Squad Dimensions</label>
                                    <select value={matchFormat} onChange={(e) => setMatchFormat(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground">
                                        <option value="5v5 Futsal / Turf">5v5 Futsal / Turf (Compact Fast Play)</option>
                                        <option value="7v7 FIFA Standard Pitch">7v7 FIFA Standard Pitch</option>
                                        <option value="9v9 Tournament Ground">9v9 Tournament Ground</option>
                                        <option value="Box Cricket Standard">Box Cricket Standard (Net Enclosed)</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Location & Address */}
                        {currentStep === 2 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-5 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">Step 2: Arena Location & Access</h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Make it effortless for players and tournament organizers to navigate to your venue.</p>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City Division *</label>
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
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Neighborhood Area *</label>
                                    <input type="text" value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g. Sector 4, Uttara / Banani DOHS" className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground" />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Exact Venue Address *</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. Plot 12, Road 7, Sector 4, Uttara, Dhaka" className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Turf Specifications & Facilities */}
                        {currentStep === 3 && (
                            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">Step 3: Surface Specs & Facilities</h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">State turf quality, floodlight capability, and team amenities.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Turf Surface Quality</label>
                                        <input type="text" value={surfaceType} onChange={(e) => setSurfaceType(e.target.value)} placeholder="e.g. 50mm Monofilament Synthetic Grass" className="w-full px-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Daily Operating Hours</label>
                                        <div className="relative">
                                            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <input type="text" value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} placeholder="e.g. 06:00 AM - 02:00 AM" className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Turf & Arena Facilities</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {TURF_FACILITIES.map((fac) => {
                                            const isSelected = selectedAmenities.includes(fac);
                                            return (
                                                <button
                                                    key={fac}
                                                    type="button"
                                                    onClick={() => toggleAmenity(fac)}
                                                    className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 text-xs font-bold transition-all cursor-pointer ${isSelected ? "bg-accent/15 border-accent text-accent shadow-xs" : "bg-surface-secondary/30 dark:bg-surface/40 border-border text-foreground hover:bg-surface-secondary"}`}
                                                >
                                                    <span>{fac}</span>
                                                    <div className={`size-4 rounded-md flex items-center justify-center border ${isSelected ? "bg-accent border-accent text-white" : "border-border bg-surface"}`}>{isSelected && <Check className="size-3 stroke3" />}</div>
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
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">Step 4: Turf & Floodlit Photos</h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Show players your pitch quality, evening lighting, and goalposts.</p>
                                </div>

                                <div className="p-6 rounded-3xl border-2 border-dashed border-border hover:border-accent/60 bg-surface-secondary/20 dark:bg-surface/30 text-center space-y-3 transition-colors">
                                    <div className="size-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mx-auto shadow-xs">
                                        <UploadCloud className="size-6" />
                                    </div>
                                    <h4 className="text-sm font-black text-foreground">Upload High-Resolution Turf Photos</h4>
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
                                                <Image src={img} alt={`Turf photo ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 250px" />
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

                        {/* Step 5: Slot Pricing & Booking Phone */}
                        {currentStep === 5 && (
                            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-border shadow-xs space-y-6 animate-fadeIn">
                                <div className="pb-4 border-b border-border">
                                    <h2 className="text-xl sm:text-2xl font-black text-foreground">Step 5: Hourly Slot Rates & Manager Hotline</h2>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Players call or message you directly to book slots and confirm play times.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Daytime Slot (BDT / Hour) *</label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground select-none">৳</span>
                                            <input type="number" value={dayHourlyRate} onChange={(e) => setDayHourlyRate(e.target.value)} placeholder="0" className="w-full pl-8 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-base font-black text-foreground" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Night Floodlit Slot (BDT / Hour) *</label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground select-none">৳</span>
                                            <input type="number" value={nightHourlyRate} onChange={(e) => setNightlyHourlyRate(e.target.value)} placeholder="0" className="w-full pl-8 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-base font-black text-foreground" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Arena Manager / Contact Name *</label>
                                        <div className="relative">
                                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="e.g. Tanvir Ahmed" className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Booking Hotline Phone *</label>
                                        <div className="relative">
                                            <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="017XXXXXXXX" className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border focus:border-accent outline-hidden text-sm font-bold text-foreground" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-secondary/40 dark:bg-surface border border-border">
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-black text-foreground">WhatsApp Match Slot Booking</div>
                                        <div className="text-[11px] text-muted-foreground">Captains and players can message directly on WhatsApp to reserve slots</div>
                                    </div>
                                    <button type="button" onClick={() => setContactWhatsApp(!contactWhatsApp)} className={`size-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${contactWhatsApp ? "bg-accent text-white" : "bg-surface-secondary border border-border text-transparent"}`}>
                                        <Check className="size-4 stroke3" />
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

                            <button type="button" onClick={handleNext} className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground text-xs sm:text-sm font-black shadow-md shadow-primary/20 hover:shadow-lg transition-all cursor-pointer ml-auto">
                                <span>{currentStep === 5 ? "Publish Turf Arena" : "Continue"}</span>
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
