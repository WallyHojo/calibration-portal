import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, silentRequest } from "./msalConfig";

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";

let _msalInstance = null;

export function getMsalInstance() {
  if (!_msalInstance) {
    _msalInstance = new PublicClientApplication(msalConfig);
  }
  return _msalInstance;
}

async function getAccessToken() {
  const msal    = getMsalInstance();
  const account = msal.getAllAccounts()[0];

  if (!account) {
    throw new Error("No authenticated account found. Please log in.");
  }

  try {
    const result = await msal.acquireTokenSilent({ ...silentRequest, account });
    return result.accessToken;
  } catch {
    await msal.acquireTokenRedirect(silentRequest);
    return null;
  }
}

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

  if (options.responseType === "blob") return response.blob();
  return response.json();
}