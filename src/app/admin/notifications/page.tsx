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
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, PlusCircle, Send, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

const campaigns = [
    { id: '1', name: 'Welcome Series', type: 'Email', status: 'Active', recipients: 10234, sent: 'Recurring' },
    { id: '2', name: 'UPSC Test Reminder', type: 'SMS', status: 'Sent', recipients: 2500, sent: '2023-10-25' },
    { id: '3', name: 'Black Friday Offer', type: 'Email + SMS', status: 'Draft', recipients: 0, sent: 'N/A' },
    { id: '4', name: 'Achievement Badge', type: 'Email', status: 'Sent', recipients: 500, sent: '2023-10-22' },
    { id: '5', name: 'New Course Announcement', type: 'Email', status: 'Scheduled', recipients: 12000, sent: '2023-11-01' },
]

const statusVariant : {[key: string]: "default" | "secondary" | "destructive" | "outline" | "success"} = {
    'Active': 'success',
    'Sent': 'default',
    'Draft': 'secondary',
    'Scheduled': 'outline'
}

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Bulk Notification System</h1>
            <p className="text-muted-foreground">Create and manage communication campaigns for your users.</p>
        </div>
        <Link href="/admin/notifications/new" passHref>
          <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Campaign
          </Button>
        </Link>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
             <p className="text-xs text-muted-foreground">Next one in 2 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered this Month</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,45,320</div>
            <p className="text-xs text-muted-foreground">75k Emails, 70k SMS</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed/Bounced</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">245</div>
            <p className="text-xs text-muted-foreground">0.17% failure rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
          <CardDescription>
            A list of all past, present, and future campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Sent/Scheduled Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map(campaign => (
                <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                       {campaign.type.includes('Email') && <Badge variant="outline">Email</Badge>}
                       {campaign.type.includes('SMS') && <Badge variant="outline" className="ml-1">SMS</Badge>}
                    </TableCell>
                    <TableCell>
                        <Badge variant={statusVariant[campaign.status]}>{campaign.status}</Badge>
                    </TableCell>
                    <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                    <TableCell>{campaign.sent}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Clone</DropdownMenuItem>
                                <DropdownMenuItem>Pause</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
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
  )
}
