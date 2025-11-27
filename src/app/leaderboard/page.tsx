
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Crown, ArrowUp, ArrowDown } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Ananya Sharma', xp: 12500, avatar: '/avatars/01.png', trend: 'up' },
  { rank: 2, name: 'Rohan Verma', xp: 11800, avatar: '/avatars/02.png', trend: 'down' },
  { rank: 3, name: 'Priya Patel', xp: 11500, avatar: '/avatars/03.png', trend: 'up' },
  { rank: 4, name: 'Karan Singh', xp: 10200, avatar: '/avatars/04.png', trend: 'up' },
  { rank: 5, name: 'Sneha Reddy', xp: 9800, avatar: '/avatars/05.png', trend: 'down' },
  { rank: 6, name: 'Amit Kumar', xp: 9500, avatar: '/avatars/06.png', trend: 'up' },
  { rank: 128, name: 'You', xp: 4200, avatar: '/avatars/user.png', trend: 'up', isCurrentUser: true },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">See how you rank among your peers.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Global Rankings</CardTitle>
          <CardDescription>Top performers across all exams.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">XP Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user) => (
                <TableRow key={user.rank} className={user.isCurrentUser ? 'bg-primary/10' : ''}>
                  <TableCell className="font-bold text-lg">
                    <div className="flex items-center justify-center">
                        {user.rank === 1 && <Crown className="w-6 h-6 text-yellow-500 mr-2" />}
                        {user.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user.name}`} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <Badge variant={user.rank <= 3 ? 'default' : 'secondary'}>
                            {user.rank <=3 ? 'Top Contender' : 'Rising Star'}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    <div className="flex items-center justify-end gap-2">
                        {user.trend === 'up' ? <ArrowUp className="w-4 h-4 text-green-500" /> : <ArrowDown className="w-4 h-4 text-red-500" />}
                        {user.xp.toLocaleString()} XP
                    </div>
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
