import { useState } from "react";
import {
  Palette,
  Bell,
  User,
  Users,
  Shield,
  ChevronRight,
} from "lucide-react";
import AppearanceSettings   from "../components/settings/AppearanceSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import ProfileSettings      from "../components/settings/ProfileSettings";
import PortalUsersSettings  from "../components/settings/PortalUsersSettings";
import SecuritySettings     from "../components/settings/SecuritySettings";

// ─── Tab definitions ───────────────────────────────────────────────────────────
const TABS = [
  { id: "appearance",    label: "Appearance",    icon: Palette,  component: AppearanceSettings   },
  { id: "profile",       label: "Profile",       icon: User,     component: ProfileSettings      },
  { id: "notifications", label: "Notifications", icon: Bell,     component: NotificationSettings },
  { id: "portal-users",  label: "Portal Users",  icon: Users,    component: PortalUsersSettings  },
  { id: "security",      label: "Security",      icon: Shield,   component: SecuritySettings     },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("appearance");

  const current = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const Content = current.component;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-slate-800 dark:text-slate-100 text-lg font-semibold">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
          Manage your account, appearance, and portal preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar nav */}
        <aside className="md:w-52 shrink-0">
          <nav className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            {TABS.map((tab) => {
              const Icon   = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all text-left border-l-2",
                    active
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                      : "border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200",
                  ].join(" ")}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`} />
                  <span className="flex-1">{tab.label}</span>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content area */}
        <div className="flex-1 min-w-0 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm px-6 py-6">
          <Content />
        </div>

      </div>
    </div>
  );
}