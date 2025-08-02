'use client'; // Marks this as a client component in Next.js (needed for hooks, interactivity)

// Import required React and Next.js hooks
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Import UI components and icons
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
import { Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Main Login Page component
export default function LoginPage() {
  const router = useRouter(); // Router for page navigation
  const { toast } = useToast(); // Custom toast notification hook

  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'

  // Handler for login button click
  const handleLogin = () => {
    // Basic validation: fields must not be empty
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter your email and password.',
        variant: 'destructive',
      });
      return;
    }

    // Store selected role in localStorage
    localStorage.setItem('role', role);

    // Role-based login logic
    if (role === 'admin') {
      // Simple hardcoded admin credentials
      if (
        email.toLowerCase() === 'admin@mail.com' &&
        password === '12345678'
      ) {
        router.push('/admin'); // Navigate to admin dashboard
      } else {
        localStorage.removeItem('role'); // Remove role on failure
        toast({
          title: 'Error',
          description: 'Invalid admin credentials.',
          variant: 'destructive',
        });
      }
    } else if (role === 'staff') {
      router.push('/staff'); // Navigate to staff page
    } else {
      router.push('/'); // Navigate to user dashboard or homepage
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Centered card layout for login form */}
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          {/* Logo and Title */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <Ticket className="size-8 text-primary" />
            <h1 className="font-headline text-3xl font-bold">DeskFlow</h1>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            {/* Role Selection Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={setRole} defaultValue={role}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email Input */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input with "Forgot password?" link */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>

          {/* Sign up Link */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
