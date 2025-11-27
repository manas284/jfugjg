import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from "lucide-react"

const auditLogs = [
    { id: '1', admin: 'Priya Patel', action: 'Created Test', target: 'UPSC Mock Test 3', status: 'Success', ip: '192.168.1.1', date: '2023-10-26 10:00 AM' },
    { id: '2', admin: 'manastiwari625@gmail.com', action: 'Banned User', target: 'Karan Singh', status: 'Success', ip: '203.0.113.25', date: '2023-10-26 09:45 AM' },
    { id: '3', admin: 'Priya Patel', action: 'Updated Question', target: 'Question #1024', status: 'Success', ip: '192.168.1.1', date: '2023-10-25 03:20 PM' },
    { id: '4', admin: 'manastiwari884@gmail.com', action: 'Failed Login', target: 'N/A', status: 'Failure', ip: '198.51.100.2', date: '2023-10-25 09:00 AM' },
    { id: '5', admin: 'Priya Patel', action: 'Processed Refund', target: 'Transaction #5542', status: 'Success', ip: '192.168.1.1', date: '2023-10-24 05:00 PM' },
]

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
            <p className="text-muted-foreground">Track all administrator activities across the platform.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
           <CardTitle>Activity History</CardTitle>
           <CardDescription>A complete log of all actions performed by admins.</CardDescription>
           <div className="flex flex-col gap-4 md:flex-row pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by target (e.g., user, test)..." className="pl-10" />
              </div>
              <div className="flex gap-4">
                <Select defaultValue="all-admins">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by admin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-admins">All Admins</SelectItem>
                    <SelectItem value="priya.p@example.com">Priya Patel</SelectItem>
                    <SelectItem value="manastiwari625@gmail.com">manastiwari625@gmail.com</SelectItem>
                     <SelectItem value="manastiwari884@gmail.com">manastiwari884@gmail.com</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-actions">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-actions">All Actions</SelectItem>
                    <SelectItem value="create">Create</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                     <SelectItem value="ban">Ban</SelectItem>
                  </SelectContent>
                </Select>
                 <Input type="date" className="w-full md:w-[180px]" />
              </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map(log => (
                <TableRow key={log.id}>
                    <TableCell>
                        <div className="font-medium">{log.admin}</div>
                    </TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{log.target}</Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant={log.status === 'Success' ? 'success' : 'destructive'}>{log.status}</Badge>
                    </TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell>{log.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
