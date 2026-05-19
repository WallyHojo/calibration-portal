import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { customers } from "../data/mockCustomers";

// ─── useCustomerScope ──────────────────────────────────────────────────────────
// Returns the customer record for the currently logged-in user.
//
// Admins: returns null (they see all data — no scoping applied)
// Customers: returns their customer record matched by email
//
// In production, the match uses the account's email (username) against
// the customer contact email. This assumes each portal user was provisioned
// with the email address registered in mockCustomers.js.
//
// Usage:
//   const { customerId, customer, isScoped } = useCustomerScope();
//   const records = isScoped
//     ? documents.filter(d => d.customerId === customerId)
//     : documents;

export function useCustomerScope() {
  const { account, isAdmin, isAuthenticated } = useAuth();

  const customer = useMemo(() => {
    if (!isAuthenticated || isAdmin) return null;

    // Match the logged-in user's email against customer contact emails
    const email = account?.username?.toLowerCase() ?? "";
    return customers.find(
      (c) => c.contact.email.toLowerCase() === email
    ) ?? null;
  }, [account, isAdmin, isAuthenticated]);

  return {
    customer,
    customerId: customer?.id ?? null,
    // isScoped = true when data should be filtered to one customer
    isScoped: isAuthenticated && !isAdmin,
  };
}