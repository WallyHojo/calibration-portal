import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Car,
  Cpu,
  Building2,
  FileText,
  ClipboardList,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { getDocumentById } from "../data/mockDocuments";
import { getCustomerById } from "../data/mockCustomers";

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

function formatDateShort(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

// ─── Sub-components ────────────────────────────────────────────────────────────
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

function Field({ label, value, mono = false }) {
  return (
    <div>
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-slate-700 text-sm font-medium ${mono ? "font-mono" : ""}`}>
        {value ?? <span className="text-slate-300 italic font-normal">—</span>}
      </p>
    </div>
  );
}

function StatusPill({ status }) {
  const cfg =
    status === "complete"
      ? { icon: CheckCircle2, label: "Complete", className: "bg-emerald-50 text-emerald-700 border-emerald-200" }
      : { icon: Clock,        label: "Pending",  className: "bg-amber-50  text-amber-700  border-amber-200"  };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-semibold border ${cfg.className}`}>
      <Icon className="w-4 h-4" />
      {cfg.label}
    </span>
  );
}

function TypePill({ type }) {
  const className =
    type === "Dynamic"
      ? "bg-violet-50 text-violet-700 border-violet-200"
      : "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold border ${className}`}>
      {type}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doc = getDocumentById(id);
  const customer = doc ? getCustomerById(doc.customerId) : null;

  // 404 state
  if (!doc) {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <FileText className="w-7 h-7 text-slate-400" />
          </div>
          <h2 className="text-slate-700 font-semibold text-lg mb-2">Record not found</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-xs">
            No calibration record exists for ID <span className="font-mono">{id}</span>.
          </p>
          <Link
            to="/documents"
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Documents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-4xl mx-auto">

      {/* Back nav + top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-slate-300">/</span>
          <span className="font-mono text-sm text-slate-500">{doc.id}</span>
        </div>

        {/* Download button */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Hero card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs text-slate-400 mb-1">{doc.id}</p>
            <h2 className="text-slate-800 text-xl font-bold leading-tight">
              {doc.year} {doc.make} {doc.model}
            </h2>
            <p className="text-slate-500 text-sm mt-1">{doc.adasSystem}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <TypePill type={doc.calibrationType} />
            <StatusPill status={doc.status} />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 mt-5 pt-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Calibration Date" value={formatDateShort(doc.calibrationDate)} />
            <Field label="Technician"       value={doc.technician} />
            <Field label="Invoice Ref"      value={doc.invoiceRef} mono />
            <Field label="Uploaded"         value={formatDateShort(doc.uploadedAt)} />
          </div>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Vehicle info */}
        <SectionCard title="Vehicle Information" icon={Car}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Year"  value={doc.year} />
            <Field label="Make"  value={doc.make} />
            <Field label="Model" value={doc.model} />
            <Field label="VIN"   value={doc.vin} mono />
          </div>
        </SectionCard>

        {/* ADAS system */}
        <SectionCard title="ADAS System" icon={Cpu}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-2">
              <Field label="System" value={doc.adasSystem} />
            </div>
            <Field label="Calibration Type" value={doc.calibrationType} />
            <Field label="Status"           value={doc.status.charAt(0).toUpperCase() + doc.status.slice(1)} />
          </div>
        </SectionCard>

        {/* Customer info */}
        <SectionCard title="Customer" icon={Building2}>
          <div className="grid grid-cols-1 gap-y-4">
            <Field label="Shop / Dealership" value={doc.customer} />
            {customer && (
              <>
                <Field label="Contact"  value={customer.contact.name} />
                <Field label="Phone"    value={customer.contact.phone} />
                <Field label="Location" value={`${customer.address.city}, ${customer.address.state}`} />
              </>
            )}
          </div>
        </SectionCard>

        {/* Calibration details */}
        <SectionCard title="Calibration Details" icon={ClipboardList}>
          <div className="grid grid-cols-1 gap-y-4">
            <Field label="Performed By" value={doc.technician} />
            <Field label="Date"         value={formatDate(doc.calibrationDate)} />
            <Field label="Record ID"    value={doc.id} mono />
            <Field label="Vehicle ID"   value={doc.vehicleId} mono />
          </div>
        </SectionCard>

      </div>

      {/* Notes */}
      {doc.notes && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-slate-400" />
            <h3 className="text-slate-700 font-semibold text-sm">Notes</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{doc.notes}</p>
        </div>
      )}

      {/* Bottom download CTA */}
      <div className="bg-slate-900 rounded-xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-white font-semibold text-sm">Download Calibration Record</p>
          <p className="text-slate-400 text-xs mt-0.5">
            PDF includes full vehicle details, ADAS system info, and technician sign-off.
          </p>
        </div>
        <button className="shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

    </div>
  );
}