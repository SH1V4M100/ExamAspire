'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from "next-themes";

// Dummy data for performance chart
// const performanceData = [
//   {
//     subject: 'Math',
//     average: 78,
//     highest: 96,
//     lowest: 54,
//   },
//   {
//     subject: 'Science',
//     average: 82,
//     highest: 98,
//     lowest: 65,
//   },
//   {
//     subject: 'History',
//     average: 75,
//     highest: 92,
//     lowest: 60,
//   },
//   {
//     subject: 'English',
//     average: 85,
//     highest: 95,
//     lowest: 70,
//   },
//   {
//     subject: 'CS',
//     average: 88,
//     highest: 99,
//     lowest: 68,
//   },
//   {
//     subject: 'Art',
//     average: 90,
//     highest: 100,
//     lowest: 75,
//   },
// ];
type ExamAttemptScore = {
  id: number;
  score: number | null;
  totalMarks: number | null;
} & {
  [key in ScoreKey | TotalKey]: number | null;
};

type ExamAttemptScoresResponse = {
  scores: ExamAttemptScore[];
};

type SubjectPerformance = {
  subject: string;
  average: number;
  highest: number;
  lowest: number;
};

type Subject = 'physics' | 'chemistry' | 'maths';

type ScoreKey = `${Subject}Score`;
type TotalKey = `${Subject}Total`;


function calculateSubjectPerformance(scores: ExamAttemptScore[]) {
  const subjects: Subject[] = ['physics', 'chemistry', 'maths'];
  const performance: SubjectPerformance[] = [];

  for (const subject of subjects) {
    const scoreKey = `${subject}Score` as ScoreKey;
    const totalKey = `${subject}Total` as TotalKey;

    const percentages = scores
      .map((entry) => {
        const score = entry[scoreKey];
        const total = entry[totalKey];
        if (typeof score === 'number' && typeof total === 'number' && total > 0) {
          return (score / total) * 100;
        }
        return null;
      })
      .filter((p): p is number => p !== null);

    if (percentages.length === 0) continue;

    const average = percentages.reduce((a, b) => a + b, 0) / percentages.length;
    const highest = Math.max(...percentages);
    const lowest = Math.min(...percentages);

    performance.push({
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      average: parseFloat(average.toFixed(2)),
      highest: parseFloat(highest.toFixed(2)),
      lowest: parseFloat(lowest.toFixed(2)),
    });
  }

  // Overall percentage score
  const overallPercentages = scores
    .map(({ score, totalMarks }) =>
      typeof score === 'number' && typeof totalMarks === 'number' && totalMarks > 0
        ? (score / totalMarks) * 100
        : null
    )
    .filter((p): p is number => p !== null);

  if (overallPercentages.length > 0) {
    const average = overallPercentages.reduce((a, b) => a + b, 0) / overallPercentages.length;
    const highest = Math.max(...overallPercentages);
    const lowest = Math.min(...overallPercentages);

    performance.push({
      subject: 'Overall',
      average: parseFloat(average.toFixed(2)),
      highest: parseFloat(highest.toFixed(2)),
      lowest: parseFloat(lowest.toFixed(2)),
    });
  }

  return performance;
}


export function PerformanceChart() {
  const { theme } = useTheme();
  const [performanceData, setPerformanceData] = useState<SubjectPerformance[]>([]);

  useEffect(() => {
    async function fetchScores() {
      const res = await fetch('/api/exam-attempts/user-dashboard-scores');
      const data = await res.json();
      const transformed = calculateSubjectPerformance(data.scores);
      setPerformanceData(transformed);
    }

    fetchScores();
  }, []);
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