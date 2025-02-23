import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameListQuery, GameListResponse } from '../services/queries/gameList';

const MyGames = () => {
  const navigate = useNavigate();
  const { data: games, isLoading, isError } = useGameListQuery();

  if (isLoading) return <div className="p-4 text-white">Loading games...</div>;
  if (isError) return <div className="p-4 text-white">Error loading games. Please try again later.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">ألعابي</h1>
      {games && games.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {games.map((game: GameListResponse) => (
            <div key={game.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">اللعبة رقم {game.id}</h2>
              <p>
                الحالة:{" "}
                <span className="font-semibold">
                  {game.status === "in_progress" ? "قيد التنفيذ" : "منتهية"}
                </span>
              </p>
              <p>بدأت في: {new Date(game.created_at).toLocaleString()}</p>
              <p>آخر تحديث: {new Date(game.updated_at).toLocaleString()}</p>
              <div className="mt-2">
                <h3 className="font-semibold">الفئات:</h3>
                <ul className="list-disc ml-6">
                  {game.categories.map((cat) => (
                    <li key={cat.id}>
                      {cat.name} - {cat.description}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    if (game.status === "in_progress") {
                      navigate("/game", { state: { gameData: game } });
                    } else {
                      // For completed games, you can navigate to a detailed results page.
                      // Here we simply alert; adjust as needed.
                      alert("هذه اللعبة منتهية.");
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                >
                  {game.status === "in_progress" ? "استئناف اللعبة" : "عرض النتائج"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>لا توجد ألعاب محفوظة.</p>
      )}
      <div className="mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded transition-colors"
        >
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
};

export default MyGames;
