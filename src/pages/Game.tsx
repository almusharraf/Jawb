// src/pages/Game.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeGameQuery } from '../services/queries/game';
import toast from 'react-hot-toast';

const Game = () => {
  const navigate = useNavigate();

  // Check if user is logged in by verifying a stored token.
  // Adjust this logic if you store the token under a different key.
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // If no token, redirect to login with a state that brings the user back after login.
      navigate('/auth', { 
        state: { from: '/game' }, 
        replace: true 
      });
    }
  }, [navigate]);

  // Use our resume game query to fetch the current game session.
  const { data: gameData, isLoading, isError } = useResumeGameQuery();

  if (isLoading) return <div>Loading game data...</div>;
  if (isError || !gameData) return <div>Error loading game data. Please try again.</div>;

  const { categories, progress_data, status } = gameData;

  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Game In Progress</h1>
      <p className="mb-6">Status: {status}</p>
      
      {categories.map(category => (
        <div key={category.id} className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold">{category.name}</h2>
          <p>{category.description}</p>
          {category.image && (
            <img src={category.image} alt={category.name} className="mt-2 w-64" />
          )}
          <h3 className="mt-4 font-semibold">Progress Data:</h3>
          <pre className="text-sm bg-gray-700 p-2 rounded">
            {JSON.stringify(progress_data[category.id], null, 2)}
          </pre>
        </div>
      ))}
      
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded mt-4"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Game;
