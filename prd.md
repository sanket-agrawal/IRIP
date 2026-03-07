# IRIP — Intelligence & Risk Insights Platform (Frontend)

## Product Overview

IRIP is a SaaS intelligence platform that provides interactive geopolitical, natural disaster, and cyber risk insights for companies and their global locations. Users explore a 3D interactive globe, search companies, assess location-level risks, and download AI-generated intelligence reports — with a freemium monetisation model.

This document covers the **frontend (Next.js)** application only. The backend API is a separate service — see [`be-prd.md`](./be-prd.md).

**Reference:** [SitDeck](https://sitdeck.com) — CIA-level dashboards with interactive globe, real-time data feeds, and map layers.

---

## Architecture — FE / BE Split

```
┌──────────────────────────────────────────────────────────┐
│                  FRONTEND (Next.js / Vercel)              │
│                                                          │
│  Globe ─ Search ─ Risk Dashboard ─ Report Download       │
│  Clerk Auth UI ─ Pricing Page ─ Paywall Modal            │
│                                                          │
│  Talks to backend via REST API (HTTPS)                   │
│  Handles Clerk session → passes JWT to backend           │
│  Razorpay checkout initiated from client SDK             │
└────────────────────────┬─────────────────────────────────┘
                         │ HTTPS (JSON)
                         │ Auth: Bearer <clerk_jwt>
┌────────────────────────▼─────────────────────────────────┐
│              BACKEND API (Python FastAPI / Railway)       │
│                                                          │
│  /companies/* ─ /risk/* ─ /reports/* ─ /payments/*       │
│  /data-feeds/* ─ /webhooks/* ─ /usage/*                  │
│  Data ingestion workers ─ Claude PDF pipeline            │
│                                                          │
│  See be-prd.md for full spec                             │
└──────────────────────────────────────────────────────────┘
```

---

## Frontend Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js 14+ (App Router) | SSR, routing, great DX |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS + shadcn/ui | Fast, consistent, beautiful UI |
| **3D Globe** | `react-globe.gl` (Three.js / WebGL) | Interactive 3D globe with markers, arcs, layers |
| **Auth** | Clerk (Next.js SDK) | Social + email auth, JWT for backend |
| **Payments (client)** | Razorpay Checkout (JS SDK) | India-compatible, UPI support |
| **State Mgmt** | Zustand | Lightweight global state (globe, search, user) |
| **Data Fetching** | TanStack Query (React Query) | Caching, deduplication, background refresh |
| **Charts** | Recharts | Gauge, radar, bar charts for risk data |
| **Animations** | Framer Motion | Smooth panel transitions, globe animations |
| **Hosting** | Vercel | Zero-config Next.js deploy |

---

## Phase 1 — Scope

| # | Feature | Owner |
|---|---------|-------|
| 1 | Interactive Globe Homepage | FE |
| 2 | Company Search + Location Mapping | FE (calls BE API) |
| 3 | Location Risk Dashboard | FE (calls BE API) |
| 4 | AI-Generated Company Report (PDF) | FE triggers, BE generates |
| 5 | Authentication (Clerk) | FE (Clerk components + JWT) |
| 6 | Freemium + Razorpay Packages | FE (pricing UI, Razorpay SDK) + BE (webhooks, gating) |

---

## Pages & Routes

| Route | Page | Auth Required | Description |
|-------|------|---------------|-------------|
| `/` | Homepage | No | Interactive globe + search bar + CTA |
| `/sign-in` | Sign In | No | Clerk sign-in |
| `/sign-up` | Sign Up | No | Clerk sign-up |
| `/search` | Search Results | No | Company autocomplete results |
| `/company/[slug]` | Company Detail | Yes | Company info + locations on globe |
| `/company/[slug]/location/[id]` | Risk Dashboard | Yes | Full risk assessment for a location |
| `/pricing` | Pricing | No | 3-tier package cards |
| `/dashboard` | User Dashboard | Yes | Usage stats, plan, billing |

---

## Detailed Feature Specifications

### Feature 1: Interactive Globe Homepage

**Route:** `/`

**Behaviour:**
1. Full-viewport 3D globe rendered with `react-globe.gl`
2. Globe auto-rotates slowly on load; stops on user interaction
3. Countries are colour-coded by an aggregate risk index (green → yellow → red)
4. On **hover**: country name + summary tooltip
5. On **click**: side panel slides in with country data:
   - Country name, flag, region
   - Population, GDP, political stability index
   - Top risks (natural disaster types, cyber threat level)
   - Number of tracked companies with presence there
6. Globe has atmospheric glow, day/night shading
7. Navbar overlay on globe: logo, search bar, auth buttons
8. "Explore Companies" CTA below the search bar

**UI Design (SitDeck-inspired):**
- Dark theme (near-black background: `#0a0a0f`)
- Glowing globe with particle/dot style (not solid fill)
- Neon accent colours: cyan (`#06b6d4`), emerald (`#10b981`), amber (`#f59e0b`), red (`#ef4444`)
- Glassmorphism panels (`backdrop-blur-xl bg-white/5 border border-white/10`)
- Smooth transitions and animations (Framer Motion)
- Monospace typography for data labels (JetBrains Mono)
- Sans-serif for UI text (Inter)

**Technical Notes:**
- Globe data: GeoJSON polygons for countries (static, in `public/globe/`)
- Lazy-load globe component (`dynamic(() => import(...), { ssr: false })`)
- Country data: call `GET {API_URL}/countries/{iso_code}` on click
- Fallback: static globe image for bots/SSR via `<noscript>`
- Performance: use `useMemo` for globe data, debounce interactions

---

### Feature 2: Company Search + Location Mapping

**Route:** `/search` (also accessible from homepage search bar)

**Behaviour:**
1. Search bar with **debounced autocomplete** (300ms)
2. Dropdown shows matching companies: logo, name, industry, HQ country
3. On select → navigate to `/company/[slug]`
4. Company page shows:
   - Company info card (name, industry, website, employee count)
   - Globe zooms/flies to company's locations
   - All locations plotted as **glowing markers** on globe
   - Location list panel on the side
5. Click a location marker or list item → opens **Risk Dashboard** (Feature 3)

**API Calls (to backend):**
- `GET {API_URL}/companies/search?q=<term>&limit=10`
- `GET {API_URL}/companies/{slug}`
- `GET {API_URL}/companies/{slug}/locations`

**Globe Interaction:**
- On company select, globe animates (fly-to) to center on company locations
- Markers use `react-globe.gl` custom HTML markers (pulsing dots with CSS animation)
- Arc lines connect HQ to other locations (optional visual)
- Zustand store holds `selectedCompany`, `selectedLocation`, `globeView` state

---

### Feature 3: Location Risk Dashboard

**Route:** `/company/[slug]/location/[locationId]`

**Behaviour:**
1. Selected location highlighted on the globe (pulsing ring)
2. Dashboard panel displays:

   **Risk Overview Card**
   - Overall risk score (gauge chart via Recharts, 0-10)
   - Risk category badge: Low / Moderate / High / Critical

   **Natural Disaster Risk**
   - Earthquake, Flood, Cyclone, Wildfire, Volcano scores
   - Radar chart (Recharts) of all disaster risks
   - Historical events timeline

   **Cyber Risk**
   - Exposure score + breakdown cards
   - Regional cyber threat level indicator
   - Bar chart visualisation

   **Geopolitical Risk**
   - Political stability index
   - Conflict proximity score
   - Recent events feed (scrollable list)

   **Infrastructure**
   - Nearest airport, internet quality, power reliability

3. Each section is a collapsible shadcn `Accordion` with a score badge
4. "Download Full Report" button prominent at top

**API Calls (to backend):**
- `GET {API_URL}/risk/{locationId}`
- `GET {API_URL}/risk/{locationId}/events` (geopolitical events feed)

---

### Feature 4: AI-Generated Company Report (PDF Download)

**Behaviour (frontend side):**
1. User clicks "Download Report" on company or risk page
2. Frontend calls `GET {API_URL}/usage/check` to verify quota
3. If blocked → show `PaywallModal` with pricing tiers
4. If allowed → `POST {API_URL}/reports/generate` with `{ company_id, location_id? }`
5. Show loading state with progress animation ("Generating intelligence report...")
6. Receive PDF blob from backend → trigger browser download via `URL.createObjectURL`
7. Update usage display in dashboard

**Loading UX:**
- Estimated ~15-30s generation time
- Show animated skeleton with "Analysing company data...", "Assessing risks...", "Compiling report..."
- Option: use SSE/WebSocket from backend for real progress updates

---

### Feature 5: Authentication (Clerk)

**Implementation:**
1. `@clerk/nextjs` installed, `<ClerkProvider>` in root layout
2. Pages: `/sign-in/[[...sign-in]]`, `/sign-up/[[...sign-up]]`
3. Middleware (`middleware.ts`): protect `/company/*`, `/dashboard`
4. Public routes: `/`, `/search`, `/pricing`
5. On sign-in, get Clerk JWT → pass as `Authorization: Bearer <jwt>` to backend
6. Backend verifies JWT with Clerk's JWKS endpoint
7. Clerk webhook (`user.created`) is handled by **backend**, not frontend

**Clerk → Backend Auth Flow:**
```
User signs in (Clerk) → Clerk issues JWT → Frontend stores session
  → API call with `Authorization: Bearer <clerk_jwt>` header
  → Backend verifies JWT via Clerk JWKS
  → Backend extracts user_id, checks DB, proceeds
```

---

### Feature 6: Freemium + Razorpay Packages

**Pricing Page (`/pricing`):**

| | Starter | Pro | Enterprise |
|---|---------|-----|------------|
| **Price** | ₹999/mo (~$12) | ₹2,499/mo (~$30) | ₹4,999/mo (~$60) |
| **Company Searches** | 25/mo | 100/mo | Unlimited |
| **Report Downloads** | 5/mo | 25/mo | Unlimited |
| **Risk Dashboard** | Basic | Full | Full + API |
| **Data Export** | CSV | CSV + PDF | CSV + PDF + API |
| **Support** | Email | Priority Email | Dedicated |

**Free Tier:** 1 search + 1 report download (lifetime). No credit card required.

**Razorpay Integration (frontend):**
1. User clicks "Subscribe" on pricing card
2. Frontend calls `POST {API_URL}/payments/create-subscription` with `{ plan_id }`
3. Backend returns `{ subscription_id, razorpay_key }` 
4. Frontend opens Razorpay Checkout modal:
   ```js
   const rzp = new Razorpay({
     key: razorpay_key,
     subscription_id: subscription_id,
     handler: (response) => { /* verify with backend */ }
   });
   rzp.open();
   ```
5. On success → `POST {API_URL}/payments/verify` with Razorpay response
6. Backend verifies signature → activates subscription → returns updated user
7. Frontend refreshes user state

**Paywall Modal:**
- Triggered when usage gate returns `{ allowed: false }`
- Shows: "You've used your free search/report"
- 3-tier pricing comparison
- "Upgrade Now" → `/pricing`

---

## Project Structure (Frontend Only)

```
irip-frontend/
├── public/
│   ├── globe/
│   │   ├── countries.geojson
│   │   └── earth-texture.jpg
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # ClerkProvider, fonts, dark theme
│   │   ├── page.tsx                # Homepage with globe
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   ├── sign-up/[[...sign-up]]/page.tsx
│   │   ├── search/page.tsx
│   │   ├── company/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        # Company detail + globe
│   │   │       └── location/
│   │   │           └── [locationId]/
│   │   │               └── page.tsx
│   │   ├── pricing/page.tsx
│   │   └── dashboard/page.tsx
│   ├── components/
│   │   ├── globe/
│   │   │   ├── InteractiveGlobe.tsx
│   │   │   ├── GlobeMarker.tsx
│   │   │   └── CountryPanel.tsx
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   └── CompanyDropdown.tsx
│   │   ├── company/
│   │   │   ├── CompanyCard.tsx
│   │   │   └── LocationList.tsx
│   │   ├── risk/
│   │   │   ├── RiskOverview.tsx
│   │   │   ├── NaturalDisasterCard.tsx
│   │   │   ├── CyberRiskCard.tsx
│   │   │   ├── GeopoliticalRiskCard.tsx
│   │   │   └── RiskGauge.tsx
│   │   ├── report/
│   │   │   └── DownloadButton.tsx
│   │   ├── pricing/
│   │   │   ├── PricingCard.tsx
│   │   │   └── PaywallModal.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                     # shadcn/ui components
│   ├── lib/
│   │   ├── api.ts                  # Backend API client (fetch wrapper)
│   │   ├── razorpay.ts             # Razorpay checkout helpers
│   │   └── utils.ts
│   ├── store/
│   │   ├── useGlobeStore.ts
│   │   └── useUserStore.ts
│   └── types/
│       └── index.ts
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Frontend Environment Variables

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Razorpay (client-side key only)
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Frontend Implementation Sprints

### Sprint 0 — Project Setup (Day 1-2)
- [ ] Init Next.js 14 project with TypeScript, Tailwind, App Router
- [ ] Install and configure shadcn/ui (dark theme)
- [ ] Set up Clerk (provider, middleware, sign-in/sign-up pages)
- [ ] Create `lib/api.ts` — typed fetch wrapper for backend API with Clerk JWT
- [ ] Set up Zustand stores (globe, user)
- [ ] Set up TanStack Query provider
- [ ] Create base layout (Navbar, Footer, dark theme globals)
- [ ] Deploy to Vercel

### Sprint 1 — Interactive Globe (Day 3-5)
- [ ] Install `react-globe.gl`, Three.js deps
- [ ] Build `InteractiveGlobe` (dynamic import, no SSR)
- [ ] Load GeoJSON country polygons
- [ ] Country colour-coding by risk index
- [ ] Hover tooltip + click → `CountryPanel` slide-in
- [ ] Dark theme styling, atmospheric glow
- [ ] Auto-rotation, stop on interaction
- [ ] Mobile responsive (touch gestures)

### Sprint 2 — Company Search (Day 6-8)
- [ ] Build `SearchBar` with debounce
- [ ] Build `CompanyDropdown` autocomplete
- [ ] Wire to `GET /companies/search` backend API
- [ ] Company detail page (`/company/[slug]`)
- [ ] Globe fly-to animation
- [ ] Location markers on globe
- [ ] `LocationList` sidebar

### Sprint 3 — Risk Dashboard (Day 9-11)
- [ ] Build `RiskOverview` with gauge chart
- [ ] Build `NaturalDisasterCard` with radar chart
- [ ] Build `CyberRiskCard`
- [ ] Build `GeopoliticalRiskCard` with events feed
- [ ] Collapsible accordion layout
- [ ] Risk colour coding
- [ ] Mobile-responsive layout

### Sprint 4 — Report Download + Razorpay (Day 12-15)
- [ ] Build `DownloadButton` with loading states
- [ ] Usage check → paywall flow
- [ ] PDF download from backend API
- [ ] Build pricing page (3-tier cards)
- [ ] Razorpay Checkout integration
- [ ] `PaywallModal` component
- [ ] User dashboard (usage stats, plan info)

### Sprint 5 — Polish + Launch (Day 16-18)
- [ ] Landing page copy and CTA
- [ ] SEO: meta tags, OG images
- [ ] Lighthouse audit, bundle optimisation
- [ ] Error boundaries, 404/500 pages
- [ ] Mobile responsiveness pass
- [ ] Cross-browser QA
- [ ] Production deploy

---

## Key Design Decisions (Frontend)

1. **No API routes in Next.js** — all business logic lives in the dedicated Python backend. Next.js is purely for rendering and client-side interactions.

2. **Clerk JWT as auth mechanism** — frontend gets JWT from Clerk, passes it to backend on every API call. No session management on frontend beyond Clerk.

3. **Razorpay over Stripe** — Stripe doesn't work for Indian businesses without international entity. Razorpay handles INR, UPI, netbanking, and subscriptions natively.

4. **Globe component isolated** — dynamically imported, no SSR, memoized data. Keeps initial page load fast.

5. **Zustand over Context** — globe state (camera position, selected country, selected company) needs to be shared across deeply nested components without prop drilling.
