// src/pages/Game.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeGameQuery } from '../services/queries/game';
import { useUpdateGameProgressMutation } from '../services/mutations/game/updateGameProgress';
import toast from 'react-hot-toast';

interface Team {
  id: number;
  name: string;
  score: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  image: string | null;
  icon?: string;
}

interface GameData {
  id: number;
  name: string;
  teams: Team[];
  categories: Category[];
  status: string;
  progress_data: Record<string, {
    easy: { selected: number[]; answered: number[] };
    medium: { selected: number[]; answered: number[] };
    hard: { selected: number[]; answered: number[] };
  }>;
  current_turn: number;
  created_at: string;
  updated_at: string;
}

const Game = () => {
  const navigate = useNavigate();

  // Redirect to login if token is missing.
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/auth', { state: { from: '/game' }, replace: true });
    }
  }, [navigate]);

  // Fetch game data.
  const { data: gameData, isLoading, isError } = useResumeGameQuery<GameData>();

  // Local copy for immediate UI updates.
  const [localGameData, setLocalGameData] = useState<GameData | null>(null);
  useEffect(() => {
    if (gameData) {
      setLocalGameData(gameData);
      console.log("Game data:", gameData);
    }
  }, [gameData]);

  // Mutation to update game progress.
  const { mutate: updateProgress } = useUpdateGameProgressMutation();

  // Modal state for showing a question.
  const [currentQuestion, setCurrentQuestion] = useState<{
    id: number;
    text: string;
    points: number;
    options: string[];
    categoryId: number;
    difficulty: 'easy' | 'medium' | 'hard';
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState(60);

  // Track current team index (should mirror localGameData.current_turn).
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  // Start countdown timer when modal is open.
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (modalVisible && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    if (modalVisible && timer === 0) {
      toast.error('انتهى الوقت!');
      closeModal();
    }
    return () => clearInterval(interval);
  }, [modalVisible, timer]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setTimer(60);
    setCurrentQuestion(null);
  }, []);

  // Helper: convert points value to difficulty.
  const getDifficultyFromPoints = (points: number): 'easy' | 'medium' | 'hard' => {
    if (points === 300) return 'easy';
    if (points === 500) return 'medium';
    return 'hard';
  };

  // When a user clicks a circle for a specific question.
  const handleQuestionCircleClick = (category: Category, points: number, questionId: number, difficulty: 'easy' | 'medium' | 'hard') => {
    setCurrentQuestion({
      id: questionId,
      text: `هذا سؤال بقيمة ${points} نقطة لفئة ${category.name}.`,
      points,
      options: ['الخيار أ', 'الخيار ب', 'الخيار ج', 'الخيار د'],
      categoryId: category.id,
      difficulty,
    });
    setModalVisible(true);
    setTimer(60);
  };

  // Handle answer selection. (No negative marking.)
  const handleAnswer = (selectedOption: string, optionIndex: number) => {
    if (!currentQuestion || !localGameData) return;
    const isCorrect = optionIndex === 0; // Assume first option is correct.
    const pointsAwarded = isCorrect ? currentQuestion.points : 0;
    toast[isCorrect ? 'success' : 'error'](
      isCorrect
        ? `إجابة صحيحة! تمت إضافة ${pointsAwarded} نقطة.`
        : `إجابة خاطئة! لم يتم إضافة نقاط.`
    );
    const currentTeam = localGameData.teams[localGameData.current_turn];
    if (!currentTeam) {
      toast.error("فريق غير موجود");
      return;
    }
    // Call update mutation.
    updateProgress(
      {
        game_id: localGameData.id,
        category_id: currentQuestion.categoryId,
        difficulty: currentQuestion.difficulty,
        question_id: currentQuestion.id,
        team_id: currentTeam.id,
        points_awarded: pointsAwarded,
      },
      {
        onSuccess: (data) => {
          console.log("Update progress success:", data);
          // Update local game data.
          setLocalGameData(prev =>
            prev ? { ...prev, teams: data.teams, current_turn: data.current_turn } : prev
          );
        },
        onError: (error: any) => {
          console.error("Update progress error:", error);
          toast.error('حدث خطأ أثناء تحديث التقدم.');
        },
      }
    );
    closeModal();
  };

  // Helper: determine if a given question (by id) is answered.
  const isQuestionAnswered = (categoryId: number, difficulty: 'easy' | 'medium' | 'hard', qid: number): boolean => {
    if (!localGameData) return false;
    const catProgress = localGameData.progress_data[String(categoryId)];
    if (!catProgress || !catProgress[difficulty]) return false;
    return catProgress[difficulty].answered.includes(qid);
  };

  // Check if a difficulty row is fully complete.
  const isDifficultyComplete = (category: Category, difficulty: 'easy' | 'medium' | 'hard'): boolean => {
    if (!localGameData) return false;
    const catProgress = localGameData.progress_data[String(category.id)];
    if (!catProgress || !catProgress[difficulty]) return false;
    return catProgress[difficulty].answered.length >= catProgress[difficulty].selected.length;
  };

  const categories: Category[] = localGameData?.categories || [];
  const teams: Team[] = localGameData?.teams || [];
  const gameName = localGameData?.name || 'Game';

  if (isLoading || !localGameData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading game data...
      </div>
    );
  }
  if (isError || !localGameData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Error loading game data. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-gray-900 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Game Name Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold mb-2">{gameName}</h1>
          <p className="text-xl">
            الحالة: <span className="text-green-400">{localGameData.status}</span>
          </p>
        </header>

        {/* Teams Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">المجموعات</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {teams.map(team => (
              <div key={team.id} className="bg-white/10 rounded-xl p-4 flex flex-col items-center w-56">
                <h3 className="text-2xl font-bold mb-2">{team.name}</h3>
                <p className="text-3xl font-extrabold mb-2">{team.score} نقطة</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const updatedTeams = teams.map(t =>
                        t.id === team.id ? { ...t, score: t.score + 10 } : t
                      );
                      setLocalGameData({ ...localGameData, teams: updatedTeams });
                    }}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      const updatedTeams = teams.map(t =>
                        t.id === team.id ? { ...t, score: t.score - 10 } : t
                      );
                      setLocalGameData({ ...localGameData, teams: updatedTeams });
                    }}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    –
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-4">الفئات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: Category) => (
              <div key={category.id} className="bg-white/5 shadow-lg backdrop-blur-md p-6 rounded-lg border border-white/10 relative">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                    <p className="mt-2 text-sm text-gray-300">{category.description}</p>
                  </div>
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="mt-4 md:mt-0 w-40 h-auto rounded-lg shadow-md object-cover"
                    />
                  )}
                </div>
                {/* For each difficulty, show two circle buttons */}
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  {(['easy', 'medium', 'hard'] as const).map(difficulty => {
                    // Determine the points value for this difficulty.
                    const pointsValue = difficulty === 'easy' ? 300 : difficulty === 'medium' ? 500 : 700;
                    // Get the list of selected question IDs for this category and difficulty.
                    const catProgress = localGameData.progress_data[String(category.id)];
                    const selectedQuestions: number[] = catProgress ? catProgress[difficulty].selected : [];
                    return (
                      <div key={difficulty} className="flex gap-2">
                        {selectedQuestions.map(qid => {
                          const answered = isQuestionAnswered(category.id, difficulty, qid);
                          return (
                            <button
                              key={qid}
                              onClick={() => {
                                if (!answered) {
                                  handleQuestionCircleClick(category, pointsValue, qid, difficulty);
                                }
                              }}
                              disabled={answered}
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-colors ${
                                answered
                                  ? 'bg-gray-600 opacity-50 cursor-not-allowed'
                                  : difficulty === 'easy'
                                  ? 'bg-green-500 hover:bg-green-600'
                                  : difficulty === 'medium'
                                  ? 'bg-yellow-500 hover:bg-yellow-600'
                                  : 'bg-red-500 hover:bg-red-600'
                              }`}
                            >
                              {pointsValue}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back to Home Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full text-xl font-bold transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>

      {/* Question Modal */}
      {modalVisible && currentQuestion && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-xl w-full relative shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">{currentQuestion.text}</h2>
            <p className="mb-4 text-xl">{currentQuestion.points} نقطة</p>
            <div className="mb-4">
              <ul className="space-y-2">
                {currentQuestion.options.map((option, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleAnswer(option, idx)}
                    className="bg-white/10 p-3 rounded hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl">الوقت المتبقي: {timer}s</span>
              <button
                onClick={closeModal}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
