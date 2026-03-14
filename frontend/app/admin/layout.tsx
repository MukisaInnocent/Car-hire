import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | At Your Door Car Hiring Services',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
