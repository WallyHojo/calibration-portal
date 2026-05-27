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
8. [Routing & Access Control](#routing--access-control)
9. [Authentication](#authentication)
10. [Theme System](#theme-system)
11. [Deployment](#deployment)
12. [SharePoint Integration](#sharepoint-integration)
13. [Planned Features](#planned-features)
14. [Environment Variables](#environment-variables)
15. [Test Credentials](#test-credentials)

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3 | UI framework |
| Vite | 5.4 | Build tool and dev server |
| Tailwind CSS | v4 | Utility-first styling with dark mode |
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
├── vercel.json                     ← SPA rewrites + security headers
├── .env.example                    ← environment variable template
├── PROJECT.md                      ← this file
├── AUTH_SETUP.md                   ← Entra ID app roles + MFA guide
├── SHAREPOINT_SETUP.md             ← SharePoint connection guide
│
└── src/
    ├── App.jsx
    ├── main.jsx                    ← ThemeProvider + AuthProvider entry
    │
    ├── components/
    │   ├── auth/
    │   │   ├── RequireAuth.jsx     ← route guard: auth + MFA
    │   │   └── RequireRole.jsx     ← route guard: role check
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
    │   ├── AuthContext.jsx          ← AuthProvider component
    │   ├── AuthContextInstance.jsx  ← AuthContext object (separated for fast refresh)
    │   ├── ThemeContext.jsx         ← ThemeProvider component
    │   └── ThemeContextInstance.jsx ← ThemeContext object
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
    ├── services/
    │   ├── graphClient.js          ← Microsoft Graph API authenticated fetch
    │   ├── mockAuthService.js      ← temporary auth (replaces MSAL until Azure ready)
    │   ├── msalConfig.js           ← MSAL config, APP_ROLES, MFA helpers
    │   ├── sharepointService.js    ← SharePoint file operations
    │   └── uploadService.js        ← upload pipeline + duplicate detection
    │
    └── styles/
        └── index.css               ← Tailwind v4 + dark mode variant
```

---

## Pages

### Dashboard (`/`)
Landing page for all authenticated users.

**Sections:** WelcomeBanner, StatsGrid (4 cards), QuickActions, PendingDocuments,
RecentDocuments table, ActivityFeed timeline.

---

### Documents (`/documents`)
Searchable, filterable table of all calibration records.

**Features:**
- Status tabs: All / Complete / Pending with live counts
- Search: VIN, make, model, year, ADAS system, customer, technician, record ID
- Sortable columns — click header to toggle asc/desc
- Default sort: pending floats to top
- Row hover reveals View and PDF download actions
- Empty state when no results match

---

### Document Detail (`/documents/:id`)
Full record detail for a single calibration.

**Sections:** Hero card (record ID, vehicle, ADAS system, type, status), Vehicle
Information, ADAS System, Customer (joined from mockCustomers), Calibration Details,
Notes (conditional), Download CTA. Includes 404 state for unknown IDs.

---

### Vehicles (`/vehicles`)
Vehicle directory scoped by role.

**Admin:** all vehicles across all customers, filterable by customer and ADAS system.
**Customer:** only vehicles belonging to their account.

**Filters:** search by VIN / make / model / year / record ID, customer dropdown
(admin only), ADAS system dropdown.

---

### Vehicle Detail (`/vehicles/:vin`)
Full calibration history for a single vehicle.

**Sections:** Hero card (year/make/model/VIN, record counts, ADAS systems serviced),
chronological history list with status badges, type badges, technician, notes, View
and PDF buttons per record. Includes 404 state.

---

### Customers (`/customers`)
Role-branching page.

**Admin view:** searchable directory with grid/list toggle, filter by All /
Collision Shop / Dealership with live counts. Card shows name, type, status,
calibration counts, contact, DRP networks. Table is fully sortable.

**Customer view:** their own shop profile — hero section, four stat cards
(total records, this month, complete, portal users), contact/location/DRP/
account summary, pending record count badge.

---

### Reports (`/reports`) — Admin only
Profit analytics dashboard.

**Features:**
- Date range toggle: Last 30 Days / Last 90 Days / All Time
- Amber notice banner (placeholder data until PDF pipeline live)
- ProfitSummaryCards: total profit, avg margin, jobs analysed, best job
- ProfitChart: Recharts grouped bar chart — revenue / cost / profit by month,
  theme-aware colors via `useTheme()`
- ProfitTable: sortable per-job breakdown, margin progress bar, totals footer

---

### Uploads (`/uploads`) — Admin only
Batch PDF upload interface.

**Features:**
- Drag-and-drop zone with click-to-browse fallback
- Validates: PDF type only, 25MB max per file, 10 file max per batch
- Duplicate detection: filename scanned for record ID pattern
  (`ADAS-YYYY-NNNNN`) and 17-char VIN
- DuplicateWarningModal: shows which records would be overwritten,
  Overwrite or Cancel options
- Per-file progress: queued → checking → uploading → complete/overwritten/error
- UploadSummary: batch recap with new/overwritten/failed counts
- Upload Another Batch resets the page

**PDF naming convention:**
```
ADAS-2024-03847_Honda_CRV_2023.pdf
```

---

### Settings (`/settings`)
Tabbed settings page with sidebar navigation.

**Tabs:**

| Tab | Description |
|---|---|
| Appearance | Light / Dark / System theme selector with visual previews |
| Profile | Display name, job title (editable); email, role (read-only) |
| Notifications | Email toggles: new record, status change, monthly summary, user added |
| Portal Users | User list with invite and remove. Admin sees all; customer sees their shop |
| Security | Session info, MFA status, sign-out button |

---

### Login (`/login`)
Email/password form. Shows dev credential hints in development builds only
(`import.meta.env.DEV`). Post-login redirects to the originally requested URL.

---

### Unauthorized (`/unauthorized`)
403 page shown when a user's role doesn't match route requirements.
Displays their signed-in email and offers Go Back / Sign Out options.

---

## Components

### Layout

| Component | Description |
|---|---|
| `DashboardShell` | Outer wrapper — sidebar, mobile sidebar, header, `<Outlet />`, footer |
| `Sidebar` | Fixed desktop nav. Role-based filtering hides admin-only items from customers. Shows real user name/initials/role. Sign-out button |
| `MobileSidebar` | Slide-in drawer. Body scroll lock, backdrop close, same role filtering as Sidebar |
| `Header` | Sticky top bar — page title, search, notification badge, user dropdown with sign-out |

### Auth Guards

| Component | Description |
|---|---|
| `RequireAuth` | Redirects unauthenticated users to `/login`. Shows spinner during MSAL init. Preserves intended destination in location state |
| `RequireRole` | Redirects wrong-role users to `/unauthorized`. Used for `/reports` and `/uploads` |

### Dashboard

| Component | Description |
|---|---|
| `WelcomeBanner` | Time-aware greeting, date, completions this month pill |
| `StatsGrid` | 4-up responsive grid of StatCards |
| `StatCard` | Accepts color, icon, value, delta, trend. Supports blue/amber/slate/emerald/violet |
| `QuickActions` | 2×2 grid of nav links with hover transitions |
| `RecentDocuments` | Top 6 records sorted by upload date. Responsive — columns hide at md/lg |
| `PendingDocuments` | Records with `status: "pending"`. Empty state, calibration type badge |
| `ActivityFeed` | Timeline with icon dots. Types: upload, customer, vehicle |

### Documents

| Component | Description |
|---|---|
| `DocumentFilters` | Status tabs with counts + search input with clear button |
| `DocumentsTable` | Sortable table, row hover actions, empty state, record count footer |

### Reports

| Component | Description |
|---|---|
| `ProfitSummaryCards` | Four stat cards with currency/percent formatting |
| `ProfitChart` | Recharts grouped bar chart. Uses `useTheme()` for dark-aware inline colors |
| `ProfitTable` | Sortable per-job table, margin progress bar, totals footer |

### Uploads

| Component | Description |
|---|---|
| `DropZone` | Drag-and-drop + click-to-browse. Validates type, size, count, deduplication |
| `UploadQueue` | Per-file status list with progress bars |
| `DuplicateWarningModal` | Overwrite confirmation modal with match type detail |
| `UploadSummary` | Batch completion recap with failed file list |

### Customers

| Component | Description |
|---|---|
| `CustomerCard` | Grid card — name, type, status, calibration counts, contact, DRP |
| `CustomerTable` | Sortable list view with same fields |
| `CustomerProfile` | Self-view for customer users — stats, contact, location, DRP, account summary |
| `CustomerViewToggle` | Grid/list switcher button group |

### Vehicles

| Component | Description |
|---|---|
| `VehicleCard` | Card with vehicle info, record counts, ADAS system tags, customer |
| `VehicleFilters` | Search input + customer dropdown + ADAS system dropdown |

### Settings

| Component | Description |
|---|---|
| `AppearanceSettings` | Light/Dark/System theme cards with live preview thumbnails |
| `NotificationSettings` | Email toggle list with save confirmation |
| `ProfileSettings` | Editable name/title with read-only email/role |
| `PortalUsersSettings` | User list, invite form, remove button. Role-scoped |
| `SecuritySettings` | Session info panel, sessionStorage notice, sign-out |

---

## Data Layer

All data is mock. Each file is structured to be replaced by real API calls
without changing component interfaces.

### `dashboardData.js`
**Exports:** `stats`, `navItems`, `quickActions`, `activityFeed`

---

### `mockCustomers.js`
8 customers — 4 collision shops, 4 dealerships.

**Key fields:** `id`, `name`, `type`, `franchiseBrand`, `drp[]`, `contact`,
`address`, `totalCalibrations`, `calibrationsThisMonth`, `status`,
`onboarded`, `lastActivity`, `portalUsers`

**Exports:** `customers`, `activeCustomers`, `collisionShops`, `dealerships`,
`getCustomerById(id)`

---

### `mockDocuments.js`
12 ADAS calibration records. No expiry — records are permanent.

**Key fields:** `id` (ADAS-YYYY-NNNNN), `vehicleId` (VH-NNNN), `year`, `make`,
`model`, `vin`, `adasSystem`, `calibrationType` (Static/Dynamic), `customerId`,
`customer`, `technician`, `calibrationDate`, `status`, `invoiceRef`,
`uploadedAt`, `notes`

**Exports:** `documents`, `adasSystems`, `recentDocuments`, `pendingDocuments`,
`getDocumentById(id)`, `getDocumentsByCustomer(customerId)`,
`getDocumentsByVehicle(vin)`

---

### `mockVehicles.js`
Derived at import time from `mockDocuments.js`. No duplication — always in sync.

**Exports:** `vehicles`, `getVehicleByVin(vin)`, `getVehiclesByCustomer(customerId)`,
`vehicleMakes`, `adasSystemOptions`

---

### `mockReportData.js`
20 profit records across Sep–Nov 2024.

**Key fields:** `id`, `date`, `vehicle`, `adasSystem`, `customer`, `customerId`,
`technician`, `listPrice`, `costPrice`

**Derived (auto-calculated):** `profit` = listPrice − costPrice,
`margin` = (profit / listPrice) × 100

**Exports:** `profitRecords`, `profitRecordsWithCalcs`, `getSummaryStats(records)`,
`getMonthlyTrend(records)`

---

## Services

### `msalConfig.js`
MSAL config for Microsoft Entra ID. All values from environment variables.
Defines `APP_ROLES`, `loginRequest` (with MFA `amr` claims), `silentRequest`,
and `isMfaVerified(account)` helper.

---

### `mockAuthService.js`
Temporary auth layer replacing MSAL while Azure account is being configured.
Stores sessions in `sessionStorage` mirroring the MSAL account shape exactly.

**Test accounts:** see [Test Credentials](#test-credentials) below.

**To swap back to MSAL:**
1. Revert `AuthContext.jsx` to the MSAL version
2. Revert `Login.jsx` to the Microsoft sign-in button version
3. Delete `mockAuthService.js`
4. Re-add `VITE_AZURE_*` env vars

---

### `graphClient.js`
Authenticated fetch wrapper for Microsoft Graph API. Singleton MSAL instance,
silent token refresh with redirect fallback. Returns JSON or Blob depending on
`options.responseType`.

---

### `sharepointService.js`
All SharePoint document library operations.

| Function | Description |
|---|---|
| `listCalibrationFiles()` | Lists all PDFs in the document library |
| `getFileMetadata(itemId)` | Returns metadata for a single file |
| `getDownloadUrl(itemId)` | Pre-authenticated temporary download URL |
| `downloadFile(itemId)` | Downloads file as a Blob |
| `triggerBrowserDownload(blob, fileName)` | Prompts browser save dialog |
| `findFileByRecordId(recordId)` | Searches library for file matching record ID |

---

### `uploadService.js`
Mock upload pipeline with duplicate detection.

| Function | Description |
|---|---|
| `checkForDuplicate(file)` | Scans filename for record ID and VIN patterns |
| `simulateUpload(file, isOverwrite)` | Async mock with realistic delay, 10% error rate |

---

## Context & Hooks

### Auth

| File | Type | Exports |
|---|---|---|
| `AuthContextInstance.jsx` | Context object | `AuthContext` |
| `AuthContext.jsx` | Provider component | `AuthProvider` |
| `useAuth.js` | Hook | `useAuth()` |

**Context value:**
```js
{
  account, role, mfaVerified,
  isAuthenticated,  // !!account && mfaVerified
  isAdmin,          // role === APP_ROLES.ADMIN
  isCustomer,       // role === APP_ROLES.CUSTOMER
  initializing, error,
  login(email, password),
  logout(),
}
```

---

### Theme

| File | Type | Exports |
|---|---|---|
| `ThemeContextInstance.jsx` | Context object | `ThemeContext` |
| `ThemeContext.jsx` | Provider component | `ThemeProvider`, `THEMES` |
| `useTheme.js` | Hook | `useTheme()` |

**Context value:**
```js
{
  theme,      // "light" | "dark" | "system"
  setTheme(mode),
  isLight, isDark, isSystem,
}
```

Theme is persisted to `localStorage` under `calibright_theme`. Applied by
toggling the `.dark` class on `<html>`. System preference changes are watched
via `matchMedia` while system mode is active.

---

### `useCustomerScope.js`
Matches the logged-in user's email to a customer record.

```js
const { customer, customerId, isScoped } = useCustomerScope();
// isScoped = true for customer users — data should be filtered
// isScoped = false for admins — show all data
```

---

## Routing & Access Control

| Path | Component | Auth | Role |
|---|---|---|---|
| `/login` | `Login` | Public | — |
| `/unauthorized` | `Unauthorized` | Public | — |
| `/` | `Dashboard` | ✅ Required | Any |
| `/documents` | `Documents` | ✅ Required | Any |
| `/documents/:id` | `DocumentDetail` | ✅ Required | Any |
| `/vehicles` | `Vehicles` | ✅ Required | Any |
| `/vehicles/:vin` | `VehicleDetail` | ✅ Required | Any |
| `/customers` | `Customers` | ✅ Required | Any |
| `/settings` | `Settings` | ✅ Required | Any |
| `/reports` | `Reports` | ✅ Required | Admin only |
| `/uploads` | `Uploads` | ✅ Required | Admin only |

**Guard hierarchy:**
```
<RequireAuth>           ← checks isAuthenticated (account + MFA)
  <DashboardShell>
    <Route ... />       ← available to all auth'd users
    <RequireRole>       ← additionally checks role
      <Route ... />     ← admin-only
    </RequireRole>
  </DashboardShell>
</RequireAuth>
```

**Sidebar** and **MobileSidebar** also filter nav items by role — customers
never see Reports or Uploads in the navigation.

---

## Authentication

Currently running on **mock auth** (`mockAuthService.js`) while the company's
Microsoft 365 / Azure account is being configured.

The mock layer mirrors the real MSAL account shape exactly so the swap back
requires minimal changes.

### Real auth flow (when Azure is ready)
```
User visits portal
      ↓
Redirected to Microsoft login (Entra ID)
      ↓
MFA challenge (enforced by Conditional Access / Security Defaults)
      ↓
Token issued with role claim (Calibright.Admin or Calibright.Customer)
      ↓
AuthContext reads amr claim (MFA verified) and roles claim
      ↓
isAuthenticated = true only when both account + MFA present
```

See `AUTH_SETUP.md` for full Entra ID configuration steps.

---

## Theme System

Dark mode is implemented using Tailwind CSS v4's class strategy.

- **Toggle:** `.dark` class on `<html>` element
- **Variant:** `@variant dark (&:where(.dark, .dark *))` in `index.css`
- **Storage:** `localStorage` key `calibright_theme`
- **Default:** Light
- **Options:** Light / Dark / System (follows OS `prefers-color-scheme`)
- **Transition:** 200ms ease on background and text color changes
- **Charts:** `ProfitChart` uses `useTheme()` to swap Recharts inline colors

All components use `dark:` prefixed Tailwind classes. No CSS-in-JS or
additional libraries required.

---

## Deployment

Hosted on **Vercel**. The `vercel.json` at the project root handles:

**SPA routing** — rewrites all paths to `index.html` so React Router works
on direct URL access and page refresh.

**Security headers** applied to all responses:

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, mic, geolocation, payment all disabled |
| `Content-Security-Policy` | Restricts to self + Microsoft auth/graph/SharePoint domains |
| `X-XSS-Protection` | `1; mode=block` |

---

## SharePoint Integration

See **`SHAREPOINT_SETUP.md`** for the full step-by-step guide.

### Architecture
```
Customer browser
      ↓
Vercel (React portal)
      ↓
Microsoft Graph API  ←── MSAL handles auth
      ↓
SharePoint Online Document Library (PDF storage)
      ↓ (future)
Azure Document Intelligence (PDF profit extraction)
```

### Currently wired
- MSAL auth config (`msalConfig.js`)
- Graph API client (`graphClient.js`)
- SharePoint file service (`sharepointService.js`)
- Auth context and hook

### Still needs connecting
- `<AuthProvider>` swap from mock to MSAL when Azure is ready
- Download PDF buttons in `DocumentDetail` and `VehicleDetail` connected to
  `sharepointService.findFileByRecordId()`
- Azure Document Intelligence pipeline for profit extraction

---

## Planned Features

### PDF Profit Extraction
Once PDFs are in SharePoint, Azure Document Intelligence will extract list
price and cost price from each document, replacing mock report data.

```
PDF uploaded to SharePoint
      ↓
Azure Document Intelligence (trained on invoice template)
extracts: list price, cost price, job ID, VIN
      ↓
Values stored against calibration record
      ↓
Reports page shows real profit analytics
```

### Microsoft Auth Swap
When the company's M365 account is ready — follow `AUTH_SETUP.md` and swap
3 files to enable full MSAL login with MFA and Entra App Roles.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values.

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_AZURE_CLIENT_ID` | App registration client ID (Entra) |
| `VITE_AZURE_TENANT_ID` | Directory tenant ID (Entra) |
| `VITE_REDIRECT_URI` | OAuth redirect URI — must match Entra registration |
| `VITE_SHAREPOINT_SITE_ID` | SharePoint site ID from Graph API |
| `VITE_SHAREPOINT_DRIVE_ID` | Document library drive ID from Graph API |

Add the same variables to **Vercel → Settings → Environment Variables** for
production.

---

## Test Credentials

Used with the current mock auth system. Remove or restrict before production.

| Email | Password | Role | Customer |
|---|---|---|---|
| `admin@calibright.com` | `admin1234` | Admin | All customers |
| `b.kowalski@prestigecollision.com` | `customer1234` | Customer | Prestige Collision Center |
| `a.ruiz@metroford.com` | `customer1234` | Customer | Metro Ford |
| `k.park@sunrisetoyota.com` | `customer1234` | Customer | Sunrise Toyota |

Dev credential hints are shown on the Login page in development builds only
and are hidden automatically in production via `import.meta.env.DEV`.
