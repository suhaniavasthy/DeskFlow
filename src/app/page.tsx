// Import the main layout component to wrap the page
import { MainLayout } from '@/components/layout/main-layout';

// Import the TicketList component to display user's tickets
import TicketList from '@/components/tickets/ticket-list';

// This component renders the user dashboard showing their support tickets
export default function DashboardPage() {
  return (
    // Wrap content with consistent layout styling
    <MainLayout>
      {/* Container for the page content with vertical spacing */}
      <div className="flex flex-col gap-8">
        
        {/* Header section with title and description */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            My Tickets
          </h1>
          <p className="text-muted-foreground">
            Here's a list of your support tickets.
          </p>
        </div>

        {/* Ticket list component to show all submitted tickets */}
        <TicketList />
      </div>
    </MainLayout>
  );
}
