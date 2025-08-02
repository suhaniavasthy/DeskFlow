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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

export default function TicketList() {
  const [role, setRole] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role') || 'user';
    setRole(storedRole);

    let displayTickets = mockTickets;
    if (storedRole === 'user') {
      // A real app would get the current user's ID
      // For this mock, let's assume the user is Alex Johnson
      displayTickets = mockTickets.filter(
        t => t.author.name === mockUsers.alex.name
      );
    } else if (storedRole === 'staff') {
      // A real app would get the current staff member's ID
      // For this mock, let's assume the staff is Jane Doe
      displayTickets = mockTickets.filter(
        t => t.assignedTo?.name === mockStaff.jane.name
      );
    }
    setTickets(displayTickets);
  }, []);

  const filteredTickets = tickets.filter(
    ticket =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAdmin = role === 'admin';

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
          {!isAdmin && (
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
    </div>
  );
}
