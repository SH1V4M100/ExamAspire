"use client";

import { useState, useEffect } from 'react';
import { Exam } from '@/lib/types';
import { ExamCard } from '@/components/exam-card';
import { ExamFilter } from '@/components/exam-filter';
import { motion } from 'framer-motion';

interface ExamListProps {
  exams: Exam[];
}

export function ExamList({ exams }: ExamListProps) {
  const [filteredExams, setFilteredExams] = useState<Exam[]>(exams);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(filteredExams.length === 0);
  }, [filteredExams]);

  return (
    <div className="space-y-6 w-full">
      <ExamFilter exams={exams} onFilterChange={setFilteredExams} />
      
      {isEmpty ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="rounded-full bg-muted p-6 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-muted-foreground"
            >
              <path d="M20 6H4V8H2V6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V16H4V18H20V6Z" />
              <path d="M2 8V14H4V8H2Z" />
              <path d="M9 14V12H11V14H9Z" />
              <path d="M14 12V14H16V12H14Z" />
              <path d="M6 14V12H8V14H6Z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">No exams found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters or search query to find what you're looking for.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}
    </div>
  );
}