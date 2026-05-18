// ─── Microsoft Graph API Client ───────────────────────────────────────────────
// Thin wrapper around fetch that attaches a Bearer token from MSAL.
// All SharePoint and file operations go through this client.

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, silentScopes } from "./msalConfig";

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";

// Singleton MSAL instance — shared across the app
let _msalInstance = null;

export function getMsalInstance() {
  if (!_msalInstance) {
    _msalInstance = new PublicClientApplication(msalConfig);
  }
  return _msalInstance;
}

// ─── Token acquisition ─────────────────────────────────────────────────────────
// Tries silent refresh first. Falls back to redirect if token has expired.
async function getAccessToken() {
  const msal    = getMsalInstance();
  const account = msal.getAllAccounts()[0];

  if (!account) {
    throw new Error("No authenticated account found. Please log in.");
  }

  try {
    const result = await msal.acquireTokenSilent({
      ...silentScopes,
      account,
    });
    return result.accessToken;
  } catch {
    // Token expired or consent required — trigger interactive login
    await msal.acquireTokenRedirect(silentScopes);
    return null; // page will redirect, this line won't execute
  }
}

// ─── Core fetch wrapper ────────────────────────────────────────────────────────
// All Graph API calls go through here. Throws on non-2xx responses.
export async function graphFetch(path, options = {}) {
  const token = await getAccessToken();

  const response = await fetch(`${GRAPH_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      err?.error?.message ?? `Graph API error: ${response.status} ${response.statusText}`
    );
  }

  // Return raw response for blob downloads; parse JSON otherwise
  if (options.responseType === "blob") return response.blob();
  return response.json();
}