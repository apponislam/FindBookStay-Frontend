import React from "react";
import Link from "next/link";

interface AuthFooterLinkProps {
    promptText: string;
    linkText: string;
    href: string;
    className?: string;
}

export const AuthFooterLink = ({
    promptText,
    linkText,
    href,
    className = "",
}: AuthFooterLinkProps) => {
    return (
        <p className={`text-center text-xs text-text-secondary ${className}`}>
            {promptText}{" "}
            <Link
                href={href}
                className="font-semibold text-primary hover:underline underline-offset-4 transition-colors ml-1 cursor-pointer"
            >
                {linkText}
            </Link>
        </p>
    );
};

export default AuthFooterLink;
