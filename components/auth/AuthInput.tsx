"use client";

import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    error?: string;
    helperText?: string;
    rightElement?: React.ReactNode;
    errorPosition?: "top" | "right";
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(({ label, id, name, type = "text", icon: Icon, error, helperText, className = "", required, rightElement, errorPosition = "top", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || name || label.toLowerCase().replace(/\s+/g, "-");
    const isPassword = type === "password";
    const computedType = isPassword ? (showPassword ? "text" : "password") : type;

    const isRightError = errorPosition === "right";

    return (
        <div className="space-y-1.5 w-full">
            {/* Header Row: Label & Upper Error or RightElement */}
            <div className="flex items-center justify-between min-h-6">
                <label htmlFor={inputId} className="block text-xs font-semibold text-foreground tracking-wide">
                    {label} {required && <span className="text-destructive">*</span>}
                </label>

                {/* Upper side custom error badge with downward pointer arrow */}
                {error && (!isRightError || rightElement) && (
                    <div role="alert" className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-destructive text-white text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-bottom-1 duration-150 select-none">
                        <AlertCircle className="size-3.5 shrink-0" />
                        <span>{error}</span>
                        {/* Downward triangle arrow pointing to input */}
                        <span aria-hidden="true" className="absolute -bottom-1 right-3 size-2 bg-destructive rotate-45 transform" />
                    </div>
                )}

                {!error && rightElement}
            </div>

            <div className="relative flex items-center">
                {Icon && (
                    <div className="absolute left-3.5 flex items-center pointer-events-none text-text-secondary">
                        <Icon className="size-4" />
                    </div>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    name={name}
                    type={computedType}
                    required={required}
                    className={cn(
                        "w-full h-11 px-3.5 text-sm bg-input rounded-xl border placeholder:text-muted-foreground/75 transition-all duration-200 outline-none shadow-2xs",
                        Icon ? "pl-10" : "pl-3.5",
                        isPassword ? "pr-11" : "pr-3.5",
                        error
                            ? "border-destructive focus:ring-2 focus:ring-destructive/15"
                            : "focus:border-primary focus:ring-2 focus:ring-primary/15",
                        className,
                    )}
                    {...props}
                />

                {/* Right side floating error message with left arrow (for wide screens when errorPosition='right') */}
                {error && isRightError && !rightElement && (
                    <div role="alert" className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center pointer-events-none animate-in fade-in slide-in-from-left-1 duration-150">
                        <div className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive text-white text-xs font-semibold shadow-md whitespace-nowrap">
                            {/* Left pointing arrow */}
                            <span aria-hidden="true" className="absolute -left-1 top-1/2 -translate-y-1/2 size-2 bg-destructive rotate-45 transform" />
                            <AlertCircle className="size-3.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {isPassword && (
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-2.5 size-7 rounded-lg flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-surface-secondary/70 transition-colors focus:outline-none cursor-pointer" tabIndex={-1} aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                )}
            </div>

            {helperText && !error && <p className="text-[11px] text-text-secondary pt-0.5">{helperText}</p>}
        </div>
    );
});

AuthInput.displayName = "AuthInput";

export default AuthInput;
