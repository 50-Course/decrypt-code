# Task 2: Backend API Configuration

## Objective

Configure the prebuilt Node.js backend API to interact with your TokenVault smart contract from Task 1 and connect it to the web frontend.

## Overview

A Node.js backend service using Express is already provided in the `backend/` directory. Your task is to:

1. **Configure the backend** to connect to your deployed smart contract
2. **Set up environment variables** (RPC URL, contract address, etc.)
3. **Update the contract ABI** with your compiled contract's ABI
4. **Test the API endpoints** to ensure everything works correctly

### Prebuilt Application Features

The prebuilt backend includes:

1. **Complete REST API Implementation**
   - All required endpoints are implemented
   - Error handling and validation middleware
   - CORS configuration
   - Express.js server setup

2. **Blockchain Integration Layer**
   - ethers.js v6 integration
   - Contract interaction utilities
   - Provider configuration
   - Service layer for vault operations

3. **API Endpoints**
   - `GET /api/vault/balance/:userAddress/:tokenAddress` - Get user's token balance in vault
   - `GET /api/vault/total/:tokenAddress` - Get total deposits for a token
   - `GET /api/vault/status` - Get contract status (paused/unpaused)
   - `POST /api/vault/estimate-deposit` - Estimate gas for deposit transaction
   - `POST /api/vault/estimate-withdraw` - Estimate gas for withdraw transaction
   - `GET /api/health` - Health check endpoint

4. **JavaScript Implementation**
   - Clean JavaScript (Node.js) implementation
   - Modular code structure
   - Error handling and validation

## Requirements

### Your Tasks

1. **Environment Configuration**
   - Create `.env` file from `.env.example`
   - Set `CONTRACT_ADDRESS` to your deployed TokenVault contract address
   - Set `RPC_URL` to your blockchain network (local, testnet, etc.)
   - Configure `PORT` if different from default (4000)

2. **Contract ABI Update**
   - After compiling your contract, copy the ABI from `artifacts/contracts/TokenVault.sol/TokenVault.json`
   - Update the `CONTRACT_ABI` array in `backend/src/config/blockchain.js`
   - Ensure all contract function signatures match your implementation

3. **Testing & Verification**
   - Test all API endpoints
   - Verify blockchain connection
   - Ensure contract interactions work correctly
   - Test error handling

### Technical Requirements

- Configure environment variables (contract address, RPC URL)
- Update contract ABI with your compiled contract's ABI
- Ensure backend connects to your deployed contract
- Test all API endpoints

### Deliverables

1. Configured `.env` file (don't commit this, but document your settings)
2. Updated `backend/src/config/blockchain.js` with your contract ABI
3. Working backend API connected to your smart contract
4. Brief documentation of configuration changes made
5. Test results showing all endpoints work correctly

### Example API Response

```json
// GET /api/vault/balance/0x123.../0x456...
{
  "success": true,
  "data": {
    "userAddress": "0x123...",
    "tokenAddress": "0x456...",
    "balance": "1000000000000000000",
    "balanceFormatted": "1.0"
  }
}
```

### Example Configuration

```env
# .env file
PORT=4000
RPC_URL=http://localhost:8545
CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
```

### Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── blockchain.js    # Contract ABI and provider configuration
│   ├── controllers/
│   │   └── vaultController.js
│   ├── routes/
│   │   ├── vault.js
│   │   └── health.js
│   ├── services/
│   │   └── vaultService.js
│   └── index.js
├── package.json
├── .env.example
└── README.md
```

## Evaluation Criteria

- ✅ Backend successfully connects to your smart contract
- ✅ All environment variables are properly configured
- ✅ Contract ABI matches your deployed contract
- ✅ All API endpoints work correctly
- ✅ Error handling works properly
- ✅ Configuration is properly documented

## Bonus Points

- Add additional API endpoints
- Implement caching for read operations
- Add request logging and monitoring
- Include unit tests for API endpoints
- Add API authentication/authorization
- Enhance error messages for better debugging

## Notes

- The backend app is located in the `backend/` directory
- Follow the setup instructions in `backend/README.md`
- You can use a testnet (Sepolia, Mumbai, etc.) or local Hardhat node
- Focus on configuration and integration, not building from scratch
- Ensure your contract ABI matches exactly with your deployed contract
- If you encounter issues, document them and explain your approach
