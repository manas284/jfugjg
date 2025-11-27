import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MOCK_TEST_ATTEMPTS, MOCK_TESTS } from '@/lib/data';
import { Badge } from '../ui/badge';
import { ExternalLink } from 'lucide-react';

export function TestHistoryTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test History</CardTitle>
        <CardDescription>A complete record of all your test attempts.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Name</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead className="text-center">Accuracy</TableHead>
              <TableHead className="hidden md:table-cell text-center">Percentile</TableHead>
              <TableHead className="hidden md:table-cell text-center">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_TEST_ATTEMPTS.map((attempt) => {
              const test = MOCK_TESTS.find((t) => t.id === attempt.testId);
              return (
                <TableRow key={attempt.id}>
                  <TableCell>
                    <div className="font-medium">{test?.title}</div>
                    <Badge variant="outline" className="mt-1">{test?.examType}</Badge>
                  </TableCell>
                  <TableCell className="text-center font-semibold">{attempt.score}%</TableCell>
                  <TableCell className="text-center">{attempt.accuracy}%</TableCell>
                  <TableCell className="hidden md:table-cell text-center">{attempt.percentile}th</TableCell>
                  <TableCell className="hidden md:table-cell text-center">{new Date(attempt.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/results/${attempt.id}`} passHref>
                      <Button variant="outline" size="sm">
                        View Results
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
