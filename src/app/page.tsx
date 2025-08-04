
'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wallet, Briefcase, Eye, ShieldX, TrendingUp, MoreHorizontal, ArrowUp, ArrowDown, Users, Globe } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const keyMetrics = [
  { title: 'Total Income', value: 32120.97, change: 12, changeType: 'increase', icon: Wallet, format: 'currency' },
  { title: 'Total Profit', value: 10120.97, change: 1.33, changeType: 'increase', icon: Briefcase, format: 'currency' },
  { title: 'Total Views', value: 32120, change: 3.5, changeType: 'decrease', icon: Eye, format: 'number' },
  { title: 'Refunded', value: 2120, change: 13, changeType: 'increase', icon: ShieldX, format: 'number' },
];

const revenueData = [
  { month: 'Jun', totalRevenue: 8000, totalTarget: 9000 },
  { month: 'Jul', totalRevenue: 12000, totalTarget: 11000 },
  { month: 'Aug', totalRevenue: 10000, totalTarget: 11500 },
  { month: 'Sep', totalRevenue: 15000, totalTarget: 14000 },
  { month: 'Oct', totalRevenue: 12345.93, totalTarget: 11323.30 },
  { month: 'Nov', totalRevenue: 18000, totalTarget: 17000 },
  { month: 'Dec', totalRevenue: 22000, totalTarget: 20000 },
  { month: 'Jan', totalRevenue: 21000, totalTarget: 23000 },
];

const trafficData = [
    { day: 'Sun', primeTime: 4000, usualTime: 2400 },
    { day: 'Mon', primeTime: 3000, usualTime: 1398 },
    { day: 'Tue', primeTime: 2000, usualTime: 9800 },
    { day: 'Wed', primeTime: 2780, usualTime: 3908 },
    { day: 'Thu', primeTime: 1890, usualTime: 4800 },
    { day: 'Fri', primeTime: 2390, usualTime: 3800 },
    { day: 'Sat', primeTime: 3490, usualTime: 4300 },
];

const ecommerceData = [
    { name: 'Amazon', value: 35, fill: 'hsl(var(--chart-1))' },
    { name: 'Ebay', value: 25, fill: 'hsl(var(--chart-2))' },
    { name: 'Alibaba', value: 25, fill: 'hsl(var(--chart-3))' },
    { name: 'Shopify', value: 16, fill: 'hsl(var(--chart-4))' },
];

const salesPerformanceData = {
    sinceYesterday: 18.93,
    totalSales: 8930.79,
    averageSales: 10120.97
}

export default function Home() {
    const revenueChartConfig = {
        totalRevenue: { label: "Total Revenue", color: "hsl(var(--chart-1))" },
        totalTarget: { label: "Total Target", color: "hsl(var(--chart-2))" },
    };

    const trafficChartConfig = {
        primeTime: { label: "Prime Time", color: "hsl(var(--chart-1))" },
        usualTime: { label: "Usual Time", color: "hsl(var(--chart-2))" },
    }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {keyMetrics.map(metric => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-primary/10">
                      <metric.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download Report</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.format === 'currency' ? `$${metric.value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : metric.value.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className={metric.changeType === 'increase' ? 'text-green-500 flex items-center' : 'text-red-500 flex items-center'}>
                        {metric.changeType === 'increase' ? <TrendingUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        {metric.change.toFixed(2)}%
                    </span>
                    vs last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Revenue</CardTitle>
                    <div className="ml-auto">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">Month</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Month</DropdownMenuItem>
                                <DropdownMenuItem>Year</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={revenueChartConfig} className="h-[250px] w-full">
                        <LineChart accessibilityLayer data={revenueData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                            <Tooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Legend />
                            <Line dataKey="totalRevenue" type="monotone" stroke="var(--color-totalRevenue)" strokeWidth={2} dot={false} />
                            <Line dataKey="totalTarget" type="monotone" stroke="var(--color-totalTarget)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Traffic Record</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download Report</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="pb-0">
                     <ChartContainer config={trafficChartConfig} className="h-[250px] w-full">
                        <RadarChart data={trafficData}>
                            <PolarGrid gridType="polygon" />
                            <PolarAngleAxis dataKey="day" />
                            <PolarRadiusAxis angle={30} domain={[0, 10000]} tick={false} axisLine={false} />
                            <Radar name="Prime Time" dataKey="primeTime" stroke="var(--color-primeTime)" fill="var(--color-primeTime)" fillOpacity={0.6} />
                            <Radar name="Usual Time" dataKey="usualTime" stroke="var(--color-usualTime)" fill="var(--color-usualTime)" fillOpacity={0.6} />
                             <Tooltip cursor={false} content={<ChartTooltipContent />} />
                             <Legend />
                        </RadarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>E-commerce Sales Platform</CardTitle>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download Report</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <ChartContainer config={{}} className="h-[250px] w-full aspect-square">
                        <RechartsPieChart>
                            <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                            <Pie data={ecommerceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={60}>
                                {ecommerceData.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.fill} stroke={entry.fill} />
                                ))}
                            </Pie>
                            <Legend content={({ payload }) => (
                                <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                                {payload?.map((entry, index) => (
                                    <li key={`item-${index}`} className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                        <span className="text-sm text-muted-foreground">{entry.value} ({Math.round(entry.payload.percent * 100)}%)</span>
                                    </li>
                                ))}
                                </ul>
                            )} />
                        </RechartsPieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Global Reach</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center h-full">
                        <img src="https://i.imgur.com/gSHeA2h.png" alt="World Map" className="h-32 object-contain" data-ai-hint="world map" />
                        <div className="mt-4 text-center">
                            <p className="text-sm text-muted-foreground">Campaign Reach</p>
                            <p className="text-lg font-semibold">11 country</p>
                        </div>
                         <div className="mt-2 text-center">
                            <p className="text-sm text-muted-foreground">Period</p>
                            <p className="text-lg font-semibold">1 year</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Sales Performance</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download Report</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                 <CardContent>
                    <div className="flex flex-col items-center text-center">
                        <div className="relative h-32 w-32">
                             <svg className="transform -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
                                <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--primary))" strokeWidth="12" strokeDasharray="339.292" strokeDashoffset={339.292 - (339.292 * 75) / 100} strokeLinecap="round" />
                            </svg>
                             <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-xs text-muted-foreground">Since yesterday</p>
                                <p className="text-xl font-bold flex items-center">{salesPerformanceData.sinceYesterday}% <TrendingUp className="h-4 w-4 text-green-500 ml-1" /></p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-around w-full">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Total sales per day</p>
                                <p className="font-semibold">${salesPerformanceData.totalSales.toLocaleString()}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Average sales</p>
                                <p className="font-semibold">${salesPerformanceData.averageSales.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
