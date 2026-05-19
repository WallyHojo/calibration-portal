// ─── MSAL Configuration ───────────────────────────────────────────────────────
// Microsoft Authentication Library config for Microsoft Entra ID.
// Supports MFA enforcement via Conditional Access and role-based access
// via Entra App Roles.
//
// Security notes:
//   - Uses Authorization Code flow with PKCE (automatic for SPAs in MSAL v3)
//   - Tokens stored in sessionStorage only — cleared on tab close
//   - MFA enforced server-side via Entra Conditional Access policy
//   - Roles delivered in ID token via Entra App Roles
//
// See AUTH_SETUP.md for Entra configuration steps.

export const msalConfig = {
  auth: {
    clientId:    import.meta.env.VITE_AZURE_CLIENT_ID,
    authority:   `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI ?? window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation:          "sessionStorage", // never localStorage — XSS risk
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii || import.meta.env.PROD) return;
        const levels = ["Error", "Warning", "Info", "Verbose"];
        console[level === 0 ? "error" : level === 1 ? "warn" : "log"](
          `[MSAL][${levels[level]}] ${message}`
        );
      },
      logLevel: import.meta.env.PROD ? 0 : 2, // Error only in prod, Info in dev
    },
  },
};

// ─── Login scopes ─────────────────────────────────────────────────────────────
// Requested at login. Includes claims request for MFA verification (amr)
// and role claims. Entra Conditional Access enforces actual MFA requirement.
export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "User.Read",
    "Files.Read.All",
    "Sites.Read.All",
  ],
  // Request the amr claim to verify MFA was completed
  claims: JSON.stringify({
    id_token: {
      amr: { essential: true },
    },
  }),
};

// ─── Silent token refresh scopes ──────────────────────────────────────────────
export const silentRequest = {
  scopes: ["Files.Read.All", "Sites.Read.All"],
};

// ─── App roles ────────────────────────────────────────────────────────────────
// Must match the role values defined in your Entra App Registration.
// See AUTH_SETUP.md → Step 4 for how to create these roles.
export const APP_ROLES = {
  ADMIN:    "Calibright.Admin",
  CUSTOMER: "Calibright.Customer",
};

// ─── MFA verification ─────────────────────────────────────────────────────────
// Checks the amr claim in the ID token to confirm MFA was satisfied.
// amr = Authentication Methods References (RFC 8176)
// "mfa" indicates multi-factor auth was used.
export function isMfaVerified(account) {
  const claims = account?.idTokenClaims ?? {};
  const amr    = claims.amr ?? [];
  return Array.isArray(amr)
    ? amr.includes("mfa")
    : amr === "mfa";
}