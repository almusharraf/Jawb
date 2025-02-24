// src/components/Game/CategoriesBoard.tsx
import React, { useState } from 'react';
import { Category } from '../../pages/Game';

interface CategoriesBoardProps {
  categories: Category[];
  progressData: Record<
    string,
    {
      easy: { selected: number[]; answered: number[] };
      medium: { selected: number[]; answered: number[] };
      hard: { selected: number[]; answered: number[] };
    }
  >;
  onQuestionClick: (
    category: Category,
    points: number,
    questionId: number,
    difficulty: 'easy' | 'medium' | 'hard'
  ) => void;
  isQuestionAnswered: (categoryId: number, difficulty: 'easy' | 'medium' | 'hard', qid: number) => boolean;
}

interface QuestionButtonProps {
  category: Category;
  difficulty: 'easy' | 'medium' | 'hard';
  qid: number;
  pointsValue: number;
  answered: boolean;
  onClick: () => void;
}

const QuestionButton: React.FC<QuestionButtonProps> = ({
  category,
  difficulty,
  qid,
  pointsValue,
  answered,
  onClick,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    if (answered) return;
    setFlipped(true);
    setTimeout(() => {
      onClick();
    }, 500);
  };

  const bgClass = answered
    ? 'bg-gray-400'
    : difficulty === 'easy'
    ? 'bg-green-400'
    : difficulty === 'medium'
    ? 'bg-yellow-400'
    : 'bg-red-400';

  return (
    <div style={{ perspective: '1000px' }} className="w-full h-full">
      <button
        onClick={handleClick}
        disabled={answered}
        className={`w-full h-full transition-transform transform active:scale-95 relative focus:outline-none ${bgClass}`}
        style={{
          transition: 'transform 0.5s',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {pointsValue}
        </div>
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        />
      </button>
    </div>
  );
};

const CategoriesBoard: React.FC<CategoriesBoardProps> = ({
  categories,
  progressData,
  onQuestionClick,
  isQuestionAnswered,
}) => {
  const gridCols = categories.length / 2;

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
      className="grid gap-0.5 p-2 w-full h-full" // Reduced gap and padding
    >
      {categories.map((category) => {
        const catProgress = progressData[String(category.id)];
        return (
          <div key={category.id} className="w-full p-1"> {/* Added padding */}
            <div
              className="shadow rounded-lg overflow-hidden flex flex-col mx-auto bg-transparent" // Removed background
              style={{ 
                height: '12rem', // Increased height by 10%
                width: '90%' // Increased width
              }}
            >
              <div className="relative" style={{ height: '60%' }}>
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60" />
                <div className="absolute bottom-2 left-2 text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-3 h-full">
                  {(['easy', 'medium', 'hard'] as const).map((diff) => {
                    const questions = catProgress?.[diff]?.selected || [];
                    return (
                      <div
                        key={diff}
                        className="flex flex-col h-full border-2 border-gray-800" // Darker border
                      >
                        {questions.map((qid) => {
                          const pointsValue =
                            diff === 'easy' ? 300 :
                            diff === 'medium' ? 500 : 700;
                          const answered = isQuestionAnswered(category.id, diff, qid);
                          return (
                            <div key={qid} className="flex-1 border-b-2 border-gray-800">
                              <QuestionButton
                                category={category}
                                difficulty={diff}
                                qid={qid}
                                pointsValue={pointsValue}
                                answered={answered}
                                onClick={() => onQuestionClick(category, pointsValue, qid, diff)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesBoard;