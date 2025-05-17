import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface ExamTimerProps {
  remainingTime: number; // in seconds
  isRunning: boolean;
}

const ExamTimer: React.FC<ExamTimerProps> = ({ remainingTime, isRunning }) => {
  const [timeLeft, setTimeLeft] = useState(remainingTime);

  useEffect(() => {
    // Reset the timer when remainingTime changes
    setTimeLeft(remainingTime);
    
    // Only start the countdown if the exam is running
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
    }
    return `${minutes}m ${secs.toString().padStart(2, '0')}s`;
  };

  // Determine text color based on time left (red if less than 5 minutes)
  const textColor = isRunning && timeLeft < 300 ? 'text-red-600' : 'text-gray-900';

  return (
    <div className="flex items-center gap-2 font-mono">
      <Clock size={20} className={textColor} />
      <span className={`font-bold ${textColor}`}>
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default ExamTimer;