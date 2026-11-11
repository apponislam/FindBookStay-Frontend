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

export const AuthCheckbox = ({ id, checked, onChange, label, error, disabled = false, className = "" }: AuthCheckboxProps) => {
    return (
        <div className={`space-y-1 ${className}`}>
            <label htmlFor={id} className={`inline-flex items-start gap-2.5 cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
                <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" id={id} checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
                    <div className={`size-4 rounded border transition-all duration-150 flex items-center justify-center ${checked ? "bg-primary border-primary text-primary-foreground" : error ? "bg-input border-destructive" : "bg-input border-border hover:border-primary"}`}>{checked && <Check className="size-3 stroke-3" />}</div>
                </div>
                <div className="text-xs text-text-secondary leading-snug">{label}</div>
            </label>
            {error && <p className="text-xs text-destructive font-medium pl-6">{error}</p>}
        </div>
    );
};

export default AuthCheckbox;
