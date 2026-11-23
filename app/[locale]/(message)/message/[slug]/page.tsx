import React from "react";
import type { Metadata } from "next";
import MessageView from "@/components/message/MessageView";
import { INITIAL_CONVERSATIONS } from "@/constants/messagesData";

interface PageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    const conv = slug
        ? INITIAL_CONVERSATIONS.find(
              (c) => c.id === slug || c.listing.href.endsWith(`/${slug}`) || c.listing.id === slug
          )
        : undefined;

    if (conv) {
        return {
            title: `Chat with ${conv.participant.name} | FindBookStay Messages`,
            description: `Live message thread with verified host ${conv.participant.name} on FindBookStay.`,
        };
    }

    return {
        title: "Conversation | FindBookStay Messages",
        description: "Manage inquiries and live conversations with verified hosts and guests on FindBookStay.",
    };
}

export async function generateStaticParams() {
    return INITIAL_CONVERSATIONS.map((c) => ({
        slug: c.id,
    }));
}

export default async function ConversationPage({ params }: PageProps) {
    const { slug } = await params;
    return <MessageView initialConvId={decodeURIComponent(slug)} />;
}

