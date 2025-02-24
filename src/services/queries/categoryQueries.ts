// services/queries/categoryQueries.ts
import { useQuery } from '@tanstack/react-query';
import api from '../api';

// Define the function to fetch categories
const fetchCategories = async () => {
  const response = await api.get('/game/categories/');
  return response.data;  // Ensure you return the response data
};

// Define a custom hook to fetch categories using React Query
export const useCategories = () => {
  return useQuery(['categories'], fetchCategories);  // Correct queryKey as array
};
