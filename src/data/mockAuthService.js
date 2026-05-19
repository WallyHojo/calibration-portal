// ─── Mock Auth Service ─────────────────────────────────────────────────────────
// Temporary auth layer replacing MSAL while Azure/M365 account is being set up.
// Mirrors the same account shape and role structure as the real MSAL integration
// so the swap back to MSAL requires minimal changes.
//
// TO SWAP BACK TO MSAL:
//   1. Revert AuthContext.jsx to the MSAL version
//   2. Revert Login.jsx to the Microsoft sign-in button version
//   3. Delete this file
//   4. Re-add VITE_AZURE_* env vars
//
// ─── Test accounts ────────────────────────────────────────────────────────────
// Use these credentials on the login page during development.

import { APP_ROLES } from "./msalConfig";

export const TEST_ACCOUNTS = [
  {
    username:    "admin@calibright.com",
    password:    "admin1234",
    name:        "Admin User",
    role:        APP_ROLES.ADMIN,
    customerId:  null,
  },
  {
    username:    "b.kowalski@prestigecollision.com",
    password:    "customer1234",
    name:        "Brian Kowalski",
    role:        APP_ROLES.CUSTOMER,
    customerId:  "CUST-001",
  },
  {
    username:    "a.ruiz@metroford.com",
    password:    "customer1234",
    name:        "Angela Ruiz",
    role:        APP_ROLES.CUSTOMER,
    customerId:  "CUST-002",
  },
  {
    username:    "k.park@sunrisetoyota.com",
    password:    "customer1234",
    name:        "Kevin Park",
    role:        APP_ROLES.CUSTOMER,
    customerId:  "CUST-003",
  },
];

// ─── Session storage keys ──────────────────────────────────────────────────────
const SESSION_KEY = "calibright_mock_session";

// ─── Auth functions ────────────────────────────────────────────────────────────
export function mockLogin(email, password) {
  const account = TEST_ACCOUNTS.find(
    (a) =>
      a.username.toLowerCase() === email.toLowerCase() &&
      a.password === password
  );

  if (!account) {
    throw new Error("Invalid email or password. Please try again.");
  }

  // Build an account object that mirrors the MSAL account shape
  const session = {
    username:   account.username,
    name:       account.name,
    role:       account.role,
    customerId: account.customerId,
    // Mirrors idTokenClaims shape used by AuthContext
    idTokenClaims: {
      roles: [account.role],
      amr:   ["mfa"], // mock MFA as always satisfied
      name:  account.name,
    },
  };

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function mockLogout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getStoredSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}