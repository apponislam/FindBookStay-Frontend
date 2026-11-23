import { Metadata } from "next";
import MessageView from "@/components/message/MessageView";

export const metadata: Metadata = {
    title: "Messages & Inquiries | FindBookStay",
    description: "Manage inquiries and live conversations with verified hosts, landlords, and guests on FindBookStay.",
};

export default function MessagePage() {
    return <MessageView />;
}
