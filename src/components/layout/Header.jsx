import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function usePageTitle() {
  const { pathname } = useLocation();
  const map = {
    "/":          "Dashboard",
    "/documents": "Documents",
    "/vehicles":  "Vehicles",
    "/customers": "Customers",
    "/reports":   "Reports",
    "/uploads":   "Uploads",
    "/settings":  "Settings",
  };
  return map[pathname] ?? "Calibright";
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Header({ onMenuClick }) {
  const { account, isAdmin, logout }  = useAuth();
  const [searchFocused, setSearchFocused] = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const menuRef = useRef(null);
  const title   = usePageTitle();

  const displayName = account?.name ?? account?.username ?? "User";
  const initials    = getInitials(displayName);
  const roleLabel   = isAdmin ? "Admin" : "Customer";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 px-4 sm:px-6 h-16 bg-white border-b border-slate-200">

      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-slate-800 font-semibold text-base sm:text-lg leading-tight truncate">
          {title}
        </h1>
      </div>

      {/* Search */}
      <div
        className={[
          "hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-150",
          searchFocused
            ? "border-blue-400 bg-white ring-2 ring-blue-100 w-72"
            : "border-slate-200 bg-slate-50 w-56",
        ].join(" ")}
      >
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search documents…"
          className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
      </button>

      {/* User menu */}
      <div className="relative pl-2 border-l border-slate-200" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-white">{initials}</span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-slate-700 leading-tight">
              {displayName}
            </p>
            <p className="text-xs text-slate-400 leading-tight">{roleLabel}</p>
          </div>
          <ChevronDown className={[
            "hidden sm:block w-3.5 h-3.5 text-slate-400 transition-transform",
            menuOpen ? "rotate-180" : "",
          ].join(" ")} />
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-700 truncate">{displayName}</p>
              <p className="text-xs text-slate-400 truncate mt-0.5">{account?.username}</p>
            </div>
            <button
              onClick={() => { setMenuOpen(false); logout(); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
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