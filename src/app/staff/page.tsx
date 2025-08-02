'use client';

import { MainLayout } from '@/components/layout/main-layout';
import TicketList from '@/components/tickets/ticket-list';

export default function StaffDashboardPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Staff Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome, Staff Member. Here are the tickets assigned to you.
          </p>
        </div>
        <TicketList />
      </div>
    </MainLayout>
  );
}
