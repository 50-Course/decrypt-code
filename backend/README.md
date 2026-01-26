# TokenVault Backend API

Prebuilt Node.js backend API for interacting with the TokenVault smart contract.

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Deployed TokenVault contract address

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure the backend:

   a. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   b. Update `.env` with your configuration:
   ```env
   PORT=4000
   RPC_URL=http://localhost:8545
   CONTRACT_ADDRESS=0x... # Your deployed TokenVault contract address
   ```

   c. Update contract ABI in `src/config/blockchain.js`:
   - After compiling your contract, copy the ABI from `artifacts/contracts/TokenVault.sol/TokenVault.json`
   - Replace the `CONTRACT_ABI` array in `src/config/blockchain.js`

3. Run the backend:
```bash
# Development mode
npm run dev

# Or start directly
npm start
```

The API will be available at `http://localhost:4000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Vault Operations
- `GET /api/vault/balance/:userAddress/:tokenAddress` - Get user's token balance in vault
- `GET /api/vault/total/:tokenAddress` - Get total deposits for a token
- `GET /api/vault/status` - Get contract status (paused/unpaused)
- `POST /api/vault/estimate-deposit` - Estimate gas for deposit transaction
- `POST /api/vault/estimate-withdraw` - Estimate gas for withdraw transaction

### Example Requests

```bash
# Get balance
curl http://localhost:4000/api/vault/balance/0x123.../0x456...

# Get total deposits
curl http://localhost:4000/api/vault/total/0x456...

# Get status
curl http://localhost:4000/api/vault/status

# Estimate deposit gas
curl -X POST http://localhost:4000/api/vault/estimate-deposit \
  -H "Content-Type: application/json" \
  -d '{"tokenAddress": "0x456...", "amount": "1.0"}'
```

## Configuration Tasks

### 1. Contract Address
Update `CONTRACT_ADDRESS` in `.env` with your deployed contract address.

### 2. RPC URL
Update `RPC_URL` in `.env` to point to your blockchain network:
- Local: `http://localhost:8545`
- Sepolia: `https://sepolia.infura.io/v3/YOUR_API_KEY`
- Mainnet: `https://mainnet.infura.io/v3/YOUR_API_KEY`

### 3. Contract ABI
After compiling your contract, update `src/config/blockchain.js`:
- Copy the ABI from your compiled contract JSON file
- Replace the `CONTRACT_ABI` array

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── blockchain.js    # Blockchain provider and contract configuration
│   ├── controllers/
│   │   └── vaultController.js # Request handlers
│   ├── routes/
│   │   ├── vault.js         # Vault API routes
│   │   └── health.js        # Health check route
│   ├── services/
│   │   └── vaultService.js  # Business logic for vault operations
│   └── index.js             # Application entry point
├── package.json
├── .env.example
└── README.md
```

## Troubleshooting

### Contract Not Initialized
- Ensure `CONTRACT_ADDRESS` is set in `.env`
- Verify the contract address is valid (42 characters starting with 0x)
- Check that the contract is deployed to the network specified in `RPC_URL`

### RPC Connection Issues
- Verify `RPC_URL` is correct and accessible
- Check network connectivity
- For local development, ensure Hardhat node is running

### ABI Mismatch
- Ensure the ABI in `src/config/blockchain.js` matches your deployed contract
- Re-compile your contract and copy the latest ABI

## Notes

- This is a prebuilt backend - focus on configuration and integration
- The backend uses JavaScript (Node.js)
- All endpoints return JSON responses with `success` and `data`/`error` fields
- The backend requires the TokenVault contract to be deployed before it can function
