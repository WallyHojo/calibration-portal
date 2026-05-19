# Auth Setup Guide — CalibrationOS Portal

This guide covers the Microsoft Entra ID configuration required to enable
secure login with role-based access control and enforced MFA.

Assumes you have completed the steps in `SHAREPOINT_SETUP.md` first
(app registration, client ID, tenant ID already configured).

---

## Overview

```
User visits portal
      ↓
Redirected to Microsoft login (Entra ID)
      ↓
MFA challenge (enforced by Conditional Access)
      ↓
Token issued with role claim (Admin or Customer)
      ↓
Portal reads role — scopes data accordingly
```

---

## Step 1 — Define App Roles in Entra

App Roles are how Entra delivers role information inside the ID token.
The portal reads a `roles` claim from the token to determine access level.

1. Go to **https://entra.microsoft.com**
2. Navigate to **Applications → App registrations → CalibrationOS Portal**
3. Click **App roles** in the left menu
4. Click **Create app role** and create the first role:

   | Field | Value |
   |---|---|
   | Display name | CalibrationOS Admin |
   | Allowed member types | Users/Groups |
   | Value | `CalibrationOS.Admin` |
   | Description | Full access — sees all customers and records |
   | Enabled | Yes |

5. Create the second role:

   | Field | Value |
   |---|---|
   | Display name | CalibrationOS Customer |
   | Allowed member types | Users/Groups |
   | Value | `CalibrationOS.Customer` |
   | Description | Scoped access — sees only their own records |
   | Enabled | Yes |

6. Click **Apply**

> **Important:** The `Value` field must match exactly what's in
> `src/services/msalConfig.js` under `APP_ROLES`.

---

## Step 2 — Assign Roles to Users

1. In Entra, navigate to **Applications → Enterprise applications**
2. Find and click **CalibrationOS Portal**
3. Click **Users and groups → Add user/group**
4. Select the user or group, then select their role (Admin or Customer)
5. Click **Assign**

Repeat for each customer contact. Each body shop or dealership contact
should be assigned the **CalibrationOS.Customer** role.

---

## Step 3 — Enable Conditional Access for MFA

Conditional Access is how Entra enforces MFA for all users.
This is configured at the tenant level, not in the app code.

1. In Entra, navigate to **Protection → Conditional Access**
2. Click **New policy**
3. Name it: `CalibrationOS — Require MFA`
4. Configure:

   **Users:**
   - Include: Users and groups → select the groups assigned to your app

   **Target resources:**
   - Include: Select apps → search for and select **CalibrationOS Portal**

   **Grant:**
   - Select **Require multifactor authentication**
   - Click **Select**

   **Enable policy:** On

5. Click **Create**

> Once enabled, every user must complete MFA on login.
> The portal verifies this via the `amr` claim in the token —
> if `mfa` is not present, the user is treated as unauthenticated.

---

## Step 4 — Provision Customer Accounts

Each body shop or dealership contact needs a Microsoft account in your tenant.

**Option A — Internal accounts (recommended for control)**

Create guest accounts in your Entra tenant:

1. Entra → **Users → New user → Invite external user**
2. Enter the customer's work email
3. They receive an invitation email and set up their Microsoft account
4. Assign them the `CalibrationOS.Customer` role (Step 2)

**Option B — Existing Microsoft 365 accounts**

If the customer already has a Microsoft 365 account (many dealerships do),
they can use their existing credentials. Just invite their account as a guest.

---

## Step 5 — Customer Data Scoping

The portal matches the logged-in user's email address against the
`contact.email` field in `mockCustomers.js` (and eventually your database).

Ensure each provisioned customer account uses the **same email address**
registered in their customer record.

For example, if `mockCustomers.js` has:
```js
contact: { email: "b.kowalski@prestigecollision.com" }
```

Then the Microsoft account invited must use `b.kowalski@prestigecollision.com`.

---

## Step 6 — Update Redirect URIs

Ensure both local dev and production URIs are registered:

1. Entra → App registrations → CalibrationOS Portal → **Authentication**
2. Under **Single-page application**, confirm both are listed:
   - `http://localhost:5173`
   - `https://your-app.vercel.app`

---

## Route Access Summary

| Route | Auth required | Role required |
|---|---|---|
| `/login` | No | — |
| `/unauthorized` | No | — |
| `/` (Dashboard) | Yes + MFA | Any |
| `/documents` | Yes + MFA | Any |
| `/documents/:id` | Yes + MFA | Any |
| `/vehicles` | Yes + MFA | Any |
| `/customers` | Yes + MFA | Any |
| `/uploads` | Yes + MFA | Any |
| `/settings` | Yes + MFA | Any |
| `/reports` | Yes + MFA | Admin only |

---

## Security Headers (Vercel)

The following HTTP security headers are applied to all responses via `vercel.json`:

| Header | Purpose |
|---|---|
| `Strict-Transport-Security` | Forces HTTPS for 2 years, including subdomains |
| `X-Frame-Options: DENY` | Prevents clickjacking via iframes |
| `X-Content-Type-Options: nosniff` | Prevents MIME type sniffing |
| `Referrer-Policy` | Limits referrer info sent to external sites |
| `Permissions-Policy` | Disables camera, microphone, geolocation, payment |
| `Content-Security-Policy` | Restricts which domains scripts, fonts, and connections can use |
| `X-XSS-Protection` | Legacy XSS filter for older browsers |

The CSP `connect-src` directive explicitly allows:
- `login.microsoftonline.com` — MSAL authentication
- `graph.microsoft.com` — Graph API calls
- `*.sharepoint.com` — SharePoint file access

---

## Token Security Notes

- Tokens are stored in **sessionStorage only** — never localStorage
- sessionStorage is cleared when the tab or browser closes
- Silent token refresh runs automatically before expiry (MSAL handles this)
- MFA completion is verified via the `amr` claim on every session restore
- All token validation happens server-side at Microsoft — the app never
  manually decodes or trusts token contents for security decisions
