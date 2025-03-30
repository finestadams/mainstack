import { Transaction, User, Wallet } from '@/types/interfaces';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://fe-task-api.mainstack.io/',
});

export const fetchUser = async (): Promise<User> => {
  const response = await apiClient.get('/user');
  return response.data;
};

export const fetchWallet = async (): Promise<Wallet> => {
  const response = await apiClient.get('/wallet');
  return response.data;
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await apiClient.get('/transactions');
  return response.data;
};
