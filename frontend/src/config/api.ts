// API Configuration
// TODO: Update this with your backend API URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Contract Configuration
// TODO: Update with your deployed contract address
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

// Network Configuration
export const NETWORK_CONFIG = {
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1337'),
  name: process.env.NEXT_PUBLIC_NETWORK_NAME || 'Local Network',
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'http://localhost:8545',
};
