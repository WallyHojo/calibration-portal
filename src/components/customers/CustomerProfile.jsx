import {
  Building2, MapPin, Phone, Mail,
  User, FileText, Car, Users, Shield, CalendarDays,
} from "lucide-react";
import { getDocumentsByCustomer } from "../../data/mockDocuments";
import { SectionCard }            from "../ui/Card";
import { Field }                  from "../ui/primitives";

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

function formatDateShort(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

function StatCard({ icon: Icon, label, value, tokenColor }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `var(--${tokenColor}-bg, var(--surface-inset))` }}
      >
        <Icon className="w-5 h-5" style={{ color: `var(--${tokenColor}-text, var(--text-tertiary))` }} />
      </div>
      <div>
        <p className="text-xs text-muted font-medium">{label}</p>
        <p
          className="text-2xl font-bold font-mono mt-0.5"
          style={{ color: `var(--${tokenColor}-text, var(--text-secondary))` }}
        >
          {value}
        </p>
      </div>
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
      <div className="card px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--surface-inset)" }}
          >
            <Building2 className="w-7 h-7 text-muted" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-primary">{customer.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span
                className="badge"
                style={{
                  backgroundColor: "var(--info-bg)",
                  color:           "var(--info-text)",
                  borderColor:     "var(--info-border)",
                }}
              >
                Collision Shop
              </span>
              <span className="badge badge-success">Active</span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs text-muted">Member since</p>
            <p className="text-sm font-medium text-tertiary mt-0.5">{formatDate(customer.onboarded)}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={FileText}  label="Total Records"  value={customer.totalCalibrations}     tokenColor="info"    />
        <StatCard icon={Car}       label="This Month"     value={customer.calibrationsThisMonth} tokenColor="success" />
        <StatCard icon={Shield}    label="Complete"       value={complete}                       tokenColor="neutral" />
        <StatCard icon={Users}     label="Portal Users"   value={customer.portalUsers}           tokenColor="violet"  />
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SectionCard title="Contact Information" icon={User}>
          <div className="grid grid-cols-1 gap-y-4">
            <Field label="Primary Contact" value={customer.contact.name} />
            <Field label="Title"           value={customer.contact.title} />
            <div className="flex items-center gap-2 pt-1">
              <Mail className="w-4 h-4 text-disabled shrink-0" />
              <a
                href={`mailto:${customer.contact.email}`}
                className="text-sm text-accent hover:opacity-80 transition-opacity"
              >
                {customer.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-disabled shrink-0" />
              <span className="text-sm text-secondary">{customer.contact.phone}</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Location" icon={MapPin}>
          <div className="grid grid-cols-1 gap-y-4">
            <Field label="Street"   value={customer.address.street} />
            <Field label="City"     value={customer.address.city} />
            <Field label="State"    value={customer.address.state} />
            <Field label="ZIP Code" value={customer.address.zip} />
          </div>
        </SectionCard>

        {customer.type === "collision" && (
          <SectionCard title="DRP Insurance Networks" icon={Shield}>
            {customer.drp?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {customer.drp.map((network) => (
                  <span key={network} className="badge badge-neutral px-3 py-1.5 text-sm">
                    {network}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted italic">No DRP networks on file.</p>
            )}
          </SectionCard>
        )}

        <SectionCard title="Account Summary" icon={CalendarDays}>
          <div className="grid grid-cols-1 gap-y-4">
            <Field label="Customer ID"   value={customer.id} />
            <Field label="Onboarded"     value={formatDate(customer.onboarded)} />
            <Field label="Last Activity" value={formatDateShort(customer.lastActivity)} />
            <Field label="Portal Users"  value={`${customer.portalUsers} active`} />
            {pending > 0 && (
              <div className="pt-1">
                <span className="badge badge-warning px-3 py-1.5 text-xs">
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