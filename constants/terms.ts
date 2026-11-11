import { LegalDocumentData } from "./legal";

export const TERMS_DATA: LegalDocumentData = {
    badge: "Legal & Governance",
    effectiveDate: "January 1, 2026",
    title: "Terms of Service",
    description:
        "These Terms and Conditions govern your access to and use of FindBookStay.com, including our property acquisition services, residential leasing, bachelor seat rentals, hotel accommodations, and sports turf reservations.",
    contactEmail: "legal@findbookstay.com",
    contactLabel: "Need legal clarification?",
    contactDepartment: "FindBookStay Legal & Compliance Department",
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
