'use client';

import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Logo } from '../icons/logo';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isUserLoading && !user && pathname !== '/login') {
      router.push('/login');
    }
    if (!isUserLoading && user && pathname === '/login') {
      router.push('/');
    }
  }, [user, isUserLoading, router, pathname]);

  if (isUserLoading || (!user && pathname !== '/login')) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Logo className="h-12 animate-pulse" />
      </div>
    );
  }

  return <>{children}</>;
}
