
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MessageSquare, ThumbsUp, GitBranch } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const forumThreads = [
  { id: 1, title: "Best resources for modern history?", category: "GS-I", replies: 28, upvotes: 15, author: "Aarav Sharma" },
  { id: 2, title: "How to approach ethics case studies?", category: "GS-IV", replies: 15, upvotes: 22, author: "Riya Singh" },
  { id: 3, title: "Doubts about latest monetary policy changes.", category: "GS-III", replies: 42, upvotes: 30, author: "Kavya Reddy" },
  { id: 4, title: "Is sociology a good optional for science background?", category: "Optional", replies: 55, upvotes: 45, author: "Vikram Chauhan" },
  { id: 5, title: "Tips for time management in Prelims.", category: "Exam Strategy", replies: 33, upvotes: 18, author: "Priya Patel" },
];

export default function ForumPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discussion Forum</h1>
          <p className="text-muted-foreground">Ask questions and share knowledge with the community.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Start a New Discussion
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          {forumThreads.map(thread => (
            <Link href="#" key={thread.id} className="block hover:bg-muted/50 p-4 rounded-lg border -mb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <Badge variant="outline" className="mb-2">{thread.category}</Badge>
                        <h3 className="font-semibold text-lg">{thread.title}</h3>
                        <p className="text-sm text-muted-foreground">by {thread.author}</p>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{thread.upvotes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{thread.replies}</span>
                        </div>
                    </div>
                </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
