import React from "react";

export const metadata = {
    title: "Messages | FindBookStay",
    description: "Direct real-time messaging with verified hosts, landlords, turf coordinators, and buyers on FindBookStay.",
};

const MessageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-dvh w-screen overflow-hidden bg-background text-foreground antialiased flex flex-col">
            {children}
        </div>
    );
};

export default MessageLayout;
