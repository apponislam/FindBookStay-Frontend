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
                    <span className="w-5 h-[1.5px] bg-[#10B981]" />
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#073B35] dark:text-[#34D399] uppercase font-mono">
                        {category}
                    </span>
                </div>
            )}
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#172B2A] dark:text-white tracking-tight leading-snug">
                {title}
            </h1>
            {subtitle && (
                <p className="text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default AuthHeader;
