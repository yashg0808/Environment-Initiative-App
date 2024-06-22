// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupportPage {
    address private _owner;

    // Modifier to restrict functions to only the owner
    modifier onlyOwner() {
        require(msg.sender == _owner, "You are not the owner");
        _;
    }

    // Event to log received funds
    event FundsReceived(address indexed from, string initiativeId, string userId, uint256 amount);

    // Event to log withdrawn funds
    event FundsWithdrawn(address indexed to, uint256 amount);

    // Constructor to set the contract owner
    constructor() {
        _owner = msg.sender;
    }

    // Function to get the owner address
    function owner() public view returns (address) {
        return _owner;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {
        // You cannot emit initiativeId and userId here since these functions cannot take parameters
        // You can emit an event with the amount and sender address only
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {
        // You cannot emit initiativeId and userId here since these functions cannot take parameters
        // You can emit an event with the amount and sender address only
    }

    // Function to withdraw all funds to a specified address
    function withdrawFunds(address payable receiver) public onlyOwner {
        require(receiver != address(0), "Invalid receiver address");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        receiver.transfer(balance);
        emit FundsWithdrawn(receiver, balance);
    }

    // Function to get the contract balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to donate funds to the contract
    function donate(string memory initiativeId, string memory userId) public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        emit FundsReceived(msg.sender, initiativeId, userId, msg.value);
    }
}
