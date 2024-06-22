import 'dotenv/config'
import connectDB from './db/init.js';
import { httpServer } from './app.js';
import Web3 from 'web3';

const providerUrl = "wss://eth-sepolia.g.alchemy.com/v2/jmBFJ1eJ4ndLMh_6FOm9d9p_1j2zlh9t";
const contractAddress = "0x9e57910ceFd664a412342749e54965345b712A78";
const webhookUrl = "https://your-dummy-fetch-url";

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "initiativeId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			}
		],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "initiativeId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsWithdrawn",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
const contract = new web3.eth.Contract(abi, contractAddress);

//@ts-ignore
contract.events.FundsReceived({
    fromBlock: 0
})
.on('data', async function(event) {
    console.log(event.returnValues);
    // axios.post(webhookUrl, {
    //     email: event.returnValues.email,
    // });
})

//@ts-ignore
contract.events.FundsWithdrawn({
    fromBlock: 0
})
.on('data', async function(event) {
    console.log(event.returnValues);
    // axios.post(webhookUrl, {
    //     email: event.returnValues.email,
    // });
})

try {
    await connectDB();
    httpServer.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
} catch (err) {
    console.log("Mongo db connect error: ", err);
}