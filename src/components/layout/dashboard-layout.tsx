'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Home, UploadCloud, Moon, Sun, Bell, User, LogOut, Settings } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import React from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/data', label: 'Data', icon: UploadCloud },
  { href: '/charts', label: 'Charts', icon: BarChart },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://placehold.co/100x100" alt="User avatar" data-ai-hint="person portrait" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 3v6l4 4"/><path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"/><path d="M18 18c-2.5-2.5-7.5-2.5-10 0"/></svg>
            <span className="group-data-[collapsible=icon]:hidden">InsightFlow</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                    <span>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold md:text-xl">
              {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-xs" variant="destructive">3</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <div className="flex items-start gap-3 p-2">
                        <Avatar className="h-8 w-8 border" data-ai-hint="abstract tech">
                            <AvatarImage src="https://placehold.co/100x100" alt="Avatar" />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium">New insight available</p>
                            <p className="text-xs text-muted-foreground">Sales data shows a 20% increase.</p>
                        </div>
                    </div>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <div className="flex items-start gap-3 p-2">
                        <Avatar className="h-8 w-8 border" data-ai-hint="server database">
                            <AvatarImage src="https://placehold.co/100x100" alt="Avatar" />
                            <AvatarFallback>DS</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium">Data source connected</p>
                            <p className="text-xs text-muted-foreground">Google Analytics is now synced.</p>
                        </div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div className="flex items-start gap-3 p-2">
                        <Avatar className="h-8 w-8 border" data-ai-hint="gears cogs">
                            <AvatarImage src="https://placehold.co/100x100" alt="Avatar" />
                            <AvatarFallback>SYS</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium">System Update</p>
                            <p className="text-xs text-muted-foreground">Charts have been updated to v2.</p>
                        </div>
                    </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
