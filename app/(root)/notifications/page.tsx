import React from "react";
import type { Metadata } from "next";
import NotificationsView from "@/components/notifications/NotificationsView";

export const metadata: Metadata = {
    title: "Notifications | FindBookStay",
    description: "View real-time booking alerts, rental inquiries, price drop notifications, and listing verification updates.",
};

const NotificationsPage = () => {
    return <NotificationsView />;
};

export default NotificationsPage;
