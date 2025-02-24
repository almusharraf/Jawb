// src/components/CategoriesBoard.tsx
import React from 'react';
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

const CategoriesBoard: React.FC<CategoriesBoardProps> = ({
  categories,
  progressData,
  onQuestionClick,
  isQuestionAnswered,
}) => {
  return (
    <section className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const catProgress = progressData[String(category.id)];
          return (
            <div
              key={category.id}
              className="flex flex-col rounded-xl shadow-lg border border-white/20 bg-white/10 backdrop-blur-sm"
            >
              {/* Compact Header */}
              <div className="relative h-28">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-2">
                  <h3 className="text-lg font-bold text-white text-center line-clamp-2">
                    {category.name}
                  </h3>
                  <p className="text-xs text-white/80 text-center line-clamp-2 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Questions Grid */}
              <div className="p-3 space-y-3">
                {(['easy', 'medium', 'hard'] as const).map((difficulty) => {
                  const pointsValue =
                    difficulty === 'easy' ? 300 : difficulty === 'medium' ? 500 : 700;
                  const selectedForDiff = catProgress?.[difficulty]?.selected || [];

                  return (
                    <div key={difficulty} className="space-y-1.5">
                      <div className="text-xs font-semibold text-white/80 ml-2">
                        {difficulty.toUpperCase()}
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {selectedForDiff.map((qid) => {
                          const answered = isQuestionAnswered(category.id, difficulty, qid);
                          return (
                            <button
                              key={qid}
                              onClick={() => !answered && onQuestionClick(category, pointsValue, qid, difficulty)}
                              disabled={answered}
                              className={`
                                aspect-square flex items-center justify-center 
                                text-sm font-bold transition-colors
                                ${answered 
                                  ? 'bg-gray-600/30 cursor-not-allowed' 
                                  : difficulty === 'easy' 
                                    ? 'bg-green-500/90 hover:bg-green-400' 
                                    : difficulty === 'medium' 
                                      ? 'bg-yellow-500/90 hover:bg-yellow-400' 
                                      : 'bg-red-500/90 hover:bg-red-400'}
                                rounded-md
                              `}
                            >
                              {pointsValue}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesBoard;