// src/components/AwardModal.tsx
import React from 'react';
import { Team, Question } from '../pages/Game';

interface AwardModalProps {
  question: Question;
  teams: Team[];
  onAward: (teamId: number | null) => void;
  onClose: () => void;
  answerChosen: number | null;
}

const AwardModal: React.FC<AwardModalProps> = ({ question, teams, onAward, onClose, answerChosen }) => {
  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">نتيجة السؤال</h2>
        <p className="mb-2 text-xl">
          الإجابة الصحيحة:{' '}
          <span className="text-green-400">
            {question.options && question.options.length > 0 ? question.options[0] : 'الإجابة الافتراضية'}
          </span>
        </p>
        <p className="mb-4 text-xl">
          إجابتك:{' '}
          <span className={answerChosen !== null && answerChosen === 0 ? 'text-green-400' : 'text-red-400'}>
            {question.options && question.options.length > 0
              ? answerChosen !== null
                ? question.options[answerChosen]
                : 'لم يتم الإجابة'
              : 'لا توجد إجابة'}
          </span>
        </p>
        <p className="mb-4 text-lg">
          اختر المجموعة التي تُمنح لها النقاط أو اختر "لا أحد" إذا لم يجب أحد:
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => onAward(team.id)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition-transform px-4 py-2 rounded"
            >
              {team.name}
            </button>
          ))}
          <button onClick={() => onAward(null)} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">
            لا أحد
          </button>
        </div>
        <button onClick={onClose} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default AwardModal;
