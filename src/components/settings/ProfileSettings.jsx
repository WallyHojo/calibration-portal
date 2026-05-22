import { useState } from "react";
import { User, Mail, Briefcase, Save, Lock } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function Field({ label, icon: Icon, value, onChange, readOnly = false, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-600 pointer-events-none" />
        <input
          type={type}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={readOnly}
          className={[
            "w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border transition-all",
            readOnly
              ? "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 cursor-default"
              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400",
          ].join(" ")}
        />
      </div>
      {readOnly && (
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Contact your administrator to change this field.
        </p>
      )}
    </div>
  );
}

export default function ProfileSettings() {
  const { account, isAdmin } = useAuth();

  const [name,  setName]  = useState(account?.name ?? "");
  const [title, setTitle] = useState(account?.idTokenClaims?.jobTitle ?? "");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    // In production: PATCH /api/users/profile
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-slate-800 dark:text-slate-100 font-semibold text-sm">
          Account Profile
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
          Update your display name and title. Email is managed by your Microsoft account.
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white text-xl font-bold">
            {(name || "U").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
          </span>
        </div>
        <div>
          <p className="text-slate-700 dark:text-slate-200 font-semibold text-sm">{name || "—"}</p>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
            {isAdmin ? "Admin" : "Customer"}
          </p>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Display Name"
          icon={User}
          value={name}
          onChange={setName}
        />
        <Field
          label="Email Address"
          icon={Mail}
          value={account?.username ?? ""}
          readOnly
        />
        <Field
          label="Job Title"
          icon={Briefcase}
          value={title}
          onChange={setTitle}
        />
        <Field
          label="Role"
          icon={Lock}
          value={isAdmin ? "Admin" : "Customer"}
          readOnly
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save Profile
        </button>
        {saved && (
          <p className="text-emerald-600 text-sm font-medium">✓ Saved successfully</p>
        )}
      </div>
    </div>
  );
}