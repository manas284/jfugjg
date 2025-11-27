'use client';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { test: 'Mock 1', score: 65 },
  { test: 'Mock 2', score: 72 },
  { test: 'Mock 3', score: 68 },
  { test: 'Mock 4', score: 78 },
  { test: 'Mock 5', score: 75 },
  { test: 'Mock 6', score: 81 },
  { test: 'Mock 7', score: 84 },
];

export function ScoreTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Score Trend</CardTitle>
        <CardDescription>Your scores from the last 7 tests.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{
            score: {
              label: 'Score',
              color: 'hsl(var(--primary))',
            },
          }} className="h-[300px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="test"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="score" fill="var(--color-score)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
