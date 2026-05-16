import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

// Derive page title from current route
function usePageTitle() {
  const { pathname } = useLocation();
  const map = {
    "/": "Dashboard",
    "/documents": "Documents",
    "/equipment": "Equipment",
    "/customers": "Customers",
    "/reports": "Reports",
    "/uploads": "Uploads",
    "/settings": "Settings",
  };
  return map[pathname] ?? "CalibrationOS";
}

export default function Header({ onMenuClick }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const title = usePageTitle();

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
          placeholder="Search documents, equipment…"
          className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
        <Bell className="w-5 h-5" />
        {/* Badge */}
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
      </button>

      {/* User avatar */}
      <div className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer group">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
          <span className="text-xs font-semibold text-slate-600">JH</span>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-slate-700 leading-tight">J. Harrington</p>
          <p className="text-xs text-slate-400 leading-tight">Lab Tech</p>
        </div>
        <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
      </div>
    </header>
  );
}