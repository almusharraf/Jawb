// src/services/mutations/game.ts
import api from '../../api'; // This should be your configured Axios instance (or similar)
import { useMutation } from '@tanstack/react-query';

export interface StartGamePayload {
  categories: number[]; // Array of category IDs (you might need to cast your string IDs to numbers)
  teams: string[];
}

export interface GameResponse {
  id: number;
  user: number;
  categories: any[]; // Adjust as needed
  status: string;
  progress_data: any;
  created_at: string;
  updated_at: string;
}

export const startGame = async (payload: StartGamePayload): Promise<GameResponse> => {
  const response = await api.post('/game/start-game/', payload);
  return response.data;
};

// Create a custom hook for the mutation (optional, but common with React Query)
export const useStartGameMutation = () => {
  return useMutation(startGame);
};
