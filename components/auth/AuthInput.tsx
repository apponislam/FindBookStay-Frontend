"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface AuthInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    error?: string;
    helperText?: string;
    rightElement?: React.ReactNode;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
    (
        {
            label,
            id,
            name,
            type = "text",
            icon: Icon,
            error,
            helperText,
            className = "",
            required,
            rightElement,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const inputId = id || name || label.toLowerCase().replace(/\s+/g, "-");
        const isPassword = type === "password";
        const computedType = isPassword ? (showPassword ? "text" : "password") : type;

        return (
            <div className="space-y-1.5 w-full">
                <div className="flex items-center justify-between">
                    <label
                        htmlFor={inputId}
                        className="block text-xs font-semibold text-[#172B2A] dark:text-[#E2EAE6] tracking-wide"
                    >
                        {label} {required && <span className="text-rose-500">*</span>}
                    </label>
                    {rightElement}
                </div>

                <div className="relative flex items-center">
                    {Icon && (
                        <div className="absolute left-3.5 flex items-center pointer-events-none text-[#64748B] dark:text-[#A3B5AE]">
                            <Icon className="size-4" />
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        name={name}
                        type={computedType}
                        required={required}
                        className={`w-full py-2.5 sm:py-3 text-sm text-[#172B2A] dark:text-white placeholder:text-[#94A3B8] bg-white dark:bg-[#111C1A] rounded-xl border transition-all duration-150 outline-none ${
                            Icon ? "pl-10" : "pl-3.5"
                        } ${isPassword ? "pr-10" : "pr-3.5"} ${
                            error
                                ? "border-rose-300 dark:border-rose-500/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                : "border-[#E2EAE6] dark:border-[#263B34] hover:border-[#CBD5E1] dark:hover:border-[#38554B] focus:border-[#073B35] dark:focus:border-[#34D399] focus:ring-1 focus:ring-[#073B35] dark:focus:ring-[#34D399]"
                        } ${className}`}
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 p-1 rounded-md text-[#64748B] dark:text-[#A3B5AE] hover:text-[#172B2A] dark:hover:text-white transition-colors focus:outline-none cursor-pointer"
                            tabIndex={-1}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    )}
                </div>

                {error && (
                    <p className="text-xs text-rose-600 dark:text-rose-400 font-medium pt-0.5">
                        {error}
                    </p>
                )}

                {helperText && !error && (
                    <p className="text-xs text-[#64748B] dark:text-[#A3B5AE] pt-0.5">{helperText}</p>
                )}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
