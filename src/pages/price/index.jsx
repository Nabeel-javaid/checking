import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Chainlink Price Feed contract ABI
const aggregatorV3InterfaceABI = [
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "description",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint80",
                "name": "_roundId",
                "type": "uint80"
            }
        ],
        "name": "getRoundData",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint80",
                        "name": "roundId",
                        "type": "uint80"
                    },
                    {
                        "internalType": "int256",
                        "name": "answer",
                        "type": "int256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startedAt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "updatedAt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint80",
                        "name": "answeredInRound",
                        "type": "uint80"
                    }
                ],
                "internalType": "struct AggregatorV3Interface.RoundData",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "latestRoundData",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint80",
                        "name": "roundId",
                        "type": "uint80"
                    },
                    {
                        "internalType": "int256",
                        "name": "answer",
                        "type": "int256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startedAt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "updatedAt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint80",
                        "name": "answeredInRound",
                        "type": "uint80"
                    }
                ],
                "internalType": "struct AggregatorV3Interface.RoundData",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Chainlink Price Feed address for ETH/USD on mainnet (example)
const priceFeedAddress = "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419";

function App() {
    const [tokenCollateralPrice, setTokenCollateralPrice] = useState(null);
    const [tokenLendingPrice, setTokenLendingPrice] = useState(null);

    useEffect(() => {
        async function fetchPrice() {
            // Connect to Ethereum network
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Create a contract instance
            const priceFeed = new ethers.Contract(priceFeedAddress, aggregatorV3InterfaceABI, provider);

            // Fetch the latest price
            const latestRoundData = await priceFeed.latestRoundData();
            const price = latestRoundData.answer.toNumber() / Math.pow(10, 8); // Adjust for decimals

            setTokenCollateralPrice(price);
            setTokenLendingPrice(price); // Assuming same price for simplicity
        }

        fetchPrice();
    }, []);

    return (
        <div>
            <h1>Token Prices</h1>
            <p>Collateral Price: {tokenCollateralPrice}</p>
            <p>Lending Price: {tokenLendingPrice}</p>
        </div>
    );
}

export default App;
