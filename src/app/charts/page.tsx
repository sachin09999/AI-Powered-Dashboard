'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, Cell } from 'recharts';
import React, { useState, useEffect } from 'react';

const initialLineChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const initialBarChartData = [
  { name: 'USA', value: 400 },
  { name: 'Canada', value: 300 },
  { name: 'Mexico', value: 200 },
  { name: 'Brazil', value: 278 },
  { name: 'Germany', value: 189 },
];

const initialPieChartData = [
    { name: 'Desktop', value: 45, fill: 'hsl(var(--chart-1))' },
    { name: 'Mobile', value: 35, fill: 'hsl(var(--chart-2))' },
    { name: 'Tablet', value: 15, fill: 'hsl(var(--chart-3))' },
    { name: 'Other', value: 5, fill: 'hsl(var(--chart-4))' },
];

const lineChartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
};

const barChartConfig = {
  value: { label: "Users", color: "hsl(var(--chart-1))" },
};

export default function ChartsPage() {
    const [lineData, setLineData] = useState(initialLineChartData);
    const [barData, setBarData] = useState(initialBarChartData);
    const [pieData, setPieData] = useState(initialPieChartData);

    useEffect(() => {
        const interval = setInterval(() => {
            setLineData(prevData =>
                prevData.map(item => ({
                    ...item,
                    desktop: Math.max(50, item.desktop + Math.floor(Math.random() * 20) - 10),
                    mobile: Math.max(30, item.mobile + Math.floor(Math.random() * 20) - 10),
                }))
            );
            setBarData(prevData =>
                prevData.map(item => ({
                    ...item,
                    value: Math.max(100, item.value + Math.floor(Math.random() * 50) - 25),
                })).sort((a, b) => b.value - a.value)
            );
            setPieData(prevData => {
                const newTotal = prevData.reduce((acc, item) => acc + item.value, 0);
                const adjustments = prevData.map(() => Math.random() * 2 - 1);
                return prevData.map((item, index) => ({
                    ...item,
                    value: Math.max(5, item.value + adjustments[index] * (newTotal / 100))
                }));
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Acquisition Trend</CardTitle>
            <CardDescription>Monthly new users from desktop and mobile.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineChartConfig} className="h-[350px] w-full">
              <LineChart
                accessibilityLayer
                data={lineData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                 <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Line
                  dataKey="desktop"
                  type="monotone"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="mobile"
                  type="monotone"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Users by Country</CardTitle>
                    <CardDescription>Distribution of users across top countries.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={barChartConfig} className="h-[300px] w-full">
                        <BarChart accessibilityLayer data={barData} layout="vertical">
                            <CartesianGrid horizontal={false} />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <XAxis type="number" hide />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} layout="vertical" />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Device Usage</CardTitle>
                    <CardDescription>User distribution by device type.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <ChartContainer config={{}} className="h-[300px] w-full">
                        <RechartsPieChart>
                            <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                innerRadius={60}
                                labelLine={false}
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                    return (
                                        <text x={x} y={y} fill="hsl(var(--card-foreground))" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                    );
                                }}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                             <Legend />
                        </RechartsPieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
