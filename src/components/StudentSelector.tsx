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
    <div className="bg-black text-white rounded-lg shadow-md p-6 border border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <User size={24} />
        Student Selection
      </h2>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search students by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg 
                     bg-gray-900 text-white placeholder-gray-400
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Students List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredStudents.map((studentData) => (
          <div
            key={studentData.student.id}
            onClick={() => onSelectStudent(studentData)}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedStudent?.student.id === studentData.student.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-700 hover:border-gray-600 bg-gray-900'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-white">
                {studentData.student.name}
              </h3>
              <span className={`text-sm font-medium ${getPerformanceColor(studentData.averagePercentage)}`}>
                {studentData.averagePercentage.toFixed(1)}%
              </span>
            </div>

            <div className="text-sm text-gray-400 space-y-1">
              <div className="flex items-center gap-2">
                <Mail size={14} />
                {studentData.student.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} />
                {studentData.student.contactNumber}
              </div>
              <div className="flex justify-between mt-2">
                <span>Exams: {studentData.totalExams}</span>
                <span>Best: {studentData.bestPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No students found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
