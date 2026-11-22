"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Bath, Bed, Building, CheckCircle2, Heart, MapPin, Maximize2, ShieldCheck } from "@/components/Icons";
import { BUY_PROPERTIES } from "@/components/buy/buyData";
import { BuyCategory, BuyProperty } from "@/components/buy/types";
import { useLocale } from "@/hooks/useLocale";
import { formatLocaleNumber } from "@/lib/utils";

export const FeaturedBuyProperties = () => {
    const t = useTranslations("Home.featuredBuy");
    const { locale } = useLocale();
    const isBn = locale === "bn";
    const [selectedCategory, setSelectedCategory] = useState<BuyCategory>("all");
    const [savedIds, setSavedIds] = useState<string[]>([]);

    const categories: { label: string; value: BuyCategory }[] = [
        { label: t("categories.all"), value: "all" },
        { label: t("categories.apartments"), value: "apartments" },
        { label: t("categories.houses"), value: "houses" },
        { label: t("categories.land"), value: "land" },
        { label: t("categories.commercial"), value: "commercial" },
    ];

    const filteredProperties = selectedCategory === "all" ? BUY_PROPERTIES.slice(0, 4) : BUY_PROPERTIES.filter((p) => p.category === selectedCategory).slice(0, 4);

    const toggleSave = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSavedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    return (
        <section className="py-16 bg-background border-b border-border">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                            <Building className="w-3.5 h-3.5" />
                            <span>{t("eyebrow")}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{t("title")}</h2>
                        <p className="text-sm text-muted-foreground mt-1 max-w-xl">{t("description")}</p>
                    </div>

                    <Link href="/buy" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors group self-start md:self-auto cursor-pointer">
                        <span>{t("exploreAll")}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin mb-6">
                    {categories.map((cat) => (
                        <button key={cat.value} onClick={() => setSelectedCategory(cat.value)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${selectedCategory === cat.value ? "bg-primary text-primary-foreground shadow-xs" : "bg-white dark:bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/40"}`}>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProperties.map((property: BuyProperty) => {
                        const isSaved = savedIds.includes(property.id);
                        const image = property.images && property.images.length > 0 ? property.images[0] : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

                        const title = t.has(`items.${property.id}.title`) ? t(`items.${property.id}.title`) : property.title;
                        const badge = t.has(`items.${property.id}.badge`) ? t(`items.${property.id}.badge`) : (property.badge || property.categoryLabel);
                        const area = t.has(`items.${property.id}.area`) ? t(`items.${property.id}.area`) : property.location.area;
                        const city = t.has(`items.${property.id}.city`) ? t(`items.${property.id}.city`) : property.location.city;
                        const priceFormatted = t.has(`items.${property.id}.priceFormatted`) ? t(`items.${property.id}.priceFormatted`) : property.priceFormatted;
                        const pricePerSqft = t.has(`items.${property.id}.pricePerSqft`) ? t(`items.${property.id}.pricePerSqft`) : property.pricePerSqft;

                        return (
                            <Link key={property.id} href={`/buy/${property.slug}`} className="group bg-white dark:bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col">
                                {/* Property Image Display */}
                                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                                    <Image src={image} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                                    {/* Top Badges */}
                                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 flex-wrap">
                                        <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">{badge}</span>
                                        {property.verified && (
                                            <span className="px-2 py-1 rounded-lg bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                                                <ShieldCheck className="w-3 h-3 text-accent" />
                                                {t("verified")}
                                            </span>
                                        )}
                                    </div>

                                    {/* Save Button */}
                                    <button type="button" onClick={(e) => toggleSave(property.id, e)} aria-label="Save property" className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer ${isSaved ? "bg-rose-500 text-white border-rose-400" : "bg-black/40 text-white hover:bg-black/60"}`}>
                                        <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-white" : ""}`} />
                                    </button>

                                    {/* Price On Image Bottom */}
                                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-baseline justify-between text-white">
                                        <div className="text-lg font-extrabold text-white drop-shadow-sm">{priceFormatted}</div>
                                        <div className="text-[11px] text-white/80 font-medium font-mono">{pricePerSqft}</div>
                                    </div>
                                </div>

                                {/* Property Content */}
                                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                                            <span className="truncate">
                                                {area}, {city}
                                            </span>
                                        </div>

                                        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-10 leading-snug">{title}</h3>
                                    </div>

                                    {/* Features Strip */}
                                    <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1 font-semibold text-foreground">
                                            <Bed className="w-3.5 h-3.5 text-primary shrink-0" />
                                            <span>
                                                {formatLocaleNumber(property.beds, isBn)} {property.beds === 1 ? t("bed") : t("beds")}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 font-semibold text-foreground">
                                            <Bath className="w-3.5 h-3.5 text-primary shrink-0" />
                                            <span>
                                                {formatLocaleNumber(property.baths, isBn)} {property.baths === 1 ? t("bath") : t("baths")}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 font-semibold text-foreground">
                                            <Maximize2 className="w-3.5 h-3.5 text-primary shrink-0" />
                                            <span>{formatLocaleNumber(property.sqft.toLocaleString(), isBn)} {t("sqft")}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Trust Assurance Pill Banner */}
                <div className="mt-8 p-4 rounded-2xl bg-white dark:bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="font-bold text-foreground">{t("guaranteeTitle")}</span> <span className="text-muted-foreground">{t("guaranteeDesc")}</span>
                        </div>
                    </div>

                    <Link href="/buy" className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-hover transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs">
                        <span>{t("exploreAll")}</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBuyProperties;
