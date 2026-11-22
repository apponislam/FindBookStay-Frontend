import { Metadata } from "next";
import SportsStepWizard from "@/components/publish/SportsStepWizard";

export const metadata: Metadata = {
    title: "Post Sports Turf & Arena | FindBookStay Studio",
    description: "Publish your football turf, indoor cricket arena, or badminton court for hourly slot bookings.",
};

export default function PublishSportsPage() {
    return <SportsStepWizard />;
}

