import { MainLayout } from '@/components/layout/main-layout';
import { mockTickets } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TicketStatusBadge } from '@/components/tickets/ticket-status-badge';
import { TicketConversation } from '@/components/tickets/ticket-conversation';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Clock, Tag, User } from 'lucide-react';

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = mockTickets.find(t => t.id === params.id);

  if (!ticket) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Card>
            <CardHeader>
              <p className="text-sm text-muted-foreground">Ticket #{ticket.id}</p>
              <CardTitle className="font-headline text-3xl">
                {ticket.subject}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>{ticket.description}</p>
              </div>
            </CardContent>
          </Card>

          <TicketConversation />
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <TicketStatusBadge status={ticket.status} />
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <User className="mt-1 size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created by</p>
                    <p className="font-medium">{ticket.author.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Tag className="mt-1 size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{ticket.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">
                      {format(new Date(ticket.lastUpdated), 'PPP')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
