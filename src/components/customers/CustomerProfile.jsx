import {
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  Car,
  Users,
  Shield,
  CalendarDays,
} from "lucide-react";
import { getDocumentsByCustomer } from "../../data/mockDocuments";

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

function StatCard({ icon: Icon, label, value, color = "blue" }) {
  const colors = {
    blue:    { icon: "bg-blue-100 text-blue-600",    value: "text-blue-700"    },
    emerald: { icon: "bg-emerald-100 text-emerald-600", value: "text-emerald-700" },
    violet:  { icon: "bg-violet-100 text-violet-600",  value: "text-violet-700"  },
    slate:   { icon: "bg-slate-100 text-slate-600",    value: "text-slate-700"   },
  };
  const cfg = colors[color] ?? colors.blue;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${cfg.icon}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-slate-500 text-xs font-medium">{label}</p>
        <p className={`text-2xl font-bold font-mono mt-0.5 ${cfg.value}`}>{value}</p>
      </div>
    </div>
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-slate-500" />
        </div>
        <h3 className="text-slate-700 font-semibold text-sm">{title}</h3>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className="text-slate-700 text-sm font-medium">
        {value ?? <span className="text-slate-300 italic font-normal">—</span>}
      </p>
    </div>
  );
}

export default function CustomerProfile({ customer }) {
  const records  = getDocumentsByCustomer(customer.id);
  const complete = records.filter((r) => r.status === "complete").length;
  const pending  = records.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* Hero */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
            <Building2 className="w-7 h-7 text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-slate-800 text-xl font-bold">{customer.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className={[
                "inline-flex px-2 py-0.5 rounded text-xs font-medium border",
                customer.type === "dealership"
                  ? "bg-violet-50 text-violet-700 border-violet-200"
                  : "bg-blue-50 text-blue-700 border-blue-200",
              ].join(" ")}>
                {customer.type === "dealership" ? "Dealership" : "Collision Shop"}
              </span>
              {customer.franchiseBrand && (
                <span className="text-slate-400 text-xs">{customer.franchiseBrand} Franchise</span>
              )}
              <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
                Active
              </span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-slate-400 text-xs">Member since</p>
            <p className="text-slate-600 text-sm font-medium mt-0.5">
              {formatDate(customer.onboarded)}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Total Records"    value={customer.totalCalibrations}     color="blue"    />
        <StatCard icon={Car}      label="This Month"       value={customer.calibrationsThisMonth} color="emerald" />
        <StatCard icon={Shield}   label="Complete"         value={complete}                       color="slate"   />
        <StatCard icon={Users}    label="Portal Users"     value={customer.portalUsers}           color="violet"  />
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Contact info */}
        <SectionCard title="Contact Information" icon={User}>
          <div className="grid grid-cols-1 gap-y-4">
            <Field label="Primary Contact" value={customer.contact.name} />
            <Field label="Title"           value={customer.contact.title} />
            <div className="flex items-center gap-2 pt-1">
              <Mail className="w-4 h-4 text-slate-300 shrink-0" />
              <a
                href={`mailto:${customer.contact.email}`}
                className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
              >
                {customer.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-300 shrink-0" />
              <span className="text-slate-700 text-sm">{customer.contact.phone}</span>
            </div>
          </div>
        </SectionCard>

        {/* Location */}
        <SectionCard title="Location" icon={MapPin}>
          <div className="grid grid-cols-1 gap-y-4">
            <Field label="Street"   value={customer.address.street} />
            <Field label="City"     value={customer.address.city} />
            <Field label="State"    value={customer.address.state} />
            <Field label="ZIP Code" value={customer.address.zip} />
          </div>
        </SectionCard>

        {/* DRP Networks — collision shops only */}
        {customer.type === "collision" && (
          <SectionCard title="DRP Insurance Networks" icon={Shield}>
            {customer.drp?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {customer.drp.map((network) => (
                  <span
                    key={network}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium"
                  >
                    {network}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm italic">No DRP networks on file.</p>
            )}
          </SectionCard>
        )}

        {/* Account summary */}
        <SectionCard title="Account Summary" icon={CalendarDays}>
          <div className="grid grid-cols-1 gap-y-4">
            <Field label="Customer ID"    value={customer.id} />
            <Field label="Onboarded"      value={formatDate(customer.onboarded)} />
            <Field label="Last Activity"  value={formatDate(customer.lastActivity)} />
            <Field label="Portal Users"   value={`${customer.portalUsers} active`} />
            {pending > 0 && (
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-amber-700">
                  {pending} record{pending !== 1 ? "s" : ""} pending
                </span>
              </div>
            )}
          </div>
        </SectionCard>

      </div>
    </div>
  );
}