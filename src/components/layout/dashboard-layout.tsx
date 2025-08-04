
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Home, UploadCloud, Moon, Sun, Bell, User, LogOut, Settings, Search, ChevronDown, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarFooter, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { AiChatWidget } from '@/components/ai/ai-chat-widget';
import { useAlerts } from '@/context/alerts-context';
import { cn } from '@/lib/utils';

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

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
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

function Notifications() {
    const { alerts } = useAlerts();

    const severityIcons = {
        high: <AlertTriangle className="h-5 w-5 text-destructive" />,
        medium: <Info className="h-5 w-5 text-yellow-500" />,
        low: <CheckCircle className="h-5 w-5 text-green-500" />,
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {alerts.length > 0 && (
                        <Badge className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-xs" variant="destructive">
                            {alerts.length}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {alerts.length === 0 ? (
                    <DropdownMenuItem disabled>
                        <div className="flex items-center gap-3 p-2">
                            <p className="text-sm text-muted-foreground">No new notifications</p>
                        </div>
                    </DropdownMenuItem>
                ) : (
                    alerts.map((alert, index) => (
                        <DropdownMenuItem key={index}>
                            <div className="flex items-start gap-3 p-2">
                                <div className="mt-1">
                                    {severityIcons[alert.severity]}
                                </div>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium">{alert.title}</p>
                                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                                </div>
                            </div>
                        </DropdownMenuItem>
                    ))
                )}
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
            <Notifications />
            <ThemeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
        <AiChatWidget />
      </SidebarInset>
    </SidebarProvider>
  );
}
