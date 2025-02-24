// src/components/TeamsBoard.tsx
import React from 'react';
import { Team, TeamAbilities } from '../../pages/Game';
import toast from 'react-hot-toast';
import { PhoneCall, SkipForward, ListChecks } from 'lucide-react';

interface TeamsBoardProps {
  teams: Team[];
  currentTurn: number;
  onScoreChange: (teamId: number, delta: number) => void;
  teamAbilities: Record<number, TeamAbilities>;
  setTeamAbilities: React.Dispatch<React.SetStateAction<Record<number, TeamAbilities>>>;
}

const TeamsBoard: React.FC<TeamsBoardProps> = ({
  teams,
  currentTurn,
  onScoreChange,
  teamAbilities,
  setTeamAbilities,
}) => {
  return (
    <section className="mb-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-white/90">الفِرق</h2>
      
      {/* Increased gap from gap-4 to gap-8 and added padding */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-4">
        {teams.map((team) => {
          const abilities = teamAbilities[team.id];
          const isCurrent = currentTurn === team.id;
          
          return (
            <div
              key={team.id}
              className={`relative bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-xl transition-all ${
                isCurrent ? 'ring-2 ring-yellow-400' : 'ring-1 ring-white/10'
              }`}
            >
              {/* Current Turn Badge */}
              {isCurrent && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                  الدور الآن
                </div>
              )}

              {/* Team Header - Added mb-6 for spacing */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-center truncate px-2" title={team.name}>
                  {team.name}
                </h3>
              </div>

              {/* Score Controls - Increased padding */}
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-4 mb-6">
                <button
                  onClick={() => onScoreChange(team.id, -100)}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                >
                  <span className="text-red-400 text-xl font-bold">−</span>
                </button>
                
                <div className="flex flex-col items-center mx-4"> {/* Added horizontal margin */}
                  <span className="text-xs text-white/70 mb-1">النقاط</span>
                  <span className="text-2xl font-bold text-green-400">{team.score}</span>
                </div>
                
                <button
                  onClick={() => onScoreChange(team.id, 100)}
                  className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors"
                >
                  <span className="text-green-400 text-xl font-bold">+</span>
                </button>
              </div>

              {/* Abilities - Increased gap */}
              <div className="grid grid-cols-3 gap-4"> {/* Changed gap from 2 to 4 */}
                {/* Call Friend */}
                <button
                  onClick={() => {
                    if (abilities.callFriend) {
                      toast.error('تم الاستخدام مسبقاً');
                    } else {
                      setTeamAbilities(prev => ({
                        ...prev,
                        [team.id]: { ...prev[team.id], callFriend: true }
                      }));
                      toast.success('تم تفعيل الاتصال!');
                    }
                  }}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                    abilities.callFriend 
                      ? 'bg-blue-500/20 cursor-not-allowed'
                      : 'bg-blue-500/10 hover:bg-blue-500/20'
                  }`}
                  disabled={abilities.callFriend}
                >
                  <PhoneCall className="w-6 h-6 mb-2 text-blue-400" />
                  <span className="text-xs text-blue-300">اتصال</span>
                </button>

                {/* Two Answers */}
                <button
                  onClick={() => {
                    if (abilities.twoAnswers) {
                      toast.error('تم الاستخدام مسبقاً');
                    } else {
                      setTeamAbilities(prev => ({
                        ...prev,
                        [team.id]: { ...prev[team.id], twoAnswers: true }
                      }));
                      toast.success('تم تفعيل جوابين!');
                    }
                  }}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                    abilities.twoAnswers 
                      ? 'bg-green-500/20 cursor-not-allowed'
                      : 'bg-green-500/10 hover:bg-green-500/20'
                  }`}
                  disabled={abilities.twoAnswers}
                >
                  <ListChecks className="w-6 h-6 mb-2 text-green-400" />
                  <span className="text-xs text-green-300">جوابين</span>
                </button>

                {/* Skip */}
                <button
                  onClick={() => {
                    if (abilities.skip) {
                      toast.error('تم الاستخدام مسبقاً');
                    } else {
                      setTeamAbilities(prev => ({
                        ...prev,
                        [team.id]: { ...prev[team.id], skip: true }
                      }));
                      toast.success('تم تفعيل التجاوز!');
                    }
                  }}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                    abilities.skip 
                      ? 'bg-red-500/20 cursor-not-allowed'
                      : 'bg-red-500/10 hover:bg-red-500/20'
                  }`}
                  disabled={abilities.skip}
                >
                  <SkipForward className="w-6 h-6 mb-2 text-red-400" />
                  <span className="text-xs text-red-300">تجاوز</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TeamsBoard;