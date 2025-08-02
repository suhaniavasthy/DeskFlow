'use client';
import { MainLayout } from '@/components/layout/main-layout';
import TicketList from '@/components/tickets/ticket-list';

export default function AdminPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            View all tickets in the system.
          </p>
        </div>

        <TicketList />
      </div>
    </MainLayout>
  );
}
