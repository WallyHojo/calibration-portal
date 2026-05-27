import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { recentDocuments } from "../../data/mockDocuments";
import Badge from "../ui/Badge";

function formatDate(iso) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(iso));
}

export default function RecentDocuments() {
  return (
    <div className="card overflow-hidden">
      <div className="card-header">
        <h3 className="text-sm font-semibold text-primary">Recent Calibrations</h3>
        <Link
          to="/documents"
          className="flex items-center gap-1 text-xs font-medium text-accent hover:opacity-80 transition-opacity"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Vehicle</th>
              <th className="hidden md:table-cell">ADAS System</th>
              <th className="hidden lg:table-cell">Customer</th>
              <th className="hidden lg:table-cell">Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentDocuments.map((doc) => (
              <tr key={doc.id}>
                <td className="font-mono text-xs text-muted whitespace-nowrap">{doc.id}</td>
                <td className="whitespace-nowrap">
                  <p className="font-medium text-secondary">
                    {doc.year} {doc.make} {doc.model}
                  </p>
                  <p className="font-mono text-xs text-muted mt-0.5">{doc.vin}</p>
                </td>
                <td className="hidden md:table-cell whitespace-nowrap text-tertiary">
                  {doc.adasSystem}
                </td>
                <td className="hidden lg:table-cell whitespace-nowrap text-tertiary">
                  {doc.customer}
                </td>
                <td className="hidden lg:table-cell font-mono text-xs text-muted whitespace-nowrap">
                  {formatDate(doc.calibrationDate)}
                </td>
                <td className="whitespace-nowrap">
                  <Badge variant={doc.status}>{doc.status === "complete" ? "Complete" : "Pending"}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}