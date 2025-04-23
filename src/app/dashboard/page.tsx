import React from 'react';
import { getPublishedExams } from '@/server/exam/getPublishedExams';
// import { getResults } from '@/server/exam/getResults'; // Uncomment when integrating user results

export default async function DashboardPage() {
  // In a real app, replace with actual user context or session
  const mockUser = { id: '1', name: 'Demo User', email: 'demo@example.com' };

  // Fetch published exams (server function)
  const exams = await getPublishedExams();

  // TODO: Fetch user results/attempts with getResults({ userId: mockUser.id })

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {mockUser.name}!</h1>
      <p className="mb-8 text-gray-600">Here are the exams you can take:</p>

      <section>
        <h2 className="text-xl font-semibold mb-2">Available Exams</h2>
        {exams.length === 0 ? (
          <p>No exams are currently published.</p>
        ) : (
          <ul className="space-y-4">
            {exams.map((exam: any) => (
              <li key={exam.id} className="border rounded p-4 flex flex-col gap-1">
                <span className="font-medium text-lg">{exam.title}</span>
                <span className="text-gray-500 text-sm">{exam.description}</span>
                <span className="text-gray-400 text-xs">Duration: {exam.duration} min</span>
                {/* TODO: Add Start Exam button and link to exam page */}
                <button
                  className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  // onClick={() => startExam(exam.id)}
                  disabled
                >
                  Start Exam (Coming Soon)
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* TODO: Add user results/attempts section */}
    </main>
  );
}
