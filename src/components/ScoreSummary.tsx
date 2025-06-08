import React from 'react';
import { BarChart, ChevronRight } from 'lucide-react';
import { Section, AnswersType } from '../lib/types';

interface ScoreSummaryProps {
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
  sections: Section[];
  answers: AnswersType;
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({ score, sections, answers }) => {
  // Calculate scores per section
  const sectionScores = sections.map(section => {
    let correct = 0;
    const total = section.questions.length;
    
    section.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (!userAnswer) return;
      
      const correctOptionIds = question.options
        .filter(option => option.isCorrect)
        .map(option => option.id);
        
      const selectedOptionIds = userAnswer.selectedOptionIds || [];
      
      if (correctOptionIds.length === selectedOptionIds.length && 
          correctOptionIds.every(id => selectedOptionIds.includes(id))) {
        correct++;
      }
    });
    
    return {
      subject: section.subject,
      correct,
      total,
      percentage: Math.round((correct / total) * 100)
    };
  });

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-4">
        <BarChart className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Performance Summary</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sectionScores.map((sectionScore, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-medium text-gray-700">{sectionScore.subject}</h3>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xl font-bold">
                {sectionScore.percentage}%
              </span>
              <span className="text-gray-500 text-sm">
                {sectionScore.correct}/{sectionScore.total} correct
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${sectionScore.percentage}%`,
                  backgroundColor: sectionScore.percentage >= 70 ? '#10b981' : sectionScore.percentage >= 40 ? '#f59e0b' : '#ef4444'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-right">
        <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
          Detailed Analysis <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ScoreSummary;