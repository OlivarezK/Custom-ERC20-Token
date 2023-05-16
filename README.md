# Custom ERC20 Token in Solidity

This Solidity program is a simple simulation of how we can create our own token using ERC20 contracts.

## Description

This program is a simple contract written in Solidity, a programming language used for developing smart contracts on the Ethereum blockchain. It demonstrates how we can create our own custom token using ERC20 contracts and interact and make use of the different functions available for handling token transactions.

## Getting Started

### Executing Program (Method 1)

To run this program, you will first need to clone this repository so you can have a local copy of your own. After that, open the project in VS Code and run the following commands in the project terminal:

1. Inside the project directory, in the terminal, type: npm install @openzeppelin/contracts
1. In the same terminal, type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After the last step, the project should be running on your local host. Typically at http://localhost:3000/

### Executing Program (Method 2)

You can also use Remix as an alternative. To get started, go to the Remix website at https://remix.ethereum.org/.

Once you are on the Remix website, create a new file by clicking on the "+" icon in the left-hand sidebar. Save the file with a .sol extension (e.g., MToken.sol). Copy and paste the code from the "MToken.sol" file in this repository.

To compile the code, click on the "Solidity Compiler" tab in the left-hand sidebar. Make sure the "Compiler" option is set to "0.8.18" (or another compatible version), and then click on the "Compile MToken.sol" button.

Once the code is compiled, you can deploy the contract by clicking on the "Deploy & Run Transactions" tab in the left-hand sidebar. Select the "MToken" contract from the dropdown menu, and then click on the "Deploy" button.

Once the contract is deployed, you can interact with it by entering inputs and calling the variables or functions in the sidebar. You can interact with them by simply clicking the buttons with the variable names or with the "transact" button for functions. It is recommended to click on the dropdown icons to make it easier to enter inputs:

![image](https://github.com/OlivarezK/Custom-ERC20-Token/assets/72584770/e74f968e-a42b-4f40-9f2c-e48c14af9214)

For functions that require an address as an input, you can copy one from the samples provided by Remix under the "ACCOUNT" dropdown which can be found in the left-hand sidebar as well:

![image](https://user-images.githubusercontent.com/72584770/234553227-a18b8544-5e0b-48a5-af7a-0c81f2bbbcc4.png)

## Authors

OlivarezK

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
