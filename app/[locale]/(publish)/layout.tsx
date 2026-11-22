import React from "react";

export const metadata = {
    title: "Post Listing | FindBookStay",
    description: "Post your listing on FindBookStay.",
};

const PublishLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-surface-secondary/40 dark:bg-background text-foreground flex flex-col antialiased">
            <main className="flex-1 flex flex-col">{children}</main>
        </div>
    );
};

export default PublishLayout;
