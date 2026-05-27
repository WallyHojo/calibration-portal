import { useState } from "react";
import { Bell, Save } from "lucide-react";
import { Toggle } from "../ui/Primitives";
import Button from "../ui/Button";

const NOTIFICATION_OPTIONS = [
  { id: "new_record",        label: "New Calibration Record",    desc: "Email when a new record is uploaded for your account."         },
  { id: "record_complete",   label: "Record Status Change",       desc: "Notify me when a pending record is marked complete."           },
  { id: "monthly_summary",   label: "Monthly Summary",            desc: "A summary of all calibrations performed during the month."     },
  { id: "portal_user_added", label: "Portal User Added",          desc: "Notify me when a new user is given access to this account."   },
];

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState({
    new_record: true, record_complete: true, monthly_summary: false, portal_user_added: true,
  });
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-primary">Email Notifications</h3>
        <p className="text-xs text-muted mt-1">Control which events trigger an email to your registered address.</p>
      </div>

      <div className="card overflow-hidden divide-y" style={{ "--divide-color": "var(--border-faint)" }}>
        {NOTIFICATION_OPTIONS.map((opt) => (
          <div key={opt.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-start gap-3 min-w-0">
              <Bell className="w-4 h-4 text-muted mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-secondary">{opt.label}</p>
                <p className="text-xs text-muted mt-0.5">{opt.desc}</p>
              </div>
            </div>
            <Toggle
              enabled={prefs[opt.id]}
              onChange={(val) => { setPrefs((p) => ({ ...p, [opt.id]: val })); setSaved(false); }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="primary" size="md" icon={Save} onClick={handleSave}>Save Preferences</Button>
        {saved && <p className="text-sm font-medium" style={{ color: "var(--success-text)" }}>✓ Saved successfully</p>}
      </div>
    </div>
  );
}