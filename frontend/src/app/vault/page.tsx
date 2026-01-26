'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { useVault } from '@/context/VaultContext';
import styles from './page.module.css';

export default function VaultPage() {
  const router = useRouter();
  const { address, isConnected } = useWallet();
  const {
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
  } = useVault();

  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [operation, setOperation] = useState<'deposit' | 'withdraw'>('deposit');

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
      return;
    }
    fetchStatus();
  }, [isConnected, router, fetchStatus]);

  const handleFetchBalance = async () => {
    if (!address || !tokenAddress) {
      alert('Please enter token address');
      return;
    }
    await fetchBalance(address, tokenAddress);
  };

  const handleFetchTotal = async () => {
    if (!tokenAddress) {
      alert('Please enter token address');
      return;
    }
    await fetchTotalDeposits(tokenAddress);
  };

  const handleEstimateGas = async () => {
    if (!tokenAddress || !amount) {
      alert('Please enter token address and amount');
      return;
    }

    try {
      let result;
      if (operation === 'deposit') {
        result = await estimateDeposit(tokenAddress, amount);
      } else {
        result = await estimateWithdraw(tokenAddress, amount);
      }

      if (result) {
        alert(`Estimated gas: ${result.gasEstimate || 'N/A'}`);
      }
    } catch (error: any) {
      alert(`Failed to estimate gas: ${error.message}`);
    }
  };

  const handleExecuteTransaction = () => {
    // TODO: Implement actual transaction execution
    alert('Transaction execution needs to be implemented using wallet SDK');
  };

  if (!isConnected) {
    return null;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Vault Operations</h1>

        <div className={styles.infoSection}>
          <p className={styles.label}>Connected Address:</p>
          <p className={styles.value}>{address}</p>
        </div>

        {status && (
          <div className={styles.infoSection}>
            <p className={styles.label}>Contract Status:</p>
            <p className={`${styles.value} ${status.paused ? styles.error : ''}`}>
              {status.paused ? 'Paused' : 'Active'}
            </p>
          </div>
        )}

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Token Configuration</h2>
          <input
            className={styles.input}
            type="text"
            placeholder="Token Address (0x...)"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <div className={styles.buttonRow}>
            <button
              className={styles.secondaryButton}
              onClick={handleFetchBalance}
              disabled={loading}
            >
              Get Balance
            </button>
            <button
              className={styles.secondaryButton}
              onClick={handleFetchTotal}
              disabled={loading}
            >
              Get Total
            </button>
          </div>
        </div>

        {balance && (
          <div className={styles.infoSection}>
            <p className={styles.label}>Your Balance:</p>
            <p className={styles.value}>
              {balance.balanceFormatted || balance.balance || '0'}
            </p>
          </div>
        )}

        {totalDeposits && (
          <div className={styles.infoSection}>
            <p className={styles.label}>Total Deposits:</p>
            <p className={styles.value}>
              {totalDeposits.totalFormatted || totalDeposits.total || '0'}
            </p>
          </div>
        )}

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Vault Operations</h2>
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tab} ${operation === 'deposit' ? styles.tabActive : ''}`}
              onClick={() => setOperation('deposit')}
            >
              Deposit
            </button>
            <button
              className={`${styles.tab} ${operation === 'withdraw' ? styles.tabActive : ''}`}
              onClick={() => setOperation('withdraw')}
            >
              Withdraw
            </button>
          </div>

          <input
            className={styles.input}
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className={styles.buttonRow}>
            <button
              className={styles.primaryButton}
              onClick={handleEstimateGas}
              disabled={loading}
            >
              Estimate Gas
            </button>
            <button
              className={styles.primaryButton}
              onClick={handleExecuteTransaction}
              disabled={loading}
            >
              {operation === 'deposit' ? 'Deposit' : 'Withdraw'}
            </button>
          </div>
        </div>

        {loading && (
          <div className={styles.loadingContainer}>
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>Error: {error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
