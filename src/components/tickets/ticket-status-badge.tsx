// Import Badge component and utility functions
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils'; // Utility to conditionally join classNames
import type { TicketStatus } from '@/lib/types'; // Define the type of 'status'

// Props type for the component
type TicketStatusBadgeProps = {
  status: TicketStatus; // Must be one of: 'Open', 'In Progress', 'Resolved', 'Closed'
};

// Functional component to display the ticket's status visually as a badge
export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  return (
    // Badge component from UI library with conditional styling
    <Badge
      className={cn(
        'border-transparent', // Always remove border
        {
          // Conditional classes based on ticket status
          'bg-destructive/20 text-destructive-foreground-darker hover:bg-destructive/30':
            status === 'Open', // Red background for 'Open'
          'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30':
            status === 'In Progress', // Blue for 'In Progress'
          'bg-accent/80 text-accent-foreground hover:bg-accent':
            status === 'Resolved', // Accent for 'Resolved'
          'bg-muted text-muted-foreground':
            status === 'Closed', // Greyed out for 'Closed'
        }
      )}
      variant="outline" // Use outlined variant of badge
    >
      {/* Custom CSS class for darker red (fallback for light/dark themes) */}
      <style>{`
        .text-destructive-foreground-darker { color: hsl(var(--destructive)); }
        .dark .text-destructive-foreground-darker { color: hsl(var(--destructive)); }
      `}</style>

      {/* Badge content layout with status dot and label */}
      <div className="flex items-center gap-1.5">
        <span
          // Dot color is also based on ticket status
          className={cn('h-2 w-2 rounded-full', {
            'bg-destructive': status === 'Open', // Red dot
            'bg-blue-500': status === 'In Progress', // Blue dot
            'bg-green-500': status === 'Resolved', // Green dot
            'bg-muted-foreground': status === 'Closed', // Grey dot
          })}
        ></span>
        {/* Display the actual status text */}
        {status}
      </div>
    </Badge>
  );
}
