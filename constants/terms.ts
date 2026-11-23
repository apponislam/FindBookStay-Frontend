import { LegalDocumentData } from "./legal";
import siteData from "./siteData";

export const TERMS_DATA: LegalDocumentData = {
    badge: "Legal & Governance",
    effectiveDate: "January 1, 2026",
    title: "Terms of Service",
    description: `These Terms and Conditions govern your access to and use of ${siteData.domain}, including our property acquisition services, residential leasing, bachelor seat rentals, hotel accommodations, and sports turf reservations.`,
    contactEmail: siteData.contacts.legalEmail,
    contactLabel: "Need legal clarification?",
    contactDepartment: `${siteData.name} Legal & Compliance Department`,
    sections: [
        {
            id: "acceptance",
            number: "01",
            title: "Acceptance & Agreement",
            blocks: [
                {
                    type: "paragraph",
                    text: 'By accessing, browsing, registering an account, or communicating on FindBookStay.com ("the Platform", "we", "us", or "our"), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service, our Privacy Policy, and any additional guidelines applicable to specific marketplace verticals.',
                },
                {
                    type: "paragraph",
                    text: "If you do not agree to these Terms in their entirety, you must immediately discontinue using the Platform. Continued use constitutes acceptance of any future updates or modifications published on this page.",
                },
            ],
        },
        {
            id: "platform-role",
            number: "02",
            title: "FindBookStay Platform Role",
            blocks: [
                {
                    type: "paragraph",
                    text: "FindBookStay provides an integrated digital marketplace platform that connects property buyers, tenants, hotel guests, and sports enthusiasts with verified sellers, homeowners, hotel operators, and sports facility managers.",
                },
                {
                    type: "paragraph",
                    text: 'While FindBookStay conducts rigorous on-site physical title and premises verifications, FindBookStay is not a direct owner or operator of third-party rental flats, hotels, or turf facilities, unless explicitly designated as a "FindBookStay Premier Managed" asset.',
                },
            ],
        },
        {
            id: "accounts-verification",
            number: "03",
            title: "Account & Mandatory Verification",
            blocks: [
                {
                    type: "paragraph",
                    text: "To reserve stays, connect with landlords, book turfs, or post listings, users must register an authentic account. You agree to provide accurate, current, and verifiable personal data, including national identification (NID/Passport), active phone contact, and legal proof of address.",
                },
                {
                    type: "paragraph",
                    text: "Hosts and property sellers are subject to mandatory documentary and identity verification before listing publication. FindBookStay reserves the absolute right to suspend or terminate accounts that provide misleading, falsified, or fraudulent credentials.",
                },
            ],
        },
        {
            id: "real-estate-buy",
            number: "04",
            title: "Property Sales & Acquisition",
            blocks: [
                {
                    type: "paragraph",
                    text: "All real estate sale listings (residential houses, commercial buildings, plots, and apartments) are cataloged following preliminary land registry and ownership checks.",
                },
                {
                    type: "paragraph",
                    text: "A sale inquiry or scheduling of an in-person site visit does not constitute a completed transfer of deed. Real estate transactions must conclude through formal deed execution, government registration, and statutory stamp duty compliance directly between buyer and seller in accordance with applicable local land laws.",
                },
            ],
        },
        {
            id: "residential-rentals",
            number: "05",
            title: "Residential Rentals & Bachelor Seats",
            blocks: [
                {
                    type: "paragraph",
                    text: "For family rental flats, independent villas, bachelor seats, and monthly sublets, users enter into direct tenancy agreements with the verified host or homeowner.",
                },
                {
                    type: "list",
                    items: [
                        {
                            label: "Bachelor Seats",
                            text: "Include designated utilities, shared spaces, and security terms as explicitly outlined in the listing details.",
                        },
                        {
                            label: "House Rules",
                            text: "Tenants must strictly abide by residential building bylaws, curfew guidelines, and guest policies established by the housing association or landlord.",
                        },
                        {
                            label: "Inspection Check-in",
                            text: "Tenants have 24 hours from physical move-in to report any discrepancy between the listed premises and actual conditions.",
                        },
                    ],
                },
            ],
        },
        {
            id: "hotel-stays",
            number: "06",
            title: "Hotels & Vacation Stays",
            blocks: [
                {
                    type: "paragraph",
                    text: "Hotel and resort reservations submitted through the Platform connect travelers directly with hospitality operators. Check-in and check-out timings, room occupancy limits, complimentary amenities, and house rules are defined by each hotel partner.",
                },
                {
                    type: "paragraph",
                    text: "Guests must present government-issued photo identification upon arrival. Hotel partners maintain the right to refuse admission to guests who violate standard hospitality decorum or local regulations.",
                },
            ],
        },
        {
            id: "sports-turfs",
            number: "07",
            title: "Sports Turfs & Arena Bookings",
            blocks: [
                {
                    type: "paragraph",
                    text: "Sports turf bookings reserve designated hourly time slots for artificial grass football turfs, cricket nets, and indoor sports arenas.",
                },
                {
                    type: "list",
                    items: [
                        {
                            label: "Punctuality",
                            text: "Reserved slots start and terminate strictly on schedule. Delays caused by teams do not extend playing time.",
                        },
                        {
                            label: "Proper Footwear",
                            text: "Players must wear appropriate turf shoes or flat rubber soles. Metal studs and damaging footwear are strictly prohibited.",
                        },
                        {
                            label: "Weather Contingency",
                            text: "In the event of severe weather or municipal power disruption preventing safe play, slots are rescheduled in direct coordination with turf management.",
                        },
                    ],
                },
            ],
        },
        {
            id: "direct-bookings",
            number: "08",
            title: "Direct Bookings & Reservations",
            blocks: [
                {
                    type: "paragraph",
                    text: "FindBookStay currently operates as a direct discovery and verified reservation marketplace. We do not collect, process, or hold online financial payments on the Platform at this time.",
                },
                {
                    type: "paragraph",
                    text: "All stay reservations, turf time-slot allocations, and rental agreements are arranged directly between users and verified hosts, homeowners, or facility managers. Financial settlements and room rates are handled directly between the parties upon check-in or through their mutually agreed terms.",
                },
            ],
        },
        {
            id: "cancellations-refunds",
            number: "09",
            title: "Cancellations & Rescheduling",
            blocks: [
                {
                    type: "paragraph",
                    text: "Cancellation and rescheduling policies are determined directly by each listing host or venue:",
                },
                {
                    type: "list",
                    items: [
                        {
                            label: "Hotel & Stay Reservations",
                            text: "Guests should communicate cancellations at least 48 hours in advance directly to the property host or hotel front desk.",
                        },
                        {
                            label: "Turf Bookings",
                            text: "Rescheduling is subject to available slots and must be requested with at least 24 hours notice to the turf manager.",
                        },
                        {
                            label: "Long-Term Rentals",
                            text: "Governed by the specific tenancy notice periods agreed between landlord and tenant.",
                        },
                    ],
                },
            ],
        },
        {
            id: "host-responsibilities",
            number: "10",
            title: "Host & Property Owner Duties",
            blocks: [
                {
                    type: "paragraph",
                    text: "Hosts warrant that they hold lawful authority, title, or lease rights to advertise properties and receive guests or tenants. Hosts must maintain clean, safe, and code-compliant premises with working utilities, fire safety precautions, and secure entry.",
                },
            ],
        },
        {
            id: "prohibited-conduct",
            number: "11",
            title: "Prohibited Activities",
            blocks: [
                {
                    type: "paragraph",
                    text: "Users and hosts may not:",
                },
                {
                    type: "list",
                    items: [
                        {
                            text: "Submit forged deed titles, misrepresent property boundaries, or upload misleading photographs.",
                        },
                        {
                            text: "Use rented properties or turf facilities for unlawful activities, harassment, or unauthorized commercial filming.",
                        },
                        {
                            text: "Engage in automated scraping, data extraction, or denial-of-service attacks against the Platform infrastructure.",
                        },
                        {
                            text: "Impersonate any individual, corporate representative, or municipal officer.",
                        },
                    ],
                },
            ],
        },
        {
            id: "liability-disclaimers",
            number: "12",
            title: "Liability & Warranties",
            blocks: [
                {
                    type: "paragraph",
                    text: 'To the maximum extent permitted by applicable law, FindBookStay provides the marketplace platform on an "as is" and "as available" basis without warranties of any kind, whether express or implied.',
                },
                {
                    type: "paragraph",
                    text: "In no event shall FindBookStay be liable for indirect, incidental, punitive, or consequential damages resulting from user interactions, third-party conduct, property defects, or sports injuries sustained on facility premises.",
                },
            ],
        },
        {
            id: "disputes-law",
            number: "13",
            title: "Dispute Resolution & Governing Law",
            blocks: [
                {
                    type: "paragraph",
                    text: "These Terms shall be construed and governed in accordance with the substantive laws of Bangladesh, without regard to conflict of law principles.",
                },
                {
                    type: "paragraph",
                    text: "Prior to initiating formal legal proceedings, parties agree to submit any unresolved dispute to FindBookStay Concierge Mediation for informal resolution over a 30-day deliberation window.",
                },
            ],
        },
        {
            id: "contact-legal",
            number: "14",
            title: "Legal Inquiries & Notice",
            blocks: [
                {
                    type: "paragraph",
                    text: "Formal notices, legal correspondence, or regulatory inquiries regarding these Terms must be addressed to our legal department.",
                },
            ],
        },
    ],
};

