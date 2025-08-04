'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutGrid, Home, Box, ShoppingCart, MessageSquare, Mail, BarChart3, GitBranch, Tv,
    User, Users, Settings, LogOut, Search, Share, Upload, SlidersHorizontal, PanelLeft, Copy, Check, Sun, Moon
} from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarFooter, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { AiChatWidget } from '@/components/ai/ai-chat-widget';
import { useAlerts } from '@/context/alerts-context';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/components/theme-provider';

const navGroups = [
    {
        title: 'MAIN MENU',
        items: [
            { href: '/', label: 'Dashboard', icon: LayoutGrid },
            { href: '/products', label: 'Product', icon: Box },
            { href: '/orders', label: 'Order', icon: ShoppingCart },
            { href: '/customers', label: 'Customers', icon: Users },
        ]
    },
    {
        title: 'OTHER',
        items: [
            { href: '/analytics', label: 'Analytic', icon: BarChart3 },
            { href: '/performance', label: 'Performance', icon: Tv },
        ]
    },
    {
        title: 'ACCOUNT',
        items: [
            { href: '/profile', label: 'Profile', icon: User },
            { href: '/settings', label: 'Members', icon: Users },
        ]
    }
];

function Notifications() {
    const { alerts } = useAlerts();
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
                     <p className="p-4 text-sm text-muted-foreground">No new notifications</p>
                ) : (
                    alerts.map((alert, index) => (
                        <DropdownMenuItem key={index} className="flex items-start gap-3 p-2">
                             <div className="grid gap-1">
                                <p className="text-sm font-medium">{alert.title}</p>
                                <p className="text-xs text-muted-foreground">{alert.description}</p>
                            </div>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function ShareDialog() {
    const [hasCopied, setHasCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText('https://insightflow.app/dashboard/shared-view');
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5"><Share className="h-4 w-4" /> Share</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share Dashboard</DialogTitle>
                    <DialogDescription>
                        Anyone with this link will be able to view this dashboard.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Input value="https://insightflow.app/dashboard/shared-view" readOnly />
                    <Button type="button" size="sm" onClick={copyToClipboard}>
                        {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
                 <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function CustomizeWidgetsDialog({ widgets, setWidgets }: { widgets: any, setWidgets: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                 <Button variant="outline" size="sm" className="gap-1.5"><SlidersHorizontal className="h-4 w-4" /> Customize Widgets</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Customize Widgets</DialogTitle>
                    <DialogDescription>
                       Toggle the visibility of dashboard widgets.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                   {Object.keys(widgets).map((key) => (
                       <div key={key} className="flex items-center justify-between">
                            <Label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                           <Switch
                                id={key}
                                checked={widgets[key]}
                                onCheckedChange={() => setWidgets((prev: any) => ({ ...prev, [key]: !prev[key] }))}
                           />
                       </div>
                   ))}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Done</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [widgets, setWidgets] = useState({
      totalIncome: true,
      totalProfit: true,
      totalViews: true,
      refunded: true,
  });

  const exportData = () => {
    toast({
        title: "Export Initiated",
        description: "Your data export will be available shortly.",
    });
  }

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { widgets } as any);
    }
    return child;
  });

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4">
           <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">Luminos</span>
           </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
            {navGroups.map((group) => (
                <SidebarGroup key={group.title}>
                    <SidebarGroupLabel className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">{group.title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) => (
                        <SidebarMenuItem key={item.label}>
                            <Link href={item.href}>
                                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                                    <span>
                                        <item.icon className="h-5 w-5" />
                                        <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                                    </span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </SidebarContent>
        <SidebarFooter className="p-4 mt-auto group-data-[collapsible=icon]:hidden">
            <div className="p-4 rounded-lg bg-sidebar-accent">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between h-auto p-0">
                             <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>RT</AvatarFallback>
                                </Avatar>
                                <div className="text-left">
                                    <p className="text-sm font-medium">Ridwan T</p>
                                    <p className="text-xs text-muted-foreground">ridwant@gmail.com</p>
                                </div>
                             </div>
                             <LogOut className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Ridwan T</p>
                            <p className="text-xs leading-none text-muted-foreground">ridwant@gmail.com</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/profile" passHref><DropdownMenuItem><User className="mr-2 h-4 w-4" /><span>Profile</span></DropdownMenuItem></Link>
                        <Link href="/settings" passHref><DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span></DropdownMenuItem></Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></DropdownMenuItem>
                      </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-transparent px-4 md:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="What are you looking for?" className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0" />
            </div>
             <PanelLeft className="h-6 w-6 hidden max-md:block" />
          </div>
          <div className="flex items-center gap-2">
            <Notifications />
            <ThemeToggle />
            <CustomizeWidgetsDialog widgets={widgets} setWidgets={setWidgets} />
            <ShareDialog />
            <Button variant="primary" size="sm" className="gap-1.5" onClick={exportData}><Upload className="h-4 w-4" /> Export</Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {childrenWithProps}
        </main>
        <AiChatWidget />
      </SidebarInset>
    </SidebarProvider>
  );
}
