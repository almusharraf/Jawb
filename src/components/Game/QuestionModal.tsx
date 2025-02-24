// src/components/QuestionModal.tsx
import React from 'react';
import { Question } from '../pages/Game';

interface QuestionModalProps {
  question: Question;
  timer: number;
  onOptionClick: (selectedOption: string, optionIndex: number) => void;
  onNoOption: () => void;
  onClose: () => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ question, timer, onOptionClick, onNoOption, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-xl w-full relative shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">{question.text}</h2>
        <p className="mb-4 text-xl">{question.points} نقطة</p>
        {question.options && question.options.length > 0 ? (
          <ul className="space-y-2 mb-4">
            {question.options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => onOptionClick(option, idx)}
                className="bg-white/10 p-3 rounded hover:bg-white/20 transition-colors cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mb-4">
            <p className="mb-2">لا توجد خيارات لهذا السؤال.</p>
            <button onClick={onNoOption} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
              عرض الإجابة
            </button>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl">الوقت المتبقي: {timer}s</span>
          <button onClick={onClose} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
