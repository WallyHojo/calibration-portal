import { useState } from "react";
import { Bell, Save } from "lucide-react";

const NOTIFICATION_OPTIONS = [
  {
    id:      "new_record",
    label:   "New Calibration Record",
    desc:    "Receive an email when a new record is uploaded for your account.",
  },
  {
    id:      "record_complete",
    label:   "Record Status Change",
    desc:    "Notify me when a pending record is marked complete.",
  },
  {
    id:      "monthly_summary",
    label:   "Monthly Summary",
    desc:    "A summary of all calibrations performed during the month.",
  },
  {
    id:      "portal_user_added",
    label:   "Portal User Added",
    desc:    "Notify me when a new user is given access to this account.",
  },
];

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={[
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0",
        enabled ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform",
          enabled ? "translate-x-4.5" : "translate-x-0.5",
        ].join(" ")}
      />
    </button>
  );
}

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState({
    new_record:       true,
    record_complete:  true,
    monthly_summary:  false,
    portal_user_added: true,
  });
  const [saved, setSaved] = useState(false);

  function handleToggle(id, val) {
    setPrefs((prev) => ({ ...prev, [id]: val }));
    setSaved(false);
  }

  function handleSave() {
    // In production: PATCH /api/notifications/preferences
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm">
          Email Notifications
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
          Control which events trigger an email to your registered address.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800">
        {NOTIFICATION_OPTIONS.map((opt) => (
          <div key={opt.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-start gap-3 min-w-0">
              <Bell className="w-4 h-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                  {opt.label}
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
                  {opt.desc}
                </p>
              </div>
            </div>
            <Toggle
              enabled={prefs[opt.id]}
              onChange={(val) => handleToggle(opt.id, val)}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save Preferences
        </button>
        {saved && (
          <p className="text-emerald-600 text-sm font-medium">
            ✓ Saved successfully
          </p>
        )}
      </div>
    </div>
  );
}