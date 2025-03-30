import { useQuery } from '@tanstack/react-query';
import { fetchUser, fetchWallet, fetchTransactions } from '../services/api';

export const useUser = () => {
  return useQuery({ queryKey: ['user'], queryFn: fetchUser });
};

export const useWallet = () => {
  return useQuery({ queryKey: ['wallet'], queryFn: fetchWallet });
};

export const useTransactions = () => {
  return useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions });
};
