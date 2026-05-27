import { Link } from "react-router-dom";
import { Upload, Car, UserPlus, FileBarChart2 } from "lucide-react";
import { quickActions } from "../../data/dashboardData";

const iconMap = {
  Upload, Car, UserPlus, FileBarChart: FileBarChart2,
};

export default function QuickActions() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-primary mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = iconMap[action.icon] ?? Upload;
          return (
            <Link
              key={action.id}
              to={action.path}
              className="group flex flex-col items-center gap-2 p-3 rounded-lg border transition-all text-center"
              style={{
                borderColor: "var(--border-base)",
                backgroundColor: "var(--surface-card)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-border)";
                e.currentTarget.style.backgroundColor = "var(--accent-subtle)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-base)";
                e.currentTarget.style.backgroundColor = "var(--surface-card)";
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: "var(--surface-inset)" }}
              >
                <Icon className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
              </div>
              <span className="text-xs font-medium text-tertiary group-hover:text-accent transition-colors leading-tight">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}