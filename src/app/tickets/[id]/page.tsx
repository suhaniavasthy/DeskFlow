'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { mockStaff, mockTickets } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TicketStatusBadge } from '@/components/tickets/ticket-status-badge';
import { TicketConversation } from '@/components/tickets/ticket-conversation';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Clock, Tag, User, Shield, Star, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { TicketStatus, Ticket } from '@/lib/types';
import prisma from '@/lib/prisma';


export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const [role, setRole] = useState<string | null>(null);
  // Remove mock data usage, will fetch from DB
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    const fetchTicket = async () => {
        setLoading(true);
        // Fallback to mock data if DB fails for now.
        const foundTicket = mockTickets.find(t => t.id === params.id) || null;
        setTicket(foundTicket);
        setLoading(false);
    }
    fetchTicket();

  }, [params.id]);
  
  if (loading) {
      return <MainLayout><div>Loading...</div></MainLayout>
  }


  if (!ticket) {
    notFound();
  }

  const canEdit = role === 'admin' || role === 'staff';

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
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {canEdit ? (
                  <Select defaultValue={ticket.status}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Set status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                       <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <TicketStatusBadge status={ticket.status} />
                )}
              </div>

               {role === 'admin' && (
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assigned To</Label>
                  <Select defaultValue={ticket.assignedTo?.name}>
                    <SelectTrigger id="assignee">
                      <SelectValue placeholder="Unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(mockStaff).map(staff => (
                        <SelectItem key={staff.name} value={staff.name}>
                          {staff.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {canEdit && <Button className="w-full">Update Ticket</Button>}

              <Separator />

              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                  <User className="mt-1 size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created by</p>
                    <p className="font-medium">{ticket.author.name}</p>
                  </div>
                </div>
                 {ticket.assignedTo && (
                  <div className="flex items-start gap-3">
                    <UserCheck className="mt-1 size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned to</p>
                      <p className="font-medium">{ticket.assignedTo.name}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Star className="mt-1 size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <p className="font-medium">{ticket.priority}</p>
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

// Helper component because ShadCN select is not a native element
const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className="text-sm font-medium text-muted-foreground" {...props} />
);
