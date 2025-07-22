'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3, GraduationCap } from 'lucide-react';
import { StudentSelector } from '@/components/StudentSelector';
import { PerformanceChart } from '@/components/PerformanceChart';
import { SubjectBreakdown } from '@/components/SubjectBreakdown';
import { ExamHistory } from '@/components/ExamHistory';
import { groupAttemptsByStudent } from '@/lib/utils';
import { StudentPerformance, ExamAttempt } from '@/lib/types';
import Link from 'next/link';

function Evaluate() {
  const [selectedStudent, setSelectedStudent] = useState<StudentPerformance | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  // Fetch real exam attempts from API
  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await fetch('/api/exam-attempts', { credentials: 'include' });
        const data = await res.json();

        if (!Array.isArray(data.docs)) {
          console.error('Expected examAttempts.docs to be an array', data);
          return;
        }

        setExamAttempts(data.docs);
      } catch (err) {
        console.error('Error fetching exam attempts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  const studentPerformances = useMemo(() => {
    return groupAttemptsByStudent(examAttempts);
  }, [examAttempts]);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white transition-colors duration-200">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <Link href="/" className="flex items-center gap-2 text-white">
              <GraduationCap className="h-6 w-6 text-white-500" />
              <span className="hidden md:inline text-xl font-semibold tracking-wide">
                ExamAspire
              </span>
            </Link>

            {/* Page title */}
            <div className="hidden sm:block text-center">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Student Analysis Dashboard
              </h1>
              <p className="text-sm text-gray-400">In-depth performance metrics for administrators</p>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hidden sm:inline-block"
              >
                Home
              </Link>
              <Link
                href="/admin"
                className="bg-white-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow transition-all duration-200"
              >
                Admin Panel
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toggle Button */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-white font-semibold text-xl">Student Analysis</h2>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-sm text-blue-400 hover:text-blue-300 transition"
          >
            {collapsed ? 'Show Student Selector' : 'Hide Student Selector'}
          </button>
        </div>

        <div className={`grid grid-cols-1 gap-8 ${collapsed ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
          {/* Student Selector Panel */}
          {!collapsed && (
            <div className="lg:col-span-1">
              <StudentSelector
                students={studentPerformances}
                selectedStudent={selectedStudent}
                onSelectStudent={setSelectedStudent}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          )}

          {/* Performance Analysis */}
          <div className={`${collapsed ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
            {selectedStudent ? (
              <div className="space-y-8">
                {/* Student Overview */}
                <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {selectedStudent.student.name}
                      </h2>
                      <p className="text-gray-400">{selectedStudent.student.email}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-400">
                        {selectedStudent.averagePercentage.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-400">Average Performance</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{selectedStudent.totalExams}</div>
                      <div className="text-sm text-gray-400">Total Exams</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {selectedStudent.bestPercentage.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-400">Best Percentage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{selectedStudent.student.totalAttempts}</div>
                      <div className="text-sm text-gray-400">Completed</div>
                    </div>
                  </div>
                </div>

                {/* Chart & Analysis */}
                <PerformanceChart attempts={selectedStudent.attempts} />
                <SubjectBreakdown attempts={selectedStudent.attempts} />
                <ExamHistory attempts={selectedStudent.attempts} />
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg shadow-md p-12 text-center border border-gray-800">
                <BarChart3 className="mx-auto text-gray-500 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-white mb-2">Select a Student</h3>
                <p className="text-gray-400">
                  Choose a student from the left panel to view their detailed performance analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Evaluate;
