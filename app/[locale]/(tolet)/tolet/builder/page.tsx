import React from "react";
import { Metadata } from "next";
import { ToletBuilderContainer } from "@/components/tolet/builder/ToletBuilderContainer";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isBn = locale === "bn";

    return {
        title: isBn
            ? "ফ্রি A4 টু-লেট নোটিস ও পোস্টার বিল্ডার | FindBookStay"
            : "Free A4 To-Let Notice & Poster Builder | FindBookStay",
        description: isBn
            ? "মাত্র ২ মিনিটে তৈরি করুন বাসা ভাড়ার আকর্ষণীয় A4 নোটিস। এক ক্লিকে প্রিন্ট করুন কিংবা ডাউনলোড করুন।"
            : "Create, customize, and print high-quality A4 To-Let rental flyers and door notices in under 2 minutes.",
    };
}

export default function ToletBuilderPage() {
    return <ToletBuilderContainer />;
}
