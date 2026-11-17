"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface OtpInputProps {
    value: string;
    onChange: (value: string) => void;
    length?: number;
    disabled?: boolean;
    error?: boolean;
    autoFocus?: boolean;
    className?: string;
}

export const OtpInput = ({
    value = "",
    onChange,
    length = 6,
    disabled = false,
    error = false,
    autoFocus = true,
    className = "",
}: OtpInputProps) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    // Auto-focus first box on mount
    useEffect(() => {
        if (autoFocus && !disabled && inputsRef.current[0]) {
            inputsRef.current[0].focus();
        }
    }, [autoFocus, disabled]);

    // Split value into characters array of specified length
    const digits = Array.from({ length }, (_, i) => value[i] || "");

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (disabled) return;

        const pastedText = e.clipboardData.getData("text/plain");
        const cleanDigits = pastedText.replace(/\D/g, "").slice(0, length);
        if (!cleanDigits) return;

        onChange(cleanDigits);

        const targetIndex = Math.min(cleanDigits.length, length - 1);
        inputsRef.current[targetIndex]?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const raw = e.target.value.replace(/\D/g, "");

        // If user typed/pasted multi-characters into single box
        if (raw.length > 1) {
            const pastedDigits = raw.slice(0, length);
            onChange(pastedDigits);
            const nextIdx = Math.min(pastedDigits.length, length - 1);
            inputsRef.current[nextIdx]?.focus();
            return;
        }

        const newDigits = [...digits];
        newDigits[index] = raw;
        const newCode = newDigits.join("");
        onChange(newCode);

        // Move to next input box if a digit was typed
        if (raw && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (!digits[index] && index > 0) {
                // If current box is already empty, move to previous box and delete
                e.preventDefault();
                const newDigits = [...digits];
                newDigits[index - 1] = "";
                onChange(newDigits.join(""));
                inputsRef.current[index - 1]?.focus();
            } else {
                const newDigits = [...digits];
                newDigits[index] = "";
                onChange(newDigits.join(""));
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            inputsRef.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < length - 1) {
            e.preventDefault();
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    return (
        <div className={cn("flex items-center justify-center gap-2 sm:gap-2.5", className)}>
            {Array.from({ length }).map((_, index) => {
                const char = digits[index] || "";
                const isFilled = Boolean(char);

                return (
                    <input
                        key={index}
                        ref={(el) => {
                            inputsRef.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        maxLength={length}
                        value={char}
                        disabled={disabled}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        onFocus={handleFocus}
                        className={cn(
                            "size-11 sm:size-12 text-center text-lg sm:text-xl font-bold font-mono rounded-xl border transition-all duration-150 outline-none select-none",
                            "bg-surface-secondary text-foreground",
                            error
                                ? "border-destructive focus:ring-2 focus:ring-destructive/20 text-destructive"
                                : isFilled
                                ? "border-primary/60 bg-surface shadow-2xs"
                                : "hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20",
                            disabled && "opacity-50 cursor-not-allowed",
                        )}
                        aria-label={`Digit ${index + 1}`}
                    />
                );
            })}
        </div>
    );
};

export default OtpInput;
