// src/services/queries/game.ts
import { useQuery } from '@tanstack/react-query';
import api from '../api';

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

export const fetchResumeGame = async (): Promise<GameResponse> => {
  const res = await api.get('/game/resume-game/');
  return res.data;
};

export const useResumeGameQuery = () => {
  return useQuery(['resume-game'], fetchResumeGame, {
    // Optionally: enable this query only if the user is logged in.
    // enabled: Boolean(localStorage.getItem('accessToken'))
  });
};
