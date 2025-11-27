'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface TestSidebarProps {
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  answeredCount: number;
  notAnsweredCount: number;
  markedCount: number;
  totalQuestions: number;
  onSubmit: () => void;
}

export function TestSidebar({
  timeLeft,
  setTimeLeft,
  answeredCount,
  notAnsweredCount,
  markedCount,
  totalQuestions,
  onSubmit,
}: TestSidebarProps) {

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, setTimeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Test Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Time Left</p>
          <p className="text-3xl font-bold font-mono tracking-wider">{formatTime(timeLeft)}</p>
        </div>
        
        <Separator />

        <div className="space-y-2">
            <div className="flex justify-between">
                <span className="text-green-500">Answered</span>
                <span>{answeredCount}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-red-500">Not Answered</span>
                <span>{notAnsweredCount}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-yellow-500">Marked</span>
                <span>{markedCount}</span>
            </div>
             <div className="flex justify-between text-muted-foreground">
                <span>Not Visited</span>
                <span>{totalQuestions - (answeredCount + notAnsweredCount + markedCount)}</span>
            </div>
        </div>
        
        <Separator />

        <Button className="w-full" variant="destructive" onClick={onSubmit}>
          Submit Test
        </Button>
      </CardContent>
    </Card>
  );
}
