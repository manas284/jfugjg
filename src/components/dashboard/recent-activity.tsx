import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_RECENT_ACTIVITY } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>A log of your latest tests.</CardDescription>
        </div>
         <Link href="/analytics" passHref>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {MOCK_RECENT_ACTIVITY.map((activity) => (
            <li key={activity.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{activity.testTitle}</p>
                <p className="text-sm text-muted-foreground">{activity.date}</p>
              </div>
              <div className="font-semibold text-primary">{activity.score}%</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
