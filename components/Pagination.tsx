"use client";

import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "@/components/Icons";

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginationProps {
    meta: PaginationMeta;
    onPageChange: (newPage: number) => void;
    showItemCount?: boolean;
    siblingCount?: number;
    className?: string;
}

export const Pagination = ({ meta, onPageChange, showItemCount = true, siblingCount = 1, className = "" }: PaginationProps) => {
    const { page, limit, total, totalPages, hasNext, hasPrev } = meta;

    // Calculate item display range (e.g., "Showing 1-10 of 148 results")
    const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    // Compute smart pagination page number range with ellipsis
    const paginationRange = useMemo<(number | string)[]>(() => {
        // Total numbers to show: first + last + current + 2*siblings + 2*ellipsis = 2*siblings + 5
        const totalPageNumbers = siblingCount * 2 + 5;

        // Case 1: If total pages is less than page numbers we want to show, return all
        if (totalPages <= totalPageNumbers) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(page - siblingCount, 1);
        const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        // Case 2: No left dots to show, but right dots to be shown
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
            return [...leftRange, "...", lastPageIndex];
        }

        // Case 3: No right dots to show, but left dots to be shown
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
            return [firstPageIndex, "...", ...rightRange];
        }

        // Case 4: Both left and right dots to be shown
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
            return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
        }

        return [];
    }, [page, totalPages, siblingCount]);

    // If there's 1 or 0 pages, hide pagination controls unless showItemCount is requested
    if (totalPages <= 1 && total === 0) {
        return null;
    }

    return (
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 select-none ${className}`} aria-label="Pagination Navigation">
            {/* Left: Results Count Info */}
            {showItemCount && (
                <div className="text-xs text-text-secondary text-center sm:text-left order-2 sm:order-1">
                    Showing{" "}
                    <span className="font-bold text-foreground">
                        {startItem}-{endItem}
                    </span>{" "}
                    of <span className="font-bold text-foreground">{total}</span> results
                </div>
            )}

            {/* Right: Interactive Navigation Buttons */}
            {totalPages > 1 && (
                <nav className="flex items-center gap-1.5 order-1 sm:order-2" aria-label="Pagination page buttons">
                    {/* Previous Page Button */}
                    <button
                        type="button"
                        onClick={() => hasPrev && onPageChange(page - 1)}
                        disabled={!hasPrev}
                        aria-label="Previous Page"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-border bg-white text-foreground hover:bg-surface-secondary hover:border-primary/40 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer active:scale-95"
                    >
                        <ChevronLeft className="size-4" />
                        <span className="hidden sm:inline">Prev</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                        {paginationRange.map((item, index) => {
                            if (item === "...") {
                                return (
                                    <span key={`dots-${index}`} className="size-9 flex items-center justify-center text-text-secondary text-xs font-bold select-none">
                                        &hellip;
                                    </span>
                                );
                            }

                            const pageNumber = Number(item);
                            const isActive = pageNumber === page;

                            return (
                                <button
                                    key={pageNumber}
                                    type="button"
                                    onClick={() => onPageChange(pageNumber)}
                                    aria-current={isActive ? "page" : undefined}
                                    aria-label={`Page ${pageNumber}`}
                                    className={`size-9 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${isActive ? "bg-primary text-white shadow-md shadow-primary/20 scale-105 pointer-events-none" : "border border-border bg-white text-foreground hover:bg-surface-secondary hover:border-primary/40 shadow-2xs active:scale-95"}`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                    </div>

                    {/* Next Page Button */}
                    <button
                        type="button"
                        onClick={() => hasNext && onPageChange(page + 1)}
                        disabled={!hasNext}
                        aria-label="Next Page"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-border bg-white text-foreground hover:bg-surface-secondary hover:border-primary/40 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer active:scale-95"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="size-4" />
                    </button>
                </nav>
            )}
        </div>
    );
};

export default Pagination;
