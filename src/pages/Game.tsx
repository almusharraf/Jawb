import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, HelpCircle, SkipForward } from 'lucide-react';
import { saudiQuestions as initialSaudiQuestions } from '../data/saudiQuestions';
import { FixedSizeList as List } from 'react-window';
import toast from 'react-hot-toast';

interface Question {
  id: string;
  text: string;
  options: Option[];
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeBonus?: number;
  isAnswered: boolean;
  categoryId: string;
  startTime?: number;
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
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { 
          from: '/game',
          gameData: location.state 
        },
        replace: true
      });
      return;
    }

    if (!location.state) {
      navigate('/');
      return;
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

  const questions = initialSaudiQuestions.categories
    .filter(cat => categories.some(c => c.id === cat.id));

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  // Add these state variables
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);

  // Add to game state
  const [questionLevel, setQuestionLevel] = useState(1);

  const [saudiQuestions, setSaudiQuestions] = useState(() => ({
    categories: initialSaudiQuestions.categories.map(cat => ({
      ...cat,
      questions: cat.questions.map(q => ({
        ...q,
        isAnswered: false,
        categoryId: cat.id
      }))
    }))
  }));

  // Add state for game end
  const [isGameOver, setIsGameOver] = useState(false);

  // Add function to check if game is over
  const checkGameOver = () => {
    const allQuestionsAnswered = saudiQuestions.categories.every(cat =>
      cat.questions.every(q => q.isAnswered)
    );
    
    if (allQuestionsAnswered) {
      setIsGameOver(true);
    }
  };

  const handleQuestionClick = (categoryId: string, difficulty: 'easy' | 'medium' | 'hard') => {
    const category = saudiQuestions.categories.find(c => c.id === categoryId);
    if (!category) return;

    const availableQuestions = category.questions.filter(q => 
      q.difficulty === difficulty && !q.isAnswered
    );

    if (availableQuestions.length === 0) return;

    const randomQuestion = availableQuestions[
      Math.floor(Math.random() * availableQuestions.length)
    ];
    
    setCurrentQuestion({
      ...randomQuestion,
      categoryId,
      isAnswered: false,
      startTime: Date.now()
    });
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentQuestion) return;

    const answerTime = Date.now() - (currentQuestion.startTime || 0);
    let finalPoints = isCorrect ? currentQuestion.points : -Math.floor(currentQuestion.points * 0.5);
    
    if (isCorrect && answerTime < 5000) {
      finalPoints += Math.floor(currentQuestion.points * 0.2);
      toast.success(`إجابة صحيحة! +${finalPoints} نقطة مع مكافأة السرعة 🚀`);
    } else if (isCorrect) {
      toast.success(`إجابة صحيحة! +${finalPoints} نقطة`);
    } else {
      toast.error(`إجابة خاطئة! ${finalPoints} نقطة`);
    }

    // Update team score
    const updatedTeams = currentTeam === 1 ? {...team1} : {...team2};
    updatedTeams.score += finalPoints;
    
    // Show result animation/feedback
    // TODO: Add visual feedback for correct/wrong answers
    
    // Update teams and questions
    currentTeam === 1 ? setTeam1(updatedTeams) : setTeam2(updatedTeams);
    
    // Mark question as answered
    setSaudiQuestions(prev => ({
      categories: prev.categories.map(cat => 
        cat.id === currentQuestion.categoryId
          ? {
              ...cat,
              questions: cat.questions.map(q =>
                q.id === currentQuestion.id ? {...q, isAnswered: true} : q
              )
            }
          : cat
      )
    }));

    // Switch teams
    setCurrentQuestion(null);
    setCurrentTeam(currentTeam === 1 ? 2 : 1);

    // Check if game is over after updating questions
    checkGameOver();

    if (isGameOver) {
      toast.success('انتهت اللعبة! 🎉', { duration: 5000 });
    }
  };

  const useHelper = (helperType: 'skip' | 'fiftyFifty' | 'friend') => {
    const penaltyPoints = {
      skip: 30,
      fiftyFifty: 20,
      friend: 50
    };

    // Update team score with penalty
    const updatedTeams = currentTeam === 1 ? {...team1} : {...team2};
    updatedTeams.score -= penaltyPoints[helperType];
    
    // Update helpers left
    updatedTeams.helpersLeft[helperType] -= 1;
    
    // Update state
    currentTeam === 1 ? setTeam1(updatedTeams) : setTeam2(updatedTeams);

    const helperNames = {
      skip: 'تخطي السؤال',
      fiftyFifty: 'حذف إجابتين',
      friend: 'مساعدة صديق'
    };

    try {
      toast(`تم استخدام ${helperNames[helperType]} 🎯`);
    } catch (error) {
      toast.error('حدث خطأ أثناء استخدام المساعدة');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-4">
      {/* Teams Header */}
      <div className="flex justify-between mb-8">
        {/* Team 1 */}
        <div className="flex items-center gap-4 bg-purple-900/50 p-4 rounded-2xl">
          <div className="text-right">
            <h3 className="text-xl font-bold">{team1.name}</h3>
            <p className="text-3xl font-bold text-white">{team1.score}</p>
          </div>
          <div className="flex gap-2">
            {Object.entries(team1.helpersLeft).map(([type, count]) => (
              <div key={type} className="bg-purple-800/50 p-2 rounded-lg text-center">
                <span className="text-sm">{count}</span>
                <span className="text-xs block">متبقي</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex items-center gap-4 bg-purple-900/50 p-4 rounded-2xl">
          <div className="text-right">
            <h3 className="text-xl font-bold">{team2.name}</h3>
            <p className="text-3xl font-bold text-white">{team2.score}</p>
          </div>
          <div className="flex gap-2">
            {Object.entries(team2.helpersLeft).map(([type, count]) => (
              <div key={type} className="bg-purple-800/50 p-2 rounded-lg text-center">
                <span className="text-sm">{count}</span>
                <span className="text-xs block">متبقي</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-1 gap-8">
        {categories.map(category => (
          <div key={category.id} className="relative">
            <h3 className="text-2xl font-bold mb-4 text-center">{category.name}</h3>
            <div className="flex justify-center gap-4">
              {[
                { points: 100, color: 'from-green-500 to-green-600' },
                { points: 300, color: 'from-yellow-500 to-yellow-600' },
                { points: 500, color: 'from-red-500 to-red-600' }
              ].map(({ points, color }) => (
                <button
                  key={points}
                  onClick={() => handleQuestionClick(category.id, 
                    points === 100 ? 'easy' : points === 300 ? 'medium' : 'hard'
                  )}
                  className={`
                    w-32 h-32 bg-gradient-to-br ${color}
                    rounded-2xl flex flex-col items-center justify-center
                    hover:scale-105 transition-transform
                    relative overflow-hidden
                  `}
                >
                  <span className="text-3xl font-bold">{points}</span>
                  <span className="text-sm">نقطة</span>
                  <div className="absolute bottom-2 text-xs opacity-80">
                    {category.questions.filter(q => 
                      !q.isAnswered && 
                      (points === 100 ? q.difficulty === 'easy' : 
                       points === 300 ? q.difficulty === 'medium' : 
                       q.difficulty === 'hard')
                    ).length} أسئلة متبقية
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Question Modal */}
      {currentQuestion && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8 max-w-2xl w-full">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{currentQuestion.text}</h3>
              <span className="text-xl text-yellow-400">{currentQuestion.points} نقطة</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.isCorrect)}
                  className="bg-white/10 hover:bg-white/20 p-6 rounded-xl text-lg
                    transition-all hover:scale-105"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-blue-900 rounded-2xl p-8 max-w-2xl w-full text-center">
            <h2 className="text-4xl font-bold text-white mb-8">نهاية اللعبة!</h2>
            
            <div className="space-y-6 mb-8">
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {team1.score > team2.score ? team1.name : team2.name}
                </h3>
                <p className="text-3xl font-bold text-green-400">الفريق الفائز! 🏆</p>
                <p className="text-xl text-white/80 mt-2">
                  {Math.max(team1.score, team2.score)} نقطة
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white">{team1.name}</h4>
                  <p className="text-2xl font-bold text-white/90">{team1.score}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white">{team2.name}</h4>
                  <p className="text-2xl font-bold text-white/90">{team2.score}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Add difficulty color helper
const getDifficultyColor = (difficulty: string) => {
  switch(difficulty) {
    case 'easy': return 'bg-green-500 hover:bg-green-600';
    case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
    case 'hard': return 'bg-red-500 hover:bg-red-600';
    default: return 'bg-gray-500';
  }
};

// Add proper type annotation for the component
const MemoizedQuestionButton = React.memo<{
  difficulty: string;
  points: number;
  questionsLeft: number;
  onClick: () => void;
}>(({ difficulty, points, questionsLeft, onClick }) => (
  <button
    onClick={onClick}
    className={`
      p-6 rounded-xl text-xl font-bold transition-all
      ${getDifficultyColor(difficulty)}
      ${questionsLeft === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
    `}
    disabled={questionsLeft === 0}
  >
    <div>{points} نقطة</div>
    <div className="text-sm font-normal mt-1">
      {questionsLeft} أسئلة متبقية
    </div>
  </button>
));

export default Game; 