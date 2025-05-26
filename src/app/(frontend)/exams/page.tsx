'use client'
import React, { useEffect, useState } from 'react';
import { ExamList } from '@/components/exam-list';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { stringify } from 'qs-esm';
export default function Home() {
  const [exams, setExams] = useState([]);
  const [attemptedExamIds, setAttemptedExamIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examQuery = stringify(
          {
            where: {
              _status: {
                equals: 'published',
              },
            },
          },
          { addQueryPrefix: true }
        );
  
        const [examsRes, attemptsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/exams${examQuery}`, {
            credentials: 'include',
          }),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/exam-attempts/my-exam-ids`, {
            credentials: 'include',
          }),
        ]);  

        const examsData = await examsRes.json();
        const attemptedData = await attemptsRes.json();
        //console.log('attemptedData',attemptedData)
        setExams(examsData?.docs || []);
        setAttemptedExamIds(attemptedData?.examIds || []);
      } catch (err) {
        console.error('Error fetching exams or attempts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading exams...</div>;

  return (
    <main className="min-h-screen">
      <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Exam Portal</h1>
            <p className="text-muted-foreground mt-1">Browse and take your assigned examinations</p>
          </div>
          <ThemeToggle />
        </header>

        <section className="mb-12">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">Available Exams</h2>
              <p className="text-sm text-muted-foreground">{exams.length} exams found</p>
            </div>
            <ExamList exams={exams} attemptedExamIds={attemptedExamIds} />
          </div>
        </section>
      </div>
    </main>
  );
}
