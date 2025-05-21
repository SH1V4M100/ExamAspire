import React from 'react';
import ExamResult from '@/components/ExamResult';
import { mockExamData } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ExamResult examData={mockExamData} />
    </div>
  );
}

export default App;