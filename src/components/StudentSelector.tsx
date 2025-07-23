'use client';

import React from 'react';
import { Search, User, Mail, Phone } from 'lucide-react';
import { StudentPerformance } from '@/lib/types';

interface StudentSelectorProps {
  students: StudentPerformance[];
  selectedStudent: StudentPerformance | null;
  onSelectStudent: (student: StudentPerformance) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function StudentSelector({
  students,
  selectedStudent,
  onSelectStudent,
  searchTerm,
  onSearchChange
}: StudentSelectorProps) {
  const filteredStudents = students.filter(student =>
    student.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="h-full flex flex-col bg-black text-white border-r border-gray-800">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2 text-sm font-semibold">
        <User size={18} className="text-gray-400" />
        Student Selection
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Student List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {filteredStudents.map((studentData) => (
          <div
            key={studentData.student.id}
            onClick={() => onSelectStudent(studentData)}
            className={`p-3 rounded-md cursor-pointer border transition duration-200 text-md
              ${
                selectedStudent?.student.id === studentData.student.id
                  ? 'bg-gray-990 border-gray-600'
                  : 'bg-black-900 border-gray-800 hover:border-gray-600 hover:bg-gray-900'
              }`}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="font-medium">{studentData.student.name}</div>
              <div className={`text-xs font-semibold ${getPerformanceColor(studentData.averagePercentage)}`}>
                {studentData.averagePercentage.toFixed(1)}%
              </div>
            </div>

            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex items-center gap-1">
                <Mail size={12} /> {studentData.student.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone size={12} /> {studentData.student.contactNumber}
              </div>
              <div className="flex justify-between pt-1 text-gray-500 text-xs">
                <span>Exams: {studentData.totalExams}</span>
                <span>Best: {studentData.bestPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm">
            No students found.
          </div>
        )}
      </div>
    </div>
  );
}
