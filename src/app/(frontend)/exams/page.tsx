
import { exams } from '@/lib/data';
import { ExamList } from '@/components/exam-list';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import React from 'react';
export default function Home() {
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
            <ExamList exams={exams} />
          </div>
        </section>
      </div>
    </main>
  );
}