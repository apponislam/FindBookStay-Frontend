import React from "react";

export interface AuthButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: "primary" | "secondary" | "outline";
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

export const AuthButton = ({
    children,
    isLoading = false,
    variant = "primary",
    fullWidth = true,
    icon,
    disabled,
    className = "",
    ...props
}: AuthButtonProps) => {
    const baseStyles =
        "relative inline-flex items-center justify-center font-semibold text-sm rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

    const variantStyles = {
        primary:
            "bg-[#073B35] hover:bg-[#052F2A] text-white shadow-xs dark:bg-[#10B981] dark:hover:bg-[#059669] dark:text-[#0B1210] dark:font-bold py-3 sm:py-3.5 px-5 active:scale-[0.99] focus-visible:ring-[#073B35]",
        secondary:
            "bg-[#F0F5F3] hover:bg-[#E2EAE6] text-[#172B2A] dark:bg-[#192824] dark:hover:bg-[#263B34] dark:text-white py-3 sm:py-3.5 px-5",
        outline:
            "bg-white dark:bg-transparent border border-[#E2EAE6] dark:border-[#263B34] hover:bg-[#F8FAF9] dark:hover:bg-[#15221E] text-[#172B2A] dark:text-white py-3 sm:py-3.5 px-5",
    };

    return (
        <button
            type="submit"
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variantStyles[variant]} ${
                fullWidth ? "w-full" : ""
            } ${className}`}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <svg
                        className="animate-spin size-4 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span>Authenticating...</span>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-2">
                    <span>{children}</span>
                    {icon && <span className="shrink-0">{icon}</span>}
                </div>
            )}
        </button>
    );
};

export default AuthButton;
