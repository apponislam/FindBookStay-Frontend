import React from "react";
import type { Metadata } from "next";
import SavedView from "@/components/saved/SavedView";

export const metadata: Metadata = {
    title: "Saved Listings & Bookmarks | FindBookStay",
    description: "View your saved rental apartments, vacation resorts, and sports arenas on FindBookStay.",
};

const SavedPage = () => {
    return <SavedView />;
};

export default SavedPage;
