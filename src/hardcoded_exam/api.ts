import { Exam } from '@/lib/types';

export const fetchExam = async (examId: string): Promise<Exam> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/exams/${examId}?depth=1&draft=false`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch exam');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exam:', error);
    throw new Error('Failed to load exam. Please try again later.');
  }
};