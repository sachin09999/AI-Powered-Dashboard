'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const keyMetrics = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month', icon: DollarSign },
  { title: 'Total Users', value: '2,350', change: '+180.1% from last month', icon: Users },
  { title: 'Active Sessions', value: '+573', change: '+201 since last hour', icon: Activity },
  { title: 'Conversion Rate', value: '12.5%', change: '-2.5% from last month', icon: TrendingUp },
];

const overviewData = [
  { name: 'Jan', total: 2380 },
  { name: 'Feb', total: 2940 },
  { name: 'Mar', total: 1980 },
  { name: 'Apr', total: 3210 },
  { name: 'May', total: 2540 },
  { name: 'Jun', total: 4320 },
  { name: 'Jul', total: 4890 },
  { name: 'Aug', total: 3450 },
  { name: 'Sep', total: 4100 },
  { name: 'Oct', total: 3900 },
  { name: 'Nov', total: 4500 },
  { name: 'Dec', total: 5100 },
];

const chartConfig = {
    total: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
};

const recentActivities = [
    { name: 'Olivia Martin', action: 'Uploaded sales_2024_Q2.csv', time: '15m ago', image: 'https://placehold.co/100x100' , fallback: 'OM'},
    { name: 'Jackson Lee', action: 'Created new chart: User Growth', time: '1h ago', image: 'https://placehold.co/100x100', fallback: 'JL' },
    { name: 'AI Assistant', action: 'New insight on revenue trends', time: '3h ago', image: 'https://placehold.co/100x100', fallback: 'AI' },
    { name: 'Isabella Nguyen', action: 'Connected HubSpot', time: '5h ago', image: 'https://placehold.co/100x100', fallback: 'IN' },
];

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {keyMetrics.map(metric => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>A look at this year's revenue performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <RechartsBarChart accessibilityLayer data={overviewData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => `$${Number(value) / 1000}k`}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Legend />
                  <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>Recent actions from your team and AI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Avatar className="h-9 w-9 border" data-ai-hint="person abstract">
                      <AvatarImage src={activity.image} alt="Avatar" />
                      <AvatarFallback>{activity.fallback}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 gap-1">
                      <p className="text-sm font-medium leading-none">{activity.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.action}</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">{activity.time}</div>
                  </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
