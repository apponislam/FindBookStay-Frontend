import type { Metadata } from "next";
import LegalDocumentLayout from "@/components/legal/LegalDocumentLayout";
import { TERMS_DATA } from "@/constants/terms";

export const metadata: Metadata = {
    title: "Terms of Service & Conditions | FindBookStay",
    description: TERMS_DATA.description,
};

const TermsPage = () => {
    return <LegalDocumentLayout data={TERMS_DATA} />;
};

export default TermsPage;
