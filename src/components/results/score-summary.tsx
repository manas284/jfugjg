'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { TestAttempt } from '@/lib/types';

interface ScoreSummaryProps {
  attempt: TestAttempt;
}

export function ScoreSummary({ attempt }: ScoreSummaryProps) {
  const strokeDashoffset = 283 * (1 - attempt.score / 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Performance</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="relative h-40 w-40">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-muted"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            <circle
              className="text-primary"
              strokeWidth="10"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{attempt.score}</span>
            <span className="text-sm text-muted-foreground">Score</span>
          </div>
        </div>
        <Separator />
        <div className="w-full grid grid-cols-3 text-center">
            <div>
                <p className="font-bold text-lg">{attempt.percentile}th</p>
                <p className="text-xs text-muted-foreground">Percentile</p>
            </div>
             <div>
                <p className="font-bold text-lg">{attempt.accuracy}%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
             <div>
                <p className="font-bold text-lg">{attempt.timeTaken}m</p>
                <p className="text-xs text-muted-foreground">Time Taken</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
