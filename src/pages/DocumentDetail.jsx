import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, Download, Car, Cpu,
  Building2, ClipboardList, CheckCircle2, Clock,
} from "lucide-react";
import { getDocumentById }  from "../data/mockDocuments";
import { getCustomerById }  from "../data/mockCustomers";
import { SectionCard }      from "../components/ui/Card";
import { Field, EmptyState } from "../components/ui/primitives";
import Badge   from "../components/ui/Badge";
import Button  from "../components/ui/Button";

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

export default function DocumentDetail() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const doc         = getDocumentById(id);
  const customer    = doc ? getCustomerById(doc.customerId) : null;

  if (!doc) {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <EmptyState
          icon={ClipboardList}
          title="Record not found"
          description={`No calibration record exists for ID ${id}.`}
        >
          <Link
            to="/documents"
            className="flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Documents
          </Link>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-4xl mx-auto">

      {/* Back nav */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-disabled">/</span>
          <span className="font-mono text-sm text-muted">{doc.id}</span>
        </div>
        <Button variant="primary" size="md" icon={Download}>Download PDF</Button>
      </div>

      {/* Hero card */}
      <div className="card px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs text-muted mb-1">{doc.id}</p>
            <h2 className="text-xl font-bold text-primary leading-tight">
              {doc.year} {doc.make} {doc.model}
            </h2>
            <p className="text-sm text-muted mt-1">{doc.adasSystem}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <Badge variant={doc.calibrationType === "Dynamic" ? "dynamic" : "static"}>
              {doc.calibrationType}
            </Badge>
            <Badge variant={doc.status}>
              {doc.status === "complete" ? (
                <><CheckCircle2 className="w-3 h-3" /> Complete</>
              ) : (
                <><Clock className="w-3 h-3" /> Pending</>
              )}
            </Badge>
          </div>
        </div>

        {/* Summary row */}
        <div
          className="border-t mt-5 pt-5"
          style={{ borderColor: "var(--border-faint)" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Calibration Date" value={formatDateShort(doc.calibrationDate)} />
            <Field label="Technician"       value={doc.technician} />
            <Field label="Invoice Ref"      value={doc.invoiceRef} mono />
            <Field label="Uploaded"         value={formatDateShort(doc.uploadedAt)} />
          </div>
        </div>
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SectionCard title="Vehicle Information" icon={Car}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Year"  value={doc.year} />
            <Field label="Make"  value={doc.make} />
            <Field label="Model" value={doc.model} />
            <Field label="VIN"   value={doc.vin} mono />
          </div>
        </SectionCard>

        <SectionCard title="ADAS System" icon={Cpu}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-2">
              <Field label="System" value={doc.adasSystem} />
            </div>
            <Field label="Calibration Type" value={doc.calibrationType} />
            <Field label="Status" value={doc.status.charAt(0).toUpperCase() + doc.status.slice(1)} />
          </div>
        </SectionCard>

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
        <div className="card px-5 py-4">
          <h3 className="text-sm font-semibold text-secondary mb-3">Notes</h3>
          <p className="text-sm text-tertiary leading-relaxed">{doc.notes}</p>
        </div>
      )}

      {/* Download CTA */}
      <div
        className="rounded-xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ backgroundColor: "var(--sidebar-bg)" }}
      >
        <div>
          <p className="text-white font-semibold text-sm">Download Calibration Record</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--sidebar-text)" }}>
            PDF includes full vehicle details, ADAS system info, and technician sign-off.
          </p>
        </div>
        <Button variant="primary" size="md" icon={Download} className="shrink-0">
          Download PDF
        </Button>
      </div>

    </div>
  );
}