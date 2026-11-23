"use client";

import React, { FormEvent, RefObject } from "react";
import { Send, Paperclip } from "@/components/Icons";
import { useLocale } from "@/hooks/useLocale";

interface ChatInputComposerProps {
    inputText: string;
    onInputChange: (val: string) => void;
    onSubmit: () => void;
    inputRef: RefObject<HTMLInputElement | null>;
    onAttachMedia?: () => void;
}

export const ChatInputComposer = ({
    inputText,
    onInputChange,
    onSubmit,
    inputRef,
    onAttachMedia,
}: ChatInputComposerProps) => {
    const { isBn } = useLocale();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="p-3 sm:p-3.5 border-t border-border bg-white dark:bg-card shrink-0 shadow-sm select-none">
            <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
                <div className="flex-1 relative flex items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => onInputChange(e.target.value)}
                        placeholder={
                            isBn
                                ? "আপনার বার্তা লিখুন (যেমন: শুক্রবার সশরীরে দেখতে পারব কি?)..."
                                : "Type a message here (e.g. Is it available for visit this Friday?)..."
                        }
                        className="w-full pl-4 pr-11 py-3 rounded-2xl bg-surface-secondary/70 dark:bg-surface border border-border text-xs sm:text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    />
                    <button
                        type="button"
                        onClick={onAttachMedia}
                        className="absolute right-3.5 text-muted-foreground hover:text-foreground cursor-pointer"
                        title={isBn ? "ছবি বা ডকুমেন্ট যুক্ত করুন" : "Attach media"}
                    >
                        <Paperclip className="size-4.5" />
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="size-11 sm:size-12 rounded-2xl bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:hover:bg-primary text-primary-foreground flex items-center justify-center transition-all shadow-md shadow-primary/20 shrink-0 cursor-pointer"
                    aria-label={isBn ? "পাঠান" : "Send message"}
                >
                    <Send className="size-4.5" />
                </button>
            </form>
        </div>
    );
};

export default ChatInputComposer;

