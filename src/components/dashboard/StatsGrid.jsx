import { FileText, CheckCircle2, Car, Users } from "lucide-react";
import StatCard from "./StatCard";
import { stats } from "../../data/dashboardData";

const iconMap = {
  total_records: FileText,
  this_month:    CheckCircle2,
  vehicles:      Car,
  customers:     Users,
};

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          delta={stat.delta}
          trend={stat.trend}
          color={stat.color}
          icon={iconMap[stat.id]}
        />
      ))}
    </div>
  );
}