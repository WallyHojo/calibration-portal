# SharePoint Integration Setup Guide

This guide walks through connecting the calibration portal to your
Microsoft 365 SharePoint document library.

---

## Prerequisites

- Microsoft 365 account with SharePoint Online
- Access to the Microsoft Entra admin center (entra.microsoft.com)
- Your Vercel deployment URL

---

## Step 1 — Register the App in Microsoft Entra

1. Go to **https://entra.microsoft.com** and sign in with your M365 admin account
2. Navigate to **Applications → App registrations**
3. Click **New registration**
4. Fill in:
   - **Name:** CalibrationOS Portal
   - **Supported account types:** Accounts in this organizational directory only
   - **Redirect URI:** Select **Single-page application (SPA)** and enter:
     - `http://localhost:5173` (for local dev)
     - `https://your-app.vercel.app` (for production)
5. Click **Register**

---

## Step 2 — Copy Your IDs

After registering, you'll land on the app overview page. Copy:

- **Application (client) ID** → paste as `VITE_AZURE_CLIENT_ID` in `.env`
- **Directory (tenant) ID** → paste as `VITE_AZURE_TENANT_ID` in `.env`

---

## Step 3 — Add API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission → Microsoft Graph → Delegated permissions**
3. Search for and add:
   - `User.Read`
   - `Files.Read.All`
   - `Sites.Read.All`
4. Click **Grant admin consent** (requires admin role)

---

## Step 4 — Find Your SharePoint Site ID

Open a browser and call the Graph API directly (you'll need to authenticate):

```
https://graph.microsoft.com/v1.0/sites?search=your-site-name
```

The easiest way to do this while setting up is to use **Graph Explorer**:

1. Go to **https://developer.microsoft.com/graph/graph-explorer**
2. Sign in with your M365 account
3. Run: `GET https://graph.microsoft.com/v1.0/sites?search=calibration`
4. Find your site in the results and copy the `id` field
5. Paste as `VITE_SHAREPOINT_SITE_ID` in `.env`

---

## Step 5 — Find Your Drive ID

In Graph Explorer, run:

```
GET https://graph.microsoft.com/v1.0/sites/{your-site-id}/drives
```

Find the document library where your PDFs are stored (usually named
"Documents" or "Calibration Records") and copy its `id` field.
Paste as `VITE_SHAREPOINT_DRIVE_ID` in `.env`.

---

## Step 6 — Add Environment Variables to Vercel

1. Go to your project in the Vercel dashboard
2. Navigate to **Settings → Environment Variables**
3. Add each variable from `.env.example` with its real value:
   - `VITE_AZURE_CLIENT_ID`
   - `VITE_AZURE_TENANT_ID`
   - `VITE_REDIRECT_URI` (set to your production Vercel URL)
   - `VITE_SHAREPOINT_SITE_ID`
   - `VITE_SHAREPOINT_DRIVE_ID`
4. Redeploy the app

---

## Step 7 — Add the Production Redirect URI

1. Back in Entra → App registrations → your app
2. Go to **Authentication**
3. Under **Single-page application**, click **Add URI**
4. Add your Vercel production URL: `https://your-app.vercel.app`
5. Save

---

## Step 8 — Install the MSAL Package

In your project root:

```bash
npm install @azure/msal-browser
```

---

## PDF Naming Convention

For `findFileByRecordId()` to locate files automatically, name your
PDFs using the calibration record ID as a prefix:

```
ADAS-2024-03847_Honda_CRV_2023.pdf
ADAS-2024-03846_Ford_F150_2022.pdf
```

---

## Testing the Connection

Once configured, the Download PDF button in `DocumentDetail.jsx` will:

1. Acquire a token silently (no popup for logged-in users)
2. Search SharePoint for a file matching the record ID
3. Stream the PDF as a blob and trigger a browser download

---

## Next Steps

- Wire `AuthProvider` into `main.jsx` wrapping the app
- Add a login page / login button for unauthenticated users
- Connect the Download button in `DocumentDetail.jsx` to `sharepointService.js`
- Set up Azure Document Intelligence for PDF profit extraction