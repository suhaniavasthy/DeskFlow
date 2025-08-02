'use client'; // Marks the component for client-side rendering in Next.js

// Import routing and UI components
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ticket } from 'lucide-react'; // Icon for branding
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Register Page Component
export default function RegisterPage() {
  return (
    // Fullscreen flex container, centers the card
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Registration Card */}
      <Card className="w-full max-w-md mx-auto">
        {/* Card Header with branding */}
        <CardHeader className="space-y-1 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Ticket className="size-8 text-primary" /> {/* Icon */}
            <h1 className="font-headline text-3xl font-bold">DeskFlow</h1>
          </div>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information to get started
          </CardDescription>
        </CardHeader>

        {/* Card Content holds the form */}
        <CardContent>
          <div className="grid gap-4">
            {/* Full Name Input */}
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="John Doe" required />
            </div>

            {/* Email Input */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            {/* Password Input */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>

            {/* Role Selection Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select defaultValue="user">
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Create Account Button (currently links to home) */}
            <Button type="submit" className="w-full asChild">
              <Link href="/">Create Account</Link>
            </Button>
          </div>

          {/* Redirect to login page */}
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

