import WelcomeBanner    from "../components/dashboard/WelcomeBanner";
import StatsGrid        from "../components/dashboard/StatsGrid";
import QuickActions     from "../components/dashboard/QuickActions";
import RecentDocuments  from "../components/dashboard/RecentDocuments";
import PendingDocuments from "../components/dashboard/PendingDocuments";
import ActivityFeed     from "../components/dashboard/ActivityFeed";

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      <WelcomeBanner />
      <StatsGrid />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-6">
          <QuickActions />
          <PendingDocuments />
        </div>
        <div className="xl:col-span-2">
          <RecentDocuments />
        </div>
      </div>

      <ActivityFeed />
    </div>
  );
}