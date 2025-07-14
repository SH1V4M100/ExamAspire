'use client';
import React, { useState, useEffect } from 'react';
import { Exam } from '@/lib/types';
import { fetchExam } from '@/server/exam/api';
import ExamAttempt from '@/components/ExamAttempt';
import { useParams } from 'next/navigation';

function ExamAttemptPage() {
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    const loadExam = async () => {
      try {
        // Convert slug to string if it's an array (handles dynamic segments)
        const examSlug = Array.isArray(slug) ? slug[0] : slug;
  
        if (!examSlug) {
          throw new Error('Exam ID is missing');
        }
  
        const examData = await fetchExam(examSlug);
        setExam(examData);
      } catch (err) {
        console.error('Error loading exam:', err);
        setError(err instanceof Error ? err.message : 'Failed to load exam. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    loadExam();
  }, [slug]);
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-lg font-medium text-gray-700">Loading exam...</h2>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Exam
          </h2>
          <p className="text-gray-600">{error || 'An unexpected error occurred.'}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  
// 🕒 Check exam availability based on current time
const now = new Date();
const start = new Date(exam.startDate);
const end = new Date(exam.endDate);

if (now < start) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exam Not Yet Available</h2>
        <p className="text-gray-600">
          This exam will be available starting <strong>{start.toLocaleString()}</strong>.
        </p>
      </div>
    </div>
  );
}

// if (now > end) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center max-w-md p-6 bg-white shadow-md rounded">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exam Expired</h2>
//         <p className="text-gray-600">
//           This exam was available until <strong>{end.toLocaleString()}</strong>.
//         </p>
//       </div>
//     </div>
//   );
// }

// If all good, render the actual ExamAttempt
  return <ExamAttempt exam={exam} />;
}

export default ExamAttemptPage;