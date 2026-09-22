# FairFlash — Consumer Ticketing & Flash-Sale Marketplace

> **"Fair access. Reliable booking."**

FairFlash is a consumer-facing ticket booking and high-demand flash-sale marketplace designed with transparent pricing, cryptographic virtual waiting queues, active reservation countdown timers, and digital admission passes with high-contrast QR turnstile barcodes.

---

## 🎟️ Key Features & Capabilities

- **Light-First Consumer UX:** Clean marketplace interface tailored for live concerts, IPL/sports derbies, IMAX cinema premieres, comedy shows, and theatre plays.
- **Virtual Waiting Room (Queue):** Real-time queue allocation with live polling, queue progress bar, estimated wait calculation, and interactive state switcher (`WAITING`, `READY`, `PAUSED`, `EXPIRED`, `SOLD_OUT`, `ERROR`).
- **Active 10-Minute Reservation Timer:** Dynamic countdown timer that locks selected seats with visual urgency pulse indicators and auto-expiry release safeguards.
- **Duplicate-Click UI Protection:** Secure checkout form with double-submission prevention and instant processing guard.
- **Digital Pass Wallet (`/tickets`):** Turnstile admission pass center featuring Apple/Google wallet styling, high-contrast QR codes, PDF invoice downloads, and native sharing.
- **Search & Filter Directory:** Live multi-metro city switcher (`Chennai`, `Mumbai`, `Bengaluru`, `Delhi NCR`), price range filters, and category navigation pills.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript (Strict mode)
- **Build Tool:** Vite 6
- **Routing:** React Router v6 (Lazy loaded with Suspense skeleton fallbacks)
- **Styling:** Tailwind CSS (Custom brand tokens)
- **State Management:** Zustand (Client UI state) & TanStack Query (Server cache & async polling)
- **Form Validation:** React Hook Form + Zod
- **Icons & Effects:** Lucide React & Canvas-Confetti

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Naveenr1425/FairFlash.git
cd FairFlash

# Install dependencies
npm install
```

### Development
```bash
# Start Vite development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Typecheck & build bundle
npm run build

# Preview build locally
npm run preview
```

---

## 📂 Project Structure

```text
src/
├── api/            # Promise-based mock APIs (events, queue, orders, tickets)
├── components/     # UI components
│   ├── booking/    # Ticket selection, ReservationTimer, CheckoutForm, PaymentSelector
│   ├── common/     # Button, Badge, Card, Input, Modal, Toast, Skeleton, Empty/Error
│   ├── events/     # EventCard, EventGrid, EventSection, EventBanner, EventFilters
│   ├── navigation/ # Header, MobileHeader, CategoryNav, Footer, LocationModal, SearchOverlay
│   ├── orders/     # OrderCard, OrderList, TicketCard (Digital Pass with QR)
│   └── queue/      # QueueCard, QueuePosition, QueueProgress, QueueStatus
├── data/           # 12+ realistic mock events with ticket tiers
├── hooks/          # TanStack Query custom hooks
├── pages/          # 13 lazy-loaded route views
├── store/          # Zustand client UI state store
├── types/          # TypeScript domain models (event, queue, order, ticket)
└── utils/          # Currency formatters, date/time helpers, class merger
```

---

## 📄 License
MIT License. Created for fair, transparent, and bot-free live event booking.
