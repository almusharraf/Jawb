import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, []);

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

  // Get categories from state
  const categories = location.state?.categories || [];

  const questions: Question[][] = (location.state?.categories || []).map(cat => [
    {
      id: `${cat.id}-1`,
      category: cat.id,
      points: 100,
      question: `سؤال 100 نقطة عن ${cat.name}`,
      answer: "الإجابة الصحيحة",
      isAnswered: false
    },
    {
      id: `${cat.id}-2`,
      category: cat.id,
      points: 300,
      question: `سؤال 300 نقطة عن ${cat.name}`,
      answer: "الإجابة الصحيحة",
      isAnswered: false
    },
    {
      id: `${cat.id}-3`,
      category: cat.id,
      points: 500,
      question: `سؤال 500 نقطة عن ${cat.name}`,
      answer: "الإجابة الصحيحة",
      isAnswered: false
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const handleQuestionClick = (question: Question) => {
    if (!question.isAnswered) {
      setCurrentQuestion(question);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (currentQuestion) {
      const updatedTeams = currentTeam === 1 ? {...team1} : {...team2};
      updatedTeams.score += isCorrect ? currentQuestion.points : -Math.round(currentQuestion.points/2);
      
      currentTeam === 1 ? setTeam1(updatedTeams) : setTeam2(updatedTeams);
      
      setQuestions(prev => prev.map(cat => 
        cat.map(q => q.id === currentQuestion.id ? {...q, isAnswered: true} : q)
      ));
      
      setCurrentQuestion(null);
      setCurrentTeam(currentTeam === 1 ? 2 : 1);
    }
  };

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
                  onClick={() => handleQuestionClick(categoryQuestions[row])}
                  className={`
                    aspect-square rounded-xl text-2xl font-bold
                    ${categoryQuestions[row].isAnswered 
                      ? 'bg-primary-800/20 text-primary-600/50 cursor-not-allowed'
                      : 'bg-primary-700 hover:bg-primary-600 transition-colors cursor-pointer'
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

      {currentQuestion && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-blue-900 rounded-2xl p-8 max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-6 text-white">{currentQuestion.question}</h3>
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => handleAnswer(true)}
                className="bg-green-500/20 text-green-400 p-4 rounded-xl hover:bg-green-500/30 text-lg font-medium"
              >
                إجابة صحيحة
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="bg-red-500/20 text-red-400 p-4 rounded-xl hover:bg-red-500/30 text-lg font-medium"
              >
                إجابة خاطئة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game; 