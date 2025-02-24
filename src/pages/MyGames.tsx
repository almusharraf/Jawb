import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameListQuery, GameListResponse } from '../services/queries/gameList';

const MyGames = () => {
  const navigate = useNavigate();
  const { data: games, isLoading, isError } = useGameListQuery();
  const [activeResultGame, setActiveResultGame] = useState<GameListResponse | null>(null);

  if (isLoading) return <div className="p-4 text-white">Loading games...</div>;
  if (isError) return <div className="p-4 text-white">Error loading games. Please try again later.</div>;

  // Compute winner based on team scores
  const computeWinner = (teams: Array<{ id: number; name: string; score: number }>) => {
    if (!teams || teams.length === 0) return null;
    const maxScore = Math.max(...teams.map((team) => team.score));
    const winners = teams.filter((team) => team.score === maxScore);
    return winners.length > 1 ? "تعادل" : winners[0].name;
  };

  const handleResultClose = () => setActiveResultGame(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">ألعابي</h1>
        {games && games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {games.map((game: GameListResponse) => (
              <div
                key={game.id}
                className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/10 shadow-md transition-transform hover:scale-105"
              >
                {/* Game Name */}
                <h2 className="text-xl font-extrabold mb-3 text-center">{game.name}</h2>

                {/* Teams Row */}
                <div className="mb-3">
                  <h3 className="text-base font-bold mb-2 text-center">الفرق</h3>
                  <div className="flex justify-around items-center bg-white/5 p-2 rounded-full">
                    {game.teams.map((team) => (
                      <div
                        key={team.id}
                        className="flex flex-col items-center mx-1"
                      >
                        <span
                          className="text-xs font-semibold max-w-[4rem] text-center truncate"
                          title={team.name}
                        >
                          {team.name}
                        </span>
                        <span className="mt-1 text-[0.65rem] font-bold bg-white/20 text-white px-2 py-1 rounded-full">
                          {team.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {game.categories.map((cat) => (
                    <div key={cat.id} className="relative rounded overflow-hidden">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="h-20 w-full object-cover"
                        />
                      ) : (
                        <div className="h-20 w-full bg-gray-700 flex items-center justify-center text-xs">
                          N/A
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <span className="text-xs font-medium">{cat.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                  {game.status === "in_progress" ? (
                    <button
                      onClick={() => navigate("/game", { state: { gameData: game } })}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-colors px-4 py-2 rounded-full text-sm font-bold"
                    >
                      استئناف اللعبة
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveResultGame(game)}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-colors px-4 py-2 rounded-full text-sm font-bold"
                    >
                      عرض النتائج
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">لا توجد ألعاب محفوظة.</p>
        )}
      </div>

      {/* Modal for Finished Game Results */}
      {activeResultGame && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-center mb-4">{activeResultGame.name}</h2>
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-full text-center font-bold text-white">
                {activeResultGame.status === "in_progress" ? "قيد التنفيذ" : "منتهية"}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-3 text-center">نتائج الفرق</h3>
              <ul className="space-y-2">
                {activeResultGame.teams.map((team) => (
                  <li key={team.id} className="flex justify-between text-base">
                    <span className="truncate" title={team.name}>{team.name}</span>
                    <span className="font-bold">{team.score}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6 text-center">
              <h3 className="text-base font-bold">
                الفائز: {computeWinner(activeResultGame.teams)}
              </h3>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleResultClose}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-colors px-4 py-2 rounded-full text-sm font-bold"
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

export default MyGames;
