import { MapPin, Phone, Mail, FileText, Building2, Car } from "lucide-react";
import Badge from "../ui/Badge";

export default function CustomerCard({ customer }) {
  return (
    <div className="card overflow-hidden hover:border-accent transition-colors cursor-pointer" style={{ "--tw-border-opacity": 1 }}>
      <div className="card-header flex-col items-start gap-3">
        <div className="flex items-start justify-between w-full gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--surface-inset)" }}>
            <Building2 className="w-5 h-5 text-muted" />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <Badge variant="collision">Collision Shop</Badge>
            <Badge variant={customer.status}>{customer.status === "active" ? "Active" : "Inactive"}</Badge>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-primary">{customer.name}</h3>
          {customer.drp?.length > 0 && <p className="text-xs text-muted mt-0.5">DRP: {customer.drp.join(", ")}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 border-b" style={{ borderColor: "var(--border-faint)" }}>
        {[
          { icon: FileText, value: customer.totalCalibrations,     label: "Total Records", color: "var(--accent)"        },
          { icon: Car,      value: customer.calibrationsThisMonth, label: "This Month",    color: "var(--success-text)"  },
        ].map(({ icon: Icon, value, label, color }, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5 py-3 border-r last:border-r-0" style={{ borderColor: "var(--border-faint)" }}>
            <div className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" style={{ color }} />
              <p className="text-lg font-bold font-mono text-secondary">{value}</p>
            </div>
            <p className="text-xs text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 space-y-2">
        {[
          { icon: MapPin, text: `${customer.address.city}, ${customer.address.state}` },
          { icon: Mail,   text: customer.contact.email },
          { icon: Phone,  text: customer.contact.phone },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-xs text-tertiary">
            <Icon className="w-3.5 h-3.5 text-disabled shrink-0" />
            <span className="truncate">{text}</span>
          </div>
        ))}
      </div>

      <div className="card-footer">
        <p className="text-xs text-muted">
          Contact: <span className="font-medium text-tertiary">{customer.contact.name}</span>
          {" — "}{customer.contact.title}
        </p>
      </div>
    </div>
  );
}