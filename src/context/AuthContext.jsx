// ─── Auth Context ──────────────────────────────────────────────────────────────
// Wraps MSAL authentication state into a React context so any component
// can access the current user and trigger login/logout without prop drilling.

import { createContext, useEffect, useState } from "react";
import { getMsalInstance } from "../services/graphClient";
import { loginScopes } from "../services/msalConfig";

const AuthContext = createContext(null);

// Instantiated once outside the component — stable reference, never recreated.
const msal = getMsalInstance();

export function AuthProvider({ children }) {
  const [account,      setAccount]      = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [error,        setError]        = useState(null);

  // ── Initialize MSAL and handle redirect response on page load ──────────────
  // msal is a module-level constant so it's safe to omit from the dependency array.
  useEffect(() => {
    msal
      .initialize()
      .then(() => msal.handleRedirectPromise())
      .then((result) => {
        const active = result?.account ?? msal.getAllAccounts()[0] ?? null;
        setAccount(active);
      })
      .catch((err) => {
        console.error("MSAL init error:", err);
        setError(err.message);
      })
      .finally(() => setInitializing(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Login — redirects to Microsoft login page ──────────────────────────────
  async function login() {
    try {
      setError(null);
      await msal.loginRedirect(loginScopes);
    } catch (err) {
      setError(err.message);
    }
  }

  // ── Logout ─────────────────────────────────────────────────────────────────
  async function logout() {
    try {
      await msal.logoutRedirect({
        postLogoutRedirectUri: window.location.origin,
      });
    } catch (err) {
      setError(err.message);
    }
  }

  const value = {
    account,
    isAuthenticated: !!account,
    initializing,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };