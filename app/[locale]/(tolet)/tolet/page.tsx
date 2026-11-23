import React from "react";
import { Metadata } from "next";
import { ToletHubView } from "@/components/tolet/ToletHubView";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isBn = locale === "bn";

    return {
        title: isBn
            ? "ডিজিটাল টু-লেট নোটিস ও রেন্টাল হাব | FindBookStay"
            : "Digital To-Let Notice & Rental Hub | FindBookStay",
        description: isBn
            ? "বিনামূল্যে প্রফেশনাল A4 টু-লেট নোটিস ও পোস্টার তৈরি করুন। ফ্যামিলি বাসা, ব্যাচেলর সিট কিংবা সাবলেটের জন্য এক ক্লিকেই প্রিন্ট-রেডি ফরম্যাট।"
            : "Generate professional A4 To-Let posters and printable notices for free. Perfect for family flats, bachelor rooms, and sublet rentals across Bangladesh.",
    };
}

export default function ToletHubPage() {
    return <ToletHubView />;
}
