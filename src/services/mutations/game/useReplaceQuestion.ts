// src/services/mutations/game/useReplaceQuestion.ts
import api from '../../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ReplaceQuestionParams {
  gameId: number;
  teamId: number;
  categoryId: number;
  questionId: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const useReplaceQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation(async (params: ReplaceQuestionParams) => {
    const { data } = await api.post(
      `/games/${params.gameId}/teams/${params.teamId}/use-ability/`,
      {
        ability_type: 'replace_question',
        category_id: params.categoryId,
        question_id: params.questionId,
        difficulty: params.difficulty
      }
    );
    return data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['resume-game']);
    }
  });
};

export default useReplaceQuestion;