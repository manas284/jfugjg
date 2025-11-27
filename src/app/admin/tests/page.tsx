'use client';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Copy,
  MoreHorizontal,
  FilePenLine,
  GanttChartSquare,
  BarChart3,
  Archive,
  RotateCcw,
  EyeOff,
} from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Test } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminTestsPage() {
  const firestore = useFirestore();
  const testsQuery = useMemoFirebase(
    () =>
      firestore ? query(collection(firestore, 'tests'), orderBy('title')) : null,
    [firestore]
  );
  const { data: tests, isLoading } = useCollection<Test>(testsQuery);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage all practice tests.
          </p>
        </div>
        <Button>Create New Test</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Tests</CardTitle>
          <CardDescription>
            A list of all tests available on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Title</TableHead>
                <TableHead>Exam Type</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))}
              {tests?.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{test.examType}</Badge>
                  </TableCell>
                  <TableCell>{test.difficulty}</TableCell>
                  <TableCell>{test.totalQuestions}</TableCell>
                  <TableCell>
                    <Badge variant="success">Published</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <FilePenLine className="mr-2 h-4 w-4" />
                          Edit Test
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <GanttChartSquare className="mr-2 h-4 w-4" />
                          Manage Questions
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Stats
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                         <DropdownMenuItem>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reset Stats
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Unpublish
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
