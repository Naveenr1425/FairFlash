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
- **Dedicated Backend Engine (`server/`):** High-performance Node.js + Express REST API with FIFO queue engine, token issuance with 10-minute hold window, order processing, and tax calculation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18
- **Language:** TypeScript (Strict mode)
- **Build Tool:** Vite 6
- **Routing:** React Router v6 (Lazy loaded with Suspense skeleton fallbacks)
- **Styling:** Tailwind CSS (Custom brand tokens)
- **State Management:** Zustand (Client UI state) & TanStack Query (Server cache & async polling)
- **Form Validation:** React Hook Form + Zod
- **Icons & Effects:** Lucide React & Canvas-Confetti

### Backend
- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js + CORS
- **Services:** Events Catalog Service, FIFO Virtual Queue Engine, Order & Ticket Generation Service

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

# Install frontend dependencies
npm install

# Install backend dependencies
npm --prefix server install
```

### Development

#### 1. Start Frontend & Backend
```bash
# Terminal 1: Start Backend Server (runs on http://localhost:5000)
npm run server:dev

# Terminal 2: Start Frontend App (runs on http://localhost:3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Backend REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend health check |
| `GET` | `/api/events` | List events with filters (`city`, `category`, `search`, `isHighDemand`, `isFlashSale`, `minPrice`, `maxPrice`) |
| `GET` | `/api/events/featured` | Get featured banner carousel events |
| `GET` | `/api/events/:id` | Get event details by ID or slug |
| `POST` | `/api/queue/join` | Join virtual queue for an event |
| `GET` | `/api/queue/:queueId` | Poll real-time queue position & status |
| `POST` | `/api/queue/:queueId/leave` | Leave the waiting room |
| `POST` | `/api/queue/:queueId/test-status`| Set simulated state (`waiting`, `ready`, `paused`, `expired`, `sold_out`, `error`) |
| `POST` | `/api/orders` | Create confirmed booking order |
| `GET` | `/api/orders` | Get all booking orders |
| `GET` | `/api/orders/:id` | Get order details & receipt by ID |
| `GET` | `/api/tickets` | Get all digital ticket passes |
| `GET` | `/api/tickets/:id` | Get digital ticket by ID |

---

## 📂 Project Structure

```text
├── server/                 # Dedicated Node.js + Express Backend
│   ├── src/
│   │   ├── data/           # Seed datasets (events, initial orders)
│   │   ├── routes/         # Express API route handlers (events, queue, orders, tickets)
│   │   ├── services/       # EventsService, QueueEngine, OrderEngine
│   │   ├── types/          # TypeScript domain models
│   │   └── index.ts        # Express server bootstrap & middleware
│   ├── package.json
│   └── tsconfig.json
│
└── src/                    # Customer-Facing React Frontend
    ├── api/                # API client with automatic backend / mock fallback
    ├── components/         # UI components
    │   ├── booking/        # Ticket selection, ReservationTimer, CheckoutForm, PaymentSelector
    │   ├── common/         # Button, Badge, Card, Input, Modal, Toast, Skeleton, Empty/Error
    │   ├── events/         # EventCard, EventGrid, EventSection, EventBanner, EventFilters
    │   ├── navigation/     # Header, MobileHeader, CategoryNav, Footer, LocationModal, SearchOverlay
    │   ├── orders/         # OrderCard, OrderList, TicketCard (Digital Pass with QR)
    │   └── queue/          # QueueCard, QueuePosition, QueueProgress, QueueStatus
    ├── data/               # 12+ realistic mock events with ticket tiers
    ├── hooks/              # TanStack Query custom hooks
    ├── pages/              # 13 lazy-loaded route views
    ├── store/              # Zustand client UI state store
    ├── types/              # TypeScript domain models (event, queue, order, ticket)
    └── utils/              # Currency formatters, date/time helpers, class merger
```

---

## 📄 License
MIT License. Created for fair, transparent, and bot-free live event booking.
