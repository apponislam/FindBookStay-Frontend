"use client";

import React, { useState } from "react";

interface MortgageCalculatorProps {
    propertyPrice: number;
}

export const MortgageCalculator = ({ propertyPrice }: MortgageCalculatorProps) => {
    const price = propertyPrice || 20000000;
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [loanTermYears, setLoanTermYears] = useState(20);
    const [interestRate, setInterestRate] = useState(9.0);

    const downPaymentAmount = Math.round((price * downPaymentPercent) / 100);
    const loanAmount = price - downPaymentAmount;

    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    // EMI calculation: P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyEmi = Math.round(
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
            (Math.pow(1 + monthlyRate, totalPayments) - 1)
    );

    const totalRepayment = monthlyEmi * totalPayments;
    const totalInterest = totalRepayment - loanAmount;

    const formatTk = (amount: number) => {
        if (amount >= 10000000) {
            return `৳${(amount / 10000000).toFixed(2)} Crore`;
        }
        if (amount >= 100000) {
            return `৳${(amount / 100000).toFixed(2)} Lac`;
        }
        return `৳${amount.toLocaleString()}`;
    };

    return (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-card border border-border space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-accent" />
                    <h2 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                        Home Loan & EMI Estimator
                    </h2>
                </div>
                <span className="text-xs font-bold text-accent">Bank Partners Available</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Inputs Column */}
                <div className="lg:col-span-7 space-y-4">
                    {/* Down Payment Slider */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-foreground">
                                Down Payment ({downPaymentPercent}%)
                            </span>
                            <span className="font-extrabold text-primary font-mono">
                                {formatTk(downPaymentAmount)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={10}
                            max={60}
                            step={5}
                            value={downPaymentPercent}
                            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                            className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>10% Min</span>
                            <span>Loan Amount: {formatTk(loanAmount)}</span>
                            <span>60% Max</span>
                        </div>
                    </div>

                    {/* Loan Term Selection */}
                    <div className="space-y-1.5">
                        <span className="text-xs font-bold text-foreground block">
                            Loan Duration (Years)
                        </span>
                        <div className="grid grid-cols-4 gap-2">
                            {[10, 15, 20, 25].map((yr) => (
                                <button
                                    key={yr}
                                    type="button"
                                    onClick={() => setLoanTermYears(yr)}
                                    className={`py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                                        loanTermYears === yr
                                            ? "bg-primary text-primary-foreground border-primary shadow-xs"
                                            : "bg-surface-secondary text-foreground border-border hover:border-primary/40"
                                    }`}
                                >
                                    {yr} Yrs
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Interest Rate Slider */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-foreground">Interest Rate</span>
                            <span className="font-mono font-bold text-foreground">
                                {interestRate.toFixed(1)}% p.a.
                            </span>
                        </div>
                        <input
                            type="range"
                            min={7}
                            max={14}
                            step={0.5}
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>7.0% Prime</span>
                            <span>9.0% Avg BD Bank Rate</span>
                            <span>14.0%</span>
                        </div>
                    </div>
                </div>

                {/* Calculation Output Card */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-surface-secondary/80 border border-border space-y-4 text-center">
                    <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                            Estimated Monthly EMI
                        </span>
                        <p className="text-2xl sm:text-3xl font-black text-foreground mt-1">
                            ৳{monthlyEmi.toLocaleString()}
                            <span className="text-xs font-normal text-muted-foreground ml-1">
                                / month
                            </span>
                        </p>
                    </div>

                    <div className="pt-3 border-t border-border/80 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Principal Loan:</span>
                            <span className="font-extrabold text-foreground">{formatTk(loanAmount)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Total Interest:</span>
                            <span className="font-extrabold text-foreground">{formatTk(totalInterest)}</span>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-border/60">
                            <span className="font-bold text-foreground">Total Repayment:</span>
                            <span className="font-black text-primary">{formatTk(totalRepayment)}</span>
                        </div>
                    </div>

                    <p className="text-[10px] text-muted-foreground leading-tight pt-1">
                        *Subject to bank credit assessment, eligibility, and current Bangladesh Bank repo rate guidelines.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MortgageCalculator;
