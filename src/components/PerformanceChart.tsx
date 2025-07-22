import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import { ProcessedAttempt } from '@/lib/types';

interface PerformanceChartProps {
  attempts: ProcessedAttempt[];
}

export function PerformanceChart({ attempts }: PerformanceChartProps) {
  if (attempts.length === 0) {
    return (
      <div className="bg-black text-white rounded-lg shadow-md p-6 border border-gray-800">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          Performance Trend
        </h3>
        <div className="text-center py-8 text-gray-400">
          No exam data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white rounded-lg shadow-md p-6 border border-gray-800">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <TrendingUp size={20} />
        Performance Trend
      </h3>

      <div className="space-y-4">
        {attempts.map((attempt) => (
          <div key={attempt.id} className="relative">
            {/* Exam Info */}
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="font-medium">{attempt.exam.title}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={14} />
                  {new Date(attempt.submittedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">
                  {attempt.score}/{attempt.totalMarks}
                </div>
                <div
                  className={`text-sm font-medium ${
                    attempt.percentage >= 80
                      ? 'text-green-400'
                      : attempt.percentage >= 60
                      ? 'text-yellow-400'
                      : 'text-red-400'
                  }`}
                >
                  {attempt.percentage.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  attempt.percentage >= 80
                    ? 'bg-green-500'
                    : attempt.percentage >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${attempt.percentage}%` }}
              />
            </div>

            {/* Validity Indicator */}
            {!attempt.isValidSubmission && (
              <div className="mt-1 text-xs text-orange-400 flex items-center gap-1">
                ⚠️ Late submission
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      {/* <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-400">Average</div>
            <div className="font-semibold">
              {(
                attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length
              ).toFixed(1)}
              %
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Best</div>
            <div className="font-semibold text-green-400">
              {Math.max(...attempts.map((a) => a.percentage)).toFixed(1)}%
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Exams</div>
            <div className="font-semibold">{attempts.length}</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
