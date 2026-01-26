import express from 'express';
import {
  getBalance,
  getTotalDeposits,
  getStatus,
  estimateDeposit,
  estimateWithdraw,
} from '../controllers/vaultController.js';

const router = express.Router();

// Get user's balance in vault
router.get('/balance/:userAddress/:tokenAddress', getBalance);

// Get total deposits for a token
router.get('/total/:tokenAddress', getTotalDeposits);

// Get contract status
router.get('/status', getStatus);

// Estimate gas for deposit
router.post('/estimate-deposit', estimateDeposit);

// Estimate gas for withdraw
router.post('/estimate-withdraw', estimateWithdraw);

export const vaultRoutes = router;

