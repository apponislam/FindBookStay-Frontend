export type MessagePillar = "rent" | "book" | "sports" | "buy";

export interface ChatMessage {
    id: string;
    sender: "me" | "them";
    text: string;
    textBn?: string;
    timestamp: string;
    timestampBn?: string;
    status?: "sent" | "delivered" | "read";
    attachments?: { type: "image"; url: string; label?: string }[];
}

export interface ChatParticipant {
    name: string;
    nameBn: string;
    avatar?: string;
    role: string;
    roleBn: string;
    verified: boolean;
    online: boolean;
    lastActive?: string;
    lastActiveBn?: string;
    responseTime: string;
    responseTimeBn: string;
    phone: string;
    whatsapp: string;
}

export interface ChatListingContext {
    id: string;
    title: string;
    titleBn: string;
    location: string;
    locationBn: string;
    price: string;
    priceBn: string;
    priceUnit: string;
    priceUnitBn: string;
    image: string;
    href: string;
    specs: { en: string; bn: string }[];
}

export interface ConversationItem {
    id: string;
    category: MessagePillar;
    participant: ChatParticipant;
    listing: ChatListingContext;
    unreadCount: number;
    pinned?: boolean;
    lastMessageTime: string;
    lastMessageTimeBn: string;
    quickReplies: { en: string; bn: string }[];
    messages: ChatMessage[];
}

