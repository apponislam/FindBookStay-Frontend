import type { Metadata } from "next";
import LegalDocumentLayout from "@/components/legal/LegalDocumentLayout";
import { PRIVACY_DATA } from "@/constants/privacy";

export const metadata: Metadata = {
    title: "Privacy Policy | FindBookStay",
    description: PRIVACY_DATA.description,
};

const PrivacyPage = () => {
    return <LegalDocumentLayout data={PRIVACY_DATA} />;
};

export default PrivacyPage;
