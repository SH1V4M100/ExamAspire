import React from 'react';
import { Award } from 'lucide-react';
import { Exam } from '../lib/types';

interface ExamHeaderProps {
  exam: Exam;
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
}

const ExamResCard: React.FC<ExamHeaderProps> = ({ exam, score }) => {
  // Determine grade and color based on percentage
  const getGradeInfo = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A', color: 'text-green-500' };
    if (percentage >= 80) return { grade: 'B', color: 'text-blue-500' };
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-500' };
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-500' };
    return { grade: 'F', color: 'text-red-500' };
  };

  const { grade, color } = getGradeInfo(score.percentage);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{exam.title}</h1>
          <p className="mt-2 text-gray-600">{exam.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-3">
            {exam.sections.map((section) => (
              <span 
                key={section.subject} 
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {section.subject}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-6 md:mt-0 flex items-center">
          <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-gray-50 border-4 border-blue-100 shadow-inner">
            <div className={`text-3xl font-bold ${color}`}>{grade}</div>
            <div className="text-sm text-gray-600">{score.percentage}%</div>
          </div>
          
          <div className="ml-4">
            <p className="text-lg">
              <span className="font-semibold text-blue-600">{score.correct}</span>
              <span className="text-gray-600"> / {score.total} correct</span>
            </p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${score.percentage}%`,
                  backgroundColor: score.percentage >= 70 ? '#10b981' : score.percentage >= 40 ? '#f59e0b' : '#ef4444'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResCard;