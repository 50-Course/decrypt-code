# TokenVault Frontend

Prebuilt Next.js web application for interacting with the TokenVault contract.

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure the app:

   a. Create `.env.local` file:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_CHAIN_ID=1337
   NEXT_PUBLIC_NETWORK_NAME=Local Network
   NEXT_PUBLIC_RPC_URL=http://localhost:8545
   ```

   b. Update API configuration in `src/config/api.ts` if needed

3. Run the app:
```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

The app will be available at `http://localhost:3000`

## Configuration Tasks

### 1. Backend API URL

Update `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Or update `src/config/api.ts` directly.

### 2. Contract Address

Update `.env.local`:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Your deployed TokenVault contract
```

### 3. Network Configuration

Update `.env.local`:
```
NEXT_PUBLIC_CHAIN_ID=1337
NEXT_PUBLIC_NETWORK_NAME=Local Network
NEXT_PUBLIC_RPC_URL=http://localhost:8545
```

### 4. Wallet Integration

The wallet connection uses MetaMask by default. The code in `src/context/WalletContext.tsx` handles:
- MetaMask detection
- Account connection
- Account changes

For WalletConnect integration, you can install `@walletconnect/web3-provider` and update the context.

## Features

- ✅ MetaMask wallet connection
- ✅ Backend API integration
- ✅ Vault balance viewing
- ✅ Deposit/Withdraw operations
- ✅ Gas estimation
- ✅ Transaction status tracking
- ✅ Error handling
- ✅ Responsive design

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Home page
│   │   ├── vault/        # Vault operations page
│   │   ├── layout.tsx    # Root layout
│   │   └── providers.tsx # Context providers
│   ├── config/
│   │   └── api.ts        # API and network configuration
│   ├── context/
│   │   ├── WalletContext.tsx  # Wallet state management
│   │   └── VaultContext.tsx   # Vault operations state
│   ├── services/
│   │   └── api.ts        # API service functions
│   └── utils/
│       ├── constants.ts  # Constants
│       └── helpers.ts    # Helper functions
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Testing

1. **Test Backend Connection:**
   - Open the app at `http://localhost:3000`
   - Check browser console for API connection status

2. **Test Wallet Connection:**
   - Click "Connect Wallet"
   - Approve MetaMask connection

3. **Test Vault Operations:**
   - Navigate to "Vault Operations"
   - Enter token address
   - Fetch balance or total deposits
   - Test deposit/withdraw operations

## Troubleshooting

### Backend Connection Issues

- Ensure backend is running
- Check CORS settings on backend
- Verify API URL format in `.env.local`

### Wallet Connection Issues

- Ensure MetaMask is installed
- Check network configuration matches your blockchain
- Verify contract address is correct

### Transaction Issues

- Ensure wallet has sufficient funds
- Check contract is not paused
- Verify token address is correct
- Check gas estimation is working

## Notes

- This is a prebuilt application - focus on configuration and backend integration
- Wallet connection uses MetaMask (browser extension)
- Customize UI/UX as needed for bonus points
- The app uses Next.js 14 with App Router
