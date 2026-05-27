import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Header from "./Header";

export default function DashboardShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--surface-page)" }}>
      <Sidebar />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <Header onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 p-4 sm:p-6" style={{ backgroundColor: "var(--surface-page)" }}>
          <Outlet />
        </main>

        <footer
          className="px-6 py-4 border-t"
          style={{
            backgroundColor: "var(--surface-card)",
            borderColor: "var(--border-base)",
          }}
        >
          <p className="text-xs text-muted">
            Calibright Customer Portal &mdash; &copy; {new Date().getFullYear()} &mdash; v2.4.1
          </p>
        </footer>
      </div>
    </div>
  );
}