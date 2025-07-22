import React from 'react';
import { BookOpen, Atom, Calculator } from 'lucide-react';
import { ProcessedAttempt } from '@/lib/types';

interface SubjectBreakdownProps {
  attempts: ProcessedAttempt[];
}

export function SubjectBreakdown({ attempts }: SubjectBreakdownProps) {
  if (attempts.length === 0) {
    return (
      <div className="bg-black text-white rounded-lg shadow-md p-6 border border-gray-800">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen size={20} />
          Subject-wise Performance
        </h3>
        <div className="text-center py-8 text-gray-400">
          No exam data available
        </div>
      </div>
    );
  }

  const subjects = [
    {
      name: 'Physics',
      icon: Atom,
      color: 'blue',
      averagePercentage: attempts.reduce((sum, a) => sum + a.physicsPercentage, 0) / attempts.length,
      bestPercentage: Math.max(...attempts.map(a => a.physicsPercentage)),
      totalMarks: attempts.reduce((sum, a) => sum + a.physicsScore, 0),
      maxMarks: attempts.reduce((sum, a) => sum + a.physicsTotal, 0)
    },
    {
      name: 'Chemistry',
      icon: BookOpen,
      color: 'green',
      averagePercentage: attempts.reduce((sum, a) => sum + a.chemistryPercentage, 0) / attempts.length,
      bestPercentage: Math.max(...attempts.map(a => a.chemistryPercentage)),
      totalMarks: attempts.reduce((sum, a) => sum + a.chemistryScore, 0),
      maxMarks: attempts.reduce((sum, a) => sum + a.chemistryTotal, 0)
    },
    {
      name: 'Mathematics',
      icon: Calculator,
      color: 'purple',
      averagePercentage: attempts.reduce((sum, a) => sum + a.mathsPercentage, 0) / attempts.length,
      bestPercentage: Math.max(...attempts.map(a => a.mathsPercentage)),
      totalMarks: attempts.reduce((sum, a) => sum + a.mathsScore, 0),
      maxMarks: attempts.reduce((sum, a) => sum + a.mathsTotal, 0)
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-900/20',
        border: 'border-blue-500',
        text: 'text-blue-400',
        progress: 'bg-blue-500'
      },
      green: {
        bg: 'bg-green-900/20',
        border: 'border-green-500',
        text: 'text-green-400',
        progress: 'bg-green-500'
      },
      purple: {
        bg: 'bg-purple-900/20',
        border: 'border-purple-500',
        text: 'text-purple-400',
        progress: 'bg-purple-500'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="bg-black text-white rounded-lg shadow-md p-6 border border-gray-800">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <BookOpen size={20} />
        Subject-wise Performance
      </h3>

      <div className="space-y-6">
        {subjects.map((subject) => {
          const colorClasses = getColorClasses(subject.color);
          const Icon = subject.icon;

          return (
            <div
              key={subject.name}
              className={`p-4 rounded-lg border-l-4 ${colorClasses.bg} ${colorClasses.border}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className={colorClasses.text} size={20} />
                  <h4 className="font-medium">{subject.name}</h4>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">
                    {subject.totalMarks.toFixed(1)}/{subject.maxMarks}
                  </div>
                  <div className={`text-lg font-semibold ${colorClasses.text}`}>
                    {subject.averagePercentage.toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Average Performance Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Average Performance</span>
                  <span>{subject.averagePercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${colorClasses.progress} transition-all duration-500`}
                    style={{ width: `${subject.averagePercentage}%` }}
                  />
                </div>
              </div>

              {/* Best Performance Bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Best Performance</span>
                  <span>{subject.bestPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${colorClasses.progress} opacity-60 transition-all duration-500`}
                    style={{ width: `${subject.bestPercentage}%` }}
                  />
                </div>
              </div>

              {/* Performance Feedback */}
              <div className="mt-3 text-xs text-gray-400">
                {subject.averagePercentage >= 80
                  ? '🎯 Excellent performance!'
                  : subject.averagePercentage >= 60
                  ? '📈 Good, room for improvement'
                  : '⚠️ Needs focused attention'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
