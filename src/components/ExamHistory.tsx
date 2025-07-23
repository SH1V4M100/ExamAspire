import React from 'react';
import { History, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { ProcessedAttempt } from '@/lib/types';

interface ExamHistoryProps {
  attempts: ProcessedAttempt[];
}

export function ExamHistory({ attempts }: ExamHistoryProps) {
  if (attempts.length === 0) {
    return (
      <div className="bg-black text-white rounded-lg shadow-md p-6 border border-gray-800">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <History size={20} />
          Exam History
        </h3>
        <div className="text-center py-8 text-gray-400">
          No exam history available
        </div>
      </div>
    );
  }

  const sortedAttempts = [...attempts].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-black text-white rounded-lg shadow-md p-6 border border-gray-800">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <History size={20} />
        Exam History
      </h3>

      <div className="space-y-4">
        {sortedAttempts.map((attempt) => (
          <div key={attempt.id} className="border-l-4 border-blue-500 bg-grey-990 p-4 rounded-r-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold">{attempt.exam.title}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(attempt.submittedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {formatDuration(attempt.exam.duration)}
                  </div>
                  <div className="flex items-center gap-1">
                    {attempt.isValidSubmission ? (
                      <>
                        <CheckCircle size={14} className="text-green-400" />
                        <span className="text-green-400">On time</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={14} className="text-orange-400" />
                        <span className="text-orange-400">Late submission</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{attempt.score}</div>
                <div className="text-sm text-gray-400">out of {attempt.totalMarks}</div>
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

            {/* Subject breakdown */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Physics</div>
                <div className="text-sm font-medium">{attempt.physicsScore.toFixed(1)}/{attempt.physicsTotal}</div>
                <div className="text-xs text-blue-400">{attempt.physicsPercentage.toFixed(1)}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Chemistry</div>
                <div className="text-sm font-medium">{attempt.chemistryScore.toFixed(1)}/{attempt.chemistryTotal}</div>
                <div className="text-xs text-green-400">{attempt.chemistryPercentage.toFixed(1)}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Mathematics</div>
                <div className="text-sm font-medium">{attempt.mathsScore.toFixed(1)}/{attempt.mathsTotal}</div>
                <div className="text-xs text-purple-400">{attempt.mathsPercentage.toFixed(1)}%</div>
              </div>
            </div>

            {/* Additional info */}
            <div className="flex justify-end items-center mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
              <span>Submitted: {new Date(attempt.submittedAt).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
