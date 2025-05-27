'use client'

import { useEffect, useState } from 'react';
import { GraduationCap, Clock, CheckCircle, BookOpen } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { UpcomingExams } from '@/components/dashboard/upcoming-exams';
import { RecentResults } from '@/components/dashboard/recent-results';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { QuickActions } from '@/components/dashboard/quick-actions';

interface ExamAttempt {
  score: number;
  // Add other properties if needed
}
export default function DashboardPage() {
  const [upcomingExamsCount, setUpcomingExamsCount] = useState(0);
  const [completedExamsCount, setCompletedExamsCount] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    const fetchUpcomingExamsCount = async () => {
      try {
        const response = await fetch('/api/exams/count-upcoming-exams');
        const data = await response.json();
        setUpcomingExamsCount(data.count);
      } catch (error) {
        console.error('Failed to fetch upcoming exams count:', error);
      }
    };

    const fetchCompletedExamsCount = async () => {
      try {
        const response = await fetch('/api/exam-attempts/my-exam-ids');
        const data = await response.json();
        const uniqueExamIds = new Set(data.examIds);
        setCompletedExamsCount(uniqueExamIds.size);
      } catch (error) {
        console.error('Failed to fetch completed exams count:', error);
      }
    };

    const fetchAverageScore = async () => {
      try {
        const response = await fetch('/api/exam-attempts/user-exam-attempts');
        const data = await response.json();
        const scores = data.attempts.map((attempt: ExamAttempt) => attempt.score);
        const totalScore = scores.reduce((acc: number, score: number) => acc + score, 0);
        const average = scores.length ? (totalScore / scores.length) : 0;
        setAverageScore(average);
      } catch (error) {
        console.error('Failed to fetch average score:', error);
      }
    };

    fetchUpcomingExamsCount();
    fetchCompletedExamsCount();
    fetchAverageScore();
  }, []);

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
          value={upcomingExamsCount.toString()}
          icon={<GraduationCap className="h-4 w-4" />}
          description="Best of luck!"
        />
        <StatCard
          title="Completed Exams"
          value={completedExamsCount.toString()}
          icon={<CheckCircle className="h-4 w-4" />}
          description="This year"
        />
        <StatCard
          title="Average Score"
          value={`${averageScore.toFixed(2)}%`}
          icon={<BookOpen className="h-4 w-4" />}
          description="Across all subjects"
        />
        {/* <StatCard
          title="Study Time"
          value="24h"
          icon={<Clock className="h-4 w-4" />}
          description="Last 7 days"
          trend={{ value: 2, isPositive: true }}
        /> */}
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