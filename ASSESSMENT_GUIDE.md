# Assessment Guide

## Quick Start

1. **Install smart contract dependencies:**
   ```bash
   npm install
   ```

2. **Review the tasks:**
   - Read through each task file in the `tasks/` directory
   - Understand the requirements before starting

3. **Start with Task 1:**
   - Create your smart contract in `contracts/TokenVault.sol`
   - Use the example file as a starting point if needed
   - Deploy to testnet or local node

4. **Move to Task 2:**
   - The `backend/` directory contains a prebuilt Node.js API
   - Configure environment variables (contract address, RPC URL)
   - Update contract ABI in `src/config/blockchain.ts`
   - Test API endpoints

5. **Complete Task 3:**
   - The `frontend/` directory contains a prebuilt Next.js app
   - Configure API URL and contract address in `.env.local`
   - Set up wallet connection (MetaMask browser extension)
   - Test the complete flow (frontend → backend → blockchain)

## Project Structure

```
.
├── contracts/          # Your smart contracts (Task 1)
├── scripts/           # Deployment scripts (Task 1)
├── backend/           # Prebuilt Node.js API (Task 2)
│   ├── src/
│   ├── package.json
│   └── README.md
├── frontend/          # Prebuilt Next.js app (Task 3)
│   ├── src/
│   ├── package.json
│   └── README.md
├── tasks/             # Task descriptions
├── README.md          # Main instructions
└── SOLUTION.md        # Your solution documentation
```

## Helpful Resources

### Solidity & Smart Contracts
- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Ethereum Developer Resources](https://ethereum.org/en/developers/)

### Backend Development
- [Express.js Documentation](https://expressjs.com/)
- [ethers.js Documentation](https://docs.ethers.org/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### Next.js & Web3
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [ethers.js Documentation](https://docs.ethers.org/)

### Security
- [Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [SWC Registry](https://swcregistry.io/)

## Tips

1. **Start Simple**: Get a basic version working first, then add features
2. **Read Documentation**: Use OpenZeppelin's battle-tested contracts
4. **Security First**: Consider security implications from the start
5. **Ask Questions**: If something is unclear, reach out!

## Common Issues

### Smart Contracts
- **"Cannot find module '@openzeppelin/contracts'"**
  - Run `npm install` to install dependencies

- **"Contract not found"**
  - Make sure your contract is in the `contracts/` directory
  - Run `npx hardhat compile` to compile contracts

### Backend
- **"Contract not initialized"**
  - Ensure `CONTRACT_ADDRESS` is set in `.env` file
  - Verify contract address format (42 characters, starts with 0x)
  - Check that contract is deployed to the network

- **"Cannot connect to blockchain"**
  - Check your RPC URL in `.env` file
  - Verify network connectivity
  - For local development, ensure Hardhat node is running

- **"API not responding"**
  - Check if server is running on correct port
  - Verify CORS settings if needed
  - Check error logs
  - Ensure contract ABI matches your deployed contract

### Frontend (Next.js)
- **"Wallet not connecting"**
  - Ensure MetaMask browser extension is installed
  - Check that MetaMask is unlocked
  - Verify network configuration matches your blockchain

- **"Cannot connect to backend"**
  - Check backend URL in `.env.local` or `src/config/api.ts`
  - Ensure backend is running
  - Check CORS settings on backend
  - Verify API URL format

## Evaluation Focus

We're looking for:
- ✅ **Correctness**: Does it work as specified?
- ✅ **Code Quality**: Clean, readable, well-commented code
- ✅ **Architecture**: Well-structured, maintainable code
- ✅ **Security**: Proper security practices (no hardcoded keys, input validation)
- ✅ **Integration**: Backend connects to blockchain, frontend connects to backend
- ✅ **Documentation**: Clear explanations, setup instructions, and comments
- ✅ **User Experience**: Functional, intuitive UI with proper error handling

Good luck! 🚀
