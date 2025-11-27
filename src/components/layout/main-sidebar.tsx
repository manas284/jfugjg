'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import {
  LayoutDashboard,
  BookCopy,
  BarChart3,
  Settings,
  HelpCircle,
  Users,
  MessageSquare,
  Trophy,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tests', label: 'Practice Tests', icon: BookCopy },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/forum', label: 'Discussion', icon: MessageSquare },
];

// Mock admin check - in a real app, this would come from user roles in the database
const ADMIN_EMAILS = ['priya.p@example.com', 'admin@examhub.com', 'manastiwari625@gmail.com', 'manastiwari884@gmail.com'];

export function MainSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const isAdmin = user && ADMIN_EMAILS.includes(user.email || '');

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          {isAdmin && (
            <SidebarMenuItem>
              <Link href="/admin">
                <SidebarMenuButton tooltip="Admin" isActive={pathname.startsWith('/admin')}>
                    <Shield />
                    <span>Admin Panel</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <Link href="/settings">
              <SidebarMenuButton tooltip="Settings" isActive={pathname === '/settings'}>
                  <Settings />
                  <span>Settings</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
              <SidebarMenuButton tooltip="Help">
                  <HelpCircle />
                  <span>Help</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
