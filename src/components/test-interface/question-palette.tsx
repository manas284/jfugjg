import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Question, QuestionStatus } from '@/lib/types';

interface QuestionPaletteProps {
  questions: Question[];
  statuses: Record<number, QuestionStatus>;
  onSelectQuestion: (index: number) => void;
  currentQuestionId: number;
}

const statusClasses: Record<QuestionStatus, string> = {
  answered: 'bg-green-500 text-white hover:bg-green-600',
  notAnswered: 'bg-red-500 text-white hover:bg-red-600',
  marked: 'bg-yellow-500 text-white hover:bg-yellow-600',
  notVisited: 'bg-muted text-muted-foreground hover:bg-muted/80',
};

const statusBorderClasses: Record<QuestionStatus, string> = {
  answered: 'border-green-600',
  notAnswered: 'border-red-600',
  marked: 'border-yellow-600',
  notVisited: 'border-border',
};


export function QuestionPalette({ questions, statuses, onSelectQuestion, currentQuestionId }: QuestionPaletteProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Question Palette</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((question, index) => (
          <Button
            key={question.id}
            variant="outline"
            size="icon"
            className={cn(
              'h-9 w-9',
              statusClasses[statuses[question.id] || 'notVisited'],
              question.id === currentQuestionId && 'ring-2 ring-primary ring-offset-2',
            )}
            onClick={() => onSelectQuestion(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <div className="mt-6 space-y-2 text-sm">
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-500"/> Answered</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-red-500"/> Not Answered</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-yellow-500"/> Marked for Review</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-muted border"/> Not Visited</div>
      </div>
    </div>
  );
}
