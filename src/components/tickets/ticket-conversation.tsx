'use client';
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

const conversation = [
  {
    author: { name: 'You', avatarUrl: 'https://placehold.co/40x40' },
    message:
      'My account is locked and I cannot access any of my files. I have tried resetting my password but it did not work. Please help!',
    time: '2 hours ago',
    isAgent: false,
  },
  {
    author: { name: 'Jane Doe', avatarUrl: 'https://placehold.co/40x40' },
    message:
      'Hi there, I am sorry to hear you are having trouble. I have unlocked your account. Please try logging in again. Let me know if you are still having issues.',
    time: '1 hour ago',
    isAgent: true,
  },
];

export function TicketConversation() {
  return (
    <div className="space-y-6">
      <h2 className="font-headline text-2xl font-bold">Conversation</h2>
      {conversation.map((entry, index) => (
        <div key={index} className="flex gap-4">
          <Avatar>
            <AvatarImage
              src={entry.author.avatarUrl}
              alt={entry.author.name}
              data-ai-hint="person portrait"
            />
            <AvatarFallback>
              {entry.author.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="w-full">
            <Card className={entry.isAgent ? 'bg-secondary' : ''}>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">
                    {entry.author.name}{' '}
                    {entry.isAgent && (
                      <span className="text-xs font-normal text-primary">
                        (Support)
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{entry.time}</p>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm">{entry.message}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}

      <Card>
        <CardHeader>
          <CardDescription>Add your reply</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Type your message here..." rows={4} />
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">
            <Send className="mr-2" />
            Send Reply
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
