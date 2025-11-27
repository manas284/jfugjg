import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TestAttempt, Test } from '@/lib/types';

interface AnswerAnalysisProps {
  attempt: TestAttempt;
  test: Test;
}

export function AnswerAnalysis({ attempt, test }: AnswerAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Answer Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {test.questions.map((question, index) => {
            const userAnswer = attempt.answers.find(a => a.questionId === question.id);
            const isCorrect = userAnswer?.selectedAnswer === question.correctAnswer;
            const isSkipped = userAnswer?.selectedAnswer === -1 || !userAnswer;

            let StatusIcon;
            let statusColor;
            if (isSkipped) {
              StatusIcon = AlertCircle;
              statusColor = "text-yellow-500";
            } else if (isCorrect) {
              StatusIcon = CheckCircle2;
              statusColor = "text-green-500";
            } else {
              StatusIcon = XCircle;
              statusColor = "text-red-500";
            }

            return (
              <AccordionItem value={`item-${index}`} key={question.id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-4 text-left">
                    <StatusIcon className={cn("h-5 w-5 flex-shrink-0", statusColor)} />
                    <span>Question {index + 1}: {question.text}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className={cn(
                        "rounded-md p-3 text-sm",
                        isSkipped ? "bg-yellow-100 dark:bg-yellow-900/50" : (isCorrect ? "bg-green-100 dark:bg-green-900/50" : "bg-red-100 dark:bg-red-900/50")
                      )}>
                      <p className="font-semibold">Your Answer:</p>
                      <p>{isSkipped ? 'Skipped' : question.options[userAnswer.selectedAnswer]}</p>
                    </div>
                    <div className="rounded-md p-3 text-sm bg-green-100 dark:bg-green-900/50">
                      <p className="font-semibold">Correct Answer:</p>
                      <p>{question.options[question.correctAnswer]}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">Explanation:</p>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
