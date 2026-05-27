import { useState } from "react";
import { User, Mail, Briefcase, Lock, Save } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import { cn } from "../../lib/cn";

function Field({ label, icon: Icon, value, onChange, readOnly = false }) {
  return (
    <div>
      <label className="label-overline block mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-disabled pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={readOnly}
          className={cn("input-base pl-9 pr-4 py-2.5", readOnly && "cursor-default opacity-60")}
        />
      </div>
      {readOnly && (
        <p className="text-xs text-muted mt-1">Contact your administrator to change this field.</p>
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
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-primary">Account Profile</h3>
        <p className="text-xs text-muted mt-1">Update your display name and title.</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shrink-0">
          <span className="text-white text-xl font-bold">
            {(name || "U").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-secondary">{name || "—"}</p>
          <p className="text-xs text-muted mt-0.5">{isAdmin ? "Admin" : "Customer"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Display Name"  icon={User}     value={name}                     onChange={setName}  />
        <Field label="Email Address" icon={Mail}     value={account?.username ?? ""}  readOnly            />
        <Field label="Job Title"     icon={Briefcase}value={title}                    onChange={setTitle} />
        <Field label="Role"          icon={Lock}     value={isAdmin ? "Admin" : "Customer"} readOnly      />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="primary" size="md" icon={Save} onClick={handleSave}>Save Profile</Button>
        {saved && <p className="text-sm font-medium" style={{ color: "var(--success-text)" }}>✓ Saved successfully</p>}
      </div>
    </div>
  );
}