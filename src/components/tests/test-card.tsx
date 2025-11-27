import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, HelpCircle, Star } from 'lucide-react';
import type { Test } from '@/lib/types';

interface TestCardProps {
  test: Test;
}

export function TestCard({ test }: TestCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[16/9] w-full">
        <Image src={test.coverImageUrl} alt={test.title} fill className="object-cover" data-ai-hint={test.imageHint}/>
        <Badge variant="secondary" className="absolute top-2 right-2">{test.examType}</Badge>
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="text-base font-semibold">{test.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{test.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <HelpCircle className="h-4 w-4" />
            <span>{test.totalQuestions} Qs</span>
          </div>
           <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>{test.rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/test/${test.id}`} passHref className="w-full">
          <Button className="w-full">Start Test</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
