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
        <div className={`space-y-1 mb-4 ${className}`}>
            {category && (
                <div className="flex items-center gap-1.5 pb-0.5">
                    <span className="w-3.5 h-0.5 bg-accent" />
                    <span className="text-[10px] font-bold tracking-widest text-primary uppercase font-mono">
                        {category}
                    </span>
                </div>
            )}
            <h1 className="text-xl sm:text-[22px] font-bold text-foreground tracking-tight leading-tight">
                {title}
            </h1>
            {subtitle && (
                <p className="text-xs text-text-secondary leading-normal">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default AuthHeader;
