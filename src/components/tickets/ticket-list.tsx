'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, ListFilter, ChevronDown, PlusCircle } from 'lucide-react';
import { mockStaff, mockTickets, mockUsers } from '@/lib/mock-data';
import { TicketStatusBadge } from './ticket-status-badge';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import type { Ticket } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import prisma from '@/lib/prisma';

async function getTicketsForRole(role: string) {
    try {
        await prisma.$connect();
        if (role === 'admin') {
            return await prisma.ticket.findMany({ include: { author: true, assignedTo: true }});
        }
        // This is a placeholder for user/staff specific logic
        // In a real app you'd filter by authorId or assignedToId
        return await prisma.ticket.findMany({ include: { author: true, assignedTo: true }});
    } catch (error) {
        console.error("Failed to connect to database", error);
        // Return mock data as a fallback if DB connection fails
        return mockTickets;
    } finally {
        await prisma.$disconnect();
    }
}


export default function TicketList() {
  const [role, setRole] = useState<string | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
        setLoading(true);
        const storedRole = localStorage.getItem('role') || 'user';
        setRole(storedRole);

        // For now, we'll just use mock data to avoid breaking the UI
        // until the database is fully integrated.
        let displayTickets: Ticket[] = [];
        if (storedRole === 'user') {
          displayTickets = mockTickets.filter(
            t => t.author.name === mockUsers.alex.name
          );
        } else if (storedRole === 'staff') {
          displayTickets = mockTickets.filter(
            t => t.assignedTo?.name === mockStaff.jane.name
          );
        } else {
            displayTickets = mockTickets;
        }
        setTickets(displayTickets);
        setLoading(false);
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(
    (ticket: Ticket) =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAdmin = role === 'admin';
  const isUser = role === 'user';
  
  if (loading) {
      return <div>Loading tickets...</div>
  }

  return (
    <div className="rounded-lg bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <ListFilter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Open</DropdownMenuItem>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Resolved</DropdownMenuItem>
              <DropdownMenuItem>Closed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isUser && (
            <Link href="/tickets/new">
              <Button className="hidden sm:flex">
                <PlusCircle className="mr-2 size-4" />
                New Ticket
              </Button>
              <Button size="icon" className="sm:hidden">
                <PlusCircle className="size-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
       {filteredTickets.length === 0 ? (
         <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed py-12 text-center">
            <p className="text-lg font-semibold">No tickets found.</p>
            <p className="text-muted-foreground">It looks like the database is connected, but no tickets have been created yet.</p>
        </div>
      ) : (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket</TableHead>
              {isAdmin && <TableHead>Author</TableHead>}
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Category</TableHead>
              {isAdmin && <TableHead>Assigned To</TableHead>}
              <TableHead className="text-right">Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map(ticket => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <Link
                    href={`/tickets/${ticket.id}`}
                    className="font-medium hover:underline"
                  >
                    {ticket.subject}
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    #{ticket.id}
                  </div>
                </TableCell>
                {isAdmin && <TableCell>{ticket.author.name}</TableCell>}
                <TableCell>
                  <TicketStatusBadge status={ticket.status} />
                </TableCell>
                 <TableCell>{ticket.priority}</TableCell>
                <TableCell>{ticket.category}</TableCell>
                 {isAdmin && (
                  <TableCell>
                    {ticket.assignedTo ? (
                       <Select defaultValue={ticket.assignedTo.name}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Unassigned" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(mockStaff).map(staff => (
                            <SelectItem key={staff.name} value={staff.name}>{staff.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : 'Unassigned'}
                  </TableCell>
                )}
                <TableCell className="text-right text-muted-foreground">
                  {formatDistanceToNow(new Date(ticket.lastUpdated), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      )}
    </div>
  );
}
