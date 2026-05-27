import { CheckCircle2 } from "lucide-react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  }).format(new Date());
}

export default function WelcomeBanner() {
  return (
    <div className="card px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p className="text-sm text-muted">{formatDate()}</p>
        <h2 className="text-xl font-semibold text-primary mt-0.5">
          {getGreeting()}, welcome back
        </h2>
        <p className="text-sm text-muted mt-1">
          Here&rsquo;s your calibration portal overview for today.
        </p>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="badge badge-success px-3 py-1.5 text-sm">
          <CheckCircle2 className="w-4 h-4" />
          <span>64 Completed This Month</span>
        </div>
      </div>
    </div>
  );
}