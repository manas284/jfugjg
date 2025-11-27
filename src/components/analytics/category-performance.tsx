'use client';
import { PolarGrid, PolarAngleAxis, Radar, RadarChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { subject: 'History', score: 80, fullMark: 100 },
  { subject: 'Polity', score: 75, fullMark: 100 },
  { subject: 'Geography', score: 85, fullMark: 100 },
  { subject: 'Economy', score: 70, fullMark: 100 },
  { subject: 'Science', score: 90, fullMark: 100 },
  { subject: 'Aptitude', score: 65, fullMark: 100 },
];

export function CategoryPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category-wise Performance</CardTitle>
        <CardDescription>Your proficiency across different subjects.</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={{
            score: {
              label: 'Score',
              color: 'hsl(var(--accent))',
            },
          }}
          className="mx-auto aspect-square h-[300px]"
        >
          <RadarChart data={chartData}>
             <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <PolarAngleAxis dataKey="subject" />
            <PolarGrid />
            <Radar
              name="Performance"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
