// src/services/mutations/index.ts

import api from '../api';
import { URLS } from '../urls';

// Example mutation to create a quiz.
// The payload could include fields such as title, categories (an array), and user details.
export const createQuiz = async (data: {
  title: string;
  categories: string[]; // Array of category identifiers or names
  userId?: number;
  userName?: string;
  // add any other quiz-specific fields here
}): Promise<any> => {
  const response = await api.post(URLS.createQuiz, data);
  return response.data;
};

export const updateQuestion = async (questionId: number, data: any): Promise<any> => {
  const response = await api.put(`/quiz/${questionId}/`, data);
  return response.data;
};

export const deleteQuestion = async (questionId: number): Promise<any> => {
  const response = await api.delete(`/quiz/${questionId}/`);
  return response.data;
};
