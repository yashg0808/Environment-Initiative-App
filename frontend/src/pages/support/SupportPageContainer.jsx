// SPDX-License-Identifier: MIT
import React, { useState, useEffect } from "react";
import Web3 from "web3";

const SupportPageContainer = () => {
  const [account, setAccount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const contractAddress = "0x4528FCe34FE1ef69D994B3098FabbB9f4f7c2004"; // Replace with your actual contract address

  // Contract ABI generated from Solidity compiler or Remix
  const contractABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "FundsReceived",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "FundsWithdrawn",
      type: "event",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "receiver",
          type: "address",
        },
      ],
      name: "withdrawFunds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "donate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];

  // Load Web3 and connect to the user's wallet
  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          setWeb3(web3Instance);
          const contractInstance = new web3Instance.eth.Contract(
            contractABI,
            contractAddress
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("User denied account access");
        }
      } else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        const contractInstance = new web3Instance.eth.Contract(
          contractABI,
          contractAddress
        );
        setContract(contractInstance);
      } else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };

    loadWeb3();
  }, []);

  const handleDonate = async () => {
    if (
      !web3 ||
      !contract ||
      !account ||
      !donationAmount ||
      isNaN(donationAmount)
    ) {
      setStatusMessage(
        "Please connect your wallet and enter a valid donation amount."
      );
      return;
    }

    const value = web3.utils.toWei(donationAmount, "ether");

    try {
      await contract.methods.donate().send({ from: account, value });
      setStatusMessage("Donation successful!");
    } catch (error) {
      console.error("Donation failed:", error);
      setStatusMessage("Donation failed. Please try again.");
    }
  };

  return (
      <div className="max-w-lg mx-auto p-6 bg-grey shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Donate to Support
        </h2>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount (in ETH):
          </label>
          <input
            type="text"
            id="amount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <button
          onClick={handleDonate}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Donate
        </button>
        {statusMessage && (
          <p className="mt-4 text-center text-red-500">{statusMessage}</p>
        )}
      </div>
  );
};

export default SupportPageContainer;
