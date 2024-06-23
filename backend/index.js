import 'dotenv/config'
import connectDB from './db/init.js';
import { httpServer } from './app.js';
import Web3 from 'web3';
import { contractAddress, abi, providerUrl } from './constants.js';

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