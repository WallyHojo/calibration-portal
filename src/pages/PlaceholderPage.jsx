import { Construction } from "lucide-react";

export default function PlaceholderPage({ title }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Construction className="w-7 h-7" />
      </div>
      <p className="text-sm font-semibold text-secondary mb-2">{title}</p>
      <p className="text-xs text-muted max-w-xs">
        This section is under construction. Check back soon.
      </p>
    </div>
  );
}