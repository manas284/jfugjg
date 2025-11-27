import { ScoreSummary } from '@/components/results/score-summary';
import { SubjectBreakdown } from '@/components/results/subject-breakdown';
import { AnswerAnalysis } from '@/components/results/answer-analysis';
import { Achievements } from '@/components/results/achievements';
import { MOCK_TEST_ATTEMPTS, MOCK_TESTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResultsPage({ params }: { params: { id: string } }) {
  const attempt = MOCK_TEST_ATTEMPTS.find((a) => a.testId === params.id); // Simple find for mock
  const test = MOCK_TESTS.find((t) => t.id === params.id);

  if (!attempt || !test) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/tests" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tests
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Results for {test.title}</h1>
          <p className="text-muted-foreground">Here's how you performed.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button>
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ScoreSummary attempt={attempt} />
        </div>
        <div className="lg:col-span-2">
          <SubjectBreakdown attempt={attempt} />
        </div>
      </div>
      
      <Achievements />
      
      <AnswerAnalysis attempt={attempt} test={test} />
    </div>
  );
}
