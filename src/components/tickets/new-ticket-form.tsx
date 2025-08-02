'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SuggestedArticles } from './suggested-articles';
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  priority: z.string({
    required_error: 'Please select a priority level.',
  }),
  description: z.string().min(20, {
    message: 'Description must be at least 20 characters.',
  }),
  attachment: z.any().optional(),
});

export default function NewTicketForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [ticketDetails, setTicketDetails] = useState({
    subject: '',
    description: '',
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // This is a placeholder for a real API call.
    console.log('Form submitted', values);
    toast({
        title: 'Ticket Submitted!',
        description: 'Your ticket has been successfully created.'
    });
    router.push('/');
  }

  const handleBlur = () => {
    const { subject, description } = form.getValues();
    if (subject && description) {
      setTicketDetails({ subject, description });
    }
  };

  return (
    <div className="grid gap-10 md:grid-cols-3">
      <div className="md:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Unable to login"
                      {...field}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technical-support">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="billing-issue">
                          Billing Issue
                        </SelectItem>
                        <SelectItem value="general-inquiry">
                          General Inquiry
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your issue in detail..."
                      className="resize-none"
                      rows={8}
                      {...field}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormDescription>
                    The more details you provide, the faster we can help you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Attachment (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="file" className="pl-12" />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </FormControl>
            </FormItem>

            <Button type="submit">Submit Ticket</Button>
          </form>
        </Form>
      </div>
      <div className="space-y-6">
        <h3 className="text-lg font-semibold font-headline">
          Need a quick answer?
        </h3>
        <SuggestedArticles
          subject={ticketDetails.subject}
          description={ticketDetails.description}
        />
      </div>
    </div>
  );
}
