import { useMutation } from '@tanstack/react-query';
import api from '../../api';

interface ForgotPasswordData {
  email: string;
}

const forgotPasswordUser = async (data: ForgotPasswordData): Promise<any> => {
  const response = await api.post('/accounts/forgot-password/', data);
  return response.data;
};

export const useForgotPassword = () => {
  return useMutation(forgotPasswordUser);
};
