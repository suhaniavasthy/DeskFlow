'use client'; // Indicates this is a client-side component in Next.js

// Import the main layout wrapper and TicketList component
import { MainLayout } from '@/components/layout/main-layout';
import TicketList from '@/components/tickets/ticket-list';

// Staff Dashboard Page Component
export default function StaffDashboardPage() {
  return (
    // Wrap the page content inside the main layout
    <MainLayout>
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Assigned Tickets
          </h1>
          <p className="text-muted-foreground">
            These are the tickets that require your attention.
          </p>
        </div>

        {/* Ticket List Component to display assigned tickets */}
        <TicketList />
      </div>
    </MainLayout>
  );
}
