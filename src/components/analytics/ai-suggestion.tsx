'use client';
import { useState, useTransition } from 'react';
import { getAIPersonalization, PerformanceData, AIPersonalizationOutput } from '@/ai/flows/ai-powered-test-suggestion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_TEST_ATTEMPTS, MOCK_TESTS } from '@/lib/data';
import { Sparkles, Lightbulb, TrendingUp, Target, BrainCircuit, CheckCircle, BarChart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function AiSuggestion() {
  const [isPending, startTransition] = useTransition();
  const [insights, setInsights] = useState<AIPersonalizationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetInsights = () => {
    startTransition(async () => {
      setError(null);
      setInsights(null);
      
      try {
        const performanceData: PerformanceData = {
          examType: 'UPSC',
          overallAccuracy: 82,
          learningPace: 15,
          testHistory: MOCK_TEST_ATTEMPTS.map(attempt => {
            const test = MOCK_TESTS.find(t => t.id === attempt.testId);
            return {
              testName: test?.title || 'Unknown Test',
              score: attempt.score,
              categoryPerformances: Object.entries(attempt.subjectWisePerformance).reduce((acc, [key, value]) => {
                acc[key] = value.score;
                return acc;
              }, {} as Record<string, number>),
            };
          }),
        };
        const result = await getAIPersonalization(performanceData);
        setInsights(result);
      } catch (e) {
        console.error(e);
        setError('Failed to get AI insights. Please try again later.');
        setInsights(null);
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary h-5 w-5" />
            AI Personalization Engine
          </CardTitle>
          <CardDescription>
            Your customized learning path, powered by AI.
          </CardDescription>
        </div>
        <Button onClick={handleGetInsights} disabled={isPending}>
           {isPending && !insights ? 'Analyzing...' : 'Generate My Learning Path'}
        </Button>
      </CardHeader>
      
      {(isPending || insights || error) && (
        <CardContent>
          {isPending && !insights && (
            <div className="space-y-4 pt-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          )}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {insights && (
            <div className="space-y-6 pt-4">
                {/* AI Insights Section */}
                <div className="p-4 border rounded-lg bg-muted/50">
                    <h3 className="font-semibold flex items-center mb-4"><BrainCircuit className="mr-2"/> AI Insights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Your Profile</p>
                            <p className="font-bold text-lg">{insights.learnerPersona}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Overall Accuracy</p>
                            <p className="font-bold text-lg">82% <span className="text-xs text-green-500">(Top 15%)</span></p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">Learning Pace</p>
                            <p className="font-bold text-lg">15% <span className="text-xs">Faster than peers</span></p>
                        </div>
                    </div>
                </div>

                {/* Recommended for you */}
                <div>
                  <h3 className="font-semibold flex items-center mb-2"><Lightbulb className="mr-2"/> Recommended for You</h3>
                  <div className="space-y-3">
                    {insights.recommendations.map((rec, index) => (
                      <Alert key={index}>
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>{rec.title}</AlertTitle>
                        <AlertDescription>
                          <p><b>Why:</b> {rec.reason}</p>
                          <p className="text-xs text-muted-foreground mt-1"><i>{rec.status}</i></p>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* AI Prediction */}
                <div className="p-4 border rounded-lg bg-muted/50">
                     <h3 className="font-semibold flex items-center mb-4"><BarChart className="mr-2"/> AI Prediction</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                         <div>
                            <p className="text-sm text-muted-foreground">Next Test Score</p>
                            <p className="font-bold text-lg">{insights.prediction.nextScore}</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">Likelihood to Pass</p>
                            <p className="font-bold text-lg text-green-500">{insights.prediction.passLikelihood}</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">With Focused Practice</p>
                            <p className="font-bold text-lg text-primary">{insights.prediction.conditionalImprovement.match(/\d+%/)?.[0]}</p>
                        </div>
                     </div>
                     <p className="text-center text-xs text-muted-foreground mt-2"><i>{insights.prediction.conditionalImprovement}</i></p>
                </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
