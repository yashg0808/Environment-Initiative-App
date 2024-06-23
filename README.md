ENV-Initiative App
Overview
ENV-Initiative is a web application designed to support and showcase environmental initiatives. Users can view details about various initiatives, support them through donations, and see the list of supporters. This app leverages blockchain technology to record and display financial contributions.

Features
Initiative Details: View detailed information about different environmental initiatives, including the creator, description, location, and images.
Support Initiatives: Donate to initiatives using blockchain technology, with transactions recorded on the Ethereum network.
Supporters List: See a list of supporters for each initiative, along with the amount donated in ETH.
Responsive Design: User-friendly interface optimized for both desktop and mobile devices.
Technology Stack
Frontend: React.js
Backend: Node.js, Express.js
Blockchain: Web3.js, Ethereum
Database: MongoDB
Other: Websocket for real-time updates
Installation
Prerequisites
Node.js and npm installed
MongoDB instance running
Ethereum node provider (e.g., Infura)
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/env-initiative.git
cd env-initiative
Install dependencies:

bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory and add the following variables:

env
Copy code
MONGODB_URI=your_mongodb_uri
ETH_PROVIDER_URL=your_ethereum_provider_url
CONTRACT_ADDRESS=your_smart_contract_address
ABI=your_contract_abi
Run the application:

bash
Copy code
npm start
Usage
Viewing Initiatives
Navigate to the homepage to see a list of environmental initiatives.
Click on an initiative to view detailed information, including title, description, location, and images.
Supporting an Initiative
Click on the "Support" button on the initiative page.
Enter the amount you wish to donate.
Confirm the transaction using your Ethereum wallet.
Viewing Supporters
On the initiative page, scroll down to see the list of supporters.
Each supporter entry includes the username and the amount donated in ETH.
Contribution
We welcome contributions to improve the ENV-Initiative app. To contribute:

Fork the repository.
Create a new branch for your feature or bugfix.
Commit your changes and push to your branch.
Create a pull request with a detailed description of your changes.
License
This project is licensed under the MIT License.

Contact
For any inquiries or support, please contact us at support@env-initiative.com.

Thank you for using the ENV-Initiative app! Together, we can make a difference for our environment.
