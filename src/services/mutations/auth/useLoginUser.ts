import { useMutation } from '@tanstack/react-query';
import api from '../../api';
import { saveAuthData } from './storage';

interface LoginData {
  email: string;
  password: string;
}

const loginUser = async (data: LoginData): Promise<any> => {
  const response = await api.post('/accounts/login/', data);
  return response.data;
};

export const useLoginUser = () => {
  return useMutation(loginUser, {
    onSuccess: (data, variables, context) => {
      // Assuming your response from login includes fields:
      // access, refresh, and optionally first_name.
      // If first_name is not returned by your backend, you can use the value you passed in.
      saveAuthData({
        access: data.access,
        refresh: data.refresh,
        first_name: data.first_name || '', // or set a default value
        email: variables.email,
      });
    },
  });
};
