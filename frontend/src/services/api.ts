import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions for TokenVault
export const vaultService = {
  // Get user's balance in vault
  getBalance: async (userAddress: string, tokenAddress: string) => {
    try {
      const response = await api.get(
        `/api/vault/balance/${userAddress}/${tokenAddress}`
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Get total deposits for a token
  getTotalDeposits: async (tokenAddress: string) => {
    try {
      const response = await api.get(`/api/vault/total/${tokenAddress}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Get contract status
  getStatus: async () => {
    try {
      const response = await api.get('/api/vault/status');
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Estimate gas for deposit
  estimateDeposit: async (tokenAddress: string, amount: string) => {
    try {
      const response = await api.post('/api/vault/estimate-deposit', {
        tokenAddress,
        amount,
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },

  // Estimate gas for withdraw
  estimateWithdraw: async (tokenAddress: string, amount: string) => {
    try {
      const response = await api.post('/api/vault/estimate-withdraw', {
        tokenAddress,
        amount,
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  },
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export default api;
