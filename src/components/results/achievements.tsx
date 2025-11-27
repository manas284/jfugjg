import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Target, Zap, Clock, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const achievements = [
  { name: 'Top Scorer', icon: Award, description: 'Scored in the top 10% of all participants.' },
  { name: 'Accuracy King', icon: Target, description: 'Achieved over 90% accuracy.' },
  { name: 'Speed Demon', icon: Zap, description: 'Completed the test in under 75% of the allotted time.' },
  { name: 'Night Owl', icon: Clock, description: 'Completed a test between 12 AM and 4 AM.' },
  { name: 'Perfect Subject Score', icon: Star, description: 'Scored 100% in one of the subjects.' },
];

export function Achievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements Unlocked</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="flex flex-wrap gap-4">
            {achievements.slice(0, 3).map((ach) => (
              <Tooltip key={ach.name}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center gap-2 p-3 border rounded-lg bg-accent/20 w-28">
                    <ach.icon className="h-8 w-8 text-accent-foreground" />
                    <span className="text-xs text-center font-medium text-accent-foreground">{ach.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{ach.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
