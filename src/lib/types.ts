export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: TicketStatus;
  priority: TicketPriority;
  lastUpdated: string; // ISO date string
  replies: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  assignedTo?: {
    name: string;
    avatarUrl: string;
  };
};
