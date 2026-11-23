"use client";

import React, { forwardRef } from "react";
import { PhoneCall, MapPin, Home, ShieldCheck, CheckCircle2 } from "lucide-react";
import { ToletNoticeData, THEME_CONFIGS } from "../toletData";
import { toBengaliDigits } from "@/lib/utils";

interface ToletNoticePreviewProps {
    data: ToletNoticeData;
}

export const ToletNoticePreview = forwardRef<HTMLDivElement, ToletNoticePreviewProps>(({ data }, ref) => {
    const theme = THEME_CONFIGS[data.theme] || THEME_CONFIGS.classic_a4;
    const isBn = data.language === "bn";

    const tenantLabels: Record<string, { bn: string; en: string }> = {
        family: { bn: "ফ্যামিলি বাসা ভাড়া", en: "Family Rental Flat" },
        bachelor: { bn: "ব্যাচেলর বাসা ভাড়া", en: "Bachelor Rental Flat" },
        female: { bn: "ছাত্রী / কর্মজীবী মহিলা", en: "Female / Working Women" },
        sublet: { bn: "সাবলেট রুম ভাড়া", en: "Sublet Room Rental" },
        commercial: { bn: "অফিস / বাণিজ্যিক স্পেস", en: "Commercial Space / Office" },
    };

    const currentTenant = tenantLabels[data.tenantType] || tenantLabels.family;

    return (
        <div
            ref={ref}
            id="tolet-printable-poster"
            className={`w-full max-w-135 mx-auto aspect-[1/1.414] ${theme.bgClass} ${theme.borderClass} ${theme.paperShadow} p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 font-sans select-none print:max-w-none print:w-[210mm] print:h-[297mm] print:border-4 print:p-10 print:shadow-none print:m-0 print:aspect-auto`}
        >
            {/* Decorative Top Accent Bar */}
            <div className="space-y-4">
                {/* Header Banner */}
                <div className={`${theme.headerBg} rounded-xl p-4 text-center shadow-md border-b-2 border-black/10`}>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-wider uppercase drop-shadow-sm font-mono">{isBn ? data.titleBn : data.titleEn}</h1>
                    <p className="text-sm sm:text-base font-bold mt-1 tracking-wide opacity-95">{isBn ? data.monthBn : data.monthEn}</p>
                </div>

                {/* Target Tenant Category Tag */}
                <div className="flex items-center justify-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs border ${theme.id === "classic_a4" ? "bg-black text-white border-black" : theme.id === "modern_emerald" ? "bg-emerald-700 text-white border-emerald-800" : "bg-slate-900 text-amber-300 border-slate-800"}`}>{isBn ? currentTenant.bn : currentTenant.en}</span>
                </div>

                {/* Core Property Specifications Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                    <div className="p-2.5 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 space-y-0.5">
                        <span className="text-[10px] sm:text-xs font-bold text-muted-foreground block uppercase">{isBn ? "বেডরুম" : "Bedrooms"}</span>
                        <span className="text-xl sm:text-2xl font-black font-mono">{isBn ? toBengaliDigits(data.bedrooms) : data.bedrooms}</span>
                    </div>

                    <div className="p-2.5 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 space-y-0.5">
                        <span className="text-[10px] sm:text-xs font-bold text-muted-foreground block uppercase">{isBn ? "বাথরুম" : "Baths"}</span>
                        <span className="text-xl sm:text-2xl font-black font-mono">{isBn ? toBengaliDigits(data.bathrooms) : data.bathrooms}</span>
                    </div>

                    <div className="p-2.5 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 space-y-0.5">
                        <span className="text-[10px] sm:text-xs font-bold text-muted-foreground block uppercase">{isBn ? "বারান্দা" : "Balcony"}</span>
                        <span className="text-xl sm:text-2xl font-black font-mono">{isBn ? toBengaliDigits(data.balconies) : data.balconies}</span>
                    </div>
                </div>

                {/* Room Layout & Floor Highlights */}
                <div className="p-3 rounded-xl border border-current/20 bg-black/5 dark:bg-white/5 flex items-center justify-between text-xs sm:text-[13px] font-bold">
                    <div className="flex items-center gap-1.5">
                        <Home className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{isBn ? `${data.floorBn} (${data.hasDrawingDining ? "ড্রয়িং ও ডাইনিং স্পেস সহ" : "রুম"})` : `${data.floorEn} (${data.hasDrawingDining ? "Drawing & Dining Included" : "Spacious"})`}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase">
                        {data.hasLift && <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">{isBn ? "লিফট" : "Lift"}</span>}
                        {data.hasGenerator && <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">{isBn ? "জেনারেটর" : "Gen"}</span>}
                    </div>
                </div>

                {/* Key Amenities Checklist */}
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-[12.5px] font-semibold pt-1">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                        <span>{data.gasType === "pipeline" ? (isBn ? "লাইনের তিতাস গ্যাস" : "Titas Pipeline Gas") : data.gasType === "cylinder" ? (isBn ? "সিলিন্ডার গ্যাস সুবিধা" : "Cylinder Gas Supply") : isBn ? "গ্যাস সংযোগ নেই" : "No Gas Connection"}</span>
                    </div>

                    {data.hasParking && (
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                            <span>{isBn ? "গাড়ি ও বাইক পার্কিং" : "Car & Bike Parking"}</span>
                        </div>
                    )}

                    {data.hasSecurityGuard && (
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                            <span>{isBn ? "২৪ ঘণ্টা নিজস্ব দারোয়ান" : "24/7 Security Guard"}</span>
                        </div>
                    )}

                    {data.hasCctv && (
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                            <span>{isBn ? "সিসিটিভি ক্যামেরা নিরাপত্তা" : "CCTV Surveillance"}</span>
                        </div>
                    )}

                    {data.hasWifi && (
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                            <span>{isBn ? "হাই স্পিড ওয়াইফাই সংযোগ" : "High-Speed WiFi"}</span>
                        </div>
                    )}

                    {data.isSouthFacing && (
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                            <span>{isBn ? "আলো-বাতাসপূর্ণ দক্ষিণমুখী" : "Airy South-Facing"}</span>
                        </div>
                    )}
                </div>

                {/* Custom Note */}
                {(data.customNoteBn || data.customNoteEn) && <p className="text-[11px] sm:text-xs text-muted-foreground italic border-l-2 border-current/30 pl-2.5 py-0.5">&ldquo;{isBn ? data.customNoteBn : data.customNoteEn}&rdquo;</p>}
            </div>

            {/* Bottom Section: Rent, Address, Contacts & QR Code */}
            <div className="space-y-4 pt-4 border-t-2 border-current/20">
                {/* Financials Strip */}
                <div className="flex items-baseline justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-current/20">
                    <div>
                        <span className="text-[10px] sm:text-xs text-muted-foreground uppercase font-bold block">{isBn ? "মাসিক ভাড়া" : "Monthly Rent"}</span>
                        <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400">৳{isBn ? data.rentAmountBn : data.rentAmount}</span>
                        {data.isNegotiable && <span className="text-[11px] font-semibold text-muted-foreground ml-1.5">{isBn ? "(আলোচনা সাপেক্ষে)" : "(Negotiable)"}</span>}
                    </div>

                    {data.serviceCharge && (
                        <div className="text-right">
                            <span className="text-[10px] sm:text-xs text-muted-foreground uppercase font-bold block">{isBn ? "সার্ভিস চার্জ" : "Service Charge"}</span>
                            <span className="text-xs sm:text-sm font-bold">{isBn ? data.serviceChargeBn : data.serviceCharge}</span>
                        </div>
                    )}
                </div>

                {/* Address Location */}
                <div className="flex items-start gap-2 text-xs sm:text-[13px] font-bold">
                    <MapPin className="size-4 shrink-0 text-rose-600 mt-0.5" />
                    <div>
                        <p className="leading-snug">{isBn ? data.addressBn : data.addressEn}</p>
                        <p className="text-muted-foreground font-semibold text-[11px]">{isBn ? `${data.areaBn}, ${data.cityBn}` : `${data.areaEn}, ${data.cityEn}`}</p>
                    </div>
                </div>

                {/* Contact Callouts & QR Code */}
                <div className="flex items-center justify-between gap-3 pt-2">
                    <div className="space-y-1">
                        <span className="text-[10px] sm:text-xs text-muted-foreground uppercase font-black block tracking-wider">{isBn ? "সরাসরি যোগাযোগ করুন:" : "Direct Contact:"}</span>
                        <div className="flex items-center gap-1.5 text-lg sm:text-2xl font-black font-mono tracking-tight text-rose-700 dark:text-rose-400">
                            <PhoneCall className="size-5 shrink-0" />
                            <span>{data.phonePrimary}</span>
                        </div>
                        {data.phoneSecondary && <p className="text-xs sm:text-sm font-bold font-mono text-muted-foreground pl-6">{data.phoneSecondary}</p>}
                        <p className="text-[10px] text-muted-foreground font-medium pl-6">{isBn ? `যোগাযোগের সময়: ${data.contactTimeBn}` : `Call Hours: ${data.contactTimeEn}`}</p>
                    </div>

                    {/* QR Code for Online Verification */}
                    {data.showQrCode && (
                        <div className="shrink-0 flex flex-col items-center p-2 rounded-xl bg-white border border-black/10 shadow-sm text-center">
                            <div className="size-16 sm:size-18 relative">
                                {/* Standalone SVG QR Code representation */}
                                <svg viewBox="0 0 100 100" className="size-full">
                                    <rect width="100" height="100" fill="#ffffff" />
                                    {/* Corner Position Marks */}
                                    <rect x="5" y="5" width="28" height="28" fill="#01244b" />
                                    <rect x="9" y="9" width="20" height="20" fill="#ffffff" />
                                    <rect x="13" y="13" width="12" height="12" fill="#01244b" />

                                    <rect x="67" y="5" width="28" height="28" fill="#01244b" />
                                    <rect x="71" y="9" width="20" height="20" fill="#ffffff" />
                                    <rect x="75" y="13" width="12" height="12" fill="#01244b" />

                                    <rect x="5" y="67" width="28" height="28" fill="#01244b" />
                                    <rect x="9" y="71" width="20" height="20" fill="#ffffff" />
                                    <rect x="13" y="75" width="12" height="12" fill="#01244b" />

                                    {/* Data Pixels */}
                                    <rect x="38" y="10" width="8" height="8" fill="#01244b" />
                                    <rect x="52" y="16" width="8" height="8" fill="#00b6ac" />
                                    <rect x="38" y="38" width="12" height="12" fill="#00b6ac" />
                                    <rect x="54" y="42" width="10" height="10" fill="#01244b" />
                                    <rect x="72" y="50" width="8" height="8" fill="#00b6ac" />
                                    <rect x="40" y="68" width="10" height="10" fill="#01244b" />
                                    <rect x="56" y="72" width="8" height="8" fill="#01244b" />
                                    <rect x="70" y="80" width="12" height="12" fill="#00b6ac" />
                                </svg>
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-tighter text-slate-800 mt-1">FindBookStay</span>
                        </div>
                    )}
                </div>

                {/* Official FindBookStay Verification Watermark Footnote */}
                <div className="pt-2 flex items-center justify-between text-[9px] text-muted-foreground/80 font-bold border-t border-current/10">
                    <span className="flex items-center gap-1">
                        <ShieldCheck className="size-3 text-emerald-600" />
                        <span>FindBookStay টু-লেট ভেরিফাইড পোর্টাল</span>
                    </span>
                    <span>findbookstay.com/tolet</span>
                </div>
            </div>
        </div>
    );
});

ToletNoticePreview.displayName = "ToletNoticePreview";

export default ToletNoticePreview;
