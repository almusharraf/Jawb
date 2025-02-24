// src/components/Header.tsx
import React from 'react';
import { Team, TeamAbilities } from '../../pages/Game';
import toast from 'react-hot-toast';

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
  return (
    <header className="flex flex-col items-center p-2">
      <h1 className="text-3xl font-extrabold mb-2">{gameName}</h1>
      {/* Teams row */}
      <div className="flex flex-wrap justify-center gap-4">
        {teams.map((team) => (
          <div key={team.id} className={`flex flex-col items-center bg-white/10 p-2 rounded-md ${currentTurn === team.id ? 'border-2 border-yellow-400' : ''}`}>
            <div className="text-lg font-bold">{team.name}</div>
            <div className="flex items-center gap-2 my-1">
              <button onClick={() => onScoreChange(team.id, -100)} className="bg-red-500 hover:bg-red-600 p-1 rounded">–</button>
              <span>{team.score}</span>
              <button onClick={() => onScoreChange(team.id, 100)} className="bg-green-500 hover:bg-green-600 p-1 rounded">+</button>
            </div>
            {/* Abilities */}
            <div className="flex gap-1">
              <button
                onClick={() => {
                  if (teamAbilities[team.id]?.callFriend) {
                    toast.error('استخدمت من قبل');
                  } else {
                    setTeamAbilities((prev) => ({
                      ...prev,
                      [team.id]: { ...prev[team.id], callFriend: true },
                    }));
                    toast.success('استخدمت الاتصال');
                  }
                }}
                className={`w-8 h-8 rounded flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition-transform ${teamAbilities[team.id]?.callFriend ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ☎
              </button>
              <button
                onClick={() => {
                  if (teamAbilities[team.id]?.twoAnswers) {
                    toast.error('استخدمت من قبل');
                  } else {
                    setTeamAbilities((prev) => ({
                      ...prev,
                      [team.id]: { ...prev[team.id], twoAnswers: true },
                    }));
                    toast.success('استخدمت جوابين');
                  }
                }}
                className={`w-8 h-8 rounded flex items-center justify-center bg-green-500 hover:bg-green-600 transition-transform ${teamAbilities[team.id]?.twoAnswers ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                2️⃣
              </button>
              <button
                onClick={() => {
                  if (teamAbilities[team.id]?.skip) {
                    toast.error('استخدمت من قبل');
                  } else {
                    setTeamAbilities((prev) => ({
                      ...prev,
                      [team.id]: { ...prev[team.id], skip: true },
                    }));
                    toast.success('استخدمت التجاوز');
                  }
                }}
                className={`w-8 h-8 rounded flex items-center justify-center bg-red-500 hover:bg-red-600 transition-transform ${teamAbilities[team.id]?.skip ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ⏭
              </button>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
