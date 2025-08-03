'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Home, UploadCloud, Moon, Sun, Bell, User, LogOut, Settings, Search, ChevronDown, LifeBuoy, Rocket } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarSeparator } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import React from 'react';

const navGroups = [
    {
        title: 'Analysis',
        items: [
            { href: '/', label: 'Dashboard', icon: Home },
            { href: '/data', label: 'Data', icon: UploadCloud },
        ]
    },
    {
        title: 'Insights',
        items: [
            { href: '/charts', label: 'Charts', icon: BarChart },
        ]
    },
    {
        title: 'Settings',
        items: [
            { href: '/profile', label: 'Profile', icon: User },
            { href: '/settings', label: 'Settings', icon: Settings },
        ]
    }
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
        <Link href="/profile" passHref>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/settings" passHref>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
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

  const getPageTitle = () => {
    for (const group of navGroups) {
        const item = group.items.find(item => item.href === pathname);
        if (item) return item.label;
    }
    return 'Dashboard';
  }

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4">
           <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                         <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 3v6l4 4"/><path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"/><path d="M18 18c-2.5-2.5-7.5-2.5-10 0"/></svg>
                            <span className="group-data-[collapsible=icon]:hidden font-bold">InsightFlow</span>
                         </div>
                         <ChevronDown className="h-4 w-4 group-data-[collapsible=icon]:hidden" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                    <DropdownMenuLabel>Version</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>v1.0.0 (Current)</DropdownMenuItem>
                    <DropdownMenuItem>v0.9.0</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarHeader>
        <SidebarContent className="p-2">
            {navGroups.map((group) => (
                <SidebarGroup key={group.title}>
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) => (
                        <SidebarMenuItem key={item.label}>
                            <Link href={item.href}>
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
                </SidebarGroup>
            ))}
        </SidebarContent>
        <SidebarFooter className="p-4 mt-auto">
             <div className="flex flex-col gap-2 group-data-[collapsible=icon]:hidden">
                <SidebarSeparator />
                <Button variant="ghost" className="justify-start gap-2">
                    <LifeBuoy className="h-5 w-5" />
                    <span>Support</span>
                </Button>
                <div className="p-4 rounded-lg bg-primary/10 text-center">
                    <Rocket className="mx-auto h-8 w-8 text-primary mb-2" />
                    <p className="font-bold mb-1">Upgrade your Plan</p>
                    <p className="text-xs text-muted-foreground mb-4">Unlock all features and get unlimited access.</p>
                    <Button size="sm" className="w-full">Upgrade</Button>
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-transparent px-4 md:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-card/60" />
            </div>
          </div>
          <div className="flex items-center gap-2">
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
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
