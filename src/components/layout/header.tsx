"use client"; // Ensures the component runs on the client side in Next.js

// Import UI components for the dropdown menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Import reusable Button component
import { Button } from '@/components/ui/button';

// Import Avatar components to display user's profile image or fallback initials
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Link component from Next.js for client-side routing
import Link from 'next/link';

// Icons for menu items
import { LogOut, User } from 'lucide-react';

// Component that triggers sidebar opening (mobile view)
import { SidebarTrigger } from '../ui/sidebar';

// Header component used across pages
export function Header() {
  return (
    // Sticky header that stays on top during scroll, with blur and border
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
      
      {/* Sidebar trigger icon (visible only on small screens) */}
      <SidebarTrigger className="md:hidden" />

      {/* Right-aligned avatar and menu */}
      <div className="ml-auto flex items-center gap-4">
        {/* Dropdown menu wrapper */}
        <DropdownMenu>
          {/* The button that triggers the dropdown */}
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative size-10 rounded-full"
            >
              {/* User avatar image */}
              <Avatar className="size-10">
                <AvatarImage
                  src="https://placehold.co/40x40" // Placeholder image
                  alt="User Avatar"
                  data-ai-hint="person avatar"
                />
                {/* Fallback initials if image fails to load */}
                <AvatarFallback>UA</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          {/* Dropdown menu content (visible when opened) */}
          <DropdownMenuContent align="end">
            {/* Menu label (not clickable) */}
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Menu item: Profile */}
            <DropdownMenuItem>
              <User className="mr-2" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Menu item: Logout (wrapped in Link for routing) */}
            <Link href="/login" passHref>
              <DropdownMenuItem>
                <LogOut className="mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
