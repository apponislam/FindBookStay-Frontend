"use client";

import React from "react";
import { Search, X, SlidersHorizontal } from "@/components/Icons";
import { ConversationItem } from "@/constants/messagesData";
import { ConversationItemCard } from "./ConversationItemCard";
import { FilterTab } from "./MessageNavRail";
import { useLocale } from "@/hooks/useLocale";
import { toBengaliDigits } from "@/lib/utils";
import LanguageSwitch from "@/components/header/LanguageSwitch";
import { ModeToggle } from "@/components/mode-toggle";

interface ConversationSidebarProps {
    conversations: ConversationItem[];
    activeConvId: string;
    onSelectConversation: (id: string) => void;
    activeFilter: FilterTab;
    onSelectFilter: (tab: FilterTab) => void;
    searchQuery: string;
    onSearchChange: (q: string) => void;
    mobileChatOpen: boolean;
}

export const ConversationSidebar = ({ conversations, activeConvId, onSelectConversation, activeFilter, onSelectFilter, searchQuery, onSearchChange, mobileChatOpen }: ConversationSidebarProps) => {
    const { isBn } = useLocale();

    return (
        <section className={`w-full md:w-80 lg:w-96 shrink-0 bg-white dark:bg-card border-r border-border flex flex-col h-full z-10 select-none ${mobileChatOpen ? "hidden md:flex" : "flex"}`}>
            {/* Header: Title, Mobile Controls, and Search */}
            <div className="p-4 border-b border-border space-y-3.5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-black text-foreground tracking-tight">{isBn ? "কথোপকথন" : "Messages"}</h2>
                        <span className="px-2 py-0.5 rounded-full text-xs font-black bg-surface-secondary dark:bg-surface text-muted-foreground">{isBn ? toBengaliDigits(conversations.length) : conversations.length}</span>
                    </div>

                    <div className="flex items-center gap-1.5 md:hidden">
                        <LanguageSwitch variant="compact" align="right" />
                        <ModeToggle className="size-8" />
                    </div>
                </div>

                {/* Search Field */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={isBn ? "নাম, লিস্টিং বা মেসেজ খুঁজুন..." : "Search hosts, listings or chats..."}
                        className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-surface-secondary/70 dark:bg-surface border border-border text-xs font-medium text-foreground placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                    {searchQuery && (
                        <button type="button" onClick={() => onSearchChange("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 size-5 rounded-full hover:bg-surface flex items-center justify-center text-muted-foreground cursor-pointer">
                            <X className="size-3" />
                        </button>
                    )}
                </div>

                {/* Filter Tabs (All and Unread only) */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5 text-xs font-bold">
                    {(
                        [
                            { id: "all", en: "All", bn: "সব" },
                            { id: "unread", en: "Unread", bn: "অপঠিত" },
                        ] as const
                    ).map((tab) => {
                        const active = activeFilter === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => onSelectFilter(tab.id)}
                                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer text-center select-none ${
                                    active
                                        ? "bg-primary text-primary-foreground shadow-xs"
                                        : "bg-surface-secondary/80 dark:bg-surface text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {isBn ? tab.bn : tab.en}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Conversation Scrollable List */}
            <div className="flex-1 overflow-y-auto divide-y divide-border/60 scrollbar-thin">
                {conversations.length === 0 ? (
                    <div className="p-8 text-center space-y-2">
                        <SlidersHorizontal className="size-8 mx-auto text-muted-foreground/50 mb-2" />
                        <p className="text-xs font-bold text-foreground">{isBn ? "কোনো মেসেজ পাওয়া যায়নি" : "No conversations found"}</p>
                        <p className="text-[11px] text-muted-foreground">{isBn ? "অন্য কিওয়ার্ড দিয়ে খুঁজুন।" : "Try adjusting your search or filters."}</p>
                    </div>
                ) : (
                    conversations.map((conv) => <ConversationItemCard key={conv.id} conversation={conv} isSelected={conv.id === activeConvId} onSelect={onSelectConversation} />)
                )}
            </div>
        </section>
    );
};

export default ConversationSidebar;
