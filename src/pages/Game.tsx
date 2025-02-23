// src/pages/Game.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeGameQuery } from '../services/queries/game';
import toast from 'react-hot-toast';

const Game = () => {
  const navigate = useNavigate();

  // Check if user is logged in by verifying a stored token.
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/auth', { state: { from: '/game' }, replace: true });
    }
  }, [navigate]);

  // Use our resume game query to fetch the current game session.
  const { data: gameData, isLoading, isError } = useResumeGameQuery();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading game data...</div>;
  if (isError || !gameData) return <div className="min-h-screen flex items-center justify-center text-white text-xl">Error loading game data. Please try again.</div>;

  const { categories, progress_data, status } = gameData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-gray-900 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold mb-2">Game In Progress</h1>
          <p className="text-lg font-medium">
            Status: <span className="text-green-400">{status}</span>
          </p>
        </header>

        <div className="space-y-8">
          {categories.map(category => (
            <div key={category.id} className="bg-white/5 shadow-lg backdrop-blur-md p-6 rounded-lg border border-white/10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <p className="mt-2 text-sm text-gray-300">{category.description}</p>
                </div>
                {category.image && (
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="mt-4 md:mt-0 w-48 h-auto rounded-lg shadow-md object-cover"
                  />
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold border-b border-white/20 pb-1">Progress Data:</h3>
                <pre className="mt-2 text-sm bg-gray-700 p-3 rounded overflow-x-auto">
                  {JSON.stringify(progress_data[category.id], null, 2)}
                </pre>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full text-xl font-bold transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
