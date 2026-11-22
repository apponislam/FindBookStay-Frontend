"use client";

import React from "react";
import Link from "next/link";
import { Check, X, type Icon } from "@/components/Icons";
import { ModeToggle } from "@/components/mode-toggle";

export interface StepItem {
    id: number;
    title: string;
    icon?: Icon;
}

interface PublishStepperProps {
    steps: StepItem[];
    currentStep: number;
    onSelectStep: (stepId: number) => void;
    pillarTitle: string;
    pillarBadge: string;
}

export const PublishStepper = ({ steps, currentStep, onSelectStep, pillarBadge }: PublishStepperProps) => {
    return (
        <div className="w-full bg-white dark:bg-card border-b border-border shadow-xs transition-colors duration-200">
            <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
                {/* Top Control Bar: Exit, Badge & Theme (Responsive & Single Line) */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                    {/* Left: Exit Link & Pillar Badge */}
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <Link href="/" aria-label="Exit Listing Studio" className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-xl text-xs font-bold text-foreground bg-surface-secondary dark:bg-surface hover:bg-surface-secondary/80 border border-border transition-colors cursor-pointer outline-none focus:outline-none shrink-0">
                            <X className="size-3.5" />
                            <span className="hidden xs:inline">Exit</span>
                        </Link>
                        <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary whitespace-nowrap truncate max-w-32.5 sm:max-w-none">{pillarBadge}</span>
                    </div>

                    {/* Right: Step Counter & Theme Switcher */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <div className="text-xs font-bold text-foreground whitespace-nowrap">
                            <span className="text-muted-foreground">Step </span>
                            <span className="font-mono text-xs font-black text-emerald-500">{currentStep}</span>
                            <span className="text-muted-foreground"> of {steps.length}</span>
                            <span className="hidden md:inline text-muted-foreground">: </span>max-w-32.5
                            <span className="hidden md:inline text-foreground font-extrabold">{steps[currentStep - 1]?.title}</span>
                        </div>
                        <ModeToggle />
                    </div>
                </div>

                {/* Step Track: Mathematically Centered & 100% Mobile Responsive */}
                <div className="max-w-2xl mx-auto py-1">
                    <div className="flex items-center justify-between w-full">
                        {steps.map((step, idx) => {
                            const isCompleted = step.id < currentStep;
                            const isCurrent = step.id === currentStep;

                            return (
                                <React.Fragment key={step.id}>
                                    {/* Step Node */}
                                    <div className="flex flex-col items-center shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => onSelectStep(step.id)}
                                            aria-label={`Step ${step.id}: ${step.title}`}
                                            className={`size-8 sm:size-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-200 cursor-pointer outline-none focus:outline-none select-none z-10 ${
                                                isCurrent ? "bg-emerald-500 text-white border-2 border-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.45)] ring-4 ring-emerald-500/20 scale-105" : isCompleted ? "bg-emerald-600 text-white border-2 border-emerald-600 shadow-xs" : "bg-surface-secondary dark:bg-card border-2 border-border text-foreground hover:border-emerald-500/50"
                                            }`}
                                        >
                                            {isCompleted ? <Check className="size-3.5 sm:size-4 stroke3" /> : <span>{step.id}</span>}
                                        </button>

                                        {/* Desktop Only Labels (Hidden on mobile to eliminate ugly ellipsis truncation) */}
                                        <button
                                            type="button"
                                            onClick={() => onSelectStep(step.id)}
                                            className={`hidden sm:block mt-1.5 text-[11px] font-bold text-center w-20 sm:w-24 truncate cursor-pointer transition-colors outline-none focus:outline-none select-none ${isCurrent ? "text-emerald-500 dark:text-emerald-400 font-extrabold" : isCompleted ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"}`}
                                        >
                                            {step.title}
                                        </button>
                                    </div>

                                    {/* Connecting Line Between Steps */}
                                    {idx < steps.length - 1 && (
                                        <div className="flex-1 mx-1 sm:mx-2.5 h-0.5 bg-slate-200 dark:bg-surface rounded-full overflow-hidden">
                                            <div className={`h-full transition-all duration-300 ${isCompleted ? "w-full bg-emerald-500" : "w-0"}`} />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Mobile Only: Current Step Name cleanly centered below the circles */}
                    <div className="sm:hidden text-center mt-2 px-1">
                        <span className="text-xs font-bold text-foreground">
                            <span className="text-muted-foreground">Step {currentStep}: </span>
                            <span className="text-emerald-500 dark:text-emerald-400 font-extrabold">{steps[currentStep - 1]?.title}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublishStepper;
