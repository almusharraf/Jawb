import { useQuery } from '@tanstack/react-query';
import api from '../../api';

export interface GameListResponse {
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

export const fetchGameList = async (): Promise<GameListResponse[]> => {
  const res = await api.get('/game/list/');
  return res.data;
};

export const useGameListQuery = () => {
  return useQuery(['game-list'], fetchGameList, {
    // Optionally enable this query only if a valid token exists:
    // enabled: Boolean(localStorage.getItem('accessToken')),
  });
};
