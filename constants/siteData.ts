export interface SiteAddress {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    globalHubs: string;
    full: string;
    headquartersDisplay: string;
}

export interface SiteContacts {
    phone: string;
    phoneClean: string;
    phoneDisplay: string;
    supportEmail: string;
    legalEmail: string;
    privacyEmail: string;
    partnersEmail: string;
}

export interface SiteSocialLinks {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
}

export interface SiteData {
    name: string;
    domain: string;
    url: string;
    tagline: string;
    description: string;
    copyrightYear: number;
    address: SiteAddress;
    contacts: SiteContacts;
    socialLinks: SiteSocialLinks;
    appStatus: {
        ios: string;
        android: string;
    };
}

export const siteData: SiteData = {
    name: "FindBookStay",
    domain: "findbookstay.com",
    url: "https://findbookstay.com",
    tagline: "Exclusive Stays, Verified Properties & Sports Turfs",
    description: "FindBookStay is your premier verified marketplace to buy prime properties, rent homes, book luxury hotels & resorts, and reserve sports turfs worldwide.",
    copyrightYear: 2026,
    address: {
        street: "Gulshan-2",
        city: "Dhaka",
        postalCode: "1212",
        country: "Bangladesh",
        globalHubs: "Global Hubs",
        full: "Gulshan-2, Dhaka 1212, Bangladesh & Global Hubs",
        headquartersDisplay: "Headquarters: Gulshan-2, Dhaka 1212, Bangladesh & Global Hubs",
    },
    contacts: {
        phone: "+880 1700-000000",
        phoneClean: "+8801700000000",
        phoneDisplay: "+880 1700-000000 (24/7 Hotline)",
        supportEmail: "support@findbookstay.com",
        legalEmail: "legal@findbookstay.com",
        privacyEmail: "privacy@findbookstay.com",
        partnersEmail: "partners@findbookstay.com",
    },
    socialLinks: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
    },
    appStatus: {
        ios: "In Construction",
        android: "In Construction",
    },
};

export default siteData;
