# Environment Initiative App
-If you visit the deployed app on render.com, it will take around 2 mins to load, because its on shared resource, cooperation is much appreciated.

## Overview

The Environment Initiative App is a web application dedicated to supporting and showcasing environmental initiatives. This app allows users to view detailed information about various initiatives, support them through donations, and see the list of supporters. The app utilizes blockchain technology to record and display financial contributions.

## Features

- **View Initiatives:**
  - Detailed information about different environmental initiatives.
  - Information includes the supporters, creator, description, location, and images.

- **Support Initiatives:**
  - Users can donate to initiatives using Ethereum.
  - Transactions are recorded on the Ethereum blockchain.

- **Supporters List:**
  - View a list of supporters for each initiative.
  - Display the amount donated in ETH by each supporter.

- **Responsive Design:**
  - User-friendly interface optimized for both desktop and mobile devices.

## Technology Stack

- **Frontend:**
  - React.js for building the user interface.
  - React-Slick for image carousel/slideshow.

- **Backend:**
  - Node.js and Express.js for server-side development.
  - MongoDB for database management.
    
- **Authentication:**
  - Used JWT (JSON Web Tokens) for authentication.
  - Secured password storage with bcrypt.

- **Blockchain:**
  - Web3.js for interacting with the Ethereum blockchain.
  - Ethereum smart contracts for handling donations.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB database setup.
- Ethereum provider URL (e.g., Infura).
- Ethereum smart contract deployed with ABI and address.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/environment-initiative-app.git
   cd environment-initiative-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a .env file and add the following environment variables:
   ```sh
   MONGODB_URI=your_mongodb_uri
   PROVIDER_URL=your_ethereum_provider_url
   CONTRACT_ADDRESS=your_smart_contract_address
   ```
4. Start the development server:
   ```sh
   npm start
   ```
5. Open your browser and visit http://localhost:3000.

## Usage

- Navigate through the app to view various environmental initiatives.
  - The homepage showcases a list of all available initiatives.
  - Each initiative displays a brief description, location, and thumbnail image.

- Click on an initiative to see more details and images.
  - Detailed view includes the initiative's title, creator information, full description, location, and a carousel of images.

- Support an initiative by donating Ethereum.
  - Click on the "Support" button to initiate a donation.
  - A popup or new page will guide you through the donation process using your Ethereum wallet.

- View the list of supporters and the amount they donated.
  - Each initiative page displays a section with a list of supporters.
  - The supporters' section includes the username of each supporter and the amount they donated in ETH.
  - Supporter avatars are fetched from their profiles and displayed alongside their contributions.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**

2. **Create a new branch:**
   ```sh
   git checkout -b feature-branch
   ```
3. **Make your changes**
4. **Commit your changes:**
   ```sh
   git commit -m 'Add new feature'
   ```
5. **Push to the branch:**
      ```sh
      git push origin feature-branch
      ```
6. **Open a pull request**

   
