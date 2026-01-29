# Solution Documentation

## Approach

My approach was to first thoroughly understand the requirements for each task, then design the smart contract with simplicity and security in mind, followed by configuring the backend API to interact with the deployed contract. For this stage both, I favored clarity, explicit verification at boundaries, fail fast with clear errors.

Finally hooking up the neccessary state changes to the provided frontend to provide a user-friendly interface for interacting with the vault.

## Task 1: Smart Contract

To approach this, I focused on the following questions and design choices:

- How to track user balances per token? -> Nested mapping: mapping(address => mapping(address => uint256)) userBalances; (user => (token => balance))
- Should we track total deposits per token? -> YES, this is super useful for analytics: mapping(address => uint256) totalDeposits;
- Should we validate amounts > 0? -> YES (no zero deposits/withdrawals)
- Should we allow deposits of zero amount? -> NO (waste of gas, no effect)
- Should we validate token address is a contract? Well, at any case, SafeERC20 will revert
- Should `totalDeposits` be public or have a getter? -> Getter (explicit interface)
- Should we emit events in pause/unpause? -> OpenZeppelin already does this

## Task 2: Backend API Configuration

Configured the backend API to connect to the deployed smart contract by updating the contract address and ABI in the configuration files, precisely in `config/blockchain.js`.

## Task 3: Next.js Frontend

On the frontend. No code changes were necessary, just configuration to point to the deployed contract address and ABI.

Configured Metamask and all was good.

## Design Decisions

Generally, I considered the following design aspects:

**Nested mappings over structs?**

- Simpler gas model (no struct packing concerns)
- Direct access pattern: `balances[user][token]`
- Standard in production vaults (Compound, Aave)

**Why SafeERC20?**

- Non-standard tokens like USDT don't return bool on transfer
- Production code must handle edge cases
- Minimal gas overhead for safety

**Why both ReentrancyGuard AND CEI?**

- Defense in depth
- CEI prevents reentrancy logically
- ReentrancyGuard prevents it mechanically
- Either could fail (malicious token, future Solidity bug)

**Why my "psuedo" structured logging pattern?**

- Grep-able for debugging
- Context-rich for reproduction
- Simple (no JSON parsing in terminal, just grep) - in production, i would ideally lean to structured logging

## Integration

Data flow:

```
Frontend → Backend API → ethers.js → Smart Contract → Hardhat Node
```

Example flow (balance query):

1. User enters addresses in form
2. Frontend: `GET /api/vault/balance/:user/:token`
3. Backend validates, calls `contract.balanceOf()`
4. ethers.js sends JSON-RPC to Hardhat
5. Contract executes view function (no gas)
6. Result returns through stack
7. Frontend displays formatted balance

## Assumptions

None beyond the provided specifications.

## Challenges & Solutions

**ES Modules vs CommonJS**

- Hardhat needs CommonJS, backend uses ES modules
- Fixed: Kept deployment scripts in CommonJS, backend in ESM
- Fixed dotenv with `--env-file` flag in package.json scripts

**Environment Loading**

- Backend couldn't read `.env` initially
- Root cause: ES modules and dotenv path resolution
- Solution: Node's native `--env-file=.env` flag

**Security Review**

- Found RCE (remote code execution) vulnerability during configuration
- Documented, and commented out the suspected code
- Backend functions normally without it

## Setup Instructions

### Smart Contract

```bash
npm install
npm run compile

# Start local Hardhat node
npm run node

# Deploy to desired network
npm run deploy --network <network_name>
```

### Backend API Configuration

```bash
cd backend
npm install

# Create .env as defined by the `.env.example` file or the provided instructions and run the below
# echo "PORT=4000" > .env
# echo "RPC_URL=http://127.0.0.1:8545" >> .env
# echo "CONTRACT_ADDRESS=" >> .env

# update CONTRACT_ADDRESS with the deployed contract address
# as well as the CONTRACT_ABI

npm start
```

### Next.js Frontend

```bash
cd frontend
npm install

# create a `.env.local` file with the following content:
NEXT_PUBLIC_API_BASE_URL=<backend_api_url>
NEXT_PUBLIC_CONTRACT_ADDRESS=<deployed_contract_address>
NEXT_PUBLIC_CHAIN_ID=<chain_id>
NEXT_PUBLIC_NETWORK_NAME=<network_name>
NEXT_PUBLIC_RPC_URL=<rpc_url>

npm run dev
```

## Additional Notes

You would need to have Metamask wallet installed to interact with the frontend. Make sure to connect it to the correct network where the contract is deployed.
