import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface ExamTimerProps {
  remainingTime: number; // in seconds
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0')
  ].join(':');
};

const ExamTimer: React.FC<ExamTimerProps> = ({ remainingTime: initialTime }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  
  useEffect(() => {
    setRemainingTime(initialTime);
  }, [initialTime]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const getTimerColor = () => {
    if (remainingTime < 300) return 'text-red-600'; // Less than 5 minutes
    if (remainingTime < 900) return 'text-orange-500'; // Less than 15 minutes
    return 'text-green-600';
  };
  
  return (
    <div className="flex items-center gap-2 font-mono">
      <Clock size={20} className={getTimerColor()} />
      <span className={`font-bold ${getTimerColor()}`}>
        {formatTime(remainingTime)}
      </span>
    </div>
  );
};

export default ExamTimer;