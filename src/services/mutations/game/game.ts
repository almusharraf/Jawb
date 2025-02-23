import api from '../../api';
import { useMutation } from '@tanstack/react-query';

export interface StartGamePayload {
  categories: number[];
  teams: string[];
}

export interface GameResponse {
  id: number;
  user: number;
  categories: Array<{
    id: number;
    name: string;
    description: string;
    image: string | null;
  }>;
  status: string;
  progress_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export const startGame = async (payload: StartGamePayload): Promise<GameResponse> => {
  const res = await api.post('/game/start-game/', payload);
  console.log("startGame response:", res.data);  // Print the response data
  return res.data;
};

export const useStartGameMutation = () => {
  return useMutation(startGame);
};
