import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScoreTrendChart } from '@/components/analytics/score-trend-chart';
import { CategoryPerformance } from '@/components/analytics/category-performance';
import { TestHistoryTable } from '@/components/analytics/test-history-table';
import { AiSuggestion } from '@/components/analytics/ai-suggestion';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Deep dive into your performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ScoreTrendChart />
        </div>
        <div className="lg:col-span-2">
          <CategoryPerformance />
        </div>
      </div>
      
      <div className="space-y-6">
        <AiSuggestion />
        <TestHistoryTable />
      </div>
    </div>
  );
}
