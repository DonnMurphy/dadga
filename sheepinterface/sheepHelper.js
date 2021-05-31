var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
var url = 'https://ropsten.infura.io/v3/0f42ed98ccbc4d5aa6c4872ba8ebe005'
var web3 = new Web3(url)
var contractAddress = '0x923bcFFC43024279FbeFc9ab3e2A8CBAaaBD03AE'
console.log("MEMES")
var mabi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"sheepId","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"dna","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"hp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"dp","type":"uint256"},{"indexed":false,"internalType":"string","name":"imageAsset","type":"string"}],"name":"NewSheep","type":"event"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"createRandomSheep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"findMySheepTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_sheepId","type":"uint256"}],"name":"getSheepById","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSheepTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getSheepsByOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"sheepToOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"sheeps","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dna","type":"uint256"},{"internalType":"uint256","name":"hp","type":"uint256"},{"internalType":"uint256","name":"dp","type":"uint256"},{"internalType":"string","name":"imageAsset","type":"string"}],"stateMutability":"view","type":"function"}];
const contract = new web3.eth.Contract(mabi, contractAddress);
console.log(web3.eth.accounts.privateKeyToAccount('104a60a46b9ec313dadea0b413a19eb113eb30ef1f08f5d4f36c24fc31a44536'));
//web3.eth.accounts[0] = web3.eth.accounts.privateKeyToAccount('104a60a46b9ec313dadea0b413a19eb113eb30ef1f08f5d4f36c24fc31a44536');



const account1 = '59675267A950E89A2BB4CB35A46F738C5BB3BA387AD6279F8A4EE5A187159774'; // Your account address 1
const account2 = '' // Your accweb3ount address 2

const privateKey1 = Buffer.from('104a60a46b9ec313dadea0b413a19eb113eb30ef1f08f5d4f36c24fc31a44536', 'hex')
//const privateKey2 = Buffer.from('YOUR_PRIVATE_KEY_2', 'hex')

var bal = web3.eth.getBalance(account1);
console.log("MONEY" + bal);

function getAllSheep() {
  var sheepArr = []
  var totalSheep = contract.methods.getSheepTotal().call((err,result) => {console.log("Memes" + result)});
  for(var i =0; i < totalSheep; i++){
    sheepArr[i] = contract.methods.getSheepById(2).call((err, resulta) => {console.log(resulta)});
  }
  return sheepArr
}

function  createNewSheep (name){
  // Transfer some tokens
  console.log("ADDRESS" + account1 )
web3.eth.getTransactionCount(account1, (err, txCount) => {

  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(400000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
    to: contractAddress,
    data: contract.methods.createRandomSheep(name).encodeABI()
  }

  const tx = new Tx(txObject,{chain:'ropsten', hardfork: 'petersburg'});
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash)
    // Use this txHash to find the contract on Etherscan!
  })
})


}
//console.log(contract.methods);
//contract.methods.sheeps(1).call((err,result) => {console.log("Memesaa" + result['name'])});;
//contract.methods.getSheepTotal().call((err,result) => {console.log("Memes" + result)});
contract.methods.getSheepById(2).call((err, resulta) => {console.log(resulta)});
console.log(getAllSheep());
console.log(createNewSheep("Gerry Baadams"));