export const INITIAL_CONVERSATIONS: ConversationItem[] = [
    {
        id: "conv-1",
        category: "rent",
        unreadCount: 1,
        pinned: true,
        lastMessageTime: "10m ago",
        lastMessageTimeBn: "১০ মিনিট আগে",
        participant: {
            name: "Md. Rafiqul Islam",
            nameBn: "মো: রফিকুল ইসলাম",
            role: "Verified Landlord",
            roleBn: "যাচাইকৃত বাড়িওয়ালা",
            verified: true,
            online: true,
            responseTime: "Usually replies in 10 mins",
            responseTimeBn: "সাধারণত ১০ মিনিটে উত্তর দেন",
            phone: "+880 1711-234567",
            whatsapp: "+8801711234567",
        },
        listing: {
            id: "rent-301",
            title: "Modern 3BHK South-Facing Apartment with 2 Balconies",
            titleBn: "বসুন্ধরা ডি ব্লকে ৩ বেডের দক্ষিণমুখী আলো-বাতাসপূর্ণ অ্যাপার্টমেন্ট",
            location: "Block D, Bashundhara R/A, Dhaka",
            locationBn: "ব্লক ডি, বসুন্ধরা আ/এ, ঢাকা",
            price: "৳32,000",
            priceBn: "৳৩২,০০০",
            priceUnit: "/ month",
            priceUnitBn: "/ মাস",
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
            href: "/rent",
            specs: [
                { en: "3 Beds", bn: "৩ বেডরুম" },
                { en: "3 Baths", bn: "৩ বাথরুম" },
                { en: "1,650 sqft", bn: "১,৬৫০ বর্গফুট" },
                { en: "Lift & Generator", bn: "লিফট ও জেনারেটর" },
            ],
        },
        quickReplies: [
            { en: "Can I schedule a visit this Friday?", bn: "এই শুক্রবার ফ্ল্যাটটি দেখতে যেতে পারি?" },
            { en: "What is the security deposit?", bn: "জামানতের পরিমাণ কত?" },
            { en: "Is parking space included?", bn: "গাড়ি পার্কিং সুবিধা আছে কি?" },
        ],
        messages: [
            {
                id: "m-1-1",
                sender: "me",
                text: "Assalamu Alaikum. I saw your listing for the 3BHK flat in Bashundhara Block D. Is it available for move-in from next month?",
                textBn: "আসসালামু আলাইকুম। বসুন্ধরা ডি ব্লকের ৩ বেডের ফ্ল্যাটটি দেখেছি। আগামী মাসের ১ তারিখ থেকে কি ওঠা যাবে?",
                timestamp: "11:15 AM",
                timestampBn: "সকাল ১১:১৫",
                status: "read",
            },
            {
                id: "m-1-2",
                sender: "them",
                text: "Walaikum Assalam. Yes, the current tenant moves out on the 28th. It is ready for family move-in from the 1st.",
                textBn: "ওয়ালাইকুম আসসালাম। হ্যাঁ, বর্তমান ভাড়াটিয়া ২৮ তারিখে খালি করবেন। আগামী মাসের ১ তারিখ থেকে পরিবারের জন্য প্রস্তুত।",
                timestamp: "11:22 AM",
                timestampBn: "সকাল ১১:২২",
                status: "read",
            },
            {
                id: "m-1-3",
                sender: "me",
                text: "That sounds perfect. Can we schedule an in-person visit this Friday around 4:30 PM after Jummah prayer?",
                textBn: "খুবই ভালো। আমরা কি এই শুক্রবার জুমার নামাজের পর বিকাল ৪:৩০ মিনিটে সশরীরে এসে দেখতে পারি?",
                timestamp: "11:30 AM",
                timestampBn: "সকাল ১১:৩০",
                status: "read",
            },
            {
                id: "m-1-4",
                sender: "them",
                text: "4:30 PM on Friday is confirmed. The building caretaker is Monir. I will also be there at the flat to show you around. Please bring your family.",
                textBn: "শুক্রবার বিকাল ৪:৩০ নিশ্চিত রইল। কেয়ারটেকার মনির উপস্থিত থাকবেন এবং আমিও থাকব। সপরিবারে ঘুরে দেখতে পারেন।",
                timestamp: "11:38 AM",
                timestampBn: "সকাল ১১:৩৮",
                status: "read",
            },
        ],
    },
    {
        id: "conv-2",
        category: "book",
        unreadCount: 1,
        pinned: true,
        lastMessageTime: "25m ago",
        lastMessageTimeBn: "২৫ মিনিট আগে",
        participant: {
            name: "Tahsin Rahman",
            nameBn: "তাহসিন রহমান",
            role: "Resort Concierge & Host",
            roleBn: "রিসোর্ট হোস্ট ও কনসিয়েজ",
            verified: true,
            online: true,
            responseTime: "Replies instantly",
            responseTimeBn: "তাৎক্ষণিক উত্তর দেন",
            phone: "+880 1819-876543",
            whatsapp: "+8801819876543",
        },
        listing: {
            id: "book-108",
            title: "The Grand Waterfront Oceanfront Luxury Villa & Spa",
            titleBn: "ইনানী বিচে গ্র্যান্ড ওয়াটারফ্রন্ট লাক্সারি ভিলা ও স্পা",
            location: "Marine Drive, Inani Beach, Cox's Bazar",
            locationBn: "মেরিন ড্রাইভ, ইনানী সৈকত, কক্সবাজার",
            price: "৳12,500",
            priceBn: "৳১২,৫০০",
            priceUnit: "/ night",
            priceUnitBn: "/ রাত",
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
            href: "/book",
            specs: [
                { en: "Oceanfront View", bn: "সরাসরি সমুদ্র দর্শন" },
                { en: "Infinity Pool", bn: "ইনফিনিটি সুইমিং পুল" },
                { en: "Complimentary Breakfast", bn: "বিনামূল্যে সকালের নাস্তা" },
                { en: "AC Suite", bn: "শীতাতপ নিয়ন্ত্রিত স্যুট" },
            ],
        },
        quickReplies: [
            { en: "Is airport pickup included?", bn: "বিমানবন্দর পিকআপ সেবা আছে কি?" },
            { en: "Can we request late checkout?", bn: "দেরিতে চেক-আউটের সুযোগ আছে কি?" },
            { en: "Is BBQ setup available?", bn: "বারবিকিউ আয়োজন করা যাবে কি?" },
        ],
        messages: [
            {
                id: "m-2-1",
                sender: "me",
                text: "Hello! We are planning a 3-night family vacation next weekend. Does the Oceanfront Villa include complimentary airport pickup from Cox's Bazar?",
                textBn: "হ্যালো! আমরা আগামী উইকেন্ডে ৩ রাতের পারিবারিক ভ্রমণের পরিকল্পনা করছি। কক্সবাজার বিমানবন্দর থেকে পিকআপ সুবিধা কি ফ্রি?",
                timestamp: "Yesterday",
                timestampBn: "গতকাল",
                status: "read",
            },
            {
                id: "m-2-2",
                sender: "them",
                text: "Greetings! Yes, for 2+ nights booking, our private AC HiAce airport shuttle service is completely complimentary. We also offer fresh green coconut welcome drinks.",
                textBn: "শুভেচ্ছা! হ্যাঁ, ২ বা ততোধিক রাতের বুকিংয়ে আমাদের প্রাইভেট এসি হাইয়েস এয়ারপোর্ট শাটল সম্পূর্ণ ফ্রি। সাথে থাকছে ডাবের পানির স্বাগতম ড্রিংক।",
                timestamp: "Yesterday",
                timestampBn: "গতকাল",
                status: "read",
            },
            {
                id: "m-2-3",
                sender: "me",
                text: "That is wonderful. We are 4 adults and 1 toddler. Can an extra rollaway bed be placed in the master bedroom?",
                textBn: "চমৎকার! আমরা ৪ জন প্রাপ্তবয়স্ক এবং ১ জন শিশু। মাস্টার বেডরুমে কি একটি অতিরিক্ত বেড যোগ করা যাবে?",
                timestamp: "10:05 AM",
                timestampBn: "সকাল ১০:০৫",
                status: "read",
            },
            {
                id: "m-2-4",
                sender: "them",
                text: "Certainly! We have blocked an extra premium orthopedic mattress and baby cot for you with no surcharge. Would you like me to hold the reservation?",
                textBn: "অবশ্যই! কোনো অতিরিক্ত চার্জ ছাড়াই আপনার জন্য একটি প্রিমিয়াম ম্যাট্রেস ও বেবি কট প্রস্তুত রাখা হয়েছে। রিজার্ভেশনটি নিশ্চিত করব কি?",
                timestamp: "10:18 AM",
                timestampBn: "সকাল ১০:১৮",
                status: "read",
            },
        ],
    },
    {
        id: "conv-3",
        category: "sports",
        unreadCount: 0,
        pinned: false,
        lastMessageTime: "2h ago",
        lastMessageTimeBn: "২ ঘণ্টা আগে",
        participant: {
            name: "Tanvir Ahmed",
            nameBn: "তানভীর আহমেদ",
            role: "Turf Match Coordinator",
            roleBn: "টার্ফ ম্যাচ সমন্বয়ক",
            verified: true,
            online: false,
            lastActive: "Active 15m ago",
            lastActiveBn: "১৫ মিনিট আগে সক্রিয়",
            responseTime: "Usually replies in 5 mins",
            responseTimeBn: "সাধারণত ৫ মিনিটে উত্তর দেন",
            phone: "+880 1912-345678",
            whatsapp: "+8801912345678",
        },
        listing: {
            id: "sports-504",
            title: "Green Horizon FIFA Standard 7v7 Floodlit Arena",
            titleBn: "গ্রিন হরাইজন ফিফা স্ট্যান্ডার্ড ৭v৭ ফ্লাডলিট অ্যারেনা",
            location: "Sector 4, Uttara, Dhaka",
            locationBn: "সেক্টর ৪, উত্তরা, ঢাকা",
            price: "৳2,500",
            priceBn: "৳২,৫০০",
            priceUnit: "/ hour",
            priceUnitBn: "/ ঘণ্টা",
            image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
            href: "/sports",
            specs: [
                { en: "7v7 FIFA Grass", bn: "৭v৭ ফিফা মানের ঘাস" },
                { en: "LED Floodlights", bn: "উচ্চমানের ফ্লাডলাইট" },
                { en: "Changing Rooms", bn: "চেঞ্জিং রুম ও শাওয়ার" },
                { en: "Match Balls & Bibs", bn: "ম্যাচ বল ও বিবস" },
            ],
        },
        quickReplies: [
            { en: "Are bibs and match ball provided?", bn: "বিবস ও ম্যাচ বল কি মাঠে দেওয়া হয়?" },
            { en: "Is the slot confirmed for tonight?", bn: "আজকের স্লট কি কনফার্ম?" },
            { en: "Is parking available for 4 cars?", bn: "৪টি গাড়ি পার্কিংয়ের জায়গা হবে কি?" },
        ],
        messages: [
            {
                id: "m-3-1",
                sender: "me",
                text: "Hey Tanvir bhai! Is the 8:00 PM - 10:00 PM floodlit slot available this Thursday for an IT corporate friendly match?",
                textBn: "তানভীর ভাই! এই বৃহস্পতিবার রাত ৮:০০ - ১০:০০ টা পর্যন্ত ফ্লাডলাইট স্লটটি কি ফাঁকা আছে? আমাদের ফ্রেন্ডলি ম্যাচ আছে।",
                timestamp: "8:30 AM",
                timestampBn: "সকাল ৮:৩০",
                status: "read",
            },
            {
                id: "m-3-2",
                sender: "them",
                text: "Hey captain! Yes, Thursday 8 PM - 10 PM is available. 7v7 FIFA grade turf with fresh numbered bibs, 2 match balls, and mineral water provided.",
                textBn: "ক্যাপ্টেন! হ্যাঁ, বৃহস্পতিবার রাত ৮টা থেকে ১০টা ফাঁকা আছে। ফ্রেশ বিবস, ২টি ম্যাচ বল এবং ঠান্ডা পানি প্রস্তুত থাকবে।",
                timestamp: "8:34 AM",
                timestampBn: "সকাল ৮:৩৪",
                status: "read",
            },
            {
                id: "m-3-3",
                sender: "me",
                text: "Awesome! Slot locked. Our squad will arrive by 7:45 PM for warm-up.",
                textBn: "দারুণ! আমরা ৭:৪৫ মিনিটে মাঠে চলে আসব ওয়ার্ম-আপের জন্য।",
                timestamp: "9:00 AM",
                timestampBn: "সকাল ৯:০০",
                status: "read",
            },
            {
                id: "m-3-4",
                sender: "them",
                text: "All set! Floodlights will turn on at 7:50 PM. Changing rooms 1 and 2 are assigned to your team.",
                textBn: "সব রেডি! ৭:৫০ এ ফ্লাডলাইট চালু হবে। টিম Phoenix-এর জন্য ১ ও ২ নম্বর ড্রেসিংরুম রাখা হয়েছে।",
                timestamp: "9:02 AM",
                timestampBn: "সকাল ৯:০২",
                status: "read",
            },
        ],
    },
    {
        id: "conv-4",
        category: "buy",
        unreadCount: 0,
        pinned: false,
        lastMessageTime: "Yesterday",
        lastMessageTimeBn: "গতকাল",
        participant: {
            name: "Barrister Tariqul Hasan",
            nameBn: "ব্যারিস্টার তরিকুল হাসান",
            role: "Direct Landowner",
            roleBn: "সরাসরি জমির মালিক",
            verified: true,
            online: true,
            responseTime: "Replies within an hour",
            responseTimeBn: "১ ঘণ্টার মধ্যে উত্তর দেন",
            phone: "+880 1713-987654",
            whatsapp: "+8801713987654",
        },
        listing: {
            id: "buy-204",
            title: "Luxury 4BHK South-Facing Penthouse Apartment",
            titleBn: "গুলশান ২-এ বিলাসবহুল ৪ বেডের দক্ষিণমুখী পেন্টহাউস অ্যাপার্টমেন্ট",
            location: "Road 45, Gulshan 2, Dhaka",
            locationBn: "রোড ৪৫, গুলশান ২, ঢাকা",
            price: "৳4.85 Crore",
            priceBn: "৳৪.৮৫ কোটি",
            priceUnit: "(Negotiable)",
            priceUnitBn: "(আলোচনা সাপেক্ষ)",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            href: "/buy",
            specs: [
                { en: "4 Beds", bn: "৪ বেডরুম" },
                { en: "5 Baths", bn: "৫ বাথরুম" },
                { en: "3,400 sqft", bn: "৩,৪০০ বর্গফুট" },
                { en: "Clean Title Deed", bn: "নির্দোষ সাফ-কবলা দলিল" },
            ],
        },
        quickReplies: [
            { en: "Can we review mutation & CS parcha?", bn: "নামজারি ও সিএস পর্চা দেখতে পারি?" },
            { en: "Is bank loan facility available?", bn: "ব্যাংক লোন সুবিধা বিদ্যমান আছে?" },
            { en: "Can we schedule a lawyer visit?", bn: "আইনজীবীর মাধ্যমে কাগজপত্র যাচাই করা যাবে?" },
        ],
        messages: [
            {
                id: "m-4-1",
                sender: "me",
                text: "Respected Sir, we reviewed your penthouse listing in Gulshan 2. Are the RAJUK approved plans and updated mutation documents ready for legal inspection?",
                textBn: "শ্রদ্ধেয় স্যার, গুলশান ২ এর পেন্টহাউসের লিস্টিংটি দেখেছি। রাজউক অনুমোদিত প্ল্যান এবং নামজারি রেকর্ড কি লিগ্যাল ভেটিংয়ের জন্য প্রস্তুত?",
                timestamp: "Yesterday",
                timestampBn: "গতকাল",
                status: "read",
            },
            {
                id: "m-4-2",
                sender: "them",
                text: "Good day. Yes, all CS/SA/RS parchis, updated mutation in my name, and RAJUK approved drawings are certified and available at my law chamber.",
                textBn: "শুভ দিন। হ্যাঁ, সিএস/এসএ/আরএস পর্চা, আমার নামে নামজারি এবং রাজউক অনুমোদিত ড্রয়িং সম্পূর্ণ প্রস্তুত আছে।",
                timestamp: "Yesterday",
                timestampBn: "গতকাল",
                status: "read",
            },
            {
                id: "m-4-3",
                sender: "me",
                text: "Our bank's legal counsel would like to conduct an inspection this Wednesday at 11:30 AM. Would that time suit you?",
                textBn: "আমাদের ব্যাংকের লিগ্যাল অফিসার বুধবার সকাল ১১:৩০ মিনিটে এসে কাগজপত্র দেখতে চান। এই সময় কি আপনার সুবিধা হবে?",
                timestamp: "Yesterday",
                timestampBn: "গতকাল",
                status: "read",
            },
            {
                id: "m-4-4",
                sender: "them",
                text: "Wednesday 11:30 AM is ideal. Please visit my chamber at Gulshan 2. I will have the certified deed copies and non-encumbrance certificate ready.",
                textBn: "বুধবার সকাল ১১:৩০ মিনিট একদম সুবিধাজনক। গুলশান ২ এর চেম্বারে আসতে পারেন, সব সার্টিফাইড কপি ও নির্দায় সনদপত্র প্রস্তুত থাকবে।",
                timestamp: "Yesterday",
                timestampBn: "গতকাল",
                status: "read",
            },
        ],
    },
    {
        id: "conv-5",
        category: "rent",
        unreadCount: 0,
        pinned: false,
        lastMessageTime: "Nov 20",
        lastMessageTimeBn: "২০ নভেম্বর",
        participant: {
            name: "Shuvo Chowdhury",
            nameBn: "শুভ চৌধুরী",
            role: "Verified Flatmate & Lead",
            roleBn: "ভেরিফায়েড ফ্ল্যাটমেট ও প্রধান",
            verified: true,
            online: false,
            lastActive: "Active 2h ago",
            lastActiveBn: "২ ঘণ্টা আগে সক্রিয়",
            responseTime: "Replies in 20 mins",
            responseTimeBn: "২০ মিনিটের মধ্যে উত্তর দেন",
            phone: "+880 1678-112233",
            whatsapp: "+8801678112233",
        },
        listing: {
            id: "rent-102",
            title: "Single Master Bed Seat with Attached Bath & Balcony",
            titleBn: "মাস্টার বেড সিট ও সংযুক্ত বাথরুম ও বারান্দা",
            location: "Road 27, Dhanmondi, Dhaka",
            locationBn: "রোড ২৭, ধানমন্ডি, ঢাকা",
            price: "৳7,500",
            priceBn: "৳৭,৫০০",
            priceUnit: "/ month (All Inclusive)",
            priceUnitBn: "/ মাস (সব মিলিয়ে)",
            image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
            href: "/rent",
            specs: [
                { en: "Attached Bath", bn: "সংযুক্ত বাথরুম" },
                { en: "South Balcony", bn: "দক্ষিণমুখী বারান্দা" },
                { en: "High-speed WiFi", bn: "উচ্চগতির ওয়াইফাই" },
                { en: "Maid & Food Included", bn: "খাবার ও গৃহকর্মী অন্তর্ভুক্ত" },
            ],
        },
        quickReplies: [
            { en: "Is the seat available immediately?", bn: "সিটটিতে কি এখনই ওঠা যাবে?" },
            { en: "Are utility bills separate?", bn: "ইউটিলিটি বিল কি আলাদা?" },
            { en: "Can jobholders apply?", bn: "চাকরিজীবীরা থাকতে পারবেন?" },
        ],
        messages: [
            {
                id: "m-5-1",
                sender: "me",
                text: "Bhai, does the ৳7,500 monthly rent include cook maid (3 meals), high-speed WiFi, and electricity?",
                textBn: "ভাই, ৭,৫০০ টাকার মধ্যে কি ৩ বেলার খাবার, ওয়াইফাই এবং বিদ্যুৎ বিল অন্তর্ভুক্ত?",
                timestamp: "Nov 20",
                timestampBn: "২০ নভেম্বর",
                status: "read",
            },
            {
                id: "m-5-2",
                sender: "them",
                text: "Yes brother! Everything is all-inclusive. Pure water filter, refrigerator access, and 24/7 security. All flatmates are graduate jobholders.",
                textBn: "হ্যাঁ ভাই! সবকিছু মিলিয়েই। বিশুদ্ধ পানির ফিল্টার, ফ্রিজ ব্যবহার ও সার্বক্ষণিক নিরাপত্তা রয়েছে। ফ্ল্যাটের সবাই চাকরিজীবী।",
                timestamp: "Nov 20",
                timestampBn: "২০ নভেম্বর",
                status: "read",
            },
        ],
    },
];
