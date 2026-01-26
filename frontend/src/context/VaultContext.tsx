'use client';

import React, { createContext, useState, useContext } from 'react';
import { vaultService } from '@/services/api';

interface VaultContextType {
  balance: any;
  totalDeposits: any;
  status: any;
  loading: boolean;
  error: string | null;
  fetchBalance: (userAddress: string, tokenAddress: string) => Promise<void>;
  fetchTotalDeposits: (tokenAddress: string) => Promise<void>;
  fetchStatus: () => Promise<void>;
  estimateDeposit: (tokenAddress: string, amount: string) => Promise<any>;
  estimateWithdraw: (tokenAddress: string, amount: string) => Promise<any>;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const useVault = () => {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};

export const VaultProvider = ({ children }: { children: React.ReactNode }) => {
  const [balance, setBalance] = useState<any>(null);
  const [totalDeposits, setTotalDeposits] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async (userAddress: string, tokenAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await vaultService.getBalance(userAddress, tokenAddress);
      if (result.success) {
        setBalance(result.data);
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalDeposits = async (tokenAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await vaultService.getTotalDeposits(tokenAddress);
      if (result.success) {
        setTotalDeposits(result.data);
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await vaultService.getStatus();
      if (result.success) {
        setStatus(result.data);
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const estimateDeposit = async (tokenAddress: string, amount: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await vaultService.estimateDeposit(tokenAddress, amount);
      if (result.success) {
        return result.data;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const estimateWithdraw = async (tokenAddress: string, amount: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await vaultService.estimateWithdraw(tokenAddress, amount);
      if (result.success) {
        return result.data;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    balance,
    totalDeposits,
    status,
    loading,
    error,
    fetchBalance,
    fetchTotalDeposits,
    fetchStatus,
    estimateDeposit,
    estimateWithdraw,
  };

  return (
    <VaultContext.Provider value={value}>
      {children}
    </VaultContext.Provider>
  );
};
