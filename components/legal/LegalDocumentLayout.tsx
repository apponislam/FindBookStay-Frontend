import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, PhoneCall } from "@/components/Icons";
import TableOfContents from "@/components/legal/TableOfContents";
import { LegalDocumentData } from "@/constants/legal";
import siteData from "@/constants/siteData";

interface LegalDocumentLayoutProps {
    data: LegalDocumentData;
}

const LegalDocumentLayout = ({ data }: LegalDocumentLayoutProps) => {
    const tocSections = data.sections.map((sec) => ({
        id: sec.id,
        number: sec.number,
        title: sec.title,
    }));

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* ============================================================== */}
            {/* 1. EDITORIAL HEADER                                            */}
            {/* ============================================================== */}
            <div className="border-b border-border bg-surface-secondary/40">
                <div className="container mx-auto px-4 py-12 lg:py-16">
                    <div className="max-w-4xl">
                        <Link href="/" className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors mb-4 group">
                            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                            <span>Back to Marketplace</span>
                        </Link>

                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold uppercase tracking-widest text-accent">{data.badge}</span>
                            <span className="text-xs text-muted-foreground">&middot;</span>
                            <span className="text-xs text-muted-foreground">Effective: {data.effectiveDate}</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">{data.title}</h1>
                        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">{data.description}</p>
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* 2. BODY CONTENT WITH TABLE OF CONTENTS SCROLLSPY               */}
            {/* ============================================================== */}
            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Interactive Table of Contents with Scrollspy */}
                    <TableOfContents sections={tocSections} contactEmail={data.contactEmail} contactLabel={data.contactLabel} />

                    {/* Main Reading Column */}
                    <main className="flex-1 max-w-3xl space-y-12 leading-relaxed text-sm sm:text-[15px] text-muted-foreground">
                        {data.sections.map((section) => (
                            <section key={section.id} id={section.id} className="scroll-mt-28 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl sm:text-2xl font-mono font-bold text-accent">{section.number}</span>
                                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">{section.title}</h2>
                                </div>

                                {section.blocks.map((block, idx) => {
                                    if (block.type === "paragraph" && block.text) {
                                        return <p key={idx}>{block.text}</p>;
                                    }

                                    if (block.type === "list" && block.items) {
                                        return (
                                            <ul key={idx} className="list-disc pl-5 space-y-1.5">
                                                {block.items.map((item, itemIdx) => (
                                                    <li key={itemIdx}>
                                                        {item.label && <strong className="text-foreground">{item.label}: </strong>}
                                                        <span>{item.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    }

                                    return null;
                                })}
                            </section>
                        ))}

                        {/* Direct Contact Card Footnote */}
                        <div className="pt-6 border-t border-border space-y-3">
                            <div className="p-4 rounded-xl border border-border bg-white dark:bg-card text-xs space-y-2">
                                <p className="font-semibold text-foreground">{data.contactDepartment}</p>
                                <p className="text-muted-foreground">{siteData.address.headquartersDisplay}</p>
                                <div className="flex items-center gap-4 pt-1 flex-wrap">
                                    <a href={`mailto:${data.contactEmail}`} className="cursor-pointer flex items-center gap-1.5 text-foreground hover:text-accent transition-colors">
                                        <Mail className="size-3.5 text-accent" />
                                        <span>{data.contactEmail}</span>
                                    </a>
                                    <a href={`tel:${siteData.contacts.phoneClean}`} className="cursor-pointer flex items-center gap-1.5 text-foreground hover:text-accent transition-colors">
                                        <PhoneCall className="size-3.5 text-accent" />
                                        <span>{siteData.contacts.phoneDisplay}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LegalDocumentLayout;
