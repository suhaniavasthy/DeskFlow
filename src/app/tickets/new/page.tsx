// Import the main layout wrapper for consistent page structure
import { MainLayout } from '@/components/layout/main-layout';

// Import the form component used to create a new support ticket
import NewTicketForm from '@/components/tickets/new-ticket-form';

// This page renders the "Create New Ticket" screen
export default function NewTicketPage() {
  return (
    // Wrap the page with the main layout component
    <MainLayout>
      {/* Center the content with a max width */}
      <div className="mx-auto max-w-5xl">
        {/* Page heading and subheading */}
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Create a New Ticket
          </h1>
          <p className="text-muted-foreground">
            Fill out the form below to submit a new support request.
          </p>
        </div>

        {/* Render the form component for submitting a new ticket */}
        <NewTicketForm />
      </div>
    </MainLayout>
  );
}
