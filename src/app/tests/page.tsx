'use client';

import { useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { FilterControls } from '@/components/tests/filter-controls';
import { TestCard } from '@/components/tests/test-card';
import type { Test } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function TestsPage() {
  const firestore = useFirestore();

  const testsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'tests'), orderBy('title')) : null),
    [firestore]
  );
  
  const { data: tests, isLoading } = useCollection<Test>(testsQuery);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Practice Tests Library
        </h1>
        <p className="text-muted-foreground">
          Find the perfect test to sharpen your skills.
        </p>
      </div>
      <FilterControls />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        {tests?.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
}
