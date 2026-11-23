"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import {
    Printer,
    Sparkles,
    CheckCircle2,
    FileText,
    QrCode,
    ShieldCheck,
    Search,
    MapPin,
    ArrowRight,
} from "lucide-react";

export const ToletHubView = () => {
    const { isBn, locale } = useLocale();

    const popularAreas = [
        { nameEn: "Mirpur", nameBn: "মিরপুর", count: "১,৪৫০+ টু-লেট", query: "Mirpur" },
        { nameEn: "Uttara", nameBn: "উত্তরা", count: "১,২০০+ টু-লেট", query: "Uttara" },
        { nameEn: "Dhanmondi", nameBn: "ধানমন্ডি", count: "৮৫০+ টু-লেট", query: "Dhanmondi" },
        { nameEn: "Bashundhara R/A", nameBn: "বসুন্ধরা আ/এ", count: "৯৮০+ টু-লেট", query: "Bashundhara" },
        { nameEn: "Mohammadpur", nameBn: "মোহাম্মদপুর", count: "৭২০+ টু-লেট", query: "Mohammadpur" },
        { nameEn: "Badda / Rampura", nameBn: "বাড্ডা / রামপুরা", count: "৬৫০+ টু-লেট", query: "Badda" },
        { nameEn: "Banani / Gulshan", nameBn: "বনানী / গুলশান", count: "৪৩০+ টু-লেট", query: "Banani" },
        { nameEn: "Chittagong", nameBn: "চট্টগ্রাম", count: "১,১০০+ টু-লেট", query: "Chittagong" },
    ];

    const benefits = [
        {
            icon: Printer,
            titleEn: "Instant A4 Print-Ready Poster",
            titleBn: "তাৎক্ষণিক A4 প্রিন্ট-রেডি নোটিস",
            descEn: "Clean typography with EkusheyLalsalu Bangla font, big readable phone numbers & specs ready for wall/gate mounting.",
            descBn: "একুশে লালসালু বাংলা ফন্ট, সুস্পষ্ট বড় অক্ষরের ফোন নম্বর এবং বাসার তথ্যাদি — গেট বা দেওয়ালে লাগানোর জন্য পারফেক্ট।",
        },
        {
            icon: QrCode,
            titleEn: "Smart QR Code Integration",
            titleBn: "স্মার্ট কিউআর কোড সুবিধা",
            descEn: "Potential tenants can scan the QR code on your printed paper poster to view photos and verify property details online.",
            descBn: "ভাড়াটিয়া পেপার পোস্টারের কিউআর কোড স্ক্যান করে মুহূর্তেই অনলাইনে বাসার ছবি ও বিস্তারিত দেখে যাচাই করতে পারবে।",
        },
        {
            icon: ShieldCheck,
            titleEn: "100% Free & No Broker Fee",
            titleBn: "১০০% ফ্রি ও কোনো দালাল ফি নেই",
            descEn: "Direct connection between house owners, bachelors, and families. No agent fees, no hidden watermarks.",
            descBn: "বাড়িওয়ালা ও ভাড়াটিয়ার সরাসরি যোগাযোগ। কোনো মাধ্যম বা থার্ড পার্টি ব্রোকার কমিশন নেই, সম্পূর্ণ ফ্রি।",
        },
        {
            icon: FileText,
            titleEn: "4 Bangladesh-Focused Themes",
            titleBn: "৪টি আকর্ষণীয় নোটিস থিম",
            descEn: "Choose between Classic Red-Black A4, Modern Emerald, Royal Navy, or Minimal Door flyer styles.",
            descBn: "চিরায়ত লাল-কালো ক্লাসিক A4, মডার্ন এমারেল্ড, রয়্যাল নেভি কিংবা মিনিমাল স্টাইল থেকে পছন্দেরটি বেছে নিন।",
        },
    ];

    const faqs = [
        {
            qEn: "How do I print the To-Let notice?",
            qBn: "টু-লেট নোটিসটি কীভাবে প্রিন্ট করব?",
            aEn: "Click 'Print A4 Poster' button in the builder. Your browser print dialog will open automatically with pre-configured A4 margins. You can print directly to an A4 paper or save as PDF.",
            aBn: "বিল্ডারে থাকা 'A4 প্রিন্ট করুন' বাটনে ক্লিক করলেই আপনার ব্রাউজারের প্রিন্ট ডায়ালগ ওপেন হবে। সেখান থেকে সরাসরি প্রিন্টারে প্রিন্ট করতে পারেন কিংবা PDF হিসেবে সেভ করে প্রিন্টের দোকানে নিয়ে যেতে পারেন।",
        },
        {
            qEn: "Can I use this for Bachelor Seats or Sublets?",
            qBn: "ব্যাচেলর সিট কিংবা সাবলেটের জন্যও কি নোটিস বানানো যাবে?",
            aEn: "Yes! Use the Quick Presets for Family Flat, Bachelor Seat/Room, or Sublet. You can customize rent, fooding/maid charges, and utility specs.",
            aBn: "হ্যাঁ, অবশ্যই! ফ্যামিলি ফ্ল্যাট, ব্যাচেলর সিট বা সাবলেট রুমের জন্য আলাদা প্রিসেট রয়েছে। সিট ভাড়া, বুয়ার বিল কিংবা ওয়াইফাই সহ সব তথ্য আলাদাভাবে যুক্ত করা যায়।",
        },
        {
            qEn: "Is there any watermark on the printed paper?",
            qBn: "প্রিন্ট করা নোটিসে কি কোনো ওয়াটারমার্ক থাকবে?",
            aEn: "No. The printed flyer is clean, professional, and free of any intrusive watermarks. It is designed specifically for gates, notice boards, and building entrances.",
            aBn: "না, প্রিন্ট হওয়া নোটিসটিতে কোনো অনাকাঙ্ক্ষিত ওয়াটারমার্ক থাকবে না। এটি গেটে, দেওয়ালে কিংবা নোটিস বোর্ডে লাগানোর জন্য একদম প্রফেশনাল ও পরিচ্ছন্ন।",
        },
    ];

    return (
        <div className="w-full flex flex-col bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-radial-[at_top] from-primary/10 via-background to-background border-b border-border py-14 sm:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
                        <Sparkles className="size-3.5 text-primary" />
                        <span>
                            {isBn
                                ? "বাংলাদেশের প্রথম ডিজিটাল টু-লেট ও নোটিস মেকার"
                                : "Bangladesh's #1 Digital To-Let & Notice Maker"}
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight max-w-4xl leading-tight sm:leading-tight">
                        {isBn ? (
                            <>
                                প্রফেশনাল <span className="text-primary underline decoration-primary/30 decoration-wavy">টু-লেট নোটিস</span> তৈরি করুন — সম্পূর্ণ বিনামূল্যে
                            </>
                        ) : (
                            <>
                                Create Professional <span className="text-primary underline decoration-primary/30 decoration-wavy">To-Let Posters</span> & Notices — 100% Free
                            </>
                        )}
                    </h1>

                    {/* Subhead */}
                    <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl">
                        {isBn
                            ? "ফ্যামিলি ফ্ল্যাট, ব্যাচেলর সিট কিংবা সাবলেটের জন্য এক ক্লিকেই প্রিন্ট-রেডি A4 নোটিস বানান। দেওয়ালে লাগান কিংবা সোশ্যাল মিডিয়ায় শেয়ার করুন।"
                            : "Generate print-ready A4 flyers for family flats, bachelor rooms, or sublets. Hang on gates or share on Facebook & WhatsApp."}
                    </p>

                    {/* Hero Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <Link
                            href={`/${locale}/tolet/builder`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm sm:text-base shadow-lg shadow-primary/25 hover:bg-primary/95 hover:scale-103 transition-all cursor-pointer"
                        >
                            <Printer className="size-5" />
                            <span>{isBn ? "ফ্রি নোটিস তৈরি করুন" : "Create Free Notice"}</span>
                            <ArrowRight className="size-4" />
                        </Link>

                        <Link
                            href={`/${locale}/rent`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-card border border-border text-foreground font-bold text-sm sm:text-base hover:bg-muted transition-all cursor-pointer"
                        >
                            <Search className="size-4.5 text-muted-foreground" />
                            <span>{isBn ? "ভাড়া বাসা খুঁজুন" : "Browse Rental Listings"}</span>
                        </Link>
                    </div>

                    {/* Key Trust Highlights */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="size-4 text-emerald-500" />
                            {isBn ? "A4 সাইজ পারফেক্ট" : "A4 Print Perfect"}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="size-4 text-emerald-500" />
                            {isBn ? "কোনো রেজিস্ট্রেশন আবশ্যক নয়" : "No Sign-Up Required"}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="size-4 text-emerald-500" />
                            {isBn ? "স্মার্ট কিউআর কোড" : "Smart QR Code Ready"}
                        </span>
                    </div>
                </div>
            </section>

            {/* Benefits & Features Grid */}
            <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                        {isBn ? "কেন FindBookStay টু-লেট বিল্ডার ব্যবহার করবেন?" : "Why Use FindBookStay To-Let Builder?"}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                        {isBn
                            ? "প্রচলিত সাদা কাগজে হাতে লেখার দিন শেষ। সহজে তৈরি করুন দৃষ্টিনন্দন ও তথ্যবহুল নোটিস।"
                            : "No more handwritten pen notes on paper. Create clean, structured notices that attract tenants faster."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((b, idx) => {
                        const Icon = b.icon;
                        return (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col items-start gap-4"
                            >
                                <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <Icon className="size-6" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-foreground">
                                        {isBn ? b.titleBn : b.titleEn}
                                    </h3>
                                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {isBn ? b.descBn : b.descEn}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Popular Dhaka / BD Areas */}
            <section className="py-12 bg-muted/30 border-y border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
                                <MapPin className="size-5 text-primary" />
                                <span>{isBn ? "জনপ্রিয় এলাকাগুলোতে টু-লেট" : "Popular To-Let Locations"}</span>
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                {isBn
                                    ? "আপনার পছন্দের এলাকায় বাসা বা সিট ভাড়া খুঁজুন"
                                    : "Find flats and rooms in prime residential hubs"}
                            </p>
                        </div>

                        <Link
                            href={`/${locale}/rent`}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline"
                        >
                            <span>{isBn ? "সব এলাকা দেখুন" : "View All Locations"}</span>
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                        {popularAreas.map((area, idx) => (
                            <Link
                                key={idx}
                                href={`/${locale}/rent?area=${encodeURIComponent(area.query)}`}
                                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-xs transition-all flex flex-col justify-between group"
                            >
                                <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                                    {isBn ? area.nameBn : area.nameEn}
                                </span>
                                <span className="text-[11px] text-muted-foreground mt-1">
                                    {area.count}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-extrabold text-foreground">
                        {isBn ? "সাধারণ জিজ্ঞাসা (FAQ)" : "Frequently Asked Questions"}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {isBn
                            ? "টু-লেট নোটিস বিল্ডার সম্পর্কিত প্রয়োজনীয় তথ্যাদি"
                            : "Everything you need to know about creating To-Let notices"}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="p-5 rounded-2xl bg-card border border-border shadow-xs flex flex-col gap-2"
                        >
                            <h3 className="text-sm sm:text-base font-bold text-foreground">
                                {isBn ? faq.qBn : faq.qEn}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {isBn ? faq.aBn : faq.aEn}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Final Call To Action Banner */}
                <div className="mt-12 p-8 rounded-3xl bg-primary text-primary-foreground text-center flex flex-col items-center shadow-xl shadow-primary/20">
                    <h3 className="text-xl sm:text-2xl font-black">
                        {isBn ? "এখনই তৈরি করুন আপনার টু-লেট নোটিস" : "Ready to Create Your To-Let Poster?"}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-primary-foreground/90 max-w-xl">
                        {isBn
                            ? "মাত্র ২ মিনিটে তথ্য দিয়ে ডাউনলোড বা প্রিন্ট করুন। কোনো ফি নেই।"
                            : "It takes under 2 minutes. Fill details, choose a theme, and print instantly."}
                    </p>
                    <Link
                        href={`/${locale}/tolet/builder`}
                        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-primary font-black text-sm shadow-md hover:bg-white/95 hover:scale-103 transition-all cursor-pointer"
                    >
                        <Printer className="size-4.5" />
                        <span>{isBn ? "নোটিস মেকার শুরু করুন" : "Launch Notice Maker"}</span>
                    </Link>
                </div>
            </section>
        </div>
    );
};
