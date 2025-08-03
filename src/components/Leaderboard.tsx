'use client'
import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Users } from 'lucide-react';

interface LeaderboardProps {
  currentScore: number;
  slug: string;
}

interface UserScore {
  user: {
    id: number;
    name: string;
    institution: string;
  };
  score: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentScore, slug }) => {
  const [leaderboardData, setLeaderboardData] = useState<UserScore[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(`/api/exam-attempts/${slug}/scores`, {
          credentials: 'include',
        });
        const data = await response.json();
        const sortedData = data.scores.sort((a: { score: number; }, b: { score: number; }) => b.score - a.score); // Sort by score descending
        setLeaderboardData(sortedData);
        console.log(sortedData)
        //setLeaderboardData(data.scores);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, [slug]);

  // Calculate user's hypothetical rank
  const getUserRank = () => {
    const position = leaderboardData.findIndex(entry => currentScore >= entry.score);
    return position === -1 ? leaderboardData.length + 1 : position + 1;
  };

  const userRank = getUserRank();

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Top Performers</h2>
      </div>
      
      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center">
          <Users className="w-4 h-4 text-gray-500 mr-2" />
          <h3 className="font-medium text-gray-700">All Participants</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {leaderboardData.map((entry, index) => (
            <div key={entry.user.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <div className="w-6 text-center text-gray-500 font-medium">{index + 1}</div>
                <div className="w-8 h-8 ml-3 bg-gray-200 rounded-full overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=${entry.user.name.replace(' ', '+')}&background=random`} alt={entry.user.name} className="w-full h-full object-cover" />
                </div>
                <div className="ml-3 text-black">
                  <div>{entry.user.name}</div>
                  <div className="text-sm text-gray-500">{entry.user.institution}</div>
                </div>
              </div>
              <div className="text-black font-medium">{entry.score}</div>
            </div>
          ))}
          
          {/* User's position indicator */}
          <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-500 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 text-center text-blue-600 font-medium">{userRank}</div>
              <div className="w-8 h-8 ml-3 bg-blue-200 rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-blue-700 font-bold text-sm">YOU</span>
              </div>
              <div className="ml-3 text-black font-medium">Your Score</div>
            </div>
            <div className="font-bold text-blue-600">{currentScore}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;