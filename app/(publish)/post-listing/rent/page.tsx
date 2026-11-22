import { Metadata } from "next";
import RentStepWizard from "@/components/publish/RentStepWizard";

export const metadata: Metadata = {
    title: "Post Property For Rent | FindBookStay Studio",
    description: "Publish your apartment, bachelor seat, sublet, or duplex for rent with 0% brokerage fee.",
};

export default function PublishRentPage() {
    return <RentStepWizard />;
}

