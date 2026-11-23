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
                    text: "FindBookStay does not process, handle, or store credit cards, debit cards, or financial payment data on our servers. All transaction details and monetary exchanges occur directly between verified counter-parties at the premises.",
                },
                {
                    type: "paragraph",
                    text: "Our internal access controls require multi-factor authentication (MFA) for staff members, and sensitive identification records are stored in isolated, access-restricted cryptographic vaults.",
                },
            ],
        },
        {
            id: "disclosure-sharing",
            number: "05",
            title: "Information Sharing & Disclosure",
            blocks: [
                {
                    type: "paragraph",
                    text: "We only disclose user information in direct furtherance of confirmed reservations and statutory mandates:",
                },
                {
                    type: "list",
                    items: [
                        {
                            label: "Counter-Party Coordination",
                            text: "Upon inquiry submission or confirmed booking, basic contact information (name and phone number) is shared between guest/tenant and verified host/landlord to facilitate on-site reception.",
                        },
                        {
                            label: "Law Enforcement & Statutory Requests",
                            text: "We cooperate fully with valid judicial subpoenas, court warrants, and law enforcement directives under Bangladesh jurisdiction.",
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

export const PRIVACY_DATA_BN: LegalDocumentData = {
    badge: "গোপনীয়তা ও বিশ্বাস",
    effectiveDate: "১ জানুয়ারি, ২০২৬",
    title: "গোপনীয়তা নীতি",
    description: `${siteData.name}-এ গোপনীয়তা ও শারীরিক যাচাইকরণ আমাদের ভিত্তিমূল। এই নীতিতে স্বচ্ছভাবে তুলে ধরা হয়েছে আপনার ব্যক্তিগত তথ্য ও পরিচয় কীভাবে সুরক্ষিত থাকে।`,
    contactEmail: siteData.contacts.privacyEmail,
    contactLabel: "প্রাইভেসি অফিসারের সাথে যোগাযোগ",
    contactDepartment: `${siteData.name} ডেটা প্রোটেকশন বিভাগ`,
    sections: [
        {
            id: "introduction",
            number: "০১",
            title: "ভূমিকা ও প্রতিশ্রুতি",
            blocks: [
                {
                    type: "paragraph",
                    text: 'FindBookStay.com ব্যবহারকারীদের তথ্যের গোপনীয়তা রক্ষা ও ব্যাংক-গ্রেড নিরাপত্তা মান বজায় রাখতে প্রতিশ্রুতিবদ্ধ। আমরা রিয়েল এস্টেট, আবাসন লিজ, হোটেল স্টে এবং টার্ফ রিজার্ভেশনের একটি নির্ভরযোগ্য আন্তর্জাতিক মার্কেটপ্লেস।',
                },
                {
                    type: "paragraph",
                    text: "আমাদের ওয়েবসাইট পরিদর্শন, কনসিয়ার্জের সাথে যোগাযোগ অথবা বাসস্থান ও ভেন্যু সংরক্ষণের সময় আমরা কীভাবে আপনার তথ্য সংগ্রহ, সংরক্ষণ ও সুরক্ষিত রাখি তা এই নীতিমালায় বর্ণিত হয়েছে।",
                },
            ],
        },
        {
            id: "information-collected",
            number: "০২",
            title: "আমরা যেসব তথ্য সংগ্রহ করি",
            blocks: [
                {
                    type: "paragraph",
                    text: "প্ল্যাটফর্মে আপনার ভূমিকার ওপর ভিত্তি করে (ভাড়াটিয়া, অতিথি, খেলোয়াড় বা হোস্ট), আমরা নিম্নোক্ত তথ্যসমূহ সংগ্রহ করি:",
                },
                {
                    type: "list",
                    items: [
                        {
                            label: "পরিচয় ও যোগাযোগের বিবরণ",
                            text: "পূর্ণ নাম, ইমেইল ঠিকানা, মোবাইল নম্বর, জন্ম তারিখ এবং বর্তমান ঠিকানা।",
                        },
                        {
                            label: "যাচাইকরণ নথিপত্র",
                            text: "জাতীয় পরিচয়পত্র (এনআইডি), পাসপোর্ট বা ড্রাইভিং লাইসেন্স, ট্রেড লাইসেন্স এবং হোস্ট ভেরিফিকেশন ছবি।",
                        },
                        {
                            label: "বুকিং ও শিডিউল সংক্রান্ত তথ্য",
                            text: "রিজার্ভেশনের তারিখ, টার্ফ স্লটের সময়, অতিথির সংখ্যা এবং বিশেষ অনুরোধ।",
                        },
                    ],
                },
            ],
        },
        {
            id: "how-we-use",
            number: "০৩",
            title: "তথ্য ব্যবহারের উদ্দেশ্য",
            blocks: [
                {
                    type: "paragraph",
                    text: "আমরা সংগৃহীত তথ্য সরাসরি সংযোগ স্থাপন, ভুয়া লিস্টিং প্রতিরোধে নিরাপত্তা অডিট এবং সার্বক্ষণিক কনসিয়ার্জ সহায়তা নিশ্চিত করতে ব্যবহার করি।",
                },
            ],
        },
        {
            id: "data-sharing",
            number: "০৪",
            title: "তথ্য শেয়ারিং ও সুরক্ষা",
            blocks: [
                {
                    type: "paragraph",
                    text: "আমরা কোনো অবস্থাতেই আপনার ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি করি না। আপনার এনআইডি এবং পরিচয়পত্র এনক্রিপ্ট করে নিরাপদ সার্ভারে সংরক্ষণ করা হয়।",
                },
            ],
        },
        {
            id: "your-rights",
            number: "০৫",
            title: "আপনার অধিকার",
            blocks: [
                {
                    type: "paragraph",
                    text: "আপনি যেকোনো সময় আপনার ব্যক্তিগত তথ্য দেখতে, আপডেট করতে অথবা অ্যাকাউন্ট মুছে ফেলার অনুরোধ পাঠাতে পারেন।",
                },
            ],
        },
        {
            id: "contact-privacy",
            number: "০৬",
            title: "প্রাইভেসি সম্পর্কিত যোগাযোগ",
            blocks: [
                {
                    type: "paragraph",
                    text: "গোপনীয়তা নীতি সম্পর্কিত যেকোনো জিজ্ঞাসা বা আপনার ডেটা সংক্রান্ত অনুরোধের জন্য আমাদের ডেটা প্রোটেকশন অফিসে ইমেইল করতে পারেন।",
                },
            ],
        },
    ],
};
