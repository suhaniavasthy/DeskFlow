'use client';

import { useState } from 'react';
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
import { mockTickets } from '@/lib/mock-data';
import { TicketStatusBadge } from './ticket-status-badge';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function TicketList() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredTickets = mockTickets.filter(
    ticket =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center justify-between gap-4">
        <TabsList>
          <TabsTrigger value="all">All Tickets</TabsTrigger>
          <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <Link href="/tickets/new">
            <Button className="hidden sm:flex">
              <PlusCircle className="mr-2 size-4" />
              New Ticket
            </Button>
            <Button size="icon" className="sm:hidden">
              <PlusCircle className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent value="all" className="mt-4">
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
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
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
                    <TableCell>
                      <TicketStatusBadge status={ticket.status} />
                    </TableCell>
                    <TableCell>{ticket.category}</TableCell>
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
      </TabsContent>
      <TabsContent value="my-tickets">
        <div className="rounded-lg bg-card p-6 shadow-sm">
          <p className="text-center text-muted-foreground">
            My Tickets will be shown here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
