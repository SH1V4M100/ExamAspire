'use client'
import React, { useState } from 'react';
import ExamResCard from './ExamResCard';
import SectionResults from './SectionResults';
import ScoreSummary from './ScoreSummary';
import Leaderboard from './Leaderboard';
import { ExamData } from '../lib/types';

interface ExamResultProps {
  examData: ExamData;
  slug: string;
}

const ExamResult: React.FC<ExamResultProps> = ({ examData, slug }) => {
  const [activeTab, setActiveTab] = useState<'results' | 'leaderboard'>('results');
  
  // Calculate total score
  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    
    examData.exam.sections.forEach(section => {
      section.questions.forEach(question => {
        total++;
        
        const userAnswer = examData.answers[question.id];
        if (!userAnswer) return;
        
        const correctOptionIds = question.options
          .filter(option => option.isCorrect)
          .map(option => option.id);
          
        const selectedOptionIds = userAnswer.selectedOptionIds || [];
        
        // Check if arrays have the same values (simple version)
        if (correctOptionIds.length === selectedOptionIds.length && 
            correctOptionIds.every(id => selectedOptionIds.includes(id))) {
          correct++;
        }
      });
    });
    
    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };
  
  const score = calculateScore();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <ExamResCard exam={examData.exam} score={score} />
      
      <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button 
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'results' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('results')}
          >
            Exam Results
          </button>
          <button 
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'leaderboard' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            Leaderboard
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          {activeTab === 'results' ? (
            <div className="space-y-8">
              <ScoreSummary score={score} sections={examData.exam.sections} answers={examData.answers} />
              <SectionResults examData={examData} />
            </div>
          ) : (
            <Leaderboard currentScore={score.percentage} slug={(examData.exam.id).toString()}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamResult;