import React, { useState } from 'react';
import { Section, UserAnswer } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ExamNavigationProps {
  sections: Section[];
  currentSectionId: string;
  currentQuestionIndex: number;
  answers: Record<string, UserAnswer>;
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToQuestion: (sectionId: string, questionIndex: number) => void;
}

const ExamNavigation: React.FC<ExamNavigationProps> = ({
  sections,
  currentSectionId,
  currentQuestionIndex,
  answers,
  onNavigateToSection,
  onNavigateToQuestion
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const getQuestionStatus = (questionId: string) => {
    const answer = answers[questionId];
    
    if (!answer) return 'unanswered';
    if (answer.isFlagged) return 'flagged';
    if (answer.selectedOptionIds.length > 0) return 'answered';
    return 'unanswered';
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-500 border-green-500 text-white';
      case 'flagged':
        return 'bg-amber-500 border-amber-500 text-white';
      case 'unanswered':
      default:
        return 'bg-white border-gray-300 text-gray-700 hover:border-indigo-300';
    }
  };
  
  const currentSection = sections.find(section => section.id === currentSectionId);
  
  return (
    <div className={`
      bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className={`font-medium ${isCollapsed ? 'hidden' : 'block'}`}>Navigation</h3>
        <button 
          onClick={() => setIsCollapsed(prev => !prev)}
          className="p-1 rounded hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <div className="p-4">
        {!isCollapsed && (
          <div className="space-y-6">
            {sections.map(section => {
              const isCurrentSection = section.id === currentSectionId;
              const answeredCount = section.questions.filter(
                q => (answers[q.id]?.selectedOptionIds?.length ?? 0) > 0
              ).length;
              
              return (
                <div key={section.id} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <button
                      className={`
                        text-sm font-medium capitalize
                        ${isCurrentSection ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}
                      `}
                      onClick={() => onNavigateToSection(section.id)}
                    >
                      {section.subject}
                    </button>
                    <span className="text-xs text-gray-500">
                      {answeredCount}/{section.questions.length}
                    </span>
                  </div>
                  
                  {isCurrentSection && (
                    <div className="grid grid-cols-5 gap-2">
                      {section.questions.map((question, index) => {
                        const status = getQuestionStatus(question.id);
                        const isActive = currentSectionId === section.id && currentQuestionIndex === index;
                        
                        return (
                          <button
                            key={question.id}
                            className={`
                              w-9 h-9 flex items-center justify-center
                              text-sm rounded-md border transition-colors
                              ${getStatusColor(status)}
                              ${isActive ? 'ring-2 ring-indigo-400 ring-offset-1' : ''}
                            `}
                            onClick={() => onNavigateToQuestion(section.id, index)}
                          >
                            {index + 1}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {isCollapsed && (
          <div className="flex flex-col items-center space-y-3">
            {sections.map(section => {
              const isCurrentSection = section.id === currentSectionId;
              
              return (
                <button
                  key={section.id}
                  className={`
                    w-8 h-8 flex items-center justify-center
                    text-xs font-bold uppercase rounded-full
                    ${isCurrentSection 
                      ? 'bg-indigo-100 text-indigo-600 border border-indigo-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  onClick={() => onNavigateToSection(section.id)}
                  title={section.subject}
                >
                  {section.subject.slice(0, 1)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamNavigation;