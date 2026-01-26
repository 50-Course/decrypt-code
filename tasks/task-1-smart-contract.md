# Task 1: Smart Contract Development

## Objective

Create a simple but functional smart contract that demonstrates your Solidity skills and understanding of blockchain fundamentals.

## Requirements

Build a **TokenVault** contract with the following features:

### Core Functionality

1. **Token Storage**
   - Users can deposit ERC20 tokens into the vault
   - Users can withdraw their deposited tokens
   - Track each user's balance in the vault

2. **Access Control**
   - Only the contract owner can pause/unpause the contract
   - When paused, deposits and withdrawals should be disabled

3. **Events**
   - Emit events for deposits and withdrawals
   - Include relevant information (user address, amount, timestamp)

### Technical Requirements

- Use Solidity ^0.8.0 or higher
- Follow OpenZeppelin contracts for security (use their `Ownable`, `Pausable`, and `IERC20` interfaces)
- Implement proper error handling
- Consider gas optimization where possible
- Add NatSpec documentation

### Deliverables

1. Smart contract file: `contracts/TokenVault.sol`
2. Deployment script: `scripts/deploy.js` (or similar)
3. Brief explanation of your design choices in comments

### Example Usage

```solidity
// User deposits 100 tokens
tokenVault.deposit(tokenAddress, 100);

// User withdraws 50 tokens
tokenVault.withdraw(tokenAddress, 50);

// Owner pauses the contract
tokenVault.pause();
```

## Evaluation Criteria

- ✅ Correctness of implementation
- ✅ Code quality and readability
- ✅ Security best practices
- ✅ Gas optimization considerations
- ✅ Proper use of events and error handling

## Bonus Points

- Implement a function to get total deposits for a specific token
- Add reentrancy protection
- Include a function to get user's balance for a specific token
