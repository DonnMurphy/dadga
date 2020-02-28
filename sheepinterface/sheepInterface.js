// DEVNOTE: This code is based off the the FOllowing Tutorial:
// Intro to Web3.js · Ethereum Blockchain Developer Crash Course - DappUniversity
//https://www.dappuniversity.com/articles/web3-js-intro
// Code has been modified to suit the purposes of this project
// author - donnacha murphy - 116433164

const Web3 = require('web3');
const mabi = require('./helperAbi.json');
var Tx = require('ethereumjs-tx').Transaction;
const url = 'https://ropsten.infura.io/v3/0f42ed98ccbc4d5aa6c4872ba8ebe005'
const web3 = new Web3(url)
const contractAddress = '0x8403Ed55fec623adD258B0EfA1f4fA29d54CBB6b'//'0x44157C5B5369c69eFe479Df6653A343ed7E1f27F'

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


//-----------------------------------------------
	// Methods for Auction Samrt Contracts

	// Note Returns All Auctions in Existence
	async getAllAuctions(){
	  var auctionArr = []
	  let totalAuctions = await contract.methods.getTotalAuctions().call((err,result) => {
			 console.log("totes aucks", result)
			 return result
		 });

	  console.log(totalAuctions)
	  for(var i = 0; i < totalAuctions; i++){
	   let tempAuction = await contract.methods.getAuctionById(i).call((err, resultAuction) => {
			 console.log("Temp Auctions:" +resultAuction);
			 return resultAuction
		 });
			 auctionArr.push(tempAuction)
	  }
		console.log(auctionArr)
	  return auctionArr
	}

	// Note Returns All Auctions in Existence
	async getAllLiveAuctions(){
		var auctionArr = []
		let totalAuctions = await contract.methods.getTotalAuctions().call((err,result) => {
			 console.log("totes aucks", result)
			 return result
		 });

		console.log(totalAuctions)
		for(var i = 0; i < totalAuctions; i++){
		 let tempAuctions = await contract.methods.getAuctionById(i).call((err, resultAuction) => {
			 console.log("Temp Auction "+resultAuction);
			 return resultAuction
		 });

		 let isActive = await contract.methods.isAuctionActive(i).call((err, active) => {
			console.log("Auction:" + i + " is live:"  +active);
			return active
		});

		 if(isActive == true){
			 auctionArr.push(tempAuctions)
		 }
		}
		console.log(auctionArr)
		return auctionArr
	}

	// Note Returns All Auctions in Existence
	async getAllAuctionsByOwner(ownerId){
		var auctionArr = []
		let totalAuctions = await contract.methods.getTotalAuctions().call((err,result) => {
			 console.log("totes aucks owner", result)
			 return result
		 });

		console.log(totalAuctions)
		for(var i = 0; i < totalAuctions; i++){
		 let tempAuctions = await contract.methods.getAuctionById(i).call((err, resultAuction) => {
			 console.log("Temp Auction OWNERs:" +resultAuction);
			 //return resultAuction
			 console.log(resultAuction["0"]);
			if(resultAuction["0"] == ownerId){
				auctionArr.push(resultAuction)
			}
		 });

		}
		console.log(auctionArr)
		return auctionArr
	}

  // Note Returns All Auctions in Existence
  async getAuctionById(auctionId){
		let auction = await contract.methods.getAuctionById(auctionId).call((err, resulta) => {
			console.log(resulta);
			return resulta
		});
 console.log("MEMES" + auction);
	//
		return auction;
	}

	async createAuction (ownerId, sheepId, startPrice, endPrice, duration) {
    console.log("HOLY MARY MOTHER OF GOD WORK");
    //NOTE CHANGE THIS TO ownerOf
		let isOwner = await contract.methods._owns(ownerId, sheepId).call((err,result) => {
			 console.log("totes aucks", result)
			 return result
		 });
		//TODO NEED TO SET A CONVERT DURATION TO SECONDS
	//	console.log("OWNER " + ownerId);
	//	await contract.methods.ownerOF(sheepId);
	//	console.log(isOwner);
		if(isOwner == true){
			// Transfer some tokens
		  console.log("ADDRESS Auction Create" + account1 )
      console.log("Sheep: " +sheepId)
		  //console.log("Contract Address:: " + contractAddress )
			let data = await contract.methods.createSaleAuction(sheepId, startPrice, endPrice, duration, ownerId).encodeABI();
      console.log(data);
			this.createEthTransaction(data);
		}
	}

	async bidOnAuction (sheepId, bidAmount, bidderId) {
    //FIRSTLY THERE IS NO SHEEP ID YET ITS AUCTION ID
    // EITHER PULL IN SHEEP OR SWITCH TO GET AUCTION SELLER
		let isOwner = await contract.methods._owns(bidderId, sheepId).call((err, resultOwner) => {
			console.log("Owner :" +resultOwner);
			return resultOwner
		});
		//TODO NEED TO SET A CONVERT DURATION TO SECONDS
		// Need to pull in current price and compare it as there is no return if the method fails in the smart contract
		if(isOwner == false){
			// Transfer some tokens
		  console.log("ADDRESS" + account1 )
			//console.log("Contract Address:: " + contractAddress )
			let data = await contract.methods.bid(sheepId, bidAmount, bidderId).encodeABI()
			this.createEthTransaction(data);
			console.log("transaction made")
		}
	}
	//////async getSheepOwner(sheepId){
		//psudocode needs implemntation
	//	let sheepOwner = await contract.methods.getSheepById(sheepId).call((err, resulta) => {
	//		console.log(resulta);
		//	return resulta
	//	});
 //console.log("MEMES" + sheepie);
	//
	//	return sheepie;
	//}
	durationToSeconds(durationString){
		//Psudo Code clean up
		var timeVal = durationString.split(1);
		var unitVal = durationString.split(2);
		//ImplmentSwitchStatment here
		//switch unit:

	}

	async createNewSheep (name){
	  // Transfer some tokens
	  console.log("ADDRESS" + account1 )
	  console.log("Contract Address:: " + contractAddress )
		let createResult = "0x BAAAAAD Creation";

		var data;
		data = await contract.methods.createRandomSheep(name).encodeABI();
		this.createEthTransaction(data);
	}

	async createEthTransaction(methodData){
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
		 data: methodData
	 }
	 console.log("GOT TO TX OBJECT" + methodData )
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

	async newCreateNewSheep(){
		var name = "Doyler The Seshhead";
		var data;
		data = await contract.methods.createRandomSheep(name).encodeABI();
		this.createEthTransaction(data);
	}
}
// END OF CLASS DEFINATION

//sheepTest = new SheepInterface;
//sheepTest.createNewSheep("Sam The Accountant");
//sheepTest.createAuction("RELEASED", 3, 1000, 100, 3600);

//sheepTest.bidOnAuction(3, 980, "DONIE");

module.exports = SheepInterface;
//sheepTest.getAllAuctions();
//sheepTest.getAllLiveAuctions();
//sheepTest.getAllAuctionsByOwner("RELEASED");
