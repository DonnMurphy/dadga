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
const contractAddress = '0x9eD1Ae98B93359D3B78638D11fc10834E6dD20Fe'//'0xA529C33933349f5504DC892Fe1929e8251Fa9489'//'0x8403Ed55fec623adD258B0EfA1f4fA29d54CBB6b'//'0x44157C5B5369c69eFe479Df6653A343ed7E1f27F'

const contract = new web3.eth.Contract(mabi, contractAddress);
console.log(web3.eth.accounts.privateKeyToAccount('104a60a46b9ec313dadea0b413a19eb113eb30ef1f08f5d4f36c24fc31a44536'));
const account1 = '0x1B6e1cdF8cBDac646dD548E46B8FE0A8b7B72852';
const privateKey1 = Buffer.from('59675267A950E89A2BB4CB35A46F738C5BB3BA387AD6279F8A4EE5A187159774', 'hex');
const releasedUserId = "RELEASED";
web3.eth.getBalance(account1).then(bal => {
  console.log("Ropsten Eth Remaining in Account" + bal);
});
// START OF CLASS DEFINATION

class SheepInterface{

	async getAllSheep(){
	  var sheepArr = []
	  let totalSheep = await contract.methods.getSheepTotal().call((err,result) => {
			 console.log("Num Sheep In Existence: ", result)
			 return result
		 });


	  for(var i = 0; i < totalSheep; i++){
	   let tempSheep = await contract.methods.getSheepById(i).call((err, resulta) => {
			 console.log("Temp Sheep Created For:" +resulta);
			// return resulta
		 });
			 sheepArr.push(tempSheep)
	  }
    console.log("Returning Sheep Returned By Get All Sheep:");
		console.log(sheepArr)
	  return sheepArr
	}

  async getSheepByOwner(ownerId){
    var sheepArr = []
    //var sheepOwnedArr = []
    let sheepOwnedArr = await contract.methods.getSheepsByOwner(ownerId).call((err,result) => {
       console.log("Sheep Ids Owned By owner: " + ownerId + "Is :"+ result)
       return result
     });

    console.log(sheepOwnedArr);
    for(var i = 0; i < sheepOwnedArr.length; i++){
     let tempSheep = await contract.methods.getSheepById(sheepOwnedArr[i]).call((err, resulta) => {
       console.log("Temp Sheep Created For:" +resulta);
       return resulta
     });
       sheepArr.push(tempSheep)
    }
    console.log("Returning Sheep Owned By User:");
    console.log(sheepArr)
    return sheepArr
  }

	async getSheepById(sheepId){
		let sheepie = await contract.methods.getSheepById(sheepId).call((err, resulta) => {
			console.log(resulta);
			return resulta
		});
    console.log("Returned Sheep Is: " + sheepie);
		return sheepie;
	}


//-----------------------------------------------
	// Methods for Auction Samrt Contracts

	// Note Returns All Auctions in Existence
	async getAllAuctions(){
	  var auctionArr = []
	  let totalAuctions = await contract.methods.getTotalAuctions().call((err,result) => {
			 console.log("Num Auctions In Existence: ", result)
			 return result
		 });

	  console.log(totalAuctions)
	  for(var i = 0; i < totalAuctions; i++){
	   let tempAuction = await contract.methods.getAuctionById(i).call((err, resultAuction) => {
			 console.log("Temp Auction Created For:" +resultAuction);
			 return resultAuction
		 });

     let sheep = await contract.methods.getSheepById(tempAuction['tokenId']).call(async (err, resultb) => {
          tempAuction["sheep_name"] = resultb["sheep_name"];
          tempAuction["sheep_uid"] =  resultb["sheep_uid"];
          tempAuction["sheep_image"] =  resultb["sheep_imagelink"];
       return resultb;

     });

			 auctionArr.push(tempAuction)
	  }
    console.log("Returning Auctions Returned By Get All Sheep:");
		console.log(auctionArr)
	  return auctionArr
	}

	// Note Returns All Auctions in Existence
	async getAllLiveAuctions(){
		var auctionArr = []
		let totalAuctions = await contract.methods.getTotalAuctions().call((err,result) => {
			 console.log("Num Auctions In Existence: ", result)
			 return result
		 });

		for(var i = 0; i < totalAuctions; i++){
		 let tempAuctions = await contract.methods.getAuctionById(i).call((err, resultAuction) => {
			 console.log("Temp Auction Created For:" +resultAuction);
			 return resultAuction
		 });

     let sheep = await contract.methods.getSheepById(tempAuctions['tokenId']).call(async (err, resultb) => {
          tempAuctions["sheep_name"] = resultb["sheep_name"];
          tempAuctions["sheep_uid"] =  resultb["sheep_uid"];
          tempAuctions["sheep_image"] =  resultb["sheep_imagelink"];
       return resultb;

     });

		 let isActive = await contract.methods.isAuctionActive(i).call((err, active) => {
			console.log("Auction:" + i + " is live:"  +active);
			return active
		});

		 if(isActive == true){
			 auctionArr.push(tempAuctions)
		 }
		}
		console.log("Returning Live Auctions:");
		return auctionArr
	}

	// Note Returns All Auctions in Existence
	async getAllAuctionsByOwner(ownerId){
		var auctionArr = []
    console.log("Point A");
		let totalAuctions = await contract.methods.getTotalAuctions().call((err,result) => {
			 console.log("Num Auctions In Existence: ", result)
			 return result
		 });

		console.log(totalAuctions)
		for(var i = 0; i < totalAuctions; i++){
      console.log("Point B" + i);
        let ownedFlag = false;
		    let tempAuctions = await contract.methods.getAuctionById(i).call((err, resultAuction) => {
	         console.log("Temp Auction Created For:" +resultAuction);
           console.log("Point C");
			     console.log(resultAuction["0"]);
          //CHECK THE VALUE OF THAT CONDITION NO CLUE HERE
          console.log(resultAuction);
            console.log("OWNER CHECK FOR " + resultAuction["seller"] + " - - " + ownerId)
          if(resultAuction["seller"] === ownerId){
          //  console.log("OWNER TRUE");
          //  console.log("Point E");
          console.log("OWNER CHECK FOR TRUTH")
            ownedFlag = true;
          //  return auction;
          }
            return resultAuction;
		    });//).then(auction =>  {
          //console.log("Point D");
          //console.log(auction["seller"] + ownerId);
          //if(auction["sellerId"] === ownerId){
        //    console.log("OWNER TRUE");
        //    console.log("Point E");
        //    ownedFlag = true;
        //    return auction;
        //  }
      //  });

        console.log("JESUS GUCKING CHRIST WORK MAN POST D");
        console.log("EMEMEMES" + tempAuctions);
     let sheep = await contract.methods.getSheepById(tempAuctions['tokenId']).call(async (err, resultb) => {
       console.log("Point F");
          tempAuctions["sheep_name"] = resultb["sheep_name"];
          tempAuctions["sheep_uid"] =  resultb["sheep_uid"];
          tempAuctions["sheep_image"] =  resultb["sheep_imagelink"];
          console.log("OWNER CHECK FOR " + tempAuctions["sellerId"] + " - - " + ownerId)
          if(ownedFlag === true){
            console.log("Point G");
            auctionArr.push(tempAuctions)
          }
       return resultb;

     });
		}
    console.log("Point H");
    console.log("Returning All Auctions Created By Owner: " +ownerId);
		console.log(auctionArr)
		return auctionArr
	}

  // Note Returns All Auctions in Existence
  //COME BACK TO THIS WITH COMMENTS
  async getAuctionById(auctionId){
    let testicles;
		let auction = await contract.methods.getAuctionById(auctionId).call(async (err, resulta) => {
      resulta["sheep_namea"] = "meme";
      return resulta
		});

    let sheep = await contract.methods.getSheepById(auction['tokenId']).call(async (err, resultb) => {

      auction["sheep_name"] = resultb["sheep_name"];
      auction["sheep_uid"] =  resultb["sheep_uid"];
      auction["sheep_image"] =  resultb["sheep_imagelink"];
    //  console.log("Death PLease Come for me" + resultb["sheep_name"]);
  //    testicles = x;
      return resultb;

    });

    console.log("DEATH AND TAXES AND " + auction["sheep_namea"]);
  //});
 //console.log("Auction: " + testicles);
return auction;
	}

  // Returns Current Price
  async getAuctionCurrentPrice(tokenId){
		let current_price = await contract.methods.getCurrentPrice(tokenId).call((err, resulta) => {
			console.log(resulta);
			return resulta
		});
    console.log("Current Price of Token: " + tokenId + " Is: " + current_price);
		return current_price;
	}

	async createAuction (ownerId, sheepId, startPrice, endPrice, duration) {
    console.log("Auction Smart Contract Creation Started For SheepId: " + sheepId+ " From User: " +sheepId + " Start Price: " + startPrice + " End Price: " + endPrice +  " For Duration: " + duration);
    //NOTE CHANGE THIS TO ownerOf
		let isOwner = await contract.methods._owns(ownerId, sheepId).call((err,result) => {
			 console.log("User: " + ownerId + " is the Owner of Sheep: " + sheepId + " = " + result)
			 return result
		 });
		//TODO NEED TO SET A CONVERT DURATION TO SECONDS
		if(isOwner == true){
			// Transfer some tokens
		  console.log("Creating Sale Auction For Above Parameters - SheepID: " + sheepId );
			let data = await contract.methods.createSaleAuction(sheepId, startPrice, endPrice, duration, ownerId).encodeABI();
      console.log("ABI DATA " + data);
			this.createEthTransaction(data);
		}
	}

  async registerSheep(ownerId, sheepId) {
    console.log("Register Sheep Started For SheepId: " + sheepId+ " For User: " +sheepId );
    //NOTE CHANGE THIS TO ownerOf
    let isReleased = await contract.methods._owns(releasedUserId, sheepId).call((err,result) => {
       console.log("Result of released check between:" +releasedUserId + " and SheepId: " + sheepId + " Result of: " +result);
       return result
     });
    if(isReleased == true){
      console.log("Registering Sheep Call For Above Parameters - SheepID: " + sheepId );
      let data = await contract.methods.registerReleasedSheep(ownerId,sheepId).encodeABI();
      console.log(data);
      this.createEthTransaction(data);
    }
  }

  async releaseSheep(ownerId, sheepId) {
    console.log("Release Sheep Started For SheepId: " + sheepId+ " From User: " +sheepId );
    //NOTE CHANGE THIS TO ownerOf -- WHY??

    let isOwner = await contract.methods._owns(ownerId, sheepId).call((err,result) => {
      console.log("Result of ownership check between:" + ownerId + " and SheepId: " + sheepId + " Result of: " + result);
       return result
     });

    if(isOwner == true){
      console.log("Releasing Sheep Call For Above Parameters - SheepID: " + sheepId );
      let data = await contract.methods.releaseRegisteredSheep(ownerId,sheepId).encodeABI();
      console.log(data);
      this.createEthTransaction(data);
    }
  }

  async transferSheep(ownerId, transferUserId, sheepId) {
    console.log("Transfer Of Sheep Started For SheepId: " + sheepId+ " From User: " +ownerId + " To User: " +transferUserId );
    //NOTE CHANGE THIS TO ownerOf -- WHY??

    let isOwner = await contract.methods._owns(ownerId, sheepId).call((err,result) => {
      console.log("Result of ownership check between:" + ownerId + " and SheepId: " + sheepId + " Result of: " +result);
       return result
     });

    if(isOwner == true){
      console.log("Transfer Sheep Call For Above Parameters - SheepID: " + sheepId );
      let data = await contract.methods.transfer(transferUserId,ownerId,sheepId).encodeABI();
      console.log(data);
      this.createEthTransaction(data);
    }
  }

//COMEBACK TO THIS
	async bidOnAuction (sheepId, bidAmount, bidderId) {
    //FIRSTLY THERE IS NO SHEEP ID YET ITS AUCTION ID
    // EITHER PULL IN SHEEP OR SWITCH TO GET AUCTION SELLER
    //COMEBACK TO THIS
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

//COMEBACK TO THIS - OWner Issue
  async cancelActiveAuction (sheepId, sellerId) {
    //FIRSTLY THERE IS NO SHEEP ID YET ITS AUCTION ID
    // EITHER PULL IN SHEEP OR SWITCH TO GET AUCTION SELLER
    //Owner Issue Affects this Also so will need to implement change soon
		let isOwner = await contract.methods._owns(sellerId, sheepId).call((err, resultOwner) => {
			console.log("Owner :" +resultOwner);
			return resultOwner
		});
		//TODO NEED TO SET A CONVERT DURATION TO SECONDS
		// Need to pull in current price and compare it as there is no return if the method fails in the smart contract
	//	if(isOwner == true){
			// Transfer some tokens
		  console.log("ADDRESS" + account1 )
			//console.log("Contract Address:: " + contractAddress )
			let data = await contract.methods.cancelAuction(sheepId, sellerId).encodeABI()
			let response = await this.createEthTransaction(data);
      return response;
			console.log("transaction made")
	//	}
	}


	//durationToSeconds(durationString){
    // THIS CODE IS VERY RANDOM - MIGHT DO THIS LOCALLY
		//Psudo Code clean up
	//	var timeVal = durationString.split(1);
//		var unitVal = durationString.split(2);
		//ImplmentSwitchStatment here
		//switch unit:

//	}

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
	 let createResult = await web3.eth.getTransactionCount(account1, async (err, txCount) => {

	 const txObject = {
		 nonce:    web3.utils.toHex(txCount),
		 gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
		 gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
		 to: contractAddress,
		 data: methodData
	 }
	 console.log("GOT TO TX OBJECT" + methodData )
	 const tx = new Tx(txObject,{chain:'ropsten', hardfork: 'petersburg'});
	 tx.sign(privateKey1)

	 const serializedTx = tx.serialize()
	 const raw = '0x' + serializedTx.toString('hex')

	var transactionResult = await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
		 console.log('err:', err, 'txHash:', txHash)
		 createResult = txHash;
		 return txHash;
		 // Use this txHash to find the contract on Etherscan!
	 }).catch(error => {
		 console.log('Success?', error)
     createResult = error;
		 return error;

	 })
	 // NOTE GOT THIS RETURN WRONG SINCE FUNCTION IS NOT ASYNC - just remove
	 console.log("Transaction:" +transactionResult)
	 return transactionResult;
 }).then( result => {
   console.log("Create:" + result);
   return result;
 }).then( resultab => {
   console.log("Return:" + resultab);
   return resultab;

 });

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
//sheepTest.getSheepByOwner("RELEASED");

//sheepTest.getAllAuctions();
//sheepTest.getAllLiveAuctions();
//sheepTest.getAllAuctionsByOwner("RELEASED");
