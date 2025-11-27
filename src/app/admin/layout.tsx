import type { Metadata } from 'next';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/layout/admin-sidebar';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Admin - Testo',
  description: 'Admin Panel for Testo Platform',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.variable}>
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
            <Header />
            <main className="p-4 sm:p-6 lg:p-8 bg-muted/40 min-h-screen">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
    </div>
  );
}
