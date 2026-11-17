import React from "react";
import { Loader2 } from "lucide-react";

interface AuthLoadingProps {
    message?: string | null;
    description?: string;
    className?: string;
}

export const AuthLoading = ({
    message = "Loading...",
    description,
    className = "",
}: AuthLoadingProps) => {
    return (
        <div
            className={`w-full py-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-300 ${className}`}
        >
            <div className="relative flex items-center justify-center mb-4">
                <div className="absolute size-12 rounded-2xl bg-primary/10 animate-ping opacity-40" />
                <div className="size-12 rounded-2xl bg-surface-secondary border border-border flex items-center justify-center text-primary shadow-xs">
                    <Loader2 className="size-6 animate-spin text-primary" />
                </div>
            </div>

            {message && (
                <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground tracking-tight">
                        {message}
                    </p>
                    {description && (
                        <p className="text-xs text-text-secondary max-w-xs mx-auto">
                            {description}
                        </p>
                    )}
                </div>
            )}

            <div className="w-20 h-1 bg-surface-secondary rounded-full overflow-hidden mt-4">
                <div className="w-full h-full bg-primary/50 rounded-full animate-pulse" />
            </div>
        </div>
    );
};

export default AuthLoading;
