const HDWallerProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'advance welcome today exile six diary double scare bag tornado fame father',
    'https://rinkeby.infura.io/8DN0ciDeaEamsLe9O7MS'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecodel})
        .send({ gas: 1000000, from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
};
deploy();