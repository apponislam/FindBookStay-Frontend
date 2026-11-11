import { LegalDocumentData } from "./legal";
import siteData from "./siteData";

export const PRIVACY_DATA: LegalDocumentData = {
    badge: "Privacy & Trust",
    effectiveDate: "January 1, 2026",
    title: "Privacy Policy",
    description: `At ${siteData.name}, privacy and physical verification are foundational. This policy transparently outlines how your personal data, identity documentation, and reservations are managed and protected.`,
    contactEmail: siteData.contacts.privacyEmail,
    contactLabel: "Privacy Officer Contact",
    contactDepartment: `${siteData.name} Data Protection Office`,
    sections: [
        {
            id: "introduction",
            number: "01",
            title: "Introduction & Commitment",
            blocks: [
                {
                    type: "paragraph",
                    text: 'FindBookStay.com ("FindBookStay", "we", "us", or "our") is dedicated to safeguarding user confidentiality and maintaining bank-grade security standards. We operate an international marketplace for real estate, leasing, hotel stays, and turf reservations where user trust is paramount.',
                },
                {
                    type: "paragraph",
                    text: "This Privacy Policy describes how we collect, store, utilize, share, and protect your personal information whenever you visit our website, communicate with our concierge, or reserve accommodations and sports facilities.",
                },
            ],
        },
        {
            id: "information-collected",
            number: "02",
            title: "Information We Collect",
            blocks: [
                {
                    type: "paragraph",
                    text: "Depending on your role on the platform (buyer, tenant, hotel guest, athlete, or host), we collect the following categories of information:",
                },
                {
                    type: "list",
                    items: [
                        {
                            label: "Identity & Contact Details",
                            text: "Full legal name, email address, mobile contact number, date of birth, and physical residential address.",
                        },
                        {
                            label: "Verification Credentials",
                            text: "Government-issued identification (National ID, Passport, or Driver's License), title deed certificates (for property owners), trade licenses (for commercial entities), and host biometric facial verification snapshots.",
                        },
                        {
                            label: "Booking & Schedule Data",
                            text: "Reservation dates, turf slot times, guest counts, and special check-in requests.",
                        },
                        {
                            label: "Technical & Device Data",
                            text: "IP address, device type, browser specifications, operating system, and interaction telemetry to detect fraudulent login attempts.",
                        },
                    ],
                },
            ],
        },
        {
            id: "how-we-use",
            number: "03",
            title: "How We Use Information",
            blocks: [
                {
                    type: "paragraph",
                    text: "We process your information strictly for legitimate business and contractual purposes:",
                },
                {
                    type: "list",
                    items: [
                        {
                            text: "Validating physical property title deeds and conducting on-site premises inspections.",
                        },
                        {
                            text: "Facilitating seamless reservations, lease inquiries, and turf slot bookings.",
                        },
                        {
                            text: "Operating our secure messaging and account authentication engine.",
                        },
                        {
                            text: "Providing 24/7 concierge assistance and resolving check-in inquiries.",
                        },
                        {
                            text: "Complying with municipal laws, identity checks, and fraud prevention protocols.",
                        },
                    ],
                },
            ],
        },
        {
            id: "account-security",
            number: "04",
            title: "Account & Infrastructure Security",
            blocks: [
                {
                    type: "paragraph",
                    text: "FindBookStay does not process, handle, or store credit cards, debit cards, or financial payment data on our servers. The Platform operates without online payment processing at this time.",
                },
                {
                    type: "paragraph",
                    text: "All user account records, identification documents, and verified listings are secured on modern encrypted cloud infrastructure with TLS 1.3 encryption in transit and AES-256 bit encryption at rest to prevent unauthorized access.",
                },
            ],
        },
        {
            id: "information-sharing",
            number: "05",
            title: "Sharing with Hosts & Venues",
            blocks: [
                {
                    type: "paragraph",
                    text: "To complete confirmed reservations, limited necessary details are shared between counterparties:",
                },
                {
                    type: "list",
                    items: [
                        {
                            label: "Hosts & Hotels",
                            text: "Receive your full legal name, verified contact phone number, and arrival schedule to coordinate entry and keys.",
                        },
                        {
                            label: "Turf Managers",
                            text: "Receive your team contact name and booked time slot for gate check-in and floodlight activation.",
                        },
                        {
                            label: "Legal Authorities",
                            text: "Information is disclosed only when required under lawful subpoena, court warrant, or national security regulation.",
                        },
                    ],
                },
                {
                    type: "paragraph",
                    text: "We never sell, rent, or trade your personal data to third-party telemarketers or advertising brokers.",
                },
            ],
        },
        {
            id: "cookies-tracking",
            number: "06",
            title: "Cookies & Analytics",
            blocks: [
                {
                    type: "paragraph",
                    text: "We employ minimal, essential cookies necessary to maintain authenticated sessions, secure token validation, and preserve your currency and language preferences.",
                },
                {
                    type: "paragraph",
                    text: "Aggregated, anonymized performance telemetry helps us identify slow page loads and improve server response times. You may configure your browser to reject non-essential cookies at any time without losing core booking functionality.",
                },
            ],
        },
        {
            id: "international-transfers",
            number: "07",
            title: "Data Storage & Safeguards",
            blocks: [
                {
                    type: "paragraph",
                    text: "User information is housed on secure cloud clusters with end-to-end TLS 1.3 encryption in transit and AES-256 bit encryption at rest. Regular penetration tests and automated vulnerability assessments are conducted to prevent unauthorized access.",
                },
            ],
        },
        {
            id: "retention-erasure",
            number: "08",
            title: "Data Retention & Deletion",
            blocks: [
                {
                    type: "paragraph",
                    text: "We retain personal profile data only for as long as your account remains active or as required to fulfill legal audit and dispute defense obligations.",
                },
                {
                    type: "paragraph",
                    text: "Upon formal request to close your account, non-essential data is permanently sanitized or scrubbed from operational databases within 30 calendar days.",
                },
            ],
        },
        {
            id: "user-rights",
            number: "09",
            title: "Your Privacy Rights",
            blocks: [
                {
                    type: "paragraph",
                    text: "You retain full ownership and statutory rights over your personal data:",
                },
                {
                    type: "list",
                    items: [
                        {
                            label: "Access",
                            text: "Request an export copy of all personal records associated with your account.",
                        },
                        {
                            label: "Correction",
                            text: "Promptly rectify inaccurate or outdated phone numbers, names, or addresses.",
                        },
                        {
                            label: "Erasure",
                            text: 'Request the permanent deletion of your profile where legal retention mandates do not apply ("Right to be Forgotten").',
                        },
                        {
                            label: "Restriction of Processing",
                            text: "Opt out of non-essential promotional notifications and communications.",
                        },
                    ],
                },
            ],
        },
        {
            id: "minors",
            number: "10",
            title: "Children's Privacy",
            blocks: [
                {
                    type: "paragraph",
                    text: "FindBookStay services are exclusively intended for individuals aged 18 and older who hold legal capacity to enter binding contracts. We do not knowingly collect personal information from minors.",
                },
            ],
        },
        {
            id: "policy-updates",
            number: "11",
            title: "Updates to this Policy",
            blocks: [
                {
                    type: "paragraph",
                    text: "We may periodically refine this Privacy Policy to reflect evolving regulatory standards or new platform features. Notice of material modifications will be delivered via your registered account email or prominent site banners at least 14 days before taking effect.",
                },
            ],
        },
        {
            id: "dpo-contact",
            number: "12",
            title: "Contact Data Protection Officer",
            blocks: [
                {
                    type: "paragraph",
                    text: "If you have questions about your privacy rights, data exports, or wish to submit a data erasure request, please contact our Data Protection Office.",
                },
            ],
        },
    ],
};
