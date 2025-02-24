// src/components/Game/QuestionModal.tsx
import React, { useEffect, useState } from 'react';
import { Question } from '../../pages/Game';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import useReplaceQuestion from '../../services/mutations/game/useReplaceQuestion';

interface QuestionModalProps {
  question: Question;
  onOptionClick: (selectedOption: string, optionIndex: number) => void;
  onNoOption: () => void;
  onClose: () => void;
  localGameData: any; // Replace with your proper game data type if available.
  setCurrentQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  onOptionClick,
  onNoOption,
  onClose,
  localGameData,
  setCurrentQuestion,
}) => {
  const [timer, setTimer] = useState(0);
  const [showReplaceConfirmation, setShowReplaceConfirmation] = useState(false);
  const replaceQuestion = useReplaceQuestion();

  // Guard: if localGameData or teams are not defined, do not render anything.
  if (!localGameData || !localGameData.teams) return null;

  // Determine the current team from localGameData (fallback to an empty object if not found)
  const currentTeam = localGameData.teams[localGameData.current_turn] || {};

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReplaceQuestion = () => {
    if (!question || !localGameData || !currentTeam) return;

    replaceQuestion.mutate(
      {
        gameId: localGameData.id,
        teamId: currentTeam.id,
        categoryId: question.categoryId,
        questionId: question.id,
        difficulty: question.difficulty,
      },
      {
        onSuccess: (data: any) => {
          // Update the current question with the new question ID returned from the backend.
          setCurrentQuestion((prev) =>
            prev ? { ...prev, id: data.new_question_id } : prev
          );
          toast.success('تم استبدال السؤال بنجاح');
          setShowReplaceConfirmation(false);
        },
        onError: () => {
          toast.error('فشل في استبدال السؤال');
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 max-w-2xl w-full relative shadow-2xl border border-white/10">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-xl font-bold text-green-400">
                {question.points} نقطة
              </span>
              <div className="w-px h-6 bg-white/20" />
              <span className="text-xl font-mono">{formatTime(timer)}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Question Content */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold leading-relaxed text-center mb-4">
            {question.text}
          </h2>
          {question.options && question.options.length > 0 ? (
            <ul className="space-y-3">
              {question.options.map((option, idx) => (
                <li
                  key={idx}
                  onClick={() => onOptionClick(option, idx)}
                  className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg group-hover:bg-white/20">
                      {String.fromCharCode(1632 + (idx + 1))}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center">
              <p className="mb-6 text-white/80">
                لا توجد خيارات لهذا السؤال
              </p>
              <button
                onClick={onNoOption}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 rounded-xl font-bold transition-all"
              >
                عرض الإجابة
              </button>
            </div>
          )}
        </div>

        {/* Teams Panel (Always Visible) */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-center text-white mb-2">
            فرق اللعبة
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {localGameData.teams.map((team: any) => (
              <div
                key={team.id}
                className="flex justify-between items-center bg-white/10 p-3 rounded-lg"
              >
                <div>
                  <p className="text-white font-semibold">{team.name}</p>
                  <p className="text-white/80 text-sm">النقاط: {team.score}</p>
                  <p className="text-white/80 text-sm">
                    القدرات:{" "}
                    {team.call_friend ? "اتصال " : ""}
                    {team.two_answers ? "جوابين " : ""}
                    {team.skip ? "تجاوز" : ""}
                  </p>
                </div>
                {/* For the current team with available replacements, show a button */}
                {team.id === currentTeam.id &&
                  currentTeam.replacements_used < currentTeam.max_replacements && (
                    <button
                      onClick={() =>
                        setShowReplaceConfirmation(!showReplaceConfirmation)
                      }
                      className="bg-purple-500 hover:bg-purple-600 px-3 py-2 rounded transition-colors text-white"
                    >
                      {showReplaceConfirmation ? "إخفاء" : "استبدال السؤال"}
                    </button>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Replacement Confirmation Panel */}
        {showReplaceConfirmation && (
          <div className="bg-white/10 p-4 rounded-xl mb-4">
            <p className="text-center text-white font-bold mb-4">
              هل تريد استبدال السؤال؟
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleReplaceQuestion}
                disabled={replaceQuestion.isLoading}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors text-white"
              >
                {replaceQuestion.isLoading
                  ? "جاري الاستبدال..."
                  : "تأكيد الاستبدال"}
              </button>
              <button
                onClick={() => setShowReplaceConfirmation(false)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors text-white"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;
