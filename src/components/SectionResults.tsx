import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import QuestionResult from './QuestionResult';
import { ExamData } from '../lib/types';

interface SectionResultsProps {
  examData: ExamData;
}

const SectionResults: React.FC<SectionResultsProps> = ({ examData }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  const toggleSection = (subject: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [subject]: !prev[subject]
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {examData.exam.sections.map((section, sectionIndex) => {
        const isExpanded = expandedSections[section.subject] !== false; // Default to expanded
        
        return (
          <div key={sectionIndex} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <button 
              className="w-full flex items-center justify-between px-4 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => toggleSection(section.subject)}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-3">
                  {sectionIndex + 1}
                </span>
                <h3 className="text-lg font-semibold text-gray-800">{section.subject}</h3>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {isExpanded && (
              <div className="divide-y divide-gray-100">
                {section.questions.map((question, questionIndex) => (
                  <QuestionResult 
                    key={question.id} 
                    question={question}
                    userAnswer={examData.answers[question.id]}
                    questionNumber={questionIndex + 1}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SectionResults;