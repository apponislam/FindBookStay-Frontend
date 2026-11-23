"use client";

import React from "react";
import {
    Home,
    MapPin,
    PhoneCall,
    Sparkles,
} from "lucide-react";
import { ToletNoticeData, TenantType, GasType } from "../toletData";
import { useLocale } from "@/hooks/useLocale";

interface ToletFormEditorProps {
    data: ToletNoticeData;
    onChange: (updater: (prev: ToletNoticeData) => ToletNoticeData) => void;
}

export const ToletFormEditor = ({ data, onChange }: ToletFormEditorProps) => {
    const { isBn } = useLocale();

    const updateField = <K extends keyof ToletNoticeData>(key: K, value: ToletNoticeData[K]) => {
        onChange((prev) => ({ ...prev, [key]: value }));
    };

    const tenantOptions: { id: TenantType; bn: string; en: string }[] = [
        { id: "family", bn: "ফ্যামিলি", en: "Family" },
        { id: "bachelor", bn: "ব্যাচেলর", en: "Bachelor" },
        { id: "female", bn: "ছাত্রী/মহিলা", en: "Female Only" },
        { id: "sublet", bn: "সাবলেট", en: "Sublet" },
        { id: "commercial", bn: "অফিস/বাণিজ্যিক", en: "Commercial" },
    ];

    const gasOptions: { id: GasType; bn: string; en: string }[] = [
        { id: "pipeline", bn: "লাইনের গ্যাস", en: "Pipeline Gas" },
        { id: "cylinder", bn: "সিলিন্ডার", en: "Cylinder" },
        { id: "none", bn: "গ্যাস নেই", en: "None" },
    ];

    return (
        <div className="space-y-6">
            {/* 1. Language & Target Category */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-card border border-border shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                        <Home className="size-4 text-primary" />
                        <span>{isBn ? "১. নোটিসের ধরণ ও ক্যাটাগরি" : "1. Notice Category & Language"}</span>
                    </h3>

                    {/* Notice Output Language Switcher */}
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-secondary dark:bg-surface border border-border text-xs font-bold">
                        <button
                            type="button"
                            onClick={() => updateField("language", "bn")}
                            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                                data.language === "bn"
                                    ? "bg-primary text-primary-foreground font-black shadow-xs"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            বাংলা
                        </button>
                        <button
                            type="button"
                            onClick={() => updateField("language", "en")}
                            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                                data.language === "en"
                                    ? "bg-primary text-primary-foreground font-black shadow-xs"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            English
                        </button>
                    </div>
                </div>

                {/* Tenant Category Chips */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground">
                        {isBn ? "কাদের জন্য ভাড়া হবে?" : "Tenant Category"}
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {tenantOptions.map((t) => {
                            const isSelected = data.tenantType === t.id;
                            return (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => updateField("tenantType", t.id)}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                                        isSelected
                                            ? "bg-primary text-primary-foreground border-primary shadow-xs"
                                            : "bg-surface-secondary/70 dark:bg-surface border-border text-foreground hover:border-primary/40"
                                    }`}
                                >
                                    {isBn ? t.bn : t.en}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Available Month / Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground mb-1 block">
                            {isBn ? "কবে থেকে ভাড়া হবে? (বাংলা)" : "Availability Month (Bangla)"}
                        </label>
                        <input
                            type="text"
                            value={data.monthBn}
                            onChange={(e) => updateField("monthBn", e.target.value)}
                            placeholder="যেমন: ১লা জানুয়ারি থেকে"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-muted-foreground mb-1 block">
                            {isBn ? "কবে থেকে ভাড়া হবে? (English)" : "Availability Month (English)"}
                        </label>
                        <input
                            type="text"
                            value={data.monthEn}
                            onChange={(e) => updateField("monthEn", e.target.value)}
                            placeholder="e.g. From 1st January"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                    </div>
                </div>
            </div>

            {/* 2. Room & Space Specifications */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-card border border-border shadow-xs space-y-4">
                <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                    <Home className="size-4 text-emerald-600" />
                    <span>{isBn ? "২. রুম, বাথরুম ও ফ্লোরের বিবরণ" : "2. Rooms, Bathrooms & Floor"}</span>
                </h3>

                {/* Steppers */}
                <div className="grid grid-cols-3 gap-3">
                    {/* Bedrooms */}
                    <div className="p-3 rounded-xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                        <span className="text-[11px] font-bold text-muted-foreground block">
                            {isBn ? "বেডরুম" : "Bedrooms"}
                        </span>
                        <div className="flex items-center justify-center gap-2.5">
                            <button
                                type="button"
                                onClick={() => updateField("bedrooms", Math.max(1, data.bedrooms - 1))}
                                className="size-7 rounded-lg bg-surface-secondary dark:bg-card border border-border flex items-center justify-center font-black text-sm text-foreground hover:bg-surface cursor-pointer"
                            >
                                -
                            </button>
                            <span className="text-base font-black font-mono">{data.bedrooms}</span>
                            <button
                                type="button"
                                onClick={() => updateField("bedrooms", data.bedrooms + 1)}
                                className="size-7 rounded-lg bg-surface-secondary dark:bg-card border border-border flex items-center justify-center font-black text-sm text-foreground hover:bg-surface cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="p-3 rounded-xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                        <span className="text-[11px] font-bold text-muted-foreground block">
                            {isBn ? "বাথরুম" : "Baths"}
                        </span>
                        <div className="flex items-center justify-center gap-2.5">
                            <button
                                type="button"
                                onClick={() => updateField("bathrooms", Math.max(1, data.bathrooms - 1))}
                                className="size-7 rounded-lg bg-surface-secondary dark:bg-card border border-border flex items-center justify-center font-black text-sm text-foreground hover:bg-surface cursor-pointer"
                            >
                                -
                            </button>
                            <span className="text-base font-black font-mono">{data.bathrooms}</span>
                            <button
                                type="button"
                                onClick={() => updateField("bathrooms", data.bathrooms + 1)}
                                className="size-7 rounded-lg bg-surface-secondary dark:bg-card border border-border flex items-center justify-center font-black text-sm text-foreground hover:bg-surface cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Balconies */}
                    <div className="p-3 rounded-xl bg-surface-secondary/40 dark:bg-surface border border-border text-center space-y-2">
                        <span className="text-[11px] font-bold text-muted-foreground block">
                            {isBn ? "বারান্দা" : "Balcony"}
                        </span>
                        <div className="flex items-center justify-center gap-2.5">
                            <button
                                type="button"
                                onClick={() => updateField("balconies", Math.max(0, data.balconies - 1))}
                                className="size-7 rounded-lg bg-surface-secondary dark:bg-card border border-border flex items-center justify-center font-black text-sm text-foreground hover:bg-surface cursor-pointer"
                            >
                                -
                            </button>
                            <span className="text-base font-black font-mono">{data.balconies}</span>
                            <button
                                type="button"
                                onClick={() => updateField("balconies", data.balconies + 1)}
                                className="size-7 rounded-lg bg-surface-secondary dark:bg-card border border-border flex items-center justify-center font-black text-sm text-foreground hover:bg-surface cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Floor Input & Drawing Dining Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground mb-1 block">
                            {isBn ? "কত তলা? (বাংলা)" : "Floor / Level (Bangla)"}
                        </label>
                        <input
                            type="text"
                            value={data.floorBn}
                            onChange={(e) => updateField("floorBn", e.target.value)}
                            placeholder="যেমন: ৪র্থ তলা"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-muted-foreground mb-1 block">
                            {isBn ? "Floor / Level (English)" : "Floor / Level (English)"}
                        </label>
                        <input
                            type="text"
                            value={data.floorEn}
                            onChange={(e) => updateField("floorEn", e.target.value)}
                            placeholder="e.g. 4th Floor"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                    </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-secondary/40 dark:bg-surface border border-border text-xs font-bold text-foreground cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={data.hasDrawingDining}
                            onChange={(e) => updateField("hasDrawingDining", e.target.checked)}
                            className="rounded size-4 text-primary focus:ring-primary accent-primary"
                        />
                        <span>{isBn ? "ড্রয়িং ও ডাইনিং" : "Drawing & Dining"}</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-secondary/40 dark:bg-surface border border-border text-xs font-bold text-foreground cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={data.hasLift}
                            onChange={(e) => updateField("hasLift", e.target.checked)}
                            className="rounded size-4 text-primary focus:ring-primary accent-primary"
                        />
                        <span>{isBn ? "লিফট সুবিধা" : "Lift Available"}</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-secondary/40 dark:bg-surface border border-border text-xs font-bold text-foreground cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={data.hasGenerator}
                            onChange={(e) => updateField("hasGenerator", e.target.checked)}
                            className="rounded size-4 text-primary focus:ring-primary accent-primary"
                        />
                        <span>{isBn ? "জেনারেটর ব্যাকআপ" : "Generator Backup"}</span>
                    </label>
                </div>
            </div>

            {/* 3. Gas & Facilities */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-card border border-border shadow-xs space-y-4">
                <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                    <Sparkles className="size-4 text-amber-500" />
                    <span>{isBn ? "৩. গ্যাস ও অন্যান্য সুযোগ-সুবিধা" : "3. Gas & Amenities"}</span>
                </h3>

                {/* Gas Supply Radios */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground">
                        {isBn ? "গ্যাস সরবরাহ" : "Gas Supply"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {gasOptions.map((g) => (
                            <button
                                key={g.id}
                                type="button"
                                onClick={() => updateField("gasType", g.id)}
                                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                    data.gasType === g.id
                                        ? "bg-primary text-primary-foreground border-primary shadow-xs font-black"
                                        : "bg-surface-secondary/70 dark:bg-surface border-border text-foreground hover:border-primary/40"
                                }`}
                            >
                                {isBn ? g.bn : g.en}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Additional Amenities Toggles */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-secondary/40 dark:bg-surface border border-border text-xs font-bold text-foreground cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={data.hasParking}
                            onChange={(e) => updateField("hasParking", e.target.checked)}
                            className="rounded size-4 text-primary focus:ring-primary accent-primary"
                        />
                        <span>{isBn ? "গাড়ি/বাইক পার্কিং" : "Car/Bike Parking"}</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-secondary/40 dark:bg-surface border border-border text-xs font-bold text-foreground cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={data.hasSecurityGuard}
                            onChange={(e) => updateField("hasSecurityGuard", e.target.checked)}
                            className="rounded size-4 text-primary focus:ring-primary accent-primary"
                        />
                        <span>{isBn ? "২৪ ঘণ্টা নিজস্ব দারোয়ান" : "24/7 Security Guard"}</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-secondary/40 dark:bg-surface border border-border text-xs font-bold text-foreground cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={data.hasCctv}
                            onChange={(e) => updateField("hasCctv", e.target.checked)}
                            className="rounded size-4 text-primary focus:ring-primary accent-primary"
                        />
                        <span>{isBn ? "সিসিটিভি ক্যামেরা" : "CCTV Surveillance"}</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-secondary/40 dark:bg-surface border border-border text-xs font-bold text-foreground cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={data.isSouthFacing}
                            onChange={(e) => updateField("isSouthFacing", e.target.checked)}
                            className="rounded size-4 text-primary focus:ring-primary accent-primary"
                        />
                        <span>{isBn ? "আলো-বাতাসপূর্ণ দক্ষিণমুখী" : "Airy South-Facing"}</span>
                    </label>
                </div>
            </div>

            {/* 4. Rent & Financials */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-card border border-border shadow-xs space-y-4">
                <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">৳</span>
                    <span>{isBn ? "৪. মাসিক ভাড়া ও সার্ভিস চার্জ" : "4. Rent & Financials"}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground mb-1 block">
                            {isBn ? "মাসিক ভাড়া (টাকায়)" : "Monthly Rent Amount (BDT)"}
                        </label>
                        <input
                            type="text"
                            value={data.rentAmount}
                            onChange={(e) => updateField("rentAmount", e.target.value)}
                            placeholder="যেমন: 25000"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-muted-foreground mb-1 block">
                            {isBn ? "সার্ভিস চার্জ / বিল" : "Service Charge / Utilities"}
                        </label>
                        <input
                            type="text"
                            value={data.serviceChargeBn}
                            onChange={(e) => updateField("serviceChargeBn", e.target.value)}
                            placeholder="যেমন: ৩,০০০ (গ্যাস ও পানি সহ)"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                    </div>
                </div>

                <label className="flex items-center gap-2.5 text-xs font-bold text-foreground cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={data.isNegotiable}
                        onChange={(e) => updateField("isNegotiable", e.target.checked)}
                        className="rounded size-4 text-primary focus:ring-primary accent-primary"
                    />
                    <span>{isBn ? "ভাড়া আলোচনা সাপেক্ষে (Negotiable)" : "Rent is Negotiable"}</span>
                </label>
            </div>

            {/* 5. Address & Contacts */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-card border border-border shadow-xs space-y-4">
                <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                    <MapPin className="size-4 text-rose-600" />
                    <span>{isBn ? "৫. ঠিকানা ও যোগাযোগের নম্বর" : "5. Address & Contact"}</span>
                </h3>

                {/* Address */}
                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground mb-1 block">
                            {isBn ? "পূর্ণাঙ্গ ঠিকানা (বাসা/রোড)" : "Full Address"}
                        </label>
                        <input
                            type="text"
                            value={data.addressBn}
                            onChange={(e) => updateField("addressBn", e.target.value)}
                            placeholder="যেমন: বাসা নং ১২, রোড নং ০৪, ব্লক-সি"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-muted-foreground mb-1 block">
                                {isBn ? "এলাকা" : "Area / Locality"}
                            </label>
                            <input
                                type="text"
                                value={data.areaBn}
                                onChange={(e) => updateField("areaBn", e.target.value)}
                                placeholder="যেমন: বসুন্ধরা আ/এ"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-muted-foreground mb-1 block">
                                {isBn ? "শহর" : "City"}
                            </label>
                            <input
                                type="text"
                                value={data.cityBn}
                                onChange={(e) => updateField("cityBn", e.target.value)}
                                placeholder="যেমন: ঢাকা"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Phone Numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                        <label className="text-xs font-bold text-muted-foreground mb-1 block flex items-center gap-1">
                            <PhoneCall className="size-3 text-rose-600" />
                            <span>{isBn ? "প্রধান মোবাইল নম্বর *" : "Primary Mobile No. *"}</span>
                        </label>
                        <input
                            type="tel"
                            value={data.phonePrimary}
                            onChange={(e) => updateField("phonePrimary", e.target.value)}
                            placeholder="017XX-XXXXXX"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-sm font-black font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-muted-foreground mb-1 block">
                            {isBn ? "বিকল্প মোবাইল নম্বর (ঐচ্ছিক)" : "Secondary Mobile No."}
                        </label>
                        <input
                            type="tel"
                            value={data.phoneSecondary}
                            onChange={(e) => updateField("phoneSecondary", e.target.value)}
                            placeholder="018XX-XXXXXX"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-sm font-semibold font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                    </div>
                </div>

                {/* Calling Hours */}
                <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1 block">
                        {isBn ? "যোগাযোগের সুবিধাজনক সময়" : "Preferred Calling Hours"}
                    </label>
                    <input
                        type="text"
                        value={data.contactTimeBn}
                        onChange={(e) => updateField("contactTimeBn", e.target.value)}
                        placeholder="যেমন: সকাল ১০টা - রাত ৯টা"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary/50 dark:bg-surface border border-border text-xs font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                </div>
            </div>
        </div>
    );
};

export default ToletFormEditor;
