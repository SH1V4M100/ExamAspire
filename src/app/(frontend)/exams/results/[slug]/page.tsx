'use client'
import React, { useState, useEffect } from 'react';
import ExamResult from '@/components/ExamResult';
import { useParams } from 'next/navigation';
import { ExamData } from '@/lib/types';

function ResultSlugPage() {
  const { slug: rawSlug } = useParams();
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const res = await fetch(`/api/exam-attempts/${slug}`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch attempt');
        const data = await res.json();
        
        setExamData({
          exam: data.exam,
          answers: data.answers
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchAttempt();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!examData) return <div>No data found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamResult examData={examData} slug={slug?slug:"1"}/>
    </div>
  );
}

export default ResultSlugPage;