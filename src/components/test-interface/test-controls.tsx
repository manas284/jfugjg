import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';

interface TestControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onMarkForReview: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function TestControls({
  onPrevious,
  onNext,
  onMarkForReview,
  isFirst,
  isLast,
}: TestControlsProps) {
  return (
    <div className="mt-6 flex justify-between items-center">
      <Button variant="outline" onClick={onPrevious} disabled={isFirst}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      <Button variant="secondary" onClick={onMarkForReview}>
        <Bookmark className="mr-2 h-4 w-4" />
        Mark for Review & Next
      </Button>
      <Button onClick={onNext} disabled={isLast}>
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
