import React from "react";
import { Check } from "lucide-react";

export interface AuthCheckboxProps {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: React.ReactNode;
    error?: string;
    disabled?: boolean;
    className?: string;
}

export const AuthCheckbox = ({
    id,
    checked,
    onChange,
    label,
    error,
    disabled = false,
    className = "",
}: AuthCheckboxProps) => {
    return (
        <div className={`space-y-1 ${className}`}>
            <label
                htmlFor={id}
                className={`inline-flex items-start gap-2.5 cursor-pointer select-none ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <div className="relative flex items-center justify-center mt-0.5">
                    <input
                        type="checkbox"
                        id={id}
                        checked={checked}
                        disabled={disabled}
                        onChange={(e) => onChange(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div
                        className={`size-4 rounded border transition-all duration-150 flex items-center justify-center ${
                            checked
                                ? "bg-[#073B35] dark:bg-[#10B981] border-[#073B35] dark:border-[#10B981] text-white"
                                : error
                                ? "bg-white dark:bg-[#111C1A] border-rose-400"
                                : "bg-white dark:bg-[#111C1A] border-[#CBD5E1] dark:border-[#263B34] hover:border-[#073B35]"
                        }`}
                    >
                        {checked && <Check className="size-3 stroke-[3]" />}
                    </div>
                </div>
                <div className="text-xs text-[#64748B] dark:text-[#A3B5AE] leading-snug">
                    {label}
                </div>
            </label>
            {error && (
                <p className="text-xs text-rose-600 dark:text-rose-400 font-medium pl-6">{error}</p>
            )}
        </div>
    );
};

export default AuthCheckbox;
