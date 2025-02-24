// src/components/TeamsBoard.tsx
import React from 'react';
import { Team, TeamAbilities } from '../pages/Game';
import toast from 'react-hot-toast';

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
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4 text-center">المجموعات</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl w-72 ${
              currentTurn === team.id ? 'border-2 border-yellow-400' : ''
            }`}
          >
            <h3 className="text-2xl font-bold mb-2 text-center truncate" title={team.name}>
              {team.name}
            </h3>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <button
                onClick={() => onScoreChange(team.id, -100)}
                className="bg-red-500 hover:bg-red-600 p-2 rounded-full"
              >
                –
              </button>
              <p className="text-3xl font-extrabold">{team.score} نقطة</p>
              <button
                onClick={() => onScoreChange(team.id, 100)}
                className="bg-green-500 hover:bg-green-600 p-2 rounded-full"
              >
                +
              </button>
            </div>
            <div className="flex justify-around">
              {/** Call Friend Ability */}
              <button
                onClick={() => {
                  if (teamAbilities[team.id]?.callFriend) {
                    toast.error('تم استخدام ميزة الاتصال مسبقاً!');
                  } else {
                    setTeamAbilities((prev) => ({
                      ...prev,
                      [team.id]: { ...prev[team.id], callFriend: true },
                    }));
                    toast.success('تم استخدام ميزة الاتصال!');
                  }
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition-transform ${
                  teamAbilities[team.id]?.callFriend ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                ☎
              </button>
              {/** Two Answers Ability */}
              <button
                onClick={() => {
                  if (teamAbilities[team.id]?.twoAnswers) {
                    toast.error('تم استخدام ميزة جوابين مسبقاً!');
                  } else {
                    setTeamAbilities((prev) => ({
                      ...prev,
                      [team.id]: { ...prev[team.id], twoAnswers: true },
                    }));
                    toast.success('تم استخدام ميزة جوابين!');
                  }
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-green-500 hover:bg-green-600 transition-transform ${
                  teamAbilities[team.id]?.twoAnswers ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                2️⃣
              </button>
              {/** Skip Ability */}
              <button
                onClick={() => {
                  if (teamAbilities[team.id]?.skip) {
                    toast.error('تم استخدام ميزة التجاوز مسبقاً!');
                  } else {
                    setTeamAbilities((prev) => ({
                      ...prev,
                      [team.id]: { ...prev[team.id], skip: true },
                    }));
                    toast.success('تم استخدام ميزة التجاوز!');
                  }
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 transition-transform ${
                  teamAbilities[team.id]?.skip ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                ⏭
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamsBoard;
