'use client'

import { GraduationCap, Clock, CheckCircle, BookOpen } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { UpcomingExams } from '@/components/dashboard/upcoming-exams';
import { RecentResults } from '@/components/dashboard/recent-results';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
          <p className="text-muted-foreground">
            Track your academic progress and upcoming exams
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Upcoming Exams"
          value="3"
          icon={<GraduationCap className="h-4 w-4" />}
          description="Scheduled this week"
        />
        <StatCard
          title="Completed Exams"
          value="12"
          icon={<CheckCircle className="h-4 w-4" />}
          description="This semester"
        />
        <StatCard
          title="Average Score"
          value="85%"
          icon={<BookOpen className="h-4 w-4" />}
          description="Across all subjects"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Study Time"
          value="24h"
          icon={<Clock className="h-4 w-4" />}
          description="Last 7 days"
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-3">
        <div className="md:col-span-1">
          <QuickActions />
        </div>
        <PerformanceChart />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-3">
        <UpcomingExams />
        <RecentResults />
      </div>
    </div>
  );
}