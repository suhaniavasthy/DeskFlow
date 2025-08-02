import { MainLayout } from '@/components/layout/main-layout';
import TicketList from '@/components/tickets/ticket-list';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            My Tickets
          </h1>
          <p className="text-muted-foreground">
            Here's a list of your support tickets.
          </p>
        </div>
        <TicketList />
      </div>
    </MainLayout>
  );
}
