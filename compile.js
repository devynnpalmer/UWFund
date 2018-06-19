const path = require('path');
const fs = require('fs');
const solc = require('solc');

const fundPath = path.resolve(__dirname, 'Fund.sol');
const source = fs.readFileSync(fundPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Fund];