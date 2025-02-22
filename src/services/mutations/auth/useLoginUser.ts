import { useMutation } from '@tanstack/react-query';
import api from '../../api';
import { saveAuthData } from './storage';

interface LoginData {
  email: string;
  password: string;
}

const loginUser = async (data: LoginData): Promise<any> => {
  const response = await api.post('/accounts/login/', data);
  return response.data;  // response data should include game_count
};

export const useLoginUser = () => {
  return useMutation(loginUser, {
    onSuccess: (data, variables, context) => {
      // Save auth data and number of games when login is successful
      saveAuthData({
        access: data.access,
        refresh: data.refresh,
        first_name: data.first_name || '', // First name
        email: variables.email,
      });

      // Save the number of games in localStorage based on data from the backend
      if (data.game_count !== undefined) {
        localStorage.setItem('userGames', data.game_count.toString());
      }
    },
  });
};