export const TERMS_DATA_BN: LegalDocumentData = {
    badge: "আইনি ও পরিচালনা",
    effectiveDate: "১ জানুয়ারি, ২০২৬",
    title: "ব্যবহারের শর্তাবলী",
    description: `এই ব্যবহারের শর্তাবলী ${siteData.domain} ব্যবহার ও অ্যাক্সেস নিয়ন্ত্রণ করে—যার মধ্যে রয়েছে প্রপার্টি ক্রয়-বিক্রয়, পারিবারিক ফ্ল্যাট ও ব্যাচেলর সিট ভাড়া, হোটেল রিসোর্ট বুকিং এবং স্পোর্টস টার্ফ রিজার্ভেশন।`,
    contactEmail: siteData.contacts.legalEmail,
    contactLabel: "আইনি সহায়তা প্রয়োজন?",
    contactDepartment: `${siteData.name} লিগ্যাল ও কমপ্লায়েন্স বিভাগ`,
    sections: [
        {
            id: "acceptance",
            number: "০১",
            title: "শর্তাবলীর গ্রহণযোগ্যতা ও সম্মতি",
            blocks: [
                {
                    type: "paragraph",
                    text: 'FindBookStay.com ("প্ল্যাটফর্ম", "আমরা", বা "আমাদের") অ্যাক্সেস, ব্রাউজ, অ্যাকাউন্ট নিবন্ধন বা যোগাযোগের মাধ্যমে আপনি স্বীকার করছেন যে আপনি এই শর্তাবলী, গোপনীয়তা নীতি এবং সম্পর্কিত সমস্ত নির্দেশিকা পড়েছেন এবং মেনে চলতে সম্মত হয়েছেন।',
                },
                {
                    type: "paragraph",
                    text: "আপনি যদি এই শর্তাবলীতে সম্পূর্ণ একমত না হন, তবে অবিলম্বে প্ল্যাটফর্মটির ব্যবহার বন্ধ করতে হবে। প্ল্যাটফর্মটির ধারাবাহিক ব্যবহার শর্তাবলীর যেকোনো ভবিষ্যৎ সংশোধনের সম্মতি হিসেবে গণ্য হবে।",
                },
            ],
        },
        {
            id: "platform-role",
            number: "০২",
            title: "FindBookStay প্ল্যাটফর্মের ভূমিকা",
            blocks: [
                {
                    type: "paragraph",
                    text: "FindBookStay একটি সমন্বিত ডিজিটাল মার্কেটপ্লেস সরবরাহ করে যা প্রপার্টি ক্রেতা, ভাড়াটিয়া, ভ্রমণকারী এবং খেলোয়াড়দের যাচাইকৃত বিক্রেতা, বাড়িওয়ালা, হোটেল অপারেটর এবং ক্রীড়া ভেন্যু পরিচালকদের সাথে সরাসরি সংযুক্ত করে।",
                },
                {
                    type: "paragraph",
                    text: "যদিও FindBookStay কঠোর সরেজমিন পরিদর্শন ও নথিপত্র যাচাই সম্পন্ন করে, তবে FindBookStay কোনো তৃতীয় পক্ষের ফ্ল্যাট, হোটেল বা টার্ফের প্রত্যক্ষ মালিক বা পরিচালনাকারী নয়।",
                },
            ],
        },
        {
            id: "accounts-verification",
            number: "০৩",
            title: "অ্যাকাউন্ট নিবন্ধন ও বাধ্যতামূলক যাচাইকরণ",
            blocks: [
                {
                    type: "paragraph",
                    text: "স্টে রিজার্ভ করতে, বাড়িওয়ালার সাথে যোগাযোগ করতে, টার্ফ বুক করতে বা লিস্টিং প্রকাশ করতে ব্যবহারকারীদের সঠিক তথ্য দিয়ে একটি বৈধ অ্যাকাউন্ট নিবন্ধন করতে হবে। এর মধ্যে জাতীয় পরিচয়পত্র (এনআইডি/পাসপোর্ট), সক্রিয় মোবাইল নম্বর এবং ঠিকানার প্রমাণ অন্তর্ভুক্ত থাকতে পারে।",
                },
                {
                    type: "paragraph",
                    text: "লিস্টিং প্রকাশের পূর্বে হোস্ট এবং প্রপার্টি বিক্রেতাদের জন্য বাধ্যতামূলক পরিচয় ও নথিপত্র যাচাইকরণ আবশ্যক। ভুয়া তথ্য প্রদানকারী অ্যাকাউন্ট বাতিল করার অধিকার FindBookStay সংরক্ষণ করে।",
                },
            ],
        },
        {
            id: "real-estate-buy",
            number: "০৪",
            title: "প্রপার্টি ও ফ্ল্যাট কেনাবেচা",
            blocks: [
                {
                    type: "paragraph",
                    text: "সকল বিক্রির লিস্টিং (আবাসিক বাড়ি, বাণিজ্যিক ভবন, প্লট এবং ফ্ল্যাট) প্রাথমিক দলিল ও মালিকানা যাচাইয়ের পর অন্তর্ভুক্ত করা হয়।",
                },
                {
                    type: "paragraph",
                    text: "সরাসরি পরিদর্শন বা অনুসন্ধান কোনো দলিল হস্তান্তরের চূড়ান্ত চুক্তি হিসেবে গণ্য হবে না। সমস্ত কেনাবেচা দেশের প্রচলিত আইন অনুযায়ী ক্রেতা এবং বিক্রেতার মধ্যে সরাসরি রেজিস্ট্রি ও স্ট্যাম্প ডিউটি পরিশোধের মাধ্যমে সম্পন্ন হতে হবে।",
                },
            ],
        },
        {
            id: "residential-rentals",
            number: "০৫",
            title: "বাসা ও ব্যাচেলর সিট ভাড়া",
            blocks: [
                {
                    type: "paragraph",
                    text: "পারিবারিক ফ্ল্যাট, ডুপ্লেক্স, ব্যাচেলর সিট এবং মাসিক সাবলেটের ক্ষেত্রে ব্যবহারকারীরা যাচাইকৃত হোস্ট বা বাড়িওয়ালার সাথে সরাসরি ভাড়ার চুক্তিতে আবদ্ধ হন।",
                },
                {
                    type: "list",
                    items: [
                        {
                            label: "ব্যাচেলর সিট",
                            text: "বিজ্ঞাপনের বিবরণ অনুযায়ী নির্ধারিত ইউটিলিটি, শেয়ার্ড স্পেস ও নিরাপত্তা শর্তাবলী অন্তর্ভুক্ত থাকে।",
                        },
                        {
                            label: "বাড়ির নিয়মাবলী",
                            text: "ভাড়াটিয়াদের অবশ্যই হাউজিং অ্যাসোসিয়েশন বা বাড়িওয়ালার গেট বন্ধের সময়, অতিথি নীতি ও ভবন সংক্রান্ত আইন মেনে চলতে হবে।",
                        },
                        {
                            label: "পরিদর্শন ও অভিযোগ",
                            text: "বাস্তব স্পেসের সাথে লিস্টিংয়ের কোনো অমিল থাকলে ওঠার ২৪ ঘণ্টার মধ্যে রিপোর্ট করতে হবে।",
                        },
                    ],
                },
            ],
        },
        {
            id: "hotel-stays",
            number: "০৬",
            title: "হোটেল ও ভ্যাকেশন স্টে",
            blocks: [
                {
                    type: "paragraph",
                    text: "প্ল্যাটফর্মের মাধ্যমে হোটেল এবং রিসোর্ট রিজার্ভেশন সরাসরি অপারেটরদের সাথে সংযুক্ত হয়। চেক-ইন ও চেক-আউট সময়, গেস্ট সংখ্যা এবং সুবিধার শর্তাবলী প্রতিটি হোটেল পার্টনার কর্তৃক নির্ধারিত হয়।",
                },
                {
                    type: "paragraph",
                    text: "চেক-ইনকালে অতিথিদের অবশ্যই সরকার অনুমোদিত ফটো আইডি প্রদর্শন করতে হবে। আচরণবিধি ভঙ্গকারী যেকোনো অতিথিকে প্রবেশে অস্বীকৃতি জানানোর অধিকার হোটেল কর্তৃপক্ষের রয়েছে।",
                },
            ],
        },
        {
            id: "sports-turfs",
            number: "০৭",
            title: "স্পোর্টস টার্ফ ও এরিনা বুকিং",
            blocks: [
                {
                    type: "paragraph",
                    text: "টার্ফ বুকিংয়ে কৃত্রিম ঘাসের মাঠ, ক্রিকেট নেট এবং ব্যাডমিন্টন কোর্টের নির্দিষ্ট ঘণ্টাপ্রতি স্লট সংরক্ষিত হয়।",
                },
                {
                    type: "list",
                    items: [
                        {
                            label: "সময়নিষ্ঠতা",
                            text: "বুককৃত স্লট সময়সূচি অনুযায়ী শুরু ও শেষ হয়। দলের বিলম্বের জন্য অতিরিক্ত সময় প্রদান করা হবে না।",
                        },
                        {
                            label: "উপযুক্ত জুতা",
                            text: "খেলোয়াড়দের অবশ্যই ফ্ল্যাট বা টার্ফ শু পরতে হবে। মেটাল স্পাইকযুক্ত জুতা সম্পূর্ণ নিষিদ্ধ।",
                        },
                        {
                            label: "প্রাকৃতিক দুর্যোগ",
                            text: "ভারী বৃষ্টিপাত বা বিদ্যুৎ বিভ্রাটে ম্যাচ বিঘ্নিত হলে ভেন্যু কর্তৃপক্ষের সাথে আলোচনা সাপেক্ষে স্লট পুনঃনির্ধারণ করা হবে।",
                        },
                    ],
                },
            ],
        },
        {
            id: "direct-bookings",
            number: "০৮",
            title: "সরাসরি বুকিং ও রিজার্ভেশন",
            blocks: [
                {
                    type: "paragraph",
                    text: "FindBookStay বর্তমানে সরাসরি ডিসকভারি ও যাচাইকৃত রিজার্ভেশন প্ল্যাটফর্ম হিসেবে কাজ করে। আমরা প্ল্যাটফর্মে সরাসরি কোনো অনলাইন পেমেন্ট সংগ্রহ করি না।",
                },
                {
                    type: "paragraph",
                    text: "সকল স্টে ও টার্ফ বুকিংয়ের আর্থিক লেনদেন সরাসরি অতিথি এবং হোস্ট বা ম্যানেজারের মধ্যে চেক-ইনকালে সম্পন্ন হয়।",
                },
            ],
        },
        {
            id: "cancellations-refunds",
            number: "০৯",
            title: "বাতিলকরণ ও পুনঃনির্ধারণ নীতি",
            blocks: [
                {
                    type: "paragraph",
                    text: "বাতিলকরণ এবং পুনঃনির্ধারণ প্রতিটি ভেন্যু বা হোস্টের নিজস্ব নীতিমালার ওপর নির্ভর করে:",
                },
                {
                    type: "list",
                    items: [
                        {
                            label: "হোটেল ও স্টে",
                            text: "বাতিলকরণের ক্ষেত্রে চেক-ইনের অন্তত ৪৮ ঘণ্টা পূর্বে সরাসরি হোস্টকে জানাতে হবে।",
                        },
                        {
                            label: "টার্ফ বুকিং",
                            text: "স্লট ফাঁকা থাকা সাপেক্ষে অন্তত ২৪ ঘণ্টা পূর্বে জানিয়ে পুনঃনির্ধারণ করা যায়।",
                        },
                        {
                            label: "দীর্ঘমেয়াদি ভাড়া",
                            text: "বাড়িওয়ালা ও ভাড়াটিয়ার চুক্তিপত্রে উল্লিখিত নোটিশ পিরিয়ড প্রযোজ্য।",
                        },
                    ],
                },
            ],
        },
        {
            id: "host-responsibilities",
            number: "১০",
            title: "হোস্ট ও মালিকদের দায়িত্ব",
            blocks: [
                {
                    type: "paragraph",
                    text: "হোস্টরা নিশ্চয়তা দেন যে প্রপার্টি বিজ্ঞাপন এবং অতিথি বা ভাড়াটিয়া গ্রহণের তাদের সম্পূর্ণ আইনি অধিকার রয়েছে। স্পেসটি পরিষ্কার, নিরাপদ এবং সব ইউটিলিটি সচল রাখতে হবে।",
                },
            ],
        },
        {
            id: "prohibited-conduct",
            number: "১১",
            title: "নিষিদ্ধ কার্যকলাপ",
            blocks: [
                {
                    type: "paragraph",
                    text: "কোনো ব্যবহারকারী বা হোস্ট জাল দলিল জমা দেওয়া, সীমানা বিকৃত করা বা প্ল্যাটফর্মের তথ্য অপব্যবহার করতে পারবেন না।",
                },
            ],
        },
        {
            id: "liability-disclaimers",
            number: "১২",
            title: "দায়মুক্তি ও ওয়্যারেন্টি",
            blocks: [
                {
                    type: "paragraph",
                    text: "আইনের সর্বোচ্চ অনুমোদিত সীমার মধ্যে FindBookStay এই প্ল্যাটফর্মকে 'যেমন আছে' ভিত্তিতে কোনো ধরনের প্রত্যক্ষ বা পরোক্ষ নিশ্চয়তা ছাড়া পরিচালনা করে।",
                },
            ],
        },
        {
            id: "disputes-law",
            number: "১৩",
            title: "বিরোধ নিষ্পত্তি ও বিচারিক এখতিয়ার",
            blocks: [
                {
                    type: "paragraph",
                    text: "এই শর্তাবলী বাংলাদেশের প্রচলিত আইন অনুসারে পরিচালিত ও ব্যাখ্যায়িত হবে।",
                },
            ],
        },
        {
            id: "contact-legal",
            number: "১৪",
            title: "আইনি যোগাযোগ ও নোটিশ",
            blocks: [
                {
                    type: "paragraph",
                    text: "এই শর্তাবলী সংক্রান্ত যেকোনো আনুষ্ঠানিক নোটিশ বা আইনি পত্র আমাদের লিগ্যাল বিভাগে পাঠাতে হবে।",
                },
            ],
        },
    ],
};
