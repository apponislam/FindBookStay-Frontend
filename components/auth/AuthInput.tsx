"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    error?: string;
    helperText?: string;
    rightElement?: React.ReactNode;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(({ label, id, name, type = "text", icon: Icon, error, helperText, className = "", required, rightElement, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || name || label.toLowerCase().replace(/\s+/g, "-");
    const isPassword = type === "password";
    const computedType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="space-y-1.5 w-full">
            <div className="flex items-center justify-between">
                <label htmlFor={inputId} className="block text-xs font-semibold text-foreground tracking-wide">
                    {label} {required && <span className="text-destructive">*</span>}
                </label>
                {rightElement}
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
                        "w-full py-2.5 sm:py-3 text-sm bg-input rounded-xl border placeholder:text-muted-foreground transition-all duration-150 outline-none",
                        Icon ? "pl-10" : "pl-3.5",
                        isPassword ? "pr-10" : "pr-3.5",
                        error
                            ? "border-destructive focus:ring-1 focus:ring-destructive"
                            : "focus:border-primary focus:ring-1 focus:ring-primary",
                        className
                    )}
                    {...props}
                />

                {isPassword && (
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 p-1 rounded-md text-text-secondary hover:text-foreground transition-colors focus:outline-none cursor-pointer" tabIndex={-1} aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                )}
            </div>

            {error && <p className="text-xs text-destructive font-medium pt-0.5">{error}</p>}

            {helperText && !error && <p className="text-xs text-text-secondary pt-0.5">{helperText}</p>}
        </div>
    );
});

AuthInput.displayName = "AuthInput";

export default AuthInput;
