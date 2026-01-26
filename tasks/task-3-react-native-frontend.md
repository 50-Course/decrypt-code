# Task 3: Frontend Integration

## Objective

Connect the prebuilt Next.js frontend application to your backend API (Task 2) and configure it to interact with the TokenVault contract.

## Overview

A Next.js web application is already provided in the `frontend/` directory. Your task is to:

1. **Configure the frontend** to connect to your backend API
2. **Set up wallet integration** (MetaMask browser extension)
3. **Test the complete flow** from frontend → backend → blockchain

## Prebuilt Application Features

The prebuilt app includes:

1. **Wallet Connection UI**
   - MetaMask integration
   - Connection status display
   - Wallet address display
   - Auto-reconnect on page load

2. **Vault Operations UI**
   - Balance display components
   - Deposit/Withdraw forms
   - Transaction status indicators
   - Responsive design

3. **API Service Layer**
   - Pre-configured API client
   - Service functions for all backend endpoints
   - Error handling utilities
   - Loading state management

4. **State Management**
   - React Context API for global state
   - Wallet context for connection management
   - Vault context for operations

## Requirements

### Your Tasks

1. **Backend API Configuration**
   - Update API base URL in `frontend/src/config/api.ts` or `.env.local`
   - Ensure all backend endpoints match the API service calls
   - Test API connectivity

2. **Wallet Integration**
   - MetaMask is already integrated
   - Test wallet connection flow
   - Verify network configuration matches your blockchain

3. **Environment Setup**
   - Configure environment variables (`.env.local` file)
   - Set up contract addresses
   - Configure network settings

4. **Integration Testing**
   - Verify frontend → backend → blockchain flow
   - Test deposit functionality
   - Test withdraw functionality
   - Ensure error handling works correctly

### Technical Requirements

- Connect the prebuilt frontend to your backend API from Task 2
- Ensure MetaMask wallet connection works
- Ensure all API endpoints work correctly
- Test the complete user flow

### Deliverables

1. Updated configuration files (API URL, contract address, etc.)
2. Working frontend connected to your backend
3. Brief documentation of any configuration changes made
4. Screenshots showing the working app (optional but appreciated)

### Example User Flow

```
1. User opens the app in browser
2. App shows "Connect Wallet" button
3. User clicks button → MetaMask popup opens
4. User approves connection
5. App shows: "Connected: 0x1234..."
6. App fetches user's vault balance from backend API
7. User enters token address and amount
8. User clicks "Deposit" → MetaMask transaction popup
9. User confirms transaction → Transaction sent
10. App shows: "Transaction pending..." → "Confirmed!"
```

### Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Home page
│   │   ├── vault/        # Vault operations page
│   │   └── layout.tsx    # Root layout
│   ├── config/
│   │   └── api.ts        # API configuration
│   ├── context/
│   │   ├── WalletContext.tsx
│   │   └── VaultContext.tsx
│   ├── services/
│   │   └── api.ts        # API service functions
│   └── utils/
│       ├── constants.ts
│       └── helpers.ts
├── package.json
├── next.config.js
└── README.md
```

## Evaluation Criteria

- ✅ Frontend successfully connects to backend API
- ✅ Wallet integration works correctly
- ✅ All API endpoints are properly integrated
- ✅ Complete user flow works (connect wallet → view balance → deposit → withdraw)
- ✅ Error handling works correctly
- ✅ Configuration is properly documented

## Bonus Points

- Customize or enhance the UI
- Add additional features beyond the basic flow
- Optimize API calls or add caching
- Improve error messages or user feedback
- Add transaction history display

## Notes

- The frontend app is located in the `frontend/` directory
- Follow the setup instructions in `frontend/README.md`
- Requires MetaMask browser extension
- Test in a modern browser (Chrome, Firefox, Edge)
- Focus on configuration and integration, not building from scratch
- If you encounter issues, document them and explain your approach
