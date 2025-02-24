import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

import { useResumeGameQuery } from '../services/queries/game';
import { useUpdateGameProgressMutation } from '../services/mutations/game/updateGameProgress';

import Header from '../components/Game/Header';
import CategoriesBoard from '../components/Game/CategoriesBoard';
import QuestionModal from '../components/Game/QuestionModal';
import AwardModal from '../components/Game/AwardModal';

export interface Team {
  id: number;
  name: string;
  score: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string | null;
  icon?: string;
}

export interface GameData {
  id: number;
  name: string;
  teams: Team[];
  categories: Category[];
  status: string;
  progress_data: Record<
    string,
    {
      easy: { selected: number[]; answered: number[] };
      medium: { selected: number[]; answered: number[] };
      hard: { selected: number[]; answered: number[] };
    }
  >;
  current_turn: number;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: number;
  text: string;
  points: number;
  options?: string[];
  categoryId: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TeamAbilities {
  callFriend: boolean;
  twoAnswers: boolean;
  skip: boolean;
}

const Game = () => {
  const navigate = useNavigate();

  // Redirect if not logged in.
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/auth', { state: { from: '/game' }, replace: true });
    }
  }, [navigate]);

  // Fetch game data.
  const { data: gameData, isLoading, isError } = useResumeGameQuery<GameData>();
  const [localGameData, setLocalGameData] = useState<GameData | null>(null);

  useEffect(() => {
    if (gameData) {
      setLocalGameData(gameData);
      console.log('Game data:', gameData);
    }
  }, [gameData]);

  // Mutation for updating game progress.
  const { mutate: updateProgress } = useUpdateGameProgressMutation();

  // Modal and question states.
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [awardModalVisible, setAwardModalVisible] = useState(false);
  const [answerChosen, setAnswerChosen] = useState<number | null>(null);
  const [timer, setTimer] = useState(60);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(new Set());
  const [teamAbilities, setTeamAbilities] = useState<Record<number, TeamAbilities>>({});
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Initialize team abilities once game data is loaded.
  useEffect(() => {
    if (localGameData) {
      const abilities: Record<number, TeamAbilities> = {};
      localGameData.teams.forEach((team) => {
        abilities[team.id] = { 
          callFriend: team.call_friend,
          twoAnswers: team.two_answers,
          skip: team.skip,
        };
      });
      setTeamAbilities(abilities);
    }
  }, [localGameData]);
  

  // Timer logic for question modal.
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (questionModalVisible && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    if (questionModalVisible && timer === 0) {
      toast.error('انتهى الوقت!');
      closeQuestionModal();
    }
    return () => clearInterval(interval);
  }, [questionModalVisible, timer]);

  const closeQuestionModal = useCallback(() => {
    setQuestionModalVisible(false);
    setTimer(60);
    if (currentQuestion) {
      setSelectedQuestions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(currentQuestion.id);
        return newSet;
      });
    }
    setCurrentQuestion(null);
  }, [currentQuestion]);

  const handleQuestionCircleClick = (
    category: Category,
    points: number,
    questionId: number,
    difficulty: 'easy' | 'medium' | 'hard'
  ) => {
    setSelectedQuestions((prev) => new Set(prev).add(questionId));
    const question: Question = {
      id: questionId,
      text: `هذا سؤال بقيمة ${points} لفئة ${category.name}.`,
      points,
      options: ['أ', 'ب', 'ج', 'د'],
      categoryId: category.id,
      difficulty,
    };
    setCurrentQuestion(question);
    setQuestionModalVisible(true);
    setTimer(60);
  };

  const handleOptionClick = (selectedOption: string, optionIndex: number) => {
    if (!currentQuestion) return;
    setAnswerChosen(optionIndex);
    setQuestionModalVisible(false);
    setAwardModalVisible(true);
  };

  const handleNoOptionAnswer = () => {
    setAnswerChosen(-1);
    setQuestionModalVisible(false);
    setAwardModalVisible(true);
  };

  const isQuestionAnswered = (
    categoryId: number,
    difficulty: 'easy' | 'medium' | 'hard',
    qid: number
  ): boolean => {
    if (selectedQuestions.has(qid)) return true;
    if (!localGameData) return false;
    const catProgress = localGameData.progress_data[String(categoryId)];
    if (!catProgress || !catProgress[difficulty]) return false;
    return catProgress[difficulty].answered.includes(qid);
  };

  const isGameComplete = (progressData: GameData['progress_data']) => {
    for (let catId in progressData) {
      const difficulties = progressData[catId];
      for (let diff in difficulties) {
        if (difficulties[diff].answered.length < difficulties[diff].selected.length) {
          return false;
        }
      }
    }
    return true;
  };

  const getWinningTeam = (teams: Team[]) => {
    return teams.reduce((prev, current) => (prev.score > current.score ? prev : current));
  };

  const handleAward = (teamId: number | null) => {
    if (!currentQuestion || !localGameData) return;
    const pointsAwarded = teamId ? currentQuestion.points : 0;
    const updatedProgressData = { ...localGameData.progress_data };
    const catIdStr = String(currentQuestion.categoryId);
    if (updatedProgressData[catIdStr]) {
      updatedProgressData[catIdStr][currentQuestion.difficulty].answered = [
        ...updatedProgressData[catIdStr][currentQuestion.difficulty].answered,
        currentQuestion.id,
      ];
    }

    updateProgress(
      {
        game_id: localGameData.id,
        category_id: currentQuestion.categoryId,
        difficulty: currentQuestion.difficulty,
        question_id: currentQuestion.id,
        team_id: teamId ? teamId : 0,
        points_awarded: pointsAwarded,
      },
      {
        onSuccess: (data) => {
          setLocalGameData((prev) =>
            prev
              ? {
                  ...prev,
                  teams: data.teams,
                  current_turn: data.current_turn,
                  progress_data: updatedProgressData,
                }
              : prev
          );
          if (isGameComplete(updatedProgressData)) {
            const winningTeam = getWinningTeam(data.teams);
            toast.success(`انتهت اللعبة! الفائز: ${winningTeam.name}`);
            setTimeout(() => {
              navigate('/');
            }, 3000);
          }
        },
        onError: (error: any) => {
          toast.error('حدث خطأ أثناء تحديث التقدم.');
        },
      }
    );
    setAwardModalVisible(false);
    setAnswerChosen(null);
    setCurrentQuestion(null);
  };

  const handleLeaveGame = () => {
    setShowLeaveModal(true);
  };

  const confirmLeaveGame = () => {
    setShowLeaveModal(false);
    navigate('/');
  };

  const cancelLeaveGame = () => {
    setShowLeaveModal(false);
  };

  // Update team score manually (+/- in 100 increments)
  const handleTeamScoreChange = (teamId: number, delta: number) => {
    if (!localGameData) return;
    const updatedTeams = localGameData.teams.map((team) =>
      team.id === teamId ? { ...team, score: team.score + delta } : team
    );
    setLocalGameData({ ...localGameData, teams: updatedTeams });
    toast.success(`تم ${(delta > 0 ? 'زيادة' : 'نقصان')} ${Math.abs(delta)}`);
  };

  if (isLoading || !localGameData) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-xl">
        Loading game data...
      </div>
    );
  }
  if (isError || !localGameData) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-xl">
        Error loading game data. Please try again.
      </div>
    );
  }

  return (
    // Main container that fills the viewport without scrolling.
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-800 to-gray-900 text-white relative">
      {/* Back Arrow (Leave Game) */}
      <button
        onClick={handleLeaveGame}
        className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
        title="العودة للرئيسية"
      >
        <ArrowLeft className="h-6 w-6 text-white" />
      </button>

      {/* Header with Game Name and Teams */}
      <Header
        gameName={localGameData.name}
        teams={localGameData.teams}
        currentTurn={localGameData.current_turn}
        onScoreChange={handleTeamScoreChange}
        teamAbilities={teamAbilities}
        setTeamAbilities={setTeamAbilities}
      />

      {/* Categories grid occupies the remaining space */}
      <div className="flex-grow p-2 overflow-hidden">
        <CategoriesBoard
          categories={localGameData.categories}
          progressData={localGameData.progress_data}
          onQuestionClick={handleQuestionCircleClick}
          isQuestionAnswered={isQuestionAnswered}
        />
      </div>

      {/* Footer showing current turn */}
      <div className="flex-none p-2 text-center text-xl bg-gray-800">
        دور المجموعة: {localGameData.teams[localGameData.current_turn]?.name}
      </div>

      {/* Modals */}
      {questionModalVisible && currentQuestion && (
        <QuestionModal
          question={currentQuestion}
          timer={timer}
          onOptionClick={handleOptionClick}
          onNoOption={handleNoOptionAnswer}
          onClose={closeQuestionModal}
        />
      )}

      {awardModalVisible && currentQuestion && (
        <AwardModal
          question={currentQuestion}
          teams={localGameData.teams}
          onAward={handleAward}
          onClose={() => setAwardModalVisible(false)}
          answerChosen={answerChosen}
        />
      )}

      {/* Leave Game Confirmation Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              هل أنت متأكد أنك تريد مغادرة اللعبة؟
            </h2>
            <div className="flex justify-around">
              <button onClick={confirmLeaveGame} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white font-bold">
                نعم
              </button>
              <button onClick={cancelLeaveGame} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-white font-bold">
                لا
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
