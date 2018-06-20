const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../src/build/FundFactory.json');
const compiledFund = require('../src/build/Fund.json');

let accounts;
let factory;
let fundAddress;
let fund;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFund.interface))
        .deploy({ data: compiledFund.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createFund('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    [fundAddress] = await factory.methods.getDeployedFunds().call();
    fund = await new web3.eth.Contract(
        JSON.parse(compiledFund.interface),
        fundAddress
    );
});

describe('Funds', () => {
    it('deploys a factory and a fund', () => {
        assert.ok(factory.options.address);
        assert.ok(fund.options.address);
    });

    it('marks caller as the fund manager', async () => {
        const manager = await fund.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute money and marks them as approvers' async () => {
        await fund.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await fund.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });
});