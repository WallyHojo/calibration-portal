# CalibrationOS Portal — Build Documentation

A professional ADAS calibration records portal built in React, designed for
body shops and dealerships to remotely access their calibration records,
view profit analytics, and eventually download PDF reports stored in SharePoint.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Pages](#pages)
4. [Components](#components)
5. [Data Layer](#data-layer)
6. [Services](#services)
7. [Context & Hooks](#context--hooks)
8. [Routing](#routing)
9. [Deployment](#deployment)
10. [SharePoint Integration](#sharepoint-integration)
11. [Planned Features](#planned-features)
12. [Environment Variables](#environment-variables)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool and dev server |
| Tailwind CSS v4 | Utility-first styling |
| React Router v6 | Client-side routing |
| Recharts | Bar charts and data visualization |
| Lucide React | Icon library |
| @azure/msal-browser | Microsoft authentication (SharePoint) |
| Vercel | Hosting and deployment |

---

## Project Structure

```
calibration-portal/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js        ← deprecated in v4, kept for reference
├── postcss.config.js
├── vercel.json               ← SPA rewrite rule for Vercel
├── .env.example              ← environment variable template
├── SHAREPOINT_SETUP.md       ← step-by-step SharePoint integration guide
│
└── src/
    ├── App.jsx
    ├── main.jsx
    │
    ├── components/
    │   ├── dashboard/
    │   │   ├── ActivityFeed.jsx
    │   │   ├── PendingDocuments.jsx
    │   │   ├── QuickActions.jsx
    │   │   ├── RecentDocuments.jsx
    │   │   ├── StatCard.jsx
    │   │   ├── StatsGrid.jsx
    │   │   └── WelcomeBanner.jsx
    │   │
    │   ├── documents/
    │   │   ├── DocumentFilters.jsx
    │   │   └── DocumentsTable.jsx
    │   │
    │   ├── layout/
    │   │   ├── DashboardShell.jsx
    │   │   ├── Header.jsx
    │   │   ├── MobileSidebar.jsx
    │   │   └── Sidebar.jsx
    │   │
    │   └── reports/
    │       ├── ProfitChart.jsx
    │       ├── ProfitSummaryCards.jsx
    │       └── ProfitTable.jsx
    │
    ├── context/
    │   └── AuthContext.jsx
    │
    ├── data/
    │   ├── dashboardData.js
    │   ├── mockCustomers.js
    │   ├── mockDocuments.js
    │   └── mockReportData.js
    │
    ├── hooks/
    │   └── useAuth.js
    │
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── DocumentDetail.jsx
    │   ├── Documents.jsx
    │   ├── PlaceholderPage.jsx
    │   └── Reports.jsx
    │
    ├── routes/
    │   └── AppRoutes.jsx
    │
    ├── services/
    │   ├── graphClient.js
    │   ├── msalConfig.js
    │   └── sharepointService.js
    │
    └── styles/
        └── index.css
```

---

## Pages

### Dashboard (`/`)
The landing page. Displays an overview of calibration activity.

**Sections:**
- `WelcomeBanner` — time-aware greeting, current date, completions this month
- `StatsGrid` — four stat cards: total records, completed this month, vehicles serviced, active customers
- `QuickActions` — upload record, add vehicle, new customer, generate report
- `PendingDocuments` — calibration records awaiting dynamic drive completion
- `RecentDocuments` — six most recently uploaded records
- `ActivityFeed` — chronological timeline of portal events

---

### Documents (`/documents`)
Full searchable, filterable table of all calibration records.

**Features:**
- Status filter tabs: All / Complete / Pending (with live counts)
- Search across VIN, vehicle make/model/year, ADAS system, customer, technician, record ID
- Sortable by any column — click header to toggle asc/desc
- Default sort: pending records float to top
- Row actions (View / PDF) appear on hover
- Empty state when no records match

---

### Document Detail (`/documents/:id`)
Full detail view for a single calibration record.

**Sections:**
- Breadcrumb back navigation
- Hero card — record ID, vehicle, ADAS system, calibration type, status
- Vehicle Information — year, make, model, VIN
- ADAS System — system name, calibration type, status
- Customer — shop/dealership name, contact, location (joined from `mockCustomers.js`)
- Calibration Details — technician, date, record ID, vehicle ID
- Notes — conditionally rendered if present
- Download CTA — dark footer bar with prominent download button

**404 state:** Shown if the record ID doesn't exist in the data.

---

### Reports (`/reports`)
Profit analytics dashboard for calibration jobs.

**Features:**
- Date range filter: Last 30 Days / Last 90 Days / All Time
- Amber notice banner indicating placeholder data until PDF pipeline is live
- `ProfitSummaryCards` — total profit, avg margin, jobs analysed, best job
- `ProfitChart` — grouped bar chart (revenue / cost / profit by month)
- `ProfitTable` — per-job sortable table with margin progress bars and totals row

> **Note:** Profit figures are currently mock data. In production, list price and
> cost price will be extracted automatically from uploaded PDFs via
> Azure Document Intelligence.

---

## Components

### Layout

| Component | Description |
|---|---|
| `DashboardShell` | Outer wrapper. Renders sidebar, mobile sidebar, header, and `<Outlet />` |
| `Sidebar` | Fixed desktop sidebar with logo, nav items, and user profile section |
| `MobileSidebar` | Slide-in drawer for mobile. Body scroll locks when open. Backdrop click closes |
| `Header` | Sticky top bar. Dynamic page title, search bar, notification badge, user avatar |

### Dashboard

| Component | Description |
|---|---|
| `WelcomeBanner` | Greeting with current date and completions pill |
| `StatsGrid` | Renders four `StatCard` components in a responsive grid |
| `StatCard` | Individual stat card. Accepts color, icon, value, delta, trend props |
| `QuickActions` | 2×2 grid of action links with hover transitions |
| `RecentDocuments` | Responsive table of six most recent records. Progressive column hiding at `md` and `lg` breakpoints |
| `PendingDocuments` | List of records with `status: "pending"`. Empty state if none. Calibration type badge |
| `ActivityFeed` | Timeline with connector lines. Typed events: upload, customer, vehicle |

### Documents

| Component | Description |
|---|---|
| `DocumentFilters` | Status tab group + search input with clear button |
| `DocumentsTable` | Sortable table. Clickable column headers cycle asc/desc. Row actions fade in on hover. Empty state. Record count footer |

### Reports

| Component | Description |
|---|---|
| `ProfitSummaryCards` | Four stat cards: total profit, avg margin, jobs analysed, best job profit |
| `ProfitChart` | Recharts grouped bar chart with custom tooltip. Revenue / cost / profit per month |
| `ProfitTable` | Sortable per-job table. Margin progress bar color-coded by tier. Totals footer row |

---

## Data Layer

All data is currently mock. Each file is designed to be replaced by real API
calls without changing the component interfaces.

### `dashboardData.js`
UI-structural data consumed by the shell and dashboard widgets.

**Exports:** `stats`, `navItems`, `quickActions`, `activityFeed`

---

### `mockCustomers.js`
Customer records for body shops and dealerships.

**Fields per customer:**
- `id`, `name`, `type` (`collision` | `dealership`)
- `franchiseBrand` — dealerships only (Ford, Toyota, Honda, Subaru)
- `drp` — DRP insurance networks for collision shops
- `contact` — name, title, email, phone
- `address` — street, city, state, zip
- `totalCalibrations`, `calibrationsThisMonth`
- `status`, `onboarded`, `lastActivity`, `portalUsers`

**Exports:** `customers`, `activeCustomers`, `collisionShops`, `dealerships`, `getCustomerById(id)`

---

### `mockDocuments.js`
ADAS calibration records. No expiry — records are permanent.

**Fields per record:**
- `id` — format: `ADAS-YYYY-NNNNN`
- `vehicleId` — format: `VH-NNNN`
- `year`, `make`, `model`, `vin`
- `adasSystem` — e.g. "Front Forward Camera", "EyeSight Forward Camera"
- `calibrationType` — `Static` | `Dynamic`
- `customerId`, `customer`
- `technician`, `calibrationDate`, `status`, `invoiceRef`, `uploadedAt`, `notes`

**Exports:**
- `documents` — full catalogue (12 records)
- `adasSystems` — reference list of system names
- `recentDocuments` — top 6 sorted by upload date
- `pendingDocuments` — filtered to `status: "pending"`
- `getDocumentById(id)`, `getDocumentsByCustomer(customerId)`, `getDocumentsByVehicle(vin)`

---

### `mockReportData.js`
Profit analytics data. Extends calibration records with financial fields.

**Fields per record:**
- `id`, `date`, `vehicle`, `adasSystem`, `customer`, `customerId`, `technician`
- `listPrice` — insurance (list) invoice amount
- `costPrice` — shop cost invoice amount

**Derived fields (auto-calculated):**
- `profit` = `listPrice − costPrice`
- `margin` = `(profit / listPrice) × 100`

**Exports:**
- `profitRecords` — raw records (20 jobs across Sep–Nov 2024)
- `profitRecordsWithCalcs` — records with profit and margin attached
- `getSummaryStats(records)` — returns total revenue, cost, profit, avg margin, job count, best job
- `getMonthlyTrend(records)` — groups by month, returns chart-ready array with labels

---

## Services

### `msalConfig.js`
MSAL configuration for Microsoft Entra ID authentication.

**Exports:** `msalConfig`, `loginScopes`, `silentScopes`

All values are driven by environment variables — no hardcoded IDs.
Cache is set to `sessionStorage` so tokens clear when the tab closes.

---

### `graphClient.js`
Authenticated fetch wrapper for Microsoft Graph API.

**Exports:** `getMsalInstance()`, `graphFetch(path, options)`

- `getMsalInstance()` — returns a singleton `PublicClientApplication`
- `graphFetch()` — acquires token silently, falls back to redirect login if expired. Returns parsed JSON or raw Blob depending on `options.responseType`

---

### `sharepointService.js`
All SharePoint document library operations.

**Exports:**

| Function | Description |
|---|---|
| `listCalibrationFiles()` | Lists all PDFs in the document library |
| `getFileMetadata(itemId)` | Returns metadata for a single file |
| `getDownloadUrl(itemId)` | Returns a pre-authenticated temporary download URL |
| `downloadFile(itemId)` | Downloads file as a Blob |
| `triggerBrowserDownload(blob, fileName)` | Prompts browser save dialog |
| `findFileByRecordId(recordId)` | Searches library for a file matching the record ID |

**PDF naming convention expected:**
```
ADAS-2024-03847_Honda_CRV_2023.pdf
```

---

## Context & Hooks

### `AuthContext.jsx` (`src/context/`)
React context providing MSAL auth state to the component tree.

**Exports:** `AuthProvider`, `AuthContext`

**Context value:**
```js
{
  account,          // MSAL account object or null
  isAuthenticated,  // boolean
  initializing,     // boolean — true during MSAL init
  error,            // string or null
  login(),          // triggers loginRedirect
  logout(),         // triggers logoutRedirect
}
```

Wrap `App.jsx` or `main.jsx` with `<AuthProvider>` to enable auth across the app.

---

### `useAuth.js` (`src/hooks/`)
Consumes `AuthContext`. Kept in a separate file to satisfy Vite fast refresh rules.

```js
import { useAuth } from "../hooks/useAuth";

const { account, isAuthenticated, login, logout } = useAuth();
```

---

## Routing

| Path | Component | Status |
|---|---|---|
| `/` | `Dashboard` | ✅ Built |
| `/documents` | `Documents` | ✅ Built |
| `/documents/:id` | `DocumentDetail` | ✅ Built |
| `/reports` | `Reports` | ✅ Built |
| `/vehicles` | `PlaceholderPage` | 🔲 Pending |
| `/customers` | `PlaceholderPage` | 🔲 Pending |
| `/uploads` | `PlaceholderPage` | 🔲 Pending |
| `/settings` | `PlaceholderPage` | 🔲 Pending |

---

## Deployment

The app is deployed on **Vercel**.

### SPA Routing Fix
`vercel.json` rewrites all routes to `index.html` so React Router handles
navigation correctly on direct URL access and page refresh:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Tailwind CSS v4 Config
v4 replaced `tailwind.config.js` with CSS-first configuration.
Theme customization lives in `src/styles/index.css` under `@theme {}`.
PostCSS uses `@tailwindcss/postcss` instead of `tailwindcss` directly.

---

## SharePoint Integration

See **`SHAREPOINT_SETUP.md`** for the full step-by-step guide.

### Architecture

```
Customer browser
      ↓
Vercel (React portal)
      ↓
Microsoft Graph API  ←── @azure/msal-browser handles auth
      ↓
SharePoint Online Document Library (PDF storage)
```

### What's been built
- MSAL auth config (`msalConfig.js`)
- Authenticated Graph API client (`graphClient.js`)
- SharePoint file service (`sharepointService.js`)
- Auth context and hook (`AuthContext.jsx`, `useAuth.js`)

### What still needs wiring
- `<AuthProvider>` wrapped around the app in `main.jsx`
- Login page or login button for unauthenticated users
- Download button in `DocumentDetail.jsx` connected to `sharepointService.findFileByRecordId()`
- Environment variables set in Vercel dashboard

---

## Planned Features

### PDF Profit Extraction
Once calibration PDFs are stored in SharePoint, an Azure Document Intelligence
model will extract the list price and cost price from each document.

**Pipeline:**
```
PDF uploaded to SharePoint
      ↓
Azure Document Intelligence
extracts list price + cost price per job
      ↓
Values stored against each calibration record
      ↓
Reports page shows real profit data
```

Since PDFs are software-generated with a consistent template, Document
Intelligence can be trained on 5–10 sample documents and achieve high
extraction accuracy.

### Pages Still to Build
- **Vehicles** — searchable vehicle history by VIN or make/model
- **Customers** — customer directory with per-shop calibration summary
- **Uploads** — drag-and-drop PDF upload interface
- **Settings** — user preferences, portal configuration

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values.

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_AZURE_CLIENT_ID` | App registration client ID from Entra |
| `VITE_AZURE_TENANT_ID` | Directory tenant ID from Entra |
| `VITE_REDIRECT_URI` | OAuth redirect URI (must match Entra registration) |
| `VITE_SHAREPOINT_SITE_ID` | SharePoint site ID from Graph API |
| `VITE_SHAREPOINT_DRIVE_ID` | Document library drive ID from Graph API |

Add the same variables to **Vercel → Settings → Environment Variables**
for production deployment.
