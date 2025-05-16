import React from 'react';
import ExamTimer from './ExamTimer';

interface ExamHeaderProps {
  title: string;
  remainingTime: number;
  totalProgress: number;
}

const ExamHeader: React.FC<ExamHeaderProps> = ({ 
  title, 
  remainingTime,
  totalProgress 
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 truncate">
            {title}
          </h1>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${totalProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {Math.round(totalProgress)}%
                </span>
              </div>
            </div>
            
            <ExamTimer remainingTime={remainingTime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;