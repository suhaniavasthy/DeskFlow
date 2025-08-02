import type { Ticket } from './types';

export const mockTickets: Ticket[] = [
  {
    id: 'TICKET-8782',
    subject: 'Unable to connect to the new database instance',
    description:
      'We are trying to connect to the newly provisioned PostgreSQL database but are getting a connection timeout error. The security groups seem to be configured correctly, and the instance is running. We have tried connecting from multiple clients.',
    category: 'Technical Support',
    status: 'Open',
    lastUpdated: '2024-07-20T10:00:00Z',
    replies: 0,
    author: {
      name: 'Alex Johnson',
      avatarUrl: 'https://placehold.co/40x40',
    },
  },
  {
    id: 'TICKET-8783',
    subject: 'Question about the latest invoice',
    description:
      'I have a question about a charge on our latest invoice (INV-2024-07-001). There is a line item for "Data Processing Overage" that I would like more information about. Can you provide a breakdown of this charge?',
    category: 'Billing Issue',
    status: 'In Progress',
    lastUpdated: '2024-07-20T14:30:00Z',
    replies: 2,
    author: {
      name: 'Maria Garcia',
      avatarUrl: 'https://placehold.co/40x40',
    },
  },
  {
    id: 'TICKET-8784',
    subject: 'Feature request: Dark mode for the dashboard',
    description:
      'Our team often works late hours, and a dark mode for the main dashboard would be much easier on the eyes. This has become a standard feature in many applications, and we would love to see it implemented here.',
    category: 'General Inquiry',
    status: 'Resolved',
    lastUpdated: '2024-07-19T09:00:00Z',
    replies: 5,
    author: {
      name: 'Chen Wei',
      avatarUrl: 'https://placehold.co/40x40',
    },
  },
  {
    id: 'TICKET-8785',
    subject: 'API integration failing with 401 error',
    description:
      'Our custom API integration has started failing with a 401 Unauthorized error since yesterday. We have double-checked our API keys, and they appear to be correct. No changes were made on our end. Did anything change with the API authentication?',
    category: 'Technical Support',
    status: 'Closed',
    lastUpdated: '2024-07-18T17:45:00Z',
    replies: 3,
    author: {
      name: 'Samantha Miller',
      avatarUrl: 'https://placehold.co/40x40',
    },
  },
  {
    id: 'TICKET-8786',
    subject: 'Password reset link is not working',
    description:
      "I requested a password reset, but when I click the link in the email, it takes me to a page that says 'Invalid or expired token'. I have tried this multiple times. I am unable to access my account.",
    category: 'Technical Support',
    status: 'Open',
    lastUpdated: '2024-07-21T08:20:00Z',
    replies: 1,
    author: {
      name: 'David Lee',
      avatarUrl: 'https://placehold.co/40x40',
    },
  },
];
