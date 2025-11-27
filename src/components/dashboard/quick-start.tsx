import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Shuffle } from 'lucide-react';

export function QuickStart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Start</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Button size="lg">
          <Play className="mr-2 h-5 w-5" />
          Resume Last Test
        </Button>
        <Button size="lg" variant="secondary">
          <Shuffle className="mr-2 h-5 w-5" />
          Start a Random Test
        </Button>
      </CardContent>
    </Card>
  );
}
