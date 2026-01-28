// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TokenVault
 * @author Eri A.
 * @notice A secure vault for users to deposit and withdraw ERC20 tokens.
 */
contract TokenVault is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // @notice User balance per token: user -> token -> balance
    mapping(address => mapping(address => uint256)) private balances;
    
    // @notice Total deposits per token: token -> total deposited
    mapping(address => uint256) private _totalDeposits;

    // Events - we indexed some attributes here for efficient filtering (that is, make them lookable in the subgraph)
    event Deposit(address indexed user, address indexed token, uint256 amount, uint256 timestamp);
    event Withdraw(address indexed user, address indexed token, uint256 amount, uint256 timestamp);

    constructor() Ownable(msg.sender) {}

    /**
     * @notice Deposit ERC20 tokens into vault
     * @param token Address of ERC20 token contract
     * @param amount Token amount to deposit (in token's decimals)
     * @dev Requires prior token approval
     */
    function deposit(address token, uint256 amount) external whenNotPaused {
        // we check for zero values (early returns) to prevent unnecessary events and state changes
        // that could be exploited in some edge cases - therefore saving gas
        require(amount > 0, "Amount must be greater than zero");
        require(token != address(0), "Invalid token address");

        balances[msg.sender][token] += amount;
        _totalDeposits[token] += amount;

        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

        emit Deposit(msg.sender, token, amount, block.timestamp);
    }

    /**
     * @notice Withdraw ERC20 tokens from vault
     * @param token Address of ERC20 token contract
     * @param amount Token amount to withdraw (in token's decimals)
     */
    function withdraw(address token, uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");

        uint256 userBalance = balances[msg.sender][token];
        require(userBalance >= amount, "Insufficient balance");

        // debit the user balance and update total deposits record
        balances[msg.sender][token] -= amount;
        _totalDeposits[token] -= amount;

        IERC20(token).safeTransfer(msg.sender, amount);

        emit Withdraw(msg.sender, token, amount, block.timestamp);
    }

    /**
     * @notice Get user's balance for specific token
     * @param user Address of user
     * @param token Address of ERC20 token
     * @return User's token balance in vault
     */
    function balanceOf(address user, address token) external view returns (uint256) {
        return balances[user][token];
    }

    /**
     * @notice Get total deposits for a specific token
     * @param token Address of ERC20 token
     * @return Total deposited amount of the token in vault
     */
    function totalDeposits(address token) external view returns (uint256) {
        return _totalDeposits[token];
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Check if the contract is paused
     * @return True if paused, false otherwise
     */
    function paused() external view returns (bool) {
        return super.paused();
    }
}
