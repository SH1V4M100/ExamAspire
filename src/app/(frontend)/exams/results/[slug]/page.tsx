'use client'
import React from 'react';
import ExamResult from '@/components/ExamResult';
import { mockExamData } from './data/mockData';
import { useEffect} from 'react';
import { useParams } from 'next/navigation';

function App() {
  const { slug } = useParams(); // dynamic route param
  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/exam-attempts/${slug}`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch attempt');
        const data = await res.json();
        console.log('Fetched attempt:', data); 
      } catch (err) {
        console.error('Error fetching attempt:', err);
      }
    };

    if (slug) fetchAttempt();
  }, [slug]);
  return (
    <div className="min-h-screen bg-gray-50">
      <ExamResult examData={mockExamData} />
    </div>
  );
}

export default App;