import React from 'react';
import ExamTimer from './ExamTimer';

interface ExamHeaderProps {
  title: string;
  remainingTime: number;
  totalProgress: number;
  isExamStarted: boolean;
}

const ExamHeader: React.FC<ExamHeaderProps> = ({ 
  title, 
  remainingTime, 
  totalProgress,
  isExamStarted 
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-lg font-medium text-gray-900 truncate max-w-xs sm:max-w-md">
            {title}
          </h1>
          
          <div className="flex items-center space-x-6 mt-2 sm:mt-0">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 mr-2">
                {isExamStarted ? 'Time Left:' : 'Time Allotted:'}
              </span>
              <ExamTimer 
                remainingTime={remainingTime} 
                isRunning={isExamStarted} 
              />
            </div>
            
            <div className="hidden sm:flex items-center">
              <span className="text-sm font-medium text-gray-500 mr-2">
                Progress:
              </span>
              <div className="w-24 bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.round(totalProgress)}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700 ml-2 w-8">
                {Math.round(totalProgress)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;