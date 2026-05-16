import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Car,
  Users,
  BarChart3,
  Upload,
  Settings,
  Gauge,
  ChevronRight,
} from "lucide-react";
import { navItems } from "../../data/dashboardData";

const iconMap = {
  LayoutDashboard,
  FileText,
  Car,
  Users,
  BarChart3,
  Upload,
  Settings,
};

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-slate-900 border-r border-slate-800 fixed top-0 left-0 bottom-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600">
          <Gauge className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight tracking-wide">
            CalibrationOS
          </p>
          <p className="text-slate-500 text-xs tracking-widest uppercase">
            Portal
          </p>
        </div>
      </div>

      {/* Nav section label */}
      <div className="px-6 pt-6 pb-2">
        <p className="text-slate-500 text-xs font-medium tracking-widest uppercase">
          Navigation
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {Icon && (
                    <Icon
                      className={[
                        "w-4 h-4 shrink-0 transition-colors",
                        isActive
                          ? "text-white"
                          : "text-slate-500 group-hover:text-slate-300",
                      ].join(" ")}
                    />
                  )}
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="border-t border-slate-800 px-4 py-4">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-slate-300">JH</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-200 text-sm font-medium leading-tight truncate">
              J. Harrington
            </p>
            <p className="text-slate-500 text-xs truncate">Lab Technician</p>
          </div>
          <Settings className="w-3.5 h-3.5 text-slate-600 shrink-0" />
        </div>
      </div>
    </aside>
  );
}