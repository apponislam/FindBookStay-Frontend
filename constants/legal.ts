export interface LegalBulletPoint {
    label?: string;
    text: string;
}

export interface LegalContentBlock {
    type: "paragraph" | "list";
    text?: string;
    items?: LegalBulletPoint[];
}

export interface LegalSection {
    id: string;
    number: string;
    title: string;
    blocks: LegalContentBlock[];
}

export interface LegalDocumentData {
    badge: string;
    effectiveDate: string;
    title: string;
    description: string;
    contactEmail: string;
    contactLabel: string;
    contactDepartment: string;
    sections: LegalSection[];
}
