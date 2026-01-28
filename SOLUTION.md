# Solution Documentation

## Approach

My approach was to first thoroughly understand the requirements for each task, then design the smart contract with simplicity and security in mind, followed by configuring the backend API to interact with the deployed contract. For this stage both, I favored clarity which is one of my core principles over complexity, and finally hooking up the neccessary state changes to the provided frontend to provide a user-friendly interface for interacting with the vault.

## Task 1: Smart Contract

To approach this, I focused on the following questions and design choices:

- How to track user balances per token? → Nested mapping: mapping(address => mapping(address => uint256)) userBalances; (user => (token => balance))
- Should we track total deposits per token? → YES, for analytics: mapping(address => uint256) totalDeposits;
- Should we validate amounts > 0? → YES (no zero deposits/withdrawals)
- Should we allow deposits of zero amount? -> NO (waste of gas, no effect)
- Should we validate token address is a contract? Well, SafeERC20 will revert
- Should `totalDeposits` be public or have a getter? → Getter (explicit interface)
- Should we emit events in pause/unpause? → OpenZeppelin already does this

## Task 2: Backend API Configuration

<!-- Describe your backend configuration and integration approach -->

## Task 3: Next.js Frontend

<!-- Describe your frontend architecture and UI/UX decisions -->

## Design Decisions

Before coding, I considered the following design aspects:

- Nested Mappings vs. Structs for user balances; chose nested mappings for simplicity and gas efficiency. No array iteration needed, O(1) access time.

## Integration

<!-- How do the three components work together? -->

## Assumptions

<!-- List any assumptions you made -->

## Challenges & Solutions

<!-- Describe any challenges you encountered and how you solved them -->

## Setup Instructions

<!-- Provide step-by-step instructions to run your solution -->

### Smart Contract

```bash
# Your instructions here
```

### Backend API Configuration

```bash
# Your configuration instructions here
# - Environment variables used
# - Contract ABI updates
# - Any customizations made
```

### Next.js Frontend

```bash
# Your instructions here
```

## Additional Notes

<!-- Any other information you'd like to share -->
