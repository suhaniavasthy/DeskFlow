'use client'; // Directive to ensure the component runs on the client side

// Import UI components and icons
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

// Static sample conversation array simulating chat messages
const conversation = [
  {
    author: { name: 'You', avatarUrl: 'https://placehold.co/40x40' },
    message:
      'My account is locked and I cannot access any of my files. I have tried resetting my password but it did not work. Please help!',
    time: '2 hours ago',
    isAgent: false, // Indicates this message is from the user
  },
  {
    author: { name: 'Jane Doe', avatarUrl: 'https://placehold.co/40x40' },
    message:
      'Hi there, I am sorry to hear you are having trouble. I have unlocked your account. Please try logging in again. Let me know if you are still having issues.',
    time: '1 hour ago',
    isAgent: true, // Indicates this message is from a support agent
  },
];

// Functional component that displays the ticket conversation thread
export function TicketConversation() {
  return (
    <div className="space-y-6">
      {/* Section Heading */}
      <h2 className="font-headline text-2xl font-bold">Conversation</h2>

      {/* Loop through each message entry and render it */}
      {conversation.map((entry, index) => (
        <div key={index} className="flex gap-4">
          {/* Avatar of the sender */}
          <Avatar>
            <AvatarImage
              src={entry.author.avatarUrl}
              alt={entry.author.name}
              data-ai-hint="person portrait"
            />
            {/* Fallback if avatar image fails */}
            <AvatarFallback>
              {entry.author.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Message container */}
          <div className="w-full">
            {/* Highlight agent messages with a background */}
            <Card className={entry.isAgent ? 'bg-secondary' : ''}>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  {/* Author name and optional (Support) tag */}
                  <p className="font-semibold">
                    {entry.author.name}{' '}
                    {entry.isAgent && (
                      <span className="text-xs font-normal text-primary">
                        (Support)
                      </span>
                    )}
                  </p>
                  {/* Timestamp of the message */}
                  <p className="text-xs text-muted-foreground">{entry.time}</p>
                </div>
              </CardHeader>
              {/* Message content */}
              <CardContent className="p-4 pt-0">
                <p className="text-sm">{entry.message}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}

      {/* Reply form section */}
      <Card>
        <CardHeader>
          <CardDescription>Add your reply</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Textarea for typing a reply */}
          <Textarea placeholder="Type your message here..." rows={4} />
        </CardContent>
        <CardFooter>
          {/* Submit reply button with icon */}
          <Button className="ml-auto">
            <Send className="mr-2" />
            Send Reply
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
