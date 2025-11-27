'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, BookCopy, BarChart3, Wallet } from "lucide-react"
import { useCollection, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, doc } from 'firebase/firestore';
import type { Test } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface UserCount {
  count: number;
}

export default function AdminDashboardPage() {
  const firestore = useFirestore();
  
  const userCountRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'metadata', 'userCount') : null),
    [firestore]
  );
  const { data: userCountDoc, isLoading: usersLoading } = useDoc<UserCount>(userCountRef);

  const testsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'tests')) : null),
    [firestore]
  );
  const { data: tests, isLoading: testsLoading } = useCollection<Test>(testsQuery);

  const isLoading = usersLoading || testsLoading;
  const totalUsers = userCountDoc?.count || 0;

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of the Testo platform.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">{totalUsers}</div>
            )}
            <p className="text-xs text-muted-foreground">Registered users on the platform.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{tests?.length || 0}</div>
            )}
             <p className="text-xs text-muted-foreground">Total tests available.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Test Completions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,25,430</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,482</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
      </div>
      
       {/* Placeholder for more charts and recent activity */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart placeholder
               </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Activity feed placeholder
               </div>
            </CardContent>
          </Card>
      </div>

    </div>
  )
}
