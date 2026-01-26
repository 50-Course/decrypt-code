import { ethers } from 'ethers';

// TODO: Update with your deployed contract ABI
// You can get this from artifacts/TokenVault.sol/TokenVault.json after compilation
const CONTRACT_ABI = [
  // Basic ERC20 functions
  'function balanceOf(address, address) external view returns (uint256)',
  'function totalDeposits(address) external view returns (uint256)',
  'function paused() external view returns (bool)',
  // Vault functions
  'function deposit(address, uint256) external',
  'function withdraw(address, uint256) external',
  // Events
  'event Deposit(address indexed user, address indexed token, uint256 amount)',
  'event Withdraw(address indexed user, address indexed token, uint256 amount)',
];

let provider = null;
let contract = null;

function getProvider() {
  if (!provider) {
    const rpcUrl = process.env.RPC_URL || 'http://localhost:8545';
    provider = new ethers.JsonRpcProvider(rpcUrl);
  }
  return provider;
}

function getContract() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    console.warn('CONTRACT_ADDRESS not set in environment variables');
    return null;
  }

  if (!ethers.isAddress(contractAddress)) {
    console.error('Invalid CONTRACT_ADDRESS format');
    return null;
  }

  if (!contract) {
    const provider = getProvider();
    contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);
  }

  return contract;
}

export { getProvider, getContract };
