'use client';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { TestAttempt } from '@/lib/types';

interface SubjectBreakdownProps {
  attempt: TestAttempt;
}

export function SubjectBreakdown({ attempt }: SubjectBreakdownProps) {
  const chartData = Object.entries(attempt.subjectWisePerformance).map(([subject, data]) => ({
    subject,
    ...data,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject-wise Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{
          score: { label: 'Score', color: 'hsl(var(--primary))' },
          accuracy: { label: 'Accuracy', color: 'hsl(var(--accent))' },
        }} className="h-[300px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="subject"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="accuracy" fill="var(--color-accuracy)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
