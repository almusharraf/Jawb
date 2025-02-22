import { useMutation } from '@tanstack/react-query';
import api from '../../api';

interface SignupData {
  first_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const signupUser = async (data: SignupData): Promise<any> => {
  const response = await api.post('/accounts/signup/', data);
  return response.data;
};

export const useSignupUser = () => {
  return useMutation(signupUser);
};
