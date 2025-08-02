export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: TicketStatus;
  lastUpdated: string; // ISO date string
  replies: number;
  author: {
    name: string;
    avatarUrl: string;
  };
};
