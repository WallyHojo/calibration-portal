import { useState } from "react";
import { Palette, Bell, User, Users, Shield, ChevronRight } from "lucide-react";
import AppearanceSettings   from "../components/settings/AppearanceSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import ProfileSettings      from "../components/settings/ProfileSettings";
import PortalUsersSettings  from "../components/settings/PortalUsersSettings";
import SecuritySettings     from "../components/settings/SecuritySettings";
import { cn } from "../lib/cn";

const TABS = [
  { id: "appearance",    label: "Appearance",    icon: Palette, component: AppearanceSettings   },
  { id: "profile",       label: "Profile",       icon: User,    component: ProfileSettings      },
  { id: "notifications", label: "Notifications", icon: Bell,    component: NotificationSettings },
  { id: "portal-users",  label: "Portal Users",  icon: Users,   component: PortalUsersSettings  },
  { id: "security",      label: "Security",      icon: Shield,  component: SecuritySettings     },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("appearance");
  const current = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const Content = current.component;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="page-title">Settings</h2>
        <p className="page-description">Manage your account, appearance, and portal preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar nav */}
        <aside className="md:w-52 shrink-0">
          <nav className="card overflow-hidden">
            {TABS.map((tab) => {
              const Icon   = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all text-left border-l-2",
                    active
                      ? "border-accent bg-accent-subtle text-accent"
                      : "border-transparent text-tertiary hover:bg-hover hover:text-secondary"
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0", active ? "text-accent" : "text-muted")} />
                  <span className="flex-1">{tab.label}</span>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 card px-6 py-6">
          <Content />
        </div>
      </div>
    </div>
  );
}