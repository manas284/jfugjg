'use client';
import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from '@/components/ui/chart';
import { MOCK_PERFORMANCE_TREND } from '@/lib/data';

export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
        <CardDescription>Your score progression over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{
          score: {
            label: "Score",
            color: "hsl(var(--primary))",
          },
        }} className="h-[250px] w-full">
          <LineChart
            data={MOCK_PERFORMANCE_TREND}
            margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              dataKey="score"
              type="monotone"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--primary))",
                r: 4
              }}
              activeDot={{
                r: 6
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
