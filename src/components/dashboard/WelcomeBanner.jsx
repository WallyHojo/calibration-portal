import { CheckCircle2 } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export default function WelcomeBanner() {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
      {/* Greeting */}
      <div>
        <p className="text-slate-500 dark:text-slate-500 text-sm">{formatDate()}</p>
        <h2 className="text-slate-800 dark:text-slate-100 text-xl font-semibold mt-0.5">
          {getGreeting()}, J. Harrington
        </h2>
        <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">
          Here&rsquo;s your calibration portal overview for today.
        </p>
      </div>

      {/* Status pill */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-lg text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>64 Completed This Month</span>
        </div>
      </div>
    </div>
  );
}