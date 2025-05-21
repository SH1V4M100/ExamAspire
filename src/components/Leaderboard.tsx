import React from 'react';
import { Trophy, Medal, Users } from 'lucide-react';

interface LeaderboardProps {
  currentScore: number;
}

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, name: 'Alexandra Ng', score: 98, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { rank: 2, name: 'Michael Johnson', score: 95, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { rank: 3, name: 'Samantha Lee', score: 92, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { rank: 4, name: 'David Chen', score: 90, avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { rank: 5, name: 'Emma Wilson', score: 88, avatar: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { rank: 6, name: 'James Rodriguez', score: 85, avatar: 'https://randomuser.me/api/portraits/men/36.jpg' },
  { rank: 7, name: 'Olivia Taylor', score: 84, avatar: 'https://randomuser.me/api/portraits/women/90.jpg' },
  { rank: 8, name: 'Daniel Kim', score: 82, avatar: 'https://randomuser.me/api/portraits/men/29.jpg' },
  { rank: 9, name: 'Sophie Martin', score: 80, avatar: 'https://randomuser.me/api/portraits/women/39.jpg' },
  { rank: 10, name: 'Robert Lewis', score: 78, avatar: 'https://randomuser.me/api/portraits/men/53.jpg' },
];

const Leaderboard: React.FC<LeaderboardProps> = ({ currentScore }) => {
  // Calculate user's hypothetical rank
  const getUserRank = () => {
    const position = leaderboardData.findIndex(entry => currentScore >= entry.score);
    return position === -1 ? leaderboardData.length + 1 : position + 1;
  };

  const userRank = getUserRank();
  
  // Top 3 with special styling
  const topThree = leaderboardData.slice(0, 3);
  // Rest of the leaderboard
  const restOfLeaderboard = leaderboardData.slice(3);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Top Performers</h2>
      </div>
      
      {/* Top 3 Students */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {topThree.map((entry, index) => {
          // Different styling based on rank
          const badgeColors = [
            'bg-yellow-100 text-yellow-800 border-yellow-300', // 1st
            'bg-gray-100 text-gray-800 border-gray-300',      // 2nd
            'bg-amber-100 text-amber-800 border-amber-300'    // 3rd
          ];
          
          const iconColors = [
            'text-yellow-500', // Gold
            'text-gray-400',   // Silver
            'text-amber-600'   // Bronze
          ];
          
          return (
            <div key={entry.rank} className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${badgeColors[index]}`}>
                    {index === 0 ? (
                      <Trophy className={`w-5 h-5 ${iconColors[index]}`} />
                    ) : (
                      <Medal className={`w-5 h-5 ${iconColors[index]}`} />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm text-gray-500">#{entry.rank}</div>
                    <div className="font-medium">{entry.name}</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-blue-600">{entry.score}%</div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Rest of Leaderboard */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center">
          <Users className="w-4 h-4 text-gray-500 mr-2" />
          <h3 className="font-medium text-gray-700">All Participants</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {restOfLeaderboard.map((entry) => (
            <div key={entry.rank} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <div className="w-6 text-center text-gray-500 font-medium">{entry.rank}</div>
                <div className="w-8 h-8 ml-3 bg-gray-200 rounded-full overflow-hidden">
                  <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">{entry.name}</div>
              </div>
              <div className="font-medium">{entry.score}%</div>
            </div>
          ))}
          
          {/* User's position indicator */}
          <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-500 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 text-center text-blue-600 font-medium">{userRank}</div>
              <div className="w-8 h-8 ml-3 bg-blue-200 rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-blue-700 font-bold text-sm">YOU</span>
              </div>
              <div className="ml-3 font-medium">Your Score</div>
            </div>
            <div className="font-bold text-blue-600">{currentScore}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;