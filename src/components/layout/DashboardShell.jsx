import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Header from "./Header";

export default function DashboardShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar */}
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main content area — offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <Header onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-slate-200 bg-white">
          <p className="text-xs text-slate-400">
            CalibrationOS Portal &mdash; &copy; {new Date().getFullYear()} &mdash; v2.4.1
          </p>
        </footer>
      </div>
    </div>
  );
}