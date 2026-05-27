import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, FileText, Car, Users,
  BarChart3, Upload, Settings, Gauge, X, ChevronRight, LogOut,
} from "lucide-react";
import { navItems } from "../../data/dashboardData";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../lib/cn";

const ICON_MAP = { LayoutDashboard, FileText, Car, Users, BarChart3, Upload, Settings };
const ADMIN_ONLY = ["/reports", "/uploads"];

function getInitials(name = "") {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function MobileSidebar({ open, onClose }) {
  const { account, isAdmin, logout } = useAuth();
  const displayName = account?.name ?? account?.username ?? "User";
  const initials    = getInitials(displayName);
  const roleLabel   = isAdmin ? "Admin" : "Customer";
  const visibleNav  = navItems.filter((i) => isAdmin || !ADMIN_ONLY.includes(i.path));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ backgroundColor: "var(--surface-overlay)" }}
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col transition-transform duration-300 ease-in-out lg:hidden border-r scrollbar-thin",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderColor: "var(--sidebar-border)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-5 border-b"
          style={{ borderColor: "var(--sidebar-border)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent shrink-0">
              <Gauge className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Calibright</p>
              <p className="text-xs tracking-widest uppercase" style={{ color: "var(--sidebar-logo-sub)" }}>
                Customer Portal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: "var(--sidebar-text)" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav label */}
        <div className="px-6 pt-5 pb-2">
          <p className="label-overline" style={{ color: "var(--sidebar-logo-sub)" }}>
            Navigation
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
          {visibleNav.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  cn("nav-item", isActive && "nav-item-active")
                }
              >
                {({ isActive }) => (
                  <>
                    {Icon && (
                      <Icon
                        className="w-4 h-4 shrink-0"
                        style={{ color: isActive ? "#ffffff" : "var(--sidebar-logo-sub)" }}
                      />
                    )}
                    <span className="flex-1 text-sm">{item.label}</span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User */}
        <div
          className="border-t px-4 py-4"
          style={{ borderColor: "var(--sidebar-border)" }}
        >
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-white">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "var(--sidebar-text-hover)" }}>
                {displayName}
              </p>
              <p className="text-xs truncate" style={{ color: "var(--sidebar-logo-sub)" }}>
                {roleLabel}
              </p>
            </div>
            <button
              onClick={() => { onClose(); logout(); }}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--sidebar-logo-sub)" }}
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}