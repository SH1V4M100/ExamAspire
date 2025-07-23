'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { PanelLeftClose, PanelRightOpen, BarChart3, GraduationCap } from 'lucide-react';
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
  const [sidebarVisible, setSidebarVisible] = useState(true);

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
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Top Navbar */}
      <header className="bg-black border-b border-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo only */}
          <Link href="/" className="flex items-center gap-2 text-white">
            <GraduationCap className="h-6 w-6 text-white-500" />
            <span className="text-xl font-semibold tracking-wide">ExamAspire</span>
          </Link>

          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarVisible(!sidebarVisible)}
            className="p-2 hover:bg-[#222] rounded transition"
            title={sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
          >
            {sidebarVisible ? <PanelLeftClose size={20} /> : <PanelRightOpen size={20} />}
          </button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Student Selector) */}
        <aside
          className={`transition-all duration-300 bg-[#1a1a1a] border-r border-[#2c2c2c] ${
            sidebarVisible ? 'w-80' : 'w-0'
          } overflow-hidden`}
        >
          <div className="h-full">
            <StudentSelector
              students={studentPerformances}
              selectedStudent={selectedStudent}
              onSelectStudent={setSelectedStudent}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {selectedStudent ? (
            <div className="space-y-8">
              {/* Section Title */}
              <h2 className="text-2xl font-bold text-white mb-4">Performance Analysis</h2>

              {/* Student Overview */}
              <div className="bg-black-600 rounded-lg shadow-md p-6 border border-gray-800">
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

              {/* Charts and Analysis */}
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
        </main>
      </div>
    </div>
  );
}

export default Evaluate;
