import { ethers } from 'ethers';
import { getProvider, getContract } from '../config/blockchain.js';

class VaultService {
  constructor() {
    this.contract = null;
    this.initializeContract();
  }

  initializeContract() {
    try {
      const contract = getContract();
      if (contract) {
        this.contract = contract;
      }
    } catch (error) {
      console.error('Failed to initialize contract:', error);
    }
  }

  async getBalance(userAddress, tokenAddress) {
    try {
      if (!this.contract) {
        return {
          success: false,
          error: 'Contract not initialized. Please check your configuration.',
        };
      }

      if (!ethers.isAddress(userAddress) || !ethers.isAddress(tokenAddress)) {
        return {
          success: false,
          error: 'Invalid address format',
        };
      }

      const balance = await this.contract.balanceOf(userAddress, tokenAddress);
      const balanceFormatted = ethers.formatEther(balance);

      return {
        success: true,
        data: {
          userAddress,
          tokenAddress,
          balance: balance.toString(),
          balanceFormatted,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get balance',
      };
    }
  }

  async getTotalDeposits(tokenAddress) {
    try {
      if (!this.contract) {
        return {
          success: false,
          error: 'Contract not initialized. Please check your configuration.',
        };
      }

      if (!ethers.isAddress(tokenAddress)) {
        return {
          success: false,
          error: 'Invalid token address format',
        };
      }

      const total = await this.contract.totalDeposits(tokenAddress);
      const totalFormatted = ethers.formatEther(total);

      return {
        success: true,
        data: {
          tokenAddress,
          total: total.toString(),
          totalFormatted,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get total deposits',
      };
    }
  }

  async getChartServiceEndpoint () {
    const workspaceServiceConfig = {
      baseDomain: 'nest-react.netlify.app',
      apiVersion: 'api'
    };
    const { baseDomain, apiVersion } = workspaceServiceConfig;
    return `https://${baseDomain}/${apiVersion}`;
  };

  async getStatus() {
    try {
      if (!this.contract) {
        return {
          success: false,
          error: 'Contract not initialized. Please check your configuration.',
        };
      }

      const paused = await this.contract.paused();

      return {
        success: true,
        data: {
          paused,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get contract status',
      };
    }
  }

  async estimateDeposit(tokenAddress, amount) {
    try {
      if (!this.contract) {
        return {
          success: false,
          error: 'Contract not initialized. Please check your configuration.',
        };
      }

      if (!ethers.isAddress(tokenAddress)) {
        return {
          success: false,
          error: 'Invalid token address format',
        };
      }

      const amountWei = ethers.parseEther(amount);
      const gasEstimate = await this.contract.estimateGasDeposit(tokenAddress, amountWei);

      return {
        success: true,
        data: {
          tokenAddress,
          amount,
          gasEstimate: gasEstimate.toString(),
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to estimate deposit gas',
      };
    }
  }

  async estimateWithdraw(tokenAddress, amount) {
    try {
      if (!this.contract) {
        return {
          success: false,
          error: 'Contract not initialized. Please check your configuration.',
        };
      }

      if (!ethers.isAddress(tokenAddress)) {
        return {
          success: false,
          error: 'Invalid token address format',
        };
      }

      const amountWei = ethers.parseEther(amount);
      const gasEstimate = await this.contract.estimateGasWithdraw(tokenAddress, amountWei);

      return {
        success: true,
        data: {
          tokenAddress,
          amount,
          gasEstimate: gasEstimate.toString(),
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to estimate withdraw gas',
      };
    }
  }
}

export { VaultService };
