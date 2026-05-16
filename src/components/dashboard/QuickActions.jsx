import { Link } from "react-router-dom";
import { Upload, Car, UserPlus, FileBarChart2 } from "lucide-react";
import { quickActions } from "../../data/dashboardData";

const iconMap = {
  Upload,
  Car,
  UserPlus,
  FileBarChart: FileBarChart2,
};

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-slate-800 font-semibold text-sm mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = iconMap[action.icon] ?? Upload;
          return (
            <Link
              key={action.id}
              to={action.path}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group text-center"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <Icon className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
              </div>
              <span className="text-xs font-medium text-slate-600 group-hover:text-blue-700 transition-colors leading-tight">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}