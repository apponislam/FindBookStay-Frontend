import { Metadata } from "next";
import BuyStepWizard from "@/components/publish/BuyStepWizard";

export const metadata: Metadata = {
    title: "Post Property For Sale | FindBookStay Studio",
    description: "Sell your residential flat, plot, duplex, or commercial real estate with zero middleman commissions.",
};

export default function PublishBuyPage() {
    return <BuyStepWizard />;
}

