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
    let totalScore = 0;
    let totalMarks = 0;

    const sectionScores = examData.exam.sections.map(section => {
      let sectionScore = 0;
      let sectionTotal = 0;

      section.questions.forEach(question => {
        const userAnswer = examData.answers[question.id];
        const selected = userAnswer?.selectedOptionIds || [];
        const correctOptions = question.options.filter(opt => opt.isCorrect).map(opt => opt.id);

        const isCorrect =
          selected.length > 0 &&
          selected.length === correctOptions.length &&
          selected.every(id => correctOptions.includes(id));

        switch (question.questionType) {
          case 'single 1':
            sectionTotal += 1;
            if (selected.length > 0) sectionScore += isCorrect ? 1 : -0.25;
            break;

          case 'single 2':
            sectionTotal += 2;
            if (selected.length > 0) sectionScore += isCorrect ? 2 : -0.5;
            break;

          case 'single 4':
            sectionTotal += 4;
            if (selected.length > 0) sectionScore += isCorrect ? 4 : -1;
            break;

          case 'multi':
            sectionTotal += 2;
            if (selected.length > 0) {
              const correctSet = new Set(correctOptions);
              const hasIncorrect = selected.some(id => !correctSet.has(id));
              const correctSelected = selected.filter(id => correctSet.has(id)).length;
              const totalCorrect = correctOptions.length;

              if (hasIncorrect) {
                sectionScore += 0;
              } else if (correctSelected === totalCorrect) {
                sectionScore += 2;
              } else if (correctSelected > 0) {
                sectionScore += (2 * correctSelected) / totalCorrect;
              }
            }
            break;

          case 'integer':
            sectionTotal += 4;
            if (selected.length > 0) {
              sectionScore += isCorrect ? 4 : -1;
            }
            // unattempted → no penalty
            break;

          default:
            console.warn(`Unknown question type: ${question.questionType}`);
            break;
        }
      });

      // Ensure non-negative section score
      const finalSectionScore = Math.max(0, sectionScore);

      totalScore += finalSectionScore;
      totalMarks += sectionTotal;

      return {
        subject: section.subject,
        score: finalSectionScore,
        total: sectionTotal,
        percentage: sectionTotal > 0 ? Math.round((finalSectionScore / sectionTotal) * 100) : 0
      };
    });

    return {
      score: Math.max(0, totalScore),
      totalMarks,
      sectionScores
    };
  };
  
  const result = calculateScore();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <ExamResCard 
  exam={examData.exam} 
  score={{ obtained: examData.score, total: examData.chemistryTotal+examData.physicsTotal+examData.mathsTotal }} 
/>

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
            <ScoreSummary
              score={{
                correct: result.score,
                total: result.totalMarks,
                percentage: result.totalMarks > 0 ? Math.round((result.score / result.totalMarks) * 100) : 0
              }}
              sectionScores={result.sectionScores}
            />

              <SectionResults examData={examData} />
            </div>
          ) : (
            <Leaderboard currentScore={examData.score} slug={(examData.exam.id).toString()}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamResult;