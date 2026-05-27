# Calibright Customer Portal — Project Documentation

A professional ADAS calibration records portal built in React. Designed for
body shops and dealerships to remotely access calibration records, view profit
analytics, and manage their account. Admins have full access; customers are
scoped to their own data.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Pages](#pages)
4. [Components](#components)
5. [Data Layer](#data-layer)
6. [Services](#services)
7. [Context & Hooks](#context--hooks)
8. [Styling Architecture](#styling-architecture)
9. [Routing & Access Control](#routing--access-control)
10. [Authentication](#authentication)
11. [Theme System](#theme-system)
12. [Deployment](#deployment)
13. [SharePoint Integration](#sharepoint-integration)
14. [Planned Features](#planned-features)
15. [Environment Variables](#environment-variables)
16. [Test Credentials](#test-credentials)

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3 | UI framework |
| Vite | 5.4 | Build tool and dev server |
| Tailwind CSS | v4 | Utility-first styling |
| React Router | v6 | Client-side routing |
| Recharts | 2.12 | Bar charts and data visualization |
| Lucide React | 0.383 | Icon library |
| @azure/msal-browser | 3.26 | Microsoft auth (wired, pending Azure setup) |
| Vercel | — | Hosting and deployment |

---

## Project Structure

```
calibright-customer-portal/
├── index.html
├── package.json
├── vite.config.js
├── postcss.config.js
├── vercel.json                       ← SPA rewrites + security headers
├── .env.example                      ← environment variable template
├── PROJECT.md                        ← this file
├── AUTH_SETUP.md                     ← Entra ID app roles + MFA guide
├── SHAREPOINT_SETUP.md               ← SharePoint connection guide
│
└── src/
    ├── App.jsx
    ├── main.jsx                      ← ThemeProvider + AuthProvider entry
    │
    ├── lib/
    │   └── cn.js                     ← lightweight class composition utility
    │
    ├── styles/
    │   ├── index.css                 ← Tailwind v4 + imports
    │   ├── tokens.css                ← CSS custom property design tokens
    │   └── components.css            ← reusable component patterns via @layer
    │
    ├── components/
    │   │
    │   ├── ui/                       ← reusable UI primitives
    │   │   ├── Badge.jsx
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   └── primitives.jsx
    │   │
    │   ├── auth/
    │   │   ├── RequireAuth.jsx
    │   │   └── RequireRole.jsx
    │   │
    │   ├── customers/
    │   │   ├── CustomerCard.jsx
    │   │   ├── CustomerProfile.jsx
    │   │   ├── CustomerTable.jsx
    │   │   └── CustomerViewToggle.jsx
    │   │
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
    │   ├── reports/
    │   │   ├── ProfitChart.jsx
    │   │   ├── ProfitSummaryCards.jsx
    │   │   └── ProfitTable.jsx
    │   │
    │   ├── settings/
    │   │   ├── AppearanceSettings.jsx
    │   │   ├── NotificationSettings.jsx
    │   │   ├── PortalUsersSettings.jsx
    │   │   ├── ProfileSettings.jsx
    │   │   └── SecuritySettings.jsx
    │   │
    │   ├── uploads/
    │   │   ├── DropZone.jsx
    │   │   ├── DuplicateWarningModal.jsx
    │   │   ├── UploadQueue.jsx
    │   │   └── UploadSummary.jsx
    │   │
    │   └── vehicles/
    │       ├── VehicleCard.jsx
    │       └── VehicleFilters.jsx
    │
    ├── context/
    │   ├── AuthContext.jsx           ← AuthProvider component
    │   ├── AuthContextInstance.jsx   ← AuthContext object (fast refresh split)
    │   ├── ThemeContext.jsx          ← ThemeProvider component
    │   └── ThemeContextInstance.jsx  ← ThemeContext object
    │
    ├── data/
    │   ├── dashboardData.js
    │   ├── mockCustomers.js
    │   ├── mockDocuments.js
    │   ├── mockReportData.js
    │   └── mockVehicles.js
    │
    ├── hooks/
    │   ├── useAuth.js
    │   ├── useCustomerScope.js
    │   └── useTheme.js
    │
    ├── pages/
    │   ├── Customers.jsx
    │   ├── Dashboard.jsx
    │   ├── DocumentDetail.jsx
    │   ├── Documents.jsx
    │   ├── Login.jsx
    │   ├── PlaceholderPage.jsx
    │   ├── Reports.jsx
    │   ├── Settings.jsx
    │   ├── Unauthorized.jsx
    │   ├── Uploads.jsx
    │   ├── VehicleDetail.jsx
    │   └── Vehicles.jsx
    │
    ├── routes/
    │   └── AppRoutes.jsx
    │
    └── services/
        ├── graphClient.js
        ├── mockAuthService.js
        ├── msalConfig.js
        ├── sharepointService.js
        └── uploadService.js
```

---

## Pages

### Dashboard (`/`)
Landing page for all authenticated users.

**Sections:** WelcomeBanner, StatsGrid (4 cards), QuickActions,
PendingDocuments, RecentDocuments table, ActivityFeed timeline.

---

### Documents (`/documents`)
Searchable, filterable table of all calibration records.

**Features:** Status tabs (All / Complete / Pending) with live counts,
search across VIN / make / model / year / ADAS system / customer /
technician / record ID, sortable columns, default sort pending-first,
row hover reveals View and PDF actions, empty state.

---

### Document Detail (`/documents/:id`)
Full record detail for a single calibration. Hero card, Vehicle Info,
ADAS System, Customer (joined from mockCustomers), Calibration Details,
Notes (conditional), Download CTA. Includes 404 state.

---

### Vehicles (`/vehicles`)
Vehicle directory scoped by role. Admin sees all vehicles with customer
filter. Customer sees only their own vehicles.

**Filters:** VIN / make / model / year / record ID search, customer
dropdown (admin only), ADAS system dropdown.

---

### Vehicle Detail (`/vehicles/:vin`)
Full calibration history for a single vehicle. Hero card with record
counts and all ADAS systems serviced, chronological history list with
status badges, type badges, technician, notes, View and PDF buttons.
Includes 404 state.

---

### Customers (`/customers`)
Role-branching page.

**Admin:** Searchable directory with grid/list toggle. Filter by All /
Collision Shop / Dealership with live counts. Card and table views.

**Customer:** Their own shop profile — hero, four stat cards, contact /
location / DRP / account summary sections, pending record count.

---

### Reports (`/reports`) — Admin only
Profit analytics. Date range toggle (30d / 90d / All Time).
ProfitSummaryCards, ProfitChart (Recharts bar chart, theme-aware),
ProfitTable (sortable, margin bars, totals footer).
Amber notice banner while PDF extraction pipeline is pending.

---

### Uploads (`/uploads`) — Admin only
Batch PDF upload. Drag-and-drop zone, PDF validation (type / size / count),
duplicate detection by record ID and VIN in filename,
DuplicateWarningModal (overwrite or cancel), per-file progress queue,
UploadSummary batch recap.

**PDF naming convention:** `ADAS-2024-03847_Honda_CRV_2023.pdf`

---

### Settings (`/settings`)
Tabbed settings — Appearance, Profile, Notifications, Portal Users, Security.

---

### Login (`/login`)
Email/password form. Dev credential hints in DEV builds only.
Post-login redirects to originally requested URL.

---

### Unauthorized (`/unauthorized`)
403 page with Go Back and Sign Out options.

---

## Components

### UI Primitives (`src/components/ui/`)

| File | Exports | Description |
|---|---|---|
| `Badge.jsx` | `Badge` | Single source of truth for all status/type badges. Accepts `variant` prop mapping to token-driven CSS classes |
| `Button.jsx` | `Button` | Reusable button with variant, size, icon, loading state |
| `Card.jsx` | `Card`, `CardHeader`, `CardBody`, `CardFooter`, `SectionCard` | Card container family using `.card-*` CSS classes |
| `primitives.jsx` | `PageHeader`, `EmptyState`, `Field`, `StatusCount`, `SortIcon`, `Toggle`, `ViewToggle` | Shared layout and UI atoms |

### `cn` utility (`src/lib/cn.js`)
Lightweight class composition helper. Joins truthy class strings.
No external dependency.

```js
cn("base", condition && "conditional", "always") → "base conditional always"
```

---

### Layout

| Component | Description |
|---|---|
| `DashboardShell` | Outer wrapper — sidebar, mobile sidebar, header, `<Outlet />`, footer |
| `Sidebar` | Fixed desktop nav. Role-based filtering. Real user name/initials/role. Sign-out button |
| `MobileSidebar` | Slide-in drawer. Body scroll lock, backdrop close, same role filtering |
| `Header` | Sticky top bar — page title, search, notification badge, user dropdown |

### Auth Guards

| Component | Description |
|---|---|
| `RequireAuth` | Redirects unauthenticated users to `/login`. Preserves destination |
| `RequireRole` | Redirects wrong-role users to `/unauthorized` |

---

## Data Layer

All data is mock. Structured to be replaced by API calls without changing
component interfaces.

### `dashboardData.js`
**Exports:** `stats`, `navItems`, `quickActions`, `activityFeed`

### `mockCustomers.js`
8 customers — 4 collision shops, 4 dealerships.
**Exports:** `customers`, `activeCustomers`, `collisionShops`,
`dealerships`, `getCustomerById(id)`

### `mockDocuments.js`
12 ADAS calibration records. Permanent — no expiry.
**Exports:** `documents`, `adasSystems`, `recentDocuments`,
`pendingDocuments`, `getDocumentById(id)`,
`getDocumentsByCustomer(customerId)`, `getDocumentsByVehicle(vin)`

### `mockVehicles.js`
Derived at import time from `mockDocuments.js`. Always in sync.
**Exports:** `vehicles`, `getVehicleByVin(vin)`,
`getVehiclesByCustomer(customerId)`, `vehicleMakes`, `adasSystemOptions`

### `mockReportData.js`
20 profit records across Sep–Nov 2024.
**Exports:** `profitRecords`, `profitRecordsWithCalcs`,
`getSummaryStats(records)`, `getMonthlyTrend(records)`

---

## Services

| File | Description |
|---|---|
| `msalConfig.js` | MSAL config, `APP_ROLES`, `loginRequest`, `silentRequest`, `isMfaVerified()` |
| `mockAuthService.js` | Temporary auth replacing MSAL. Mirrors MSAL account shape exactly |
| `graphClient.js` | Authenticated Graph API fetch wrapper. Silent token refresh |
| `sharepointService.js` | SharePoint file operations — list, metadata, download, search by record ID |
| `uploadService.js` | Upload pipeline — `checkForDuplicate(file)`, `simulateUpload(file, isOverwrite)` |

---

## Context & Hooks

### Auth

| File | Exports |
|---|---|
| `AuthContextInstance.jsx` | `AuthContext` (context object) |
| `AuthContext.jsx` | `AuthProvider` (component) |
| `useAuth.js` | `useAuth()` hook |

**Context value:**
```js
{
  account, role, mfaVerified,
  isAuthenticated,  // !!account && mfaVerified
  isAdmin, isCustomer,
  initializing, error,
  login(email, password),
  logout(),
}
```

### Theme

| File | Exports |
|---|---|
| `ThemeContextInstance.jsx` | `ThemeContext` (context object) |
| `ThemeContext.jsx` | `ThemeProvider`, `THEMES` |
| `useTheme.js` | `useTheme()` hook |

**Context value:**
```js
{ theme, setTheme(mode), isLight, isDark, isSystem }
```

### `useCustomerScope.js`
Matches logged-in user email to a customer record.
Returns `{ customer, customerId, isScoped }`.
`isScoped = true` for customer users — data should be filtered.

---

## Styling Architecture

The app uses a three-layer styling system built on Tailwind CSS v4.

### Layer 1 — Design Tokens (`tokens.css`)
CSS custom properties (`--surface-card`, `--text-primary`, `--accent`,
`--success-bg`, etc.) defined on `:root`. The `.dark` class on `<html>`
overrides every token with dark-theme values. All colors, surfaces,
borders, shadows, and status states are defined here.

**Token categories:**
- Surfaces: `--surface-page`, `--surface-card`, `--surface-subtle`, `--surface-inset`
- Borders: `--border-base`, `--border-faint`, `--border-strong`, `--border-focus`
- Text: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-muted`
- Accent: `--accent`, `--accent-hover`, `--accent-subtle`, `--accent-text`
- Status: `--success-*`, `--warning-*`, `--danger-*`, `--info-*`, `--violet-*`
- Sidebar: `--sidebar-bg`, `--sidebar-border`, `--sidebar-text`, etc.
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-overlay`
- Radius: `--radius-sm` through `--radius-2xl`
- Charts: `--chart-grid`, `--chart-tick`, `--chart-cursor`

### Layer 2 — Semantic Utilities (`components.css` @utility)
Tailwind `@utility` declarations create single-purpose classes that
reference token variables. Replaces paired `dark:` variants with
a single semantic class.

```css
/* Instead of: bg-white dark:bg-slate-900 */
.bg-card { background-color: var(--surface-card); }

/* Instead of: text-slate-800 dark:text-slate-100 */
.text-primary { color: var(--text-primary); }
```

### Layer 3 — Component Patterns (`components.css` @layer components)
Higher-level reusable patterns: `.card`, `.card-header`, `.card-body`,
`.card-footer`, `.badge`, `.badge-success`, `.btn`, `.btn-primary`,
`.table`, `.table th`, `.input-base`, `.nav-item`, `.nav-item-active`,
`.toggle-track`, `.progress-track`, `.timeline-dot`, `.empty-state`,
`.page-header`, `.page-title`, `.label-overline`.

### Benefits of this architecture
- **Zero `dark:` duplication** — theme switching is a single CSS variable swap
- **No scattered hardcoded colors** — all values in `tokens.css`
- **Consistent status states** — badge variants map to semantic token groups
- **Chart theming** — `ProfitChart` reads CSS vars via `getComputedStyle`
- **Scalable** — adding a new theme means adding one CSS block in `tokens.css`

### Important: CSS import order in `main.jsx`
```js
import "./styles/index.css";  // correct — styles/ folder
```
The root `src/index.css` is the old file and should be deleted.

---

## Routing & Access Control

| Path | Component | Auth | Role |
|---|---|---|---|
| `/login` | `Login` | Public | — |
| `/unauthorized` | `Unauthorized` | Public | — |
| `/` | `Dashboard` | ✅ | Any |
| `/documents` | `Documents` | ✅ | Any |
| `/documents/:id` | `DocumentDetail` | ✅ | Any |
| `/vehicles` | `Vehicles` | ✅ | Any |
| `/vehicles/:vin` | `VehicleDetail` | ✅ | Any |
| `/customers` | `Customers` | ✅ | Any |
| `/settings` | `Settings` | ✅ | Any |
| `/reports` | `Reports` | ✅ | Admin only |
| `/uploads` | `Uploads` | ✅ | Admin only |

**Guard hierarchy:**
```
<RequireAuth>
  <DashboardShell>
    <Route />           ← all authenticated users
    <RequireRole>
      <Route />         ← admin only
    </RequireRole>
  </DashboardShell>
</RequireAuth>
```

Sidebar and MobileSidebar also filter nav items by role — customers
never see Reports or Uploads in the navigation.

---

## Authentication

Currently running on **mock auth** (`mockAuthService.js`) while the
company's Microsoft 365 / Azure account is being configured.

### To swap back to MSAL (when Azure is ready)
1. Revert `AuthContext.jsx` to the MSAL version
2. Revert `Login.jsx` to the Microsoft sign-in button version
3. Delete `mockAuthService.js`
4. Add `VITE_AZURE_*` env vars

See `AUTH_SETUP.md` for full Entra ID configuration.

### Auth flow (when live)
```
Visit portal → Microsoft login (Entra) → MFA challenge
→ Token with role claim → AuthContext reads amr + roles
→ isAuthenticated = true only when account + MFA both present
```

---

## Theme System

- **Toggle:** `.dark` class on `<html>`
- **Variant:** `@variant dark (&:where(.dark, .dark *))` in `index.css`
- **Storage:** `localStorage` key `calibright_theme`
- **Default:** Light
- **Options:** Light / Dark / System (follows OS `prefers-color-scheme`)
- **Transitions:** 200ms ease on background, color, and border-color
- **Charts:** `ProfitChart` reads `--chart-*` vars via `getComputedStyle()`
- **Scalability:** New themes = one new CSS block in `tokens.css`

---

## Deployment

Hosted on **Vercel**. `vercel.json` handles:

**SPA routing** — rewrites all paths to `index.html`.

**Security headers:**

| Header | Purpose |
|---|---|
| `Strict-Transport-Security` | Forces HTTPS for 2 years |
| `X-Frame-Options: DENY` | Prevents clickjacking |
| `X-Content-Type-Options: nosniff` | Prevents MIME sniffing |
| `Referrer-Policy` | Limits referrer info |
| `Permissions-Policy` | Disables camera, mic, geolocation, payment |
| `Content-Security-Policy` | Restricts to self + Microsoft domains |
| `X-XSS-Protection` | Legacy XSS filter |

---

## SharePoint Integration

See `SHAREPOINT_SETUP.md` for full guide.

### Architecture
```
Customer browser → Vercel (React) → Microsoft Graph API → SharePoint (PDFs)
                                                         ↓ (future)
                                              Azure Document Intelligence
```

### Currently wired
- MSAL auth config, Graph API client, SharePoint file service, auth context

### Still needs connecting
- Swap mock auth for MSAL when Azure is ready
- Wire Download PDF buttons to `sharepointService.findFileByRecordId()`
- Azure Document Intelligence pipeline for profit extraction

---

## Planned Features

### PDF Profit Extraction
Azure Document Intelligence trained on invoice template extracts list
price and cost price, replacing mock report data with real analytics.

### Microsoft Auth Swap
Follow `AUTH_SETUP.md` — swap 3 files when company M365 account is ready.

---

## Environment Variables

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_AZURE_CLIENT_ID` | Entra app registration client ID |
| `VITE_AZURE_TENANT_ID` | Entra directory tenant ID |
| `VITE_REDIRECT_URI` | OAuth redirect URI |
| `VITE_SHAREPOINT_SITE_ID` | SharePoint site ID from Graph API |
| `VITE_SHAREPOINT_DRIVE_ID` | Document library drive ID |

Add same variables to Vercel → Settings → Environment Variables.

---

## Test Credentials

Used with mock auth. Remove before production.

| Email | Password | Role | Customer |
|---|---|---|---|
| `admin@calibright.com` | `admin1234` | Admin | All customers |
| `b.kowalski@prestigecollision.com` | `customer1234` | Customer | Prestige Collision |
| `a.ruiz@metroford.com` | `customer1234` | Customer | Metro Ford |
| `k.park@sunrisetoyota.com` | `customer1234` | Customer | Sunrise Toyota |

Dev credential hints shown on Login page in DEV builds only —
hidden automatically in production via `import.meta.env.DEV`.
