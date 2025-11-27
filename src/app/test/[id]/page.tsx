'use client';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDoc, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Test, Question, QuestionStatus } from '@/lib/types';
import { TestHeader } from '@/components/test-interface/test-header';
import { QuestionPalette } from '@/components/test-interface/question-palette';
import { TestSidebar } from '@/components/test-interface/test-sidebar';
import { TestControls } from '@/components/test-interface/test-controls';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { doc, collection, query, orderBy } from 'firebase/firestore';

type Answer = {
  questionId: number;
  selectedOption: number;
};

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const firestore = useFirestore();
  const testId = params.id as string;

  const testRef = useMemoFirebase(() => (firestore && testId ? doc(firestore, 'tests', testId) : null), [firestore, testId]);
  const { data: testData, isLoading: isTestLoading } = useDoc<Test>(testRef);

  const questionsQuery = useMemoFirebase(() => (
    firestore && testId ? query(collection(firestore, 'tests', testId, 'questions'), orderBy('id')) : null
  ), [firestore, testId]);

  const { data: questionsData, isLoading: areQuestionsLoading } = useCollection<Question>(questionsQuery);
  
  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [questionStatuses, setQuestionStatuses] = useState<Record<number, QuestionStatus>>({});
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (testData && questionsData) {
      const fullTest: Test = { ...testData, questions: questionsData };
      setTest(fullTest);
      setTimeLeft(fullTest.duration * 60);
      const initialStatuses: Record<number, QuestionStatus> = {};
      fullTest.questions.forEach((q) => {
        initialStatuses[q.id] = 'notVisited';
      });
      if (fullTest.questions.length > 0) {
        initialStatuses[fullTest.questions[0].id] = 'notAnswered';
      }
      setQuestionStatuses(initialStatuses);
    } else if (!isTestLoading && !areQuestionsLoading) {
      // router.push('/tests');
    }
  }, [testData, questionsData, isTestLoading, areQuestionsLoading, router]);

  const currentQuestion: Question | undefined = test?.questions[currentQuestionIndex];

  const updateStatus = (questionId: number, newStatus: QuestionStatus) => {
    setQuestionStatuses((prev) => ({ ...prev, [questionId]: newStatus }));
  };
  
  const handleSelectQuestion = (index: number) => {
    if (test && test.questions[index] && questionStatuses[test!.questions[index].id] === 'notVisited') {
      updateStatus(test!.questions[index].id, 'notAnswered');
    }
    setCurrentQuestionIndex(index);
  };

  const handleOptionChange = (optionIndex: number) => {
    if (currentQuestion) {
      setAnswers((prev) => ({ ...prev, [currentQuestion!.id]: optionIndex }));
      updateStatus(currentQuestion!.id, 'answered');
    }
  };

  const handleMarkForReview = () => {
    if (currentQuestion && questionStatuses[currentQuestion!.id] !== 'answered') {
      updateStatus(currentQuestion!.id, 'marked');
    }
    handleNext();
  };
  
  const handleNext = () => {
    if (test && currentQuestionIndex < test!.questions.length - 1) {
      handleSelectQuestion(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      handleSelectQuestion(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmitTest = () => {
    // In a real app, you would process answers and navigate to a dynamic results page.
    router.push(`/results/${test?.id}`);
  };

  if (isTestLoading || areQuestionsLoading || !test || !currentQuestion) {
    return <div>Loading...</div>;
  }
  
  const answeredCount = Object.values(questionStatuses).filter(s => s === 'answered').length;

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      <TestHeader testTitle={test.title} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/5 border-r overflow-y-auto p-4 hidden lg:block">
          <QuestionPalette
            questions={test.questions}
            statuses={questionStatuses}
            onSelectQuestion={handleSelectQuestion}
            currentQuestionId={currentQuestion.id}
          />
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Question {currentQuestionIndex + 1} of {test.totalQuestions}</p>
              <h2 className="text-lg font-semibold mb-6">{currentQuestion.text}</h2>
              <RadioGroup
                onValueChange={(value) => handleOptionChange(parseInt(value))}
                value={answers[currentQuestion.id]?.toString()}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 border rounded-md p-3 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 text-base cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
          <TestControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            onMarkForReview={handleMarkForReview}
            isFirst={currentQuestionIndex === 0}
            isLast={test.questions ? currentQuestionIndex === test.questions.length - 1 : true}
          />
        </main>
        <div className="w-1/4 border-l p-4 hidden md:block">
          <TestSidebar
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            answeredCount={answeredCount}
            notAnsweredCount={Object.values(questionStatuses).filter(s => s === 'notAnswered' || s === 'notVisited').length}
            markedCount={Object.values(questionStatuses).filter(s => s === 'marked').length}
            totalQuestions={test.questions?.length || 0}
            onSubmit={handleSubmitTest}
          />
        </div>
      </div>
    </div>
  );
}
