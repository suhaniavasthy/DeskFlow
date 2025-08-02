import { MainLayout } from '@/components/layout/main-layout';
import NewTicketForm from '@/components/tickets/new-ticket-form';

export default function NewTicketPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Create a New Ticket
          </h1>
          <p className="text-muted-foreground">
            Fill out the form below to submit a new support request.
          </p>
        </div>
        <NewTicketForm />
      </div>
    </MainLayout>
  );
}
