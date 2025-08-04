'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, DollarSign, Activity, TrendingUp, MoreHorizontal, ArrowUpRight, ArrowDownRight, ChevronDown } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const keyMetrics = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', changeType: 'increase', icon: DollarSign },
  { title: 'Subscriptions', value: '+2350', change: '+180.1%', changeType: 'increase', icon: Users },
  { title: 'Sales', value: '+12,234', change: '+19%', changeType: 'increase', icon: Activity },
  { title: 'Active Now', value: '+573', change: '+201', changeType: 'increase', icon: TrendingUp },
];

const ageDistributionData = [
    { month: 'Jan', age: '18-24', users: 3800 },
    { month: 'Feb', age: '25-34', users: 5200 },
    { month: 'Mar', age: '35-44', users: 4500 },
    { month: 'Apr', age: '45-54', users: 6100 },
    { month: 'May', age: '55-64', users: 5400 },
    { month: 'Jun', age: '65+', users: 4800 },
];

const ageChartConfig = {
    users: {
      label: "Users",
      color: "hsl(var(--chart-1))",
    },
};

const geoDistributionData = [
    { country: 'United States', users: 2500, change: '+15.2%', flag: '🇺🇸', fill: 'hsl(var(--chart-1))' },
    { country: 'Great Britain', users: 1800, change: '-5.1%', flag: '🇬🇧', fill: 'hsl(var(--chart-2))' },
    { country: 'Brazil', users: 1200, change: '+25.8%', flag: '🇧🇷', fill: 'hsl(var(--chart-3))' },
    { country: 'India', users: 950, change: '+12.1%', flag: '🇮🇳', fill: 'hsl(var(--chart-4))' },
    { country: 'Japan', users: 750, change: '+8.3%', flag: '🇯🇵', fill: 'hsl(var(--chart-5))' },
];

const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
    { month: 'Jul', sales: 7000 },
    { month: 'Aug', sales: 6500 },
    { month: 'Sep', sales: 7500 },
    { month: 'Oct', sales: 8000 },
    { month: 'Nov', sales: 9000 },
    { month: 'Dec', sales: 8500 },
];

const salesChartConfig = {
    sales: {
      label: "Sales",
      color: "hsl(var(--chart-2))",
    },
};

const recentTransactionsData = [
    { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00', status: 'Paid', avatar: 'https://placehold.co/40x40' },
    { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00', status: 'Paid', avatar: 'https://placehold.co/40x40' },
    { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00', status: 'Pending', avatar: 'https://placehold.co/40x40' },
    { name: 'William Kim', email: 'will@email.com', amount: '+$99.00', status: 'Paid', avatar: 'https://placehold.co/40x40' },
    { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00', status: 'Paid', avatar: 'https://placehold.co/40x40' },
];

const performanceData = [
    { source: 'Direct', type: 'Direct', visitors: 2048, revenue: '$12,482', conversion: '6.2%', trend: '+8.1%' },
    { source: 'Google', type: 'Organic', visitors: 8312, revenue: '$62,129', conversion: '7.4%', trend: '+12.5%' },
    { source: 'Facebook', type: 'Social', visitors: 4096, revenue: '$20,192', conversion: '5.1%', trend: '-2.3%' },
    { source: 'Referral', type: 'Referral', visitors: 1024, revenue: '$5,982', conversion: '4.8%', trend: '+3.7%' },
];

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {keyMetrics.map(metric => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className={metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
                        {metric.change}
                    </span>
                    from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Age Distribution</CardTitle>
                    <CardDescription>A look at the age demographics of your user base.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={ageChartConfig} className="h-[300px] w-full">
                        <LineChart
                            accessibilityLayer
                            data={ageDistributionData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="age" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${Number(value) / 1000}k`} />
                            <ChartTooltip
                                cursor={true}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                    <CardDescription>Users by country.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="h-[200px] flex items-center justify-center">
                        <ChartContainer config={{}} className="h-full w-full">
                            <RechartsPieChart>
                                <Tooltip content={<ChartTooltipContent nameKey="country" hideLabel />} />
                                <Pie data={geoDistributionData} dataKey="users" nameKey="country" cx="50%" cy="50%" outerRadius={80}>
                                    {geoDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </RechartsPieChart>
                        </ChartContainer>
                    </div>
                    <ul className="space-y-2">
                        {geoDistributionData.map(geo => (
                            <li key={geo.country} className="flex items-center gap-2 text-sm">
                               <div className="h-2 w-2 rounded-full" style={{ backgroundColor: geo.fill }} />
                               <span className="font-medium flex-1">{geo.country}</span>
                               <span className="text-muted-foreground">{geo.users.toLocaleString()}</span>
                               <span className={`flex items-center gap-1 font-medium ${geo.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {geo.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {geo.change.substring(1)}
                               </span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Sales Over Time</CardTitle>
                    <CardDescription>A line chart showing sales performance over the last year.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={salesChartConfig} className="h-[300px] w-full">
                         <LineChart
                            accessibilityLayer
                            data={salesData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                            <ChartTooltip
                                cursor={true}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>A list of the most recent transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentTransactionsData.map((transaction, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={transaction.avatar} alt="Avatar" data-ai-hint="person" />
                                                <AvatarFallback>{transaction.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{transaction.name}</p>
                                                <p className="text-sm text-muted-foreground">{transaction.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">{transaction.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Distribution Performance</CardTitle>
                    <CardDescription>Detailed breakdown of traffic sources.</CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1">
                            <span>Last 30 Days</span>
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                        <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                        <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Source</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Visitors</TableHead>
                            <TableHead className="text-right">Revenue</TableHead>
                            <TableHead className="text-right">Conversion</TableHead>
                            <TableHead className="text-right">Trend</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {performanceData.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{data.source}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{data.type}</Badge>
                                </TableCell>
                                <TableCell className="text-right">{data.visitors.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{data.revenue}</TableCell>
                                <TableCell className="text-right">{data.conversion}</TableCell>
                                <TableCell className={`text-right font-medium ${data.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{data.trend}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
