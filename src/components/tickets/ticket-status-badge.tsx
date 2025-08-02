import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TicketStatus } from '@/lib/types';

type TicketStatusBadgeProps = {
  status: TicketStatus;
};

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  return (
    <Badge
      className={cn(
        'border-transparent',
        {
          'bg-destructive/20 text-destructive-foreground-darker hover:bg-destructive/30': status === 'Open',
          'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30': status === 'In Progress',
          'bg-accent/80 text-accent-foreground hover:bg-accent': status === 'Resolved',
          'bg-muted text-muted-foreground': status === 'Closed',
        }
      )}
      variant="outline"
    >
        <style>{`
          .text-destructive-foreground-darker { color: hsl(var(--destructive)); }
          .dark .text-destructive-foreground-darker { color: hsl(var(--destructive)); }
        `}</style>
      <div className="flex items-center gap-1.5">
        <span
          className={cn('h-2 w-2 rounded-full', {
            'bg-destructive': status === 'Open',
            'bg-blue-500': status === 'In Progress',
            'bg-green-500': status === 'Resolved', // Using accent for green is tricky
            'bg-muted-foreground': status === 'Closed',
          })}
        ></span>
        {status}
      </div>
    </Badge>
  );
}
