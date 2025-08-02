'use client'; // This directive makes the component run on the client side (Next.js)

import { MainLayout } from '@/components/layout/main-layout'; // App layout wrapper
import { mockStaff, mockTickets } from '@/lib/mock-data'; // Mock data for fallback
import { notFound } from 'next/navigation'; // For rendering a 404 page
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // UI card components
import { TicketStatusBadge } from '@/components/tickets/ticket-status-badge'; // Display badge for status
import { TicketConversation } from '@/components/tickets/ticket-conversation'; // Chat/comment thread for ticket
import { Separator } from '@/components/ui/separator'; // UI divider
import { format } from 'date-fns'; // Date formatting utility
import { Clock, Tag, User, Shield, Star, UserCheck } from 'lucide-react'; // Icons
import { useEffect, useState } from 'react'; // React hooks
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Custom select components
import { Button } from '@/components/ui/button'; // UI button
import type { TicketStatus, Ticket } from '@/lib/types'; // TypeScript types
import prisma from '@/lib/prisma'; // Placeholder import (not used yet)

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  // Store the user's role (admin, staff, etc.)
  const [role, setRole] = useState<string | null>(null);

  // Store the ticket data
  const [ticket, setTicket] = useState<Ticket | null>(null);

  // Show loading indicator while fetching
  const [loading, setLoading] = useState(true);

  // Fetch data when the component mounts or ticket ID changes
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole); // Load user role from localStorage

    const fetchTicket = async () => {
      setLoading(true);

      // Fallback to mock data for now (simulate DB query)
      const foundTicket = mockTickets.find(t => t.id === params.id) || null;
      setTicket(foundTicket);

      setLoading(false);
    };

    fetchTicket();
  }, [params.id]);

  // Show loading screen
  if (loading) {
    return (
      <MainLayout>
        <div>Loading...</div>
      </MainLayout>
    );
  }

  // If ticket not found, render 404 page
  if (!ticket) {
    notFound();
  }

  // Allow editing if user is admin or staff
  const canEdit = role === 'admin' || role === 'staff';

  return (
    <MainLayout>
      {/* Grid layout: two-thirds for content, one-third for metadata */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT SECTION: Ticket content and conversation */}
        <div className="space-y-8 lg:col-span-2">
          {/* Ticket subject and description */}
          <Card>
            <CardHeader>
              <p className="text-sm text-muted-foreground">Ticket #{ticket.id}</p>
              <CardTitle className="font-headline text-3xl">{ticket.subject}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>{ticket.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Chat or comment thread for the ticket */}
          <TicketConversation />
        </div>

        {/* RIGHT SECTION: Ticket metadata and admin controls */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* STATUS CONTROL */}
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

              {/* ASSIGNEE CONTROL (admin only) */}
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

              {/* Update Button (not wired to logic yet) */}
              {canEdit && <Button className="w-full">Update Ticket</Button>}

              <Separator /> {/* Divider */}

              {/* STATIC METADATA */}
              <div className="space-y-4">
                {/* Author */}
                <div className="flex items-start gap-3">
                  <User className="mt-1 size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created by</p>
                    <p className="font-medium">{ticket.author.name}</p>
                  </div>
                </div>

                {/* Assignee */}
                {ticket.assignedTo && (
                  <div className="flex items-start gap-3">
                    <UserCheck className="mt-1 size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned to</p>
                      <p className="font-medium">{ticket.assignedTo.name}</p>
                    </div>
                  </div>
                )}

                {/* Priority */}
                <div className="flex items-start gap-3">
                  <Star className="mt-1 size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <p className="font-medium">{ticket.priority}</p>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-start gap-3">
                  <Tag className="mt-1 size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{ticket.category}</p>
                  </div>
                </div>

                {/* Last Updated Date */}
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

// Helper label component used for consistency with ShadCN UI
const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className="text-sm font-medium text-muted-foreground" {...props} />
);

