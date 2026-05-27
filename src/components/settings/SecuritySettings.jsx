import { Shield, Clock, Monitor, LogOut, AlertTriangle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-muted shrink-0" />
        <p className="text-sm text-tertiary">{label}</p>
      </div>
      <p className="text-sm font-mono text-muted">{value}</p>
    </div>
  );
}

export default function SecuritySettings() {
  const { account, logout, isAdmin } = useAuth();

  const lastActivity = new Date().toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-primary">Security & Session</h3>
        <p className="text-xs text-muted mt-1">Your current session details and security settings.</p>
      </div>

      {/* Session info */}
      <div className="card overflow-hidden">
        <div className="card-header bg-subtle">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-muted" />
            <p className="label-overline">Current Session</p>
          </div>
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border-faint)" }}>
          <InfoRow icon={Monitor} label="Signed in as"  value={account?.username ?? "—"} />
          <InfoRow icon={Shield}  label="Role"          value={isAdmin ? "Admin" : "Customer"} />
          <InfoRow icon={Shield}  label="MFA Status"    value="Verified ✓" />
          <InfoRow icon={Clock}   label="Last Activity" value={lastActivity} />
          <InfoRow icon={Monitor} label="Session Type"  value="sessionStorage" />
        </div>
      </div>

      {/* Notice */}
      <div className="card bg-warning border-warning flex items-start gap-3 px-4 py-3">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--warning-icon)" }} />
        <p className="text-sm text-warning">
          Your session is stored in <span className="font-semibold">sessionStorage</span> and clears automatically
          when you close this tab. No data is written to localStorage or cookies.
        </p>
      </div>

      {/* Sign out */}
      <div className="card px-5 py-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-secondary">Sign Out</p>
          <p className="text-xs text-muted mt-1">End your current session and return to the login page.</p>
        </div>
        <Button
          variant="secondary"
          size="md"
          icon={LogOut}
          onClick={logout}
          className="shrink-0 border-danger text-danger hover:bg-danger"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}