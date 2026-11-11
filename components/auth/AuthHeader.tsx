import React from "react";

interface AuthHeaderProps {
    category?: string;
    title: string;
    subtitle?: string;
    className?: string;
}

export const AuthHeader = ({
    category,
    title,
    subtitle,
    className = "",
}: AuthHeaderProps) => {
    return (
        <div className={`space-y-2 mb-8 ${className}`}>
            {category && (
                <div className="flex items-center gap-2">
                    <span className="w-5 h-0.5 bg-accent" />
                    <span className="text-[11px] font-bold tracking-widest text-primary uppercase font-mono">
                        {category}
                    </span>
                </div>
            )}
            <h1 className="text-2xl sm:text-[28px] font-bold text-foreground tracking-tight leading-snug">
                {title}
            </h1>
            {subtitle && (
                <p className="text-sm text-text-secondary leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default AuthHeader;
