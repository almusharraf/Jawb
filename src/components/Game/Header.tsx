import React from 'react';
import { Team, TeamAbilities } from '../../pages/Game';
import toast from 'react-hot-toast';
import { Phone, SkipForward, ListChecks, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TEAM_COLORS = [
  'bg-blue-500/20',    // Team 1
  'bg-green-500/20',   // Team 2
  'bg-purple-500/20',  // Team 3
  'bg-orange-500/20'   // Team 4
];

interface HeaderProps {
  gameName: string;
  teams: Team[];
  currentTurn: number;
  onScoreChange: (teamId: number, delta: number) => void;
  teamAbilities: Record<number, TeamAbilities>;
  setTeamAbilities: React.Dispatch<React.SetStateAction<Record<number, TeamAbilities>>>;
}

const Header: React.FC<HeaderProps> = ({
  gameName,
  teams,
  currentTurn,
  onScoreChange,
  teamAbilities,
  setTeamAbilities,
}) => {
  const navigate = useNavigate();
  const teamCount = teams.length;

  return (
    <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 py-4 px-6">
      <div className="max-w-6xl mx-auto relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute left-0 top-2 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Game Title */}
        <h1 className="text-4xl font-extrabold text-center mb-8 text-white/90">{gameName}</h1>

        {/* Teams Container */}
        <div className={teamCount === 2 ? 
          "flex justify-between gap-4 max-w-2xl mx-auto" : 
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center"
        }>
          {teams.map((team, index) => {
            // Provide a default abilities object if not available.
            const abilities = teamAbilities[team.id] || { callFriend: false, twoAnswers: false, skip: false };
            const isCurrent = currentTurn === team.id;
            const teamColor = TEAM_COLORS[index % TEAM_COLORS.length];

            return (
              <div
                key={team.id}
                className={`relative ${teamColor} rounded-xl p-3 shadow-sm ${
                  teamCount === 2 ? 'w-[240px]' : 'w-full max-w-[240px]'
                } ${isCurrent ? 'ring-2 ring-yellow-400' : ''}`}
              >
                {/* Current Turn Badge */}
                {isCurrent && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
                    النـوبة
                  </div>
                )}

                {/* Team Name */}
                <div className="mb-2">
                  <h2 className="text-sm font-semibold text-center truncate" title={team.name}>
                    {team.name}
                  </h2>
                </div>

                {/* Score Controls */}
                <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-1 mb-2">
                  <button
                    onClick={() => onScoreChange(team.id, -100)}
                    className="text-red-400 hover:text-red-300 transition-colors text-lg"
                  >
                    −
                  </button>
                  <span className="text-base font-bold text-white mx-2">
                    {team.score}
                  </span>
                  <button
                    onClick={() => onScoreChange(team.id, 100)}
                    className="text-green-400 hover:text-green-300 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Abilities */}
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      if (abilities.callFriend) {
                        toast.error('مستخدمة مسبقاً');
                      } else {
                        setTeamAbilities((prev) => ({
                          ...prev,
                          [team.id]: { ...prev[team.id], callFriend: true },
                        }));
                        toast.success('تم الاتصال!');
                      }
                    }}
                    className={`p-1 rounded-lg flex items-center ${
                      abilities.callFriend
                        ? 'bg-blue-500/30 cursor-not-allowed'
                        : 'bg-blue-500/20 hover:bg-blue-500/30'
                    }`}
                    disabled={abilities.callFriend}
                  >
                    <Phone className="w-4 h-4 text-white" />
                  </button>

                  <button
                    onClick={() => {
                      if (abilities.twoAnswers) {
                        toast.error('مستخدمة مسبقاً');
                      } else {
                        setTeamAbilities((prev) => ({
                          ...prev,
                          [team.id]: { ...prev[team.id], twoAnswers: true },
                        }));
                        toast.success('جوابين مفعلين!');
                      }
                    }}
                    className={`p-1 rounded-lg flex items-center ${
                      abilities.twoAnswers
                        ? 'bg-green-500/30 cursor-not-allowed'
                        : 'bg-green-500/20 hover:bg-green-500/30'
                    }`}
                    disabled={abilities.twoAnswers}
                  >
                    <ListChecks className="w-4 h-4 text-white" />
                  </button>

                  <button
                    onClick={() => {
                      if (abilities.skip) {
                        toast.error('مستخدمة مسبقاً');
                      } else {
                        setTeamAbilities((prev) => ({
                          ...prev,
                          [team.id]: { ...prev[team.id], skip: true },
                        }));
                        toast.success('تم التجاوز!');
                      }
                    }}
                    className={`p-1 rounded-lg flex items-center ${
                      abilities.skip
                        ? 'bg-red-500/30 cursor-not-allowed'
                        : 'bg-red-500/20 hover:bg-red-500/30'
                    }`}
                    disabled={abilities.skip}
                  >
                    <SkipForward className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
