// DEVNOTE: This code is based off the the FOllowing Tutorial:
// Intro to Web3.js · Ethereum Blockchain Developer Crash Course - DappUniversity
//https://www.dappuniversity.com/articles/web3-js-intro
// Code has been modified to suit the purposes of this project
// author - donnacha murphy - 116433164

const Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const url = 'https://ropsten.infura.io/v3/0f42ed98ccbc4d5aa6c4872ba8ebe005'
const web3 = new Web3(url)
const contractAddress = '0x44157C5B5369c69eFe479Df6653A343ed7E1f27F'
//console.log("MEMES")
const mabi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "sheepId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "dna",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "hp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "dp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "imageAsset",
				"type": "string"
			}
		],
		"name": "NewSheep",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createRandomSheep",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "findMySheepTotal",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_sheepId",
				"type": "uint256"
			}
		],
		"name": "getSheepById",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
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
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getSheepsByOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSheepTotal",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sheeps",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dna",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "hp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "imageAsset",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sheepToOwner",
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
]

const contract = new web3.eth.Contract(mabi, contractAddress);
console.log(web3.eth.accounts.privateKeyToAccount('104a60a46b9ec313dadea0b413a19eb113eb30ef1f08f5d4f36c24fc31a44536'));
const account1 = '0x1B6e1cdF8cBDac646dD548E46B8FE0A8b7B72852';
const privateKey1 = Buffer.from('59675267A950E89A2BB4CB35A46F738C5BB3BA387AD6279F8A4EE5A187159774', 'hex')

web3.eth.getBalance(account1).then(bal => {
  console.log("Ropsten Eth Remaining in Account" + bal);
});
// START OF CLASS DEFINATION

class SheepInterface{

	async getAllSheep(){
	  var sheepArr = []
	  let totalSheep = await contract.methods.getSheepTotal().call((err,result) => {
			 console.log("totes", result)
			 return result
		 });

	  console.log(totalSheep)
	  for(var i = 0; i < totalSheep; i++){
	   let tempSheep = await contract.methods.getSheepById(i).call((err, resulta) => {
			 console.log("Temp Sheep:" +resulta);
			 return resulta
		 });
			 sheepArr.push(tempSheep)
	  }
		console.log(sheepArr)
	  return sheepArr
	}

	async getSheepById(sheepId){
		let sheepie = await contract.methods.getSheepById(sheepId).call((err, resulta) => {
			console.log(resulta);
			return resulta
		});
 console.log("MEMES" + sheepie);
	//
		return sheepie;
	}


	async createNewSheep (name){
	  // Transfer some tokens
	  console.log("ADDRESS" + account1 )
	  console.log("Contract Address:: " + contractAddress )
		let createResult = "0x BAAAAAD Creation";
	  web3.eth.getTransactionCount(account1, async (err, txCount) => {

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

	 var transactionResult = web3.eth.sendSignedTransaction(raw, (err, txHash) => {
	    console.log('err:', err, 'txHash:', txHash)
			createResult = txHash;
			return txHash;
	    // Use this txHash to find the contract on Etherscan!
	  }).catch(error => {
	    console.log('Success?', error)
			return error;

	  })
		// NOTE GOT THIS RETURN WRONG SINCE FUNCTION IS NOT ASYNC - just remove
		console.log("Transaction:" +transactionResult)
		return transactionResult;
	})
	console.log("Create:" +createResult);
	return createResult;
	}


}
// END OF CLASS DEFINATION

module.exports = SheepInterface;
