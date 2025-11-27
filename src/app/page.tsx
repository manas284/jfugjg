import { StatCard } from '@/components/dashboard/stat-card';
import { FeaturedTests } from '@/components/dashboard/featured-tests';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { QuickStart } from '@/components/dashboard/quick-start';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Activity, BookCheck, Crosshair, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Tests Taken" value="28" icon={BookCheck} />
        <StatCard title="Avg. Score" value="76%" icon={TrendingUp} />
        <StatCard title="Avg. Accuracy" value="82%" icon={Crosshair} />
        <StatCard title="Overall Rank" value="#1,204" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FeaturedTests />
        </div>
        <div className="space-y-6">
          <QuickStart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
