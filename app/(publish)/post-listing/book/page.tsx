import { Metadata } from "next";
import BookStepWizard from "@/components/publish/BookStepWizard";

export const metadata: Metadata = {
    title: "Post Resort, Hotel & Stay | FindBookStay Studio",
    description: "Publish your boutique resort, hotel rooms, or vacation villas to thousands of travelers across Bangladesh.",
};

export default function PublishBookPage() {
    return <BookStepWizard />;
}

