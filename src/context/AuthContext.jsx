import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextInstance";
import { APP_ROLES, isMfaVerified } from "../services/msalConfig";
import {
  mockLogin,
  mockLogout,
  getStoredSession,
} from "../services/mockAuthService";

function getRoleFromAccount(account) {
  const roles = account?.idTokenClaims?.roles ?? [];
  if (roles.includes(APP_ROLES.ADMIN))    return APP_ROLES.ADMIN;
  if (roles.includes(APP_ROLES.CUSTOMER)) return APP_ROLES.CUSTOMER;
  return null;
}

function buildAuthState(session) {
  if (!session) {
    return { account: null, role: null, mfaVerified: false };
  }
  return {
    account:     session,
    role:        getRoleFromAccount(session),
    mfaVerified: isMfaVerified(session),
  };
}

const INITIAL_STATE = {
  account:      null,
  role:         null,
  mfaVerified:  false,
  initializing: true,
  error:        null,
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(INITIAL_STATE);

  // ── Restore session from sessionStorage on mount ───────────────────────────
  useEffect(() => {
    const session = getStoredSession();
    // Single setState call — no cascading renders
    setAuthState({
      ...buildAuthState(session),
      initializing: false,
      error:        null,
    });
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────────
  async function login(email, password) {
    setAuthState((prev) => ({ ...prev, error: null }));
    try {
      const session = mockLogin(email, password);
      setAuthState({
        ...buildAuthState(session),
        initializing: false,
        error:        null,
      });
    } catch (err) {
      setAuthState((prev) => ({ ...prev, error: err.message }));
      throw err;
    }
  }

  // ── Logout ─────────────────────────────────────────────────────────────────
  function logout() {
    mockLogout();
    setAuthState({
      account:      null,
      role:         null,
      mfaVerified:  false,
      initializing: false,
      error:        null,
    });
  }

  const value = {
    account:         authState.account,
    role:            authState.role,
    mfaVerified:     authState.mfaVerified,
    isAuthenticated: !!authState.account && authState.mfaVerified,
    isAdmin:         authState.role === APP_ROLES.ADMIN,
    isCustomer:      authState.role === APP_ROLES.CUSTOMER,
    initializing:    authState.initializing,
    error:           authState.error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}