"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare } from "@/components/Icons";
import { useRouter } from "@/i18n/navigation";
import {
    INITIAL_CONVERSATIONS,
    ConversationItem,
    ChatMessage,
} from "@/constants/messagesData";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";
import { MessageNavRail, FilterTab } from "./MessageNavRail";
import { ConversationSidebar } from "./ConversationSidebar";
import { ChatHeader } from "./ChatHeader";
import { ChatListingBanner } from "./ChatListingBanner";
import { ChatMessageList } from "./ChatMessageList";
import { ChatQuickReplies } from "./ChatQuickReplies";
import { ChatInputComposer } from "./ChatInputComposer";
import { ChatDetailsSidebar } from "./ChatDetailsSidebar";

let messageSeed = 3000;
function createMessageId(prefix: string): string {
    messageSeed += 1;
    return `${prefix}-${messageSeed}`;
}

function getCurrentTimeString(): string {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

interface MessageViewProps {
    initialConvId?: string;
}

export const MessageView = ({ initialConvId }: MessageViewProps = {}) => {
    const { isBn } = useLocale();
    const router = useRouter();

    const [conversations, setConversations] = useState<ConversationItem[]>(INITIAL_CONVERSATIONS);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // If initialConvId is provided (e.g. /message/[slug]), match it; otherwise at /message no conversation is selected at first
    const activeConvId = selectedId !== null ? selectedId : (initialConvId || "");
    const activeConversation = activeConvId
        ? conversations.find(
              (c) =>
                  c.id === activeConvId ||
                  c.listing.id === activeConvId ||
                  c.listing.href.endsWith(`/${activeConvId}`) ||
                  c.listing.href.endsWith(activeConvId)
          )
        : undefined;

    const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [inputText, setInputText] = useState("");
    const [desktopDetailsOpen, setDesktopDetailsOpen] = useState(true);
    const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false);
    const [mobileChatOpen, setMobileChatOpen] = useState(Boolean(initialConvId));

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);

    const handleToggleDetails = () => {
        setDesktopDetailsOpen((prev) => !prev);
        setMobileDetailsOpen((prev) => !prev);
    };

    const handleOpenDetails = () => {
        setDesktopDetailsOpen(true);
        setMobileDetailsOpen(true);
    };

    const handleCloseDetails = () => {
        setDesktopDetailsOpen(false);
        setMobileDetailsOpen(false);
    };

    // Scroll down on active chat change or new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeConvId, activeConversation?.messages]);

    const totalUnreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

    // Filter conversations by tab and search query
    const filteredConversations = conversations.filter((c) => {
        if (activeFilter === "unread" && c.unreadCount === 0) return false;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const participantMatch =
                c.participant.name.toLowerCase().includes(query) ||
                c.participant.nameBn.toLowerCase().includes(query);
            const titleMatch =
                c.listing.title.toLowerCase().includes(query) ||
                c.listing.titleBn.toLowerCase().includes(query);
            const messageMatch = c.messages.some(
                (m) =>
                    m.text.toLowerCase().includes(query) ||
                    (m.textBn && m.textBn.toLowerCase().includes(query))
            );
            return participantMatch || titleMatch || messageMatch;
        }

        return true;
    });

    const handleSendMessage = (textToSend?: string) => {
        const text = (textToSend || inputText).trim();
        if (!text || !activeConversation) return;

        const timeString = getCurrentTimeString();

        const newMessage: ChatMessage = {
            id: createMessageId("msg"),
            sender: "me",
            text,
            textBn: text,
            timestamp: timeString,
            timestampBn: isBn ? toBengaliDigits(timeString) : timeString,
            status: "delivered",
        };

        setConversations((prev) =>
            prev.map((conv) => {
                if (conv.id === activeConversation.id) {
                    return {
                        ...conv,
                        messages: [...conv.messages, newMessage],
                        lastMessageTime: "Just now",
                        lastMessageTimeBn: "এইমাত্র",
                        unreadCount: 0,
                    };
                }
                return conv;
            })
        );

        setInputText("");

        // Simulated friendly response
        setTimeout(() => {
            const repliesBn = [
                "ধন্যবাদ আপনার বার্তার জন্য! আমি বিষয়টি যাচাই করে আপনাকে নিশ্চিত করছি।",
                "আপনার অনুরোধ পেয়েছি। শীঘ্রই বিস্তারিত সময়সূচি ও তথ্য পাঠাচ্ছি।",
                "ইনশাআল্লাহ, বিষয়টি কনফার্ম। সরাসরি কথা বলতে চাইলে নির্দ্বিধায় কল করতে পারেন।",
            ];
            const repliesEn = [
                "Thank you for reaching out! Let me check the schedule and get back to you shortly.",
                "Inquiry received! I'm reviewing the details right now.",
                "Confirmed! Feel free to call directly if you need any urgent assistance.",
            ];

            const replyText = isBn
                ? repliesBn[Math.floor(Math.random() * repliesBn.length)]
                : repliesEn[Math.floor(Math.random() * repliesEn.length)];

            const autoTime = getCurrentTimeString();
            const autoReply: ChatMessage = {
                id: createMessageId("auto"),
                sender: "them",
                text: replyText,
                textBn: replyText,
                timestamp: autoTime,
                timestampBn: isBn ? toBengaliDigits(autoTime) : undefined,
                status: "delivered",
            };

            setConversations((prev) =>
                prev.map((conv) => {
                    if (conv.id === activeConversation.id) {
                        return {
                            ...conv,
                            messages: [...conv.messages, autoReply],
                            lastMessageTime: "Just now",
                            lastMessageTimeBn: "এইমাত্র",
                        };
                    }
                    return conv;
                })
            );
        }, 1200);
    };

    const handleSelectConversation = (id: string) => {
        setSelectedId(id);
        setMobileChatOpen(true);
        setConversations((prev) =>
            prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
        );
        router.push(`/message/${id}`);
    };

    const handleBackToConversations = () => {
        setMobileChatOpen(false);
        setSelectedId("");
        router.push("/message");
    };

    const handleAttachMedia = () => {
        const sampleImg = prompt(
            isBn ? "ছবির লিঙ্ক প্রবেশ করান:" : "Enter image URL to share in chat:"
        );
        if (sampleImg) {
            handleSendMessage(`[Photo Shared]: ${sampleImg}`);
        }
    };

    return (
        <div className="h-dvh w-screen overflow-hidden flex bg-background text-foreground antialiased select-none">
            {/* 1. Left Slim Navigation Rail */}
            <MessageNavRail
                activeFilter={activeFilter}
                onSelectFilter={setActiveFilter}
                totalUnreadCount={totalUnreadCount}
            />

            {/* 2. Conversations Sidebar */}
            <ConversationSidebar
                conversations={filteredConversations}
                activeConvId={activeConvId}
                onSelectConversation={handleSelectConversation}
                activeFilter={activeFilter}
                onSelectFilter={setActiveFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                mobileChatOpen={mobileChatOpen}
            />

            {/* 3. Center Main Chat Stream */}
            <main
                className={`flex-1 flex flex-col h-full bg-surface-secondary/20 dark:bg-background min-w-0 ${
                    mobileChatOpen ? "flex" : "hidden md:flex"
                }`}
            >
                {activeConversation ? (
                    <>
                        {/* Chat Header */}
                        <ChatHeader
                            participant={activeConversation.participant}
                            onBack={handleBackToConversations}
                            onToggleInfo={handleToggleDetails}
                        />

                        {/* Pinned Listing Banner */}
                        <ChatListingBanner
                            listing={activeConversation.listing}
                            onOpenDetails={handleOpenDetails}
                        />

                        {/* Chat Messages */}
                        <ChatMessageList
                            messages={activeConversation.messages}
                            participant={activeConversation.participant}
                            bottomRef={messagesEndRef}
                        />

                        {/* Quick Replies */}
                        <ChatQuickReplies
                            quickReplies={activeConversation.quickReplies}
                            onSelectReply={handleSendMessage}
                        />

                        {/* Composer Bar */}
                        <ChatInputComposer
                            inputText={inputText}
                            onInputChange={setInputText}
                            onSubmit={() => handleSendMessage()}
                            inputRef={chatInputRef}
                            onAttachMedia={handleAttachMedia}
                        />
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                        <div className="size-20 rounded-3xl bg-surface-secondary/80 dark:bg-surface border border-border flex items-center justify-center text-muted-foreground/60 shadow-xs">
                            <MessageSquare className="size-10 text-primary/70" />
                        </div>
                        <div className="space-y-1.5 max-w-sm">
                            <h3 className="text-lg font-black text-foreground">
                                {isBn ? "কোনো কথোপকথন নির্বাচন করা হয়নি" : "Select a Conversation"}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {isBn
                                    ? "বার্তা দেখতে ও সরাসরি চ্যাট করতে বাম পাশের তালিকা থেকে যেকোনো কথোপকথন নির্বাচন করুন।"
                                    : "Choose an inquiry from the sidebar to view messages and details."}
                            </p>
                        </div>
                    </div>
                )}
            </main>

            {/* 4. Right Listing & Host Inspector Panel (Responsive desktop + mobile drawer) */}
            {activeConversation && (
                <ChatDetailsSidebar
                    conversation={activeConversation}
                    desktopOpen={desktopDetailsOpen}
                    mobileOpen={mobileDetailsOpen}
                    onClose={handleCloseDetails}
                />
            )}
        </div>
    );
};

export default MessageView;
