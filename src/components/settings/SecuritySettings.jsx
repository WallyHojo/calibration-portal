import { Shield, Clock, Monitor, LogOut, AlertTriangle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
        <p className="text-slate-600 dark:text-slate-300 text-sm">{label}</p>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-mono">{value}</p>
    </div>
  );
}

export default function SecuritySettings() {
  const { account, logout, isAdmin } = useAuth();

  // Mock session data — in production comes from the token / server
  const sessionInfo = {
    signedInAs:   account?.username ?? "—",
    role:         isAdmin ? "Admin" : "Customer",
    sessionType:  "Session Storage (clears on tab close)",
    mfaStatus:    "Verified ✓",
    lastActivity: new Date().toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit",
    }),
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm">
          Security & Session
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
          Your current session details and security settings.
        </p>
      </div>

      {/* Session info */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 dark:bg-slate-800/50">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Current Session
          </p>
        </div>
        <InfoRow icon={Monitor} label="Signed in as"   value={sessionInfo.signedInAs} />
        <InfoRow icon={Shield}  label="Role"           value={sessionInfo.role} />
        <InfoRow icon={Shield}  label="MFA Status"     value={sessionInfo.mfaStatus} />
        <InfoRow icon={Clock}   label="Last Activity"  value={sessionInfo.lastActivity} />
        <InfoRow icon={Monitor} label="Session Type"   value={sessionInfo.sessionType} />
      </div>

      {/* Session notice */}
      <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Your session is stored in <span className="font-semibold">sessionStorage</span> and will
          be cleared automatically when you close this browser tab. No session data
          is written to localStorage or cookies.
        </p>
      </div>

      {/* Sign out */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-slate-700 dark:text-slate-200 text-sm font-semibold">
              Sign Out
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
              End your current session and return to the login page.
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-sm font-medium transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}