// src/services/queries/index.ts

import api from '../api';

export const fetchQuizzes = async (): Promise<any> => {
  const response = await api.get('/quiz/');
  return response.data;
};

export const fetchQuestionById = async (questionId: number): Promise<any> => {
  const response = await api.get(`/quiz/${questionId}/`);
  return response.data;
};

export const fetchQuizById = async (quizId: number): Promise<any> => {
  const response = await api.get(`/quiz/${quizId}/`);
  return response.data;
};
