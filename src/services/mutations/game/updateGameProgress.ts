import api from '../../api';
import { useMutation } from '@tanstack/react-query';

export interface UpdateGameProgressPayload {
  game_id: number;
  category_id: number;
  difficulty: 'easy' | 'medium' | 'hard';
  question_id: number;
  team_id: number;
  points_awarded: number;
}

export interface UpdateGameProgressResponse {
  detail: string;
  game_id: number;
  complete: boolean;
  teams: { id: number; name: string; score: number }[];
  current_turn: number;
}

export const updateGameProgress = async (
  payload: UpdateGameProgressPayload
): Promise<UpdateGameProgressResponse> => {
  const res = await api.post('/game/update-game-progress/', payload);
  console.log("updateGameProgress response:", res.data); // Debug print
  return res.data;
};

export const useUpdateGameProgressMutation = () => {
  return useMutation(updateGameProgress);
};
