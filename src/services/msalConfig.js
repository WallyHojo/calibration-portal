// ─── MSAL Configuration ───────────────────────────────────────────────────────
// Microsoft Authentication Library config for connecting to
// Microsoft 365 / SharePoint Online via Microsoft Graph API.
//
// SETUP REQUIRED:
// 1. Register your app in Microsoft Entra admin center (entra.microsoft.com)
//    → Applications → App registrations → New registration
// 2. Set redirect URI to your Vercel URL (e.g. https://your-app.vercel.app)
//    Platform: Single-page application (SPA)
// 3. Under API Permissions add:
//    Microsoft Graph → Delegated → Files.Read.All
//    Microsoft Graph → Delegated → Sites.Read.All
//    Microsoft Graph → Delegated → User.Read
// 4. Copy the Application (client) ID and Directory (tenant) ID into .env
//
// See SHAREPOINT_SETUP.md for full step-by-step instructions.

export const msalConfig = {
  auth: {
    clientId:    import.meta.env.VITE_AZURE_CLIENT_ID,
    authority:   `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI ?? window.location.origin,
  },
  cache: {
    cacheLocation:       "sessionStorage", // sessionStorage = cleared on tab close
    storeAuthStateInCookie: false,
  },
};

// ─── Permission scopes ────────────────────────────────────────────────────────
// Requested when the user logs in. Covers reading files from SharePoint.
export const loginScopes = {
  scopes: [
    "User.Read",
    "Files.Read.All",
    "Sites.Read.All",
  ],
};

// ─── Silent token scopes ──────────────────────────────────────────────────────
// Used for silent token refresh — no login popup shown to user.
export const silentScopes = {
  scopes: ["Files.Read.All", "Sites.Read.All"],
};