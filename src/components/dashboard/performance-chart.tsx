'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from "next-themes";

// Dummy data for performance chart
const performanceData = [
  {
    subject: 'Math',
    average: 78,
    highest: 96,
    lowest: 54,
  },
  {
    subject: 'Science',
    average: 82,
    highest: 98,
    lowest: 65,
  },
  {
    subject: 'History',
    average: 75,
    highest: 92,
    lowest: 60,
  },
  {
    subject: 'English',
    average: 85,
    highest: 95,
    lowest: 70,
  },
  {
    subject: 'CS',
    average: 88,
    highest: 99,
    lowest: 68,
  },
  {
    subject: 'Art',
    average: 90,
    highest: 100,
    lowest: 75,
  },
];

export function PerformanceChart() {
  const { theme } = useTheme();
  
  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
        <CardDescription>
          Comparative analysis of student performance across subjects
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={performanceData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#333' : '#eee'} />
            <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? 'hsl(var(--card))' : 'white',
                color: theme === 'dark' ? 'hsl(var(--foreground))' : 'black',
                border: theme === 'dark' ? '1px solid hsl(var(--border))' : '1px solid #ccc'
              }} 
            />
            <Legend />
            <Bar dataKey="highest" fill="hsl(var(--chart-1))" name="Highest Score" radius={[4, 4, 0, 0]} />
            <Bar dataKey="average" fill="hsl(var(--chart-2))" name="Average Score" radius={[4, 4, 0, 0]} />
            <Bar dataKey="lowest" fill="hsl(var(--chart-3))" name="Lowest Score" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}