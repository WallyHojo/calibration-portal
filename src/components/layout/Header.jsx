import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../lib/cn";

const PAGE_TITLES = {
  "/":          "Dashboard",
  "/documents": "Documents",
  "/vehicles":  "Vehicles",
  "/customers": "Customers",
  "/reports":   "Reports",
  "/uploads":   "Uploads",
  "/settings":  "Settings",
};

function getInitials(name = "") {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function Header({ onMenuClick }) {
  const { account, isAdmin, logout } = useAuth();
  const { pathname }  = useLocation();
  const [focused,     setFocused]   = useState(false);
  const [menuOpen,    setMenuOpen]  = useState(false);
  const menuRef   = useRef(null);

  const title       = PAGE_TITLES[pathname] ?? "Calibright";
  const displayName = account?.name ?? account?.username ?? "User";
  const initials    = getInitials(displayName);
  const roleLabel   = isAdmin ? "Admin" : "Customer";

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className="sticky top-0 z-20 flex items-center gap-4 px-4 sm:px-6 h-16 border-b"
      style={{
        backgroundColor: "var(--surface-card)",
        borderColor: "var(--border-base)",
      }}
    >
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden btn btn-ghost btn-sm -ml-2"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page title */}
      <h1 className="flex-1 min-w-0 text-base sm:text-lg font-semibold text-primary truncate">
        {title}
      </h1>

      {/* Search */}
      <div
        className={cn(
          "hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-150",
          focused ? "w-72" : "w-56"
        )}
        style={{
          backgroundColor: focused ? "var(--surface-card)" : "var(--surface-subtle)",
          borderColor: focused ? "var(--border-focus)" : "var(--border-base)",
          boxShadow: focused ? "0 0 0 2px color-mix(in srgb, var(--accent) 15%, transparent)" : "none",
        }}
      >
        <Search className="w-4 h-4 shrink-0 text-muted" />
        <input
          type="text"
          placeholder="Search documents…"
          className="flex-1 bg-transparent text-sm text-secondary outline-none placeholder:text-muted"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      {/* Notifications */}
      <button className="relative btn btn-ghost btn-sm">
        <Bell className="w-5 h-5" />
        <span
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2"
          style={{ "--tw-ring-color": "var(--surface-card)" }}
        />
      </button>

      {/* User menu */}
      <div
        className="relative pl-2 border-l"
        style={{ borderColor: "var(--border-base)" }}
        ref={menuRef}
      >
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-white">{initials}</span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-secondary leading-tight">{displayName}</p>
            <p className="text-xs text-muted leading-tight">{roleLabel}</p>
          </div>
          <ChevronDown className={cn(
            "hidden sm:block w-3.5 h-3.5 text-muted transition-transform",
            menuOpen && "rotate-180"
          )} />
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-52 card py-1 z-50"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: "var(--border-faint)" }}
            >
              <p className="text-sm font-semibold text-primary truncate">{displayName}</p>
              <p className="text-xs text-muted truncate mt-0.5">{account?.username}</p>
            </div>
            <button
              onClick={() => { setMenuOpen(false); logout(); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-tertiary hover:bg-hover hover:text-danger transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}