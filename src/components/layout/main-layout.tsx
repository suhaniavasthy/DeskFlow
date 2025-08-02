'use client';

import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Header } from '@/components/layout/header';
import Link from 'next/link';
import { Home, PlusCircle, Settings, Ticket, User, Briefcase, Folder } from 'lucide-react';
import { useEffect, useState } from 'react';

export function MainLayout({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);
  
  const isAdmin = role === 'admin';
  const isStaff = role === 'staff';
  const isUser = role === 'user';


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Ticket className="size-8 text-primary" />
            <span className="text-2xl font-bold font-headline">DeskFlow</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            { (isUser || !role) &&
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/">
                      <Home />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="New Ticket">
                    <Link href="/tickets/new">
                      <PlusCircle />
                      <span>New Ticket</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            }
             { isStaff &&
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/staff">
                      <Briefcase />
                      <span>Assigned Tickets</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            }
            {isAdmin && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="All Tickets">
                    <Link href="/admin">
                      <Folder />
                      <span>All Tickets</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Admin Settings">
                    <Link href="/admin/settings">
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div className="flex w-full flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
