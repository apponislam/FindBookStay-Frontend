<div align="center">

# 🏡 FindBookStay

**Verified Home Rentals, Exclusive Stays, Sports Turfs & Properties**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](./LICENSE)

<p align="center">
  FindBookStay is a modern, verified marketplace platform connecting property seekers directly with landlords, hoteliers, and sports turf operators — eliminating middleman brokers with 100% direct communication and zero unauthorized markups.
</p>

[Explore Platform](#-core-marketplace-verticals) • [Architecture](#-architecture--features) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack) • [Brand Colors](#-brand-colors--design-system)

</div>

---

## 🌟 Overview

FindBookStay bridges four essential urban living and lifestyle sectors into a unified, high-performance web experience. Designed with an editorial aesthetic, high-contrast typography, and strict usability standards, it serves both seekers and property owners seamlessly.

### Core Value Propositions
- **0% Broker Fees:** Direct negotiations and verified owner contact with no hidden broker commissions.
- **100% Direct Contact:** Inquiries connect users directly to genuine hosts, landlords, and venue managers.
- **Role-First Architecture:** Separate, tailored experiences for tenants/guests and property hosts/partners.
- **Rapid Concierge:** 24/7 dedicated support desk with guaranteed rapid response times.

---

## 🧭 Core Marketplace Verticals

FindBookStay operates across 4 core verticals in prioritized order:

| Serial | Vertical | Description | Key Features |
| :---: | :--- | :--- | :--- |
| **01** | **🏠 Rent** | Residential Rentals & Shared Seats | Family rental flats, bachelor seats, furnished studio rooms, and flexible monthly sublets. |
| **02** | **🏨 Book** | Stays, Hotels & Vacation Retreats | Handpicked boutique city hotels, scenic nature resorts, private holiday cottages, and short stays. |
| **03** | **🏆 Sports** | Sports Turfs & Court Reservations | Real-time hourly bookings for artificial grass soccer turfs, floodlit cricket nets, and indoor badminton courts. |
| **04** | **🏢 Buy** | Verified Real Estate & Land | Verified residential apartments, luxury architectural villas, commercial plots, and pre-launch developments. |

---

## 🛠️ Architecture & Features

### 1. Split-Screen Authentication Suite
- **50/50 Editorial Layout:** High-resolution architectural photography showcase on the left paired with a focused, non-card, borderless form on the right.
- **Role-First Registration (`/auth/register`):**
  - **Step 1:** Interactive 2-column animated role selection cards (*Tenant, Guest or Player* vs *Host, Landlord or Turf Owner*).
  - **Step 2:** Compact form with dynamic role switcher pill, real-time password strength meter, and terms agreement.
- **Form Validation:** Built with **React Hook Form** and **Zod** schema validation.
- **Custom Error Arrow Tooltips:** Non-intrusive upper-side error badges featuring directional pointer arrows (`▼`) aimed directly into invalid inputs.
- **Bot Defense:** Official **Cloudflare Turnstile** privacy-preserving robot verification.

### 2. Full-Width Direct Contact Desk (`/contact`)
- **Category Selector:** 5-service routing (*Rent, Book, Sports, Buy, Host & Partner*).
- **Direct 24/7 Hotline & Emails:** Clear access to phone lines, general support, and partner onboarding.
- **Responsive Layout:** Full container width (`container mx-auto px-4 sm:px-6 lg:px-8`) with ambient emerald lighting.

### 3. Help Center & Feedback Portal
- **Help Center (`/help`):** Searchable FAQ engine with instant category filtering across all verticals.
- **Feedback Portal (`/feedback`):** User voice channel for web enhancements and upcoming iOS/Android app roadmaps.
- **Comprehensive Sitemap (`/sitemap`):** Organized index of all marketplace categories and legal resources.

---

## 💻 Tech Stack

- **Framework:** [Next.js 16.4](https://nextjs.org/) (App Router, Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with `@theme inline` CSS variables
- **Form Management:** [React Hook Form](https://react-hook-form.com/) + [@hookform/resolvers](https://github.com/react-hook-form/resolvers)
- **Schema Validation:** [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Bot Detection:** [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)

---

## 🎨 Brand Colors & Design System

The application relies on semantic CSS variables configured in `app/globals.css`, adapting to light and dark interfaces:

```css
/* Core Brand Tokens */
--primary: #073B35;           /* Deep Forest Green */
--primary-hover: #052F2A;     /* Darker Forest Green */
--primary-foreground: #FFFFFF;
--accent: #10B981;            /* Vivid Mint / Emerald */
--accent-hover: #059669;
--background: #FFFFFF;        /* Base Background */
--surface: #F8FAF9;           /* Secondary Surface */
--surface-secondary: #F0F5F3; /* Pill / Badge Background */
--text-primary: #172B2A;      /* Dark Charcoal Slate */
--text-secondary: #64748B;    /* Muted Slate Gray */
--border: #E2EAE6;            /* Soft Gray-Green Border */
--destructive: #DC2626;       /* Error / Alert Crimson */
```

---

## 📁 Project Directory Structure

```text
FindBookStay-Frontend/
├── app/
│   ├── (auth)/                    # Authentication route group
│   │   └── auth/
│   │       ├── login/             # Sign-in page
│   │       ├── register/          # 2-step role-first sign-up page
│   │       ├── forgot-password/   # Password reset request
│   │       ├── reset-password/    # New password entry
│   │       └── layout.tsx         # 50/50 split-screen auth layout
│   ├── (root)/                    # Public marketplace route group
│   │   ├── about/                 # Company background & mission
│   │   ├── contact/               # Full-width contact & inquiry desk
│   │   ├── feedback/              # Product feedback & mobile updates
│   │   ├── help/                  # Searchable Help Center & FAQs
│   │   ├── privacy/               # Privacy policy
│   │   ├── sitemap/               # Visual sitemap navigation
│   │   └── terms/                 # Terms of service
│   ├── globals.css                # Tailwind CSS v4 theme & base layers
│   └── layout.tsx                 # Root layout & providers
├── components/
│   ├── auth/                      # Reusable auth components
│   │   ├── AuthButton.tsx         # Styled h-11 rounded-xl action buttons
│   │   ├── AuthCheckbox.tsx       # Semantic terms checkbox with arrow error
│   │   ├── AuthFooterLink.tsx     # Compact navigation footer links
│   │   ├── AuthHeader.tsx         # Clean editorial header
│   │   ├── AuthInput.tsx          # Form field with custom arrow error badges
│   │   ├── AuthLayout.tsx         # Split-screen responsive presentation
│   │   ├── LoginForm.tsx          # Login form with Turnstile
│   │   ├── RegisterForm.tsx       # Hook Form + Zod registration
│   │   └── TurnstileWidget.tsx    # Cloudflare Turnstile integration
│   ├── contact/                   # Contact page view components
│   ├── feedback/                  # Feedback form & category selector
│   ├── help/                      # Searchable FAQ accordion components
│   ├── Footer.tsx                 # 5-column responsive footer
│   └── Icons.tsx                  # Curated Lucide icon exports
├── constants/
│   └── siteData.ts                # Centralized brand, address & contacts info
├── public/                        # Static assets & generated hero photography
├── LICENSE                        # MIT License
└── package.json                   # Dependencies & npm scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (or `pnpm` / `bun`)

### 1. Clone & Install
```bash
git clone https://github.com/apponislam/FindBookStay-Frontend.git
cd FindBookStay-Frontend
npm install
```

### 2. Environment Configuration
Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

Configure your variables:
```env
# Optional: Replace with your Cloudflare Turnstile Site Key for production
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Compiles the production build |
| `npm run start` | Boots the compiled production server |
| `npm run lint` | Runs ESLint analysis across all project files |

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full details.

---

<div align="center">
  <sub>Built with care for <strong>FindBookStay</strong> by <a href="https://github.com/apponislam">Appon Islam</a>.</sub>
</div>
