import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, HelpCircle, SkipForward } from 'lucide-react';

interface Question {
  id: string;
  category: string;
  points: number;
  question: string;
  answer: string;
  isAnswered: boolean;
}

interface TeamState {
  name: string;
  score: number;
  players: number;
  helpersLeft: {
    skip: number;
    fiftyFifty: number;
    time: number;
  };
}

const Game = () => {
  const location = useLocation();
  const [team1, setTeam1] = useState<TeamState>({
    name: location.state?.team1Name || 'الفريق الأول',
    score: 0,
    players: location.state?.team1Players || 1,
    helpersLeft: {
      skip: 2,
      fiftyFifty: 2,
      time: 2
    }
  });

  const [team2, setTeam2] = useState<TeamState>({
    name: location.state?.team2Name || 'الفريق الثاني',
    score: 0,
    players: location.state?.team2Players || 1,
    helpersLeft: {
      skip: 2,
      fiftyFifty: 2,
      time: 2
    }
  });

  const [currentTeam, setCurrentTeam] = useState<1 | 2>(1);

  const categories = [
    { id: 'kuwait', name: 'الكويت', icon: '🏰' },
    { id: 'islamic', name: 'إسلامي', icon: '🕌' },
    { id: 'sports', name: 'رياضي', icon: '⚽' },
    { id: 'buildings', name: 'مباني', icon: '🏛️' },
    { id: 'traditions', name: 'تقاليد', icon: '👔' },
    { id: 'history', name: 'تاريخ', icon: '📚' }
  ];

  const questions: Question[][] = categories.map(cat => [
    { id: `${cat.id}-1`, category: cat.id, points: 200, question: '', answer: '', isAnswered: false },
    { id: `${cat.id}-2`, category: cat.id, points: 400, question: '', answer: '', isAnswered: false },
    { id: `${cat.id}-3`, category: cat.id, points: 600, question: '', answer: '', isAnswered: false }
  ]);

  return (
    <div className="min-h-screen bg-primary-900 text-white p-4">
      <div className="container mx-auto">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-8">
          {/* Team 1 */}
          <div className={`p-4 rounded-xl ${currentTeam === 1 ? 'bg-primary-700' : 'bg-primary-800/50'}`}>
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-bold">{team1.name}</h3>
                <p className="text-2xl font-bold text-primary-300">{team1.score}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-primary-600/50 hover:bg-primary-600" 
                  disabled={team1.helpersLeft.skip === 0}>
                  <SkipForward className="w-5 h-5" />
                  <span className="text-xs">{team1.helpersLeft.skip}</span>
                </button>
                <button className="p-2 rounded-lg bg-primary-600/50 hover:bg-primary-600"
                  disabled={team1.helpersLeft.fiftyFifty === 0}>
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-xs">{team1.helpersLeft.fiftyFifty}</span>
                </button>
                <button className="p-2 rounded-lg bg-primary-600/50 hover:bg-primary-600"
                  disabled={team1.helpersLeft.time === 0}>
                  <Clock className="w-5 h-5" />
                  <span className="text-xs">{team1.helpersLeft.time}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Team 2 */}
          <div className={`p-4 rounded-xl ${currentTeam === 2 ? 'bg-primary-700' : 'bg-primary-800/50'}`}>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <h3 className="text-xl font-bold">{team2.name}</h3>
                <p className="text-2xl font-bold text-primary-300">{team2.score}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-primary-600/50 hover:bg-primary-600"
                  disabled={team2.helpersLeft.skip === 0}>
                  <SkipForward className="w-5 h-5" />
                  <span className="text-xs">{team2.helpersLeft.skip}</span>
                </button>
                <button className="p-2 rounded-lg bg-primary-600/50 hover:bg-primary-600"
                  disabled={team2.helpersLeft.fiftyFifty === 0}>
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-xs">{team2.helpersLeft.fiftyFifty}</span>
                </button>
                <button className="p-2 rounded-lg bg-primary-600/50 hover:bg-primary-600"
                  disabled={team2.helpersLeft.time === 0}>
                  <Clock className="w-5 h-5" />
                  <span className="text-xs">{team2.helpersLeft.time}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-6 gap-4">
          {/* Category Headers */}
          {categories.map(category => (
            <div key={category.id} className="text-center bg-primary-800/50 p-4 rounded-xl">
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-bold">{category.name}</h3>
            </div>
          ))}

          {/* Questions Grid */}
          {[0, 1, 2].map(row => (
            <React.Fragment key={row}>
              {questions.map((categoryQuestions, colIndex) => (
                <button
                  key={`${row}-${colIndex}`}
                  className={`
                    aspect-square rounded-xl text-2xl font-bold
                    ${categoryQuestions[row].isAnswered 
                      ? 'bg-primary-800/20 text-primary-600/50 cursor-not-allowed'
                      : 'bg-primary-700 hover:bg-primary-600 transition-colors'
                    }
                  `}
                  disabled={categoryQuestions[row].isAnswered}
                >
                  {categoryQuestions[row].points}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game; 