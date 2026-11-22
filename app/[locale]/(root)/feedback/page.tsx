import React from "react";
import type { Metadata } from "next";
import siteData from "@/constants/siteData";
import FeedbackView from "@/components/feedback/FeedbackView";

export const metadata: Metadata = {
    title: `Share Feedback & App Updates | ${siteData.name}`,
    description: "Help us build a better marketplace. Share your feedback, report issues, or suggest new features for FindBookStay web and upcoming mobile apps.",
};

const FeedbackPage = () => {
    return <FeedbackView />;
};

export default FeedbackPage;
