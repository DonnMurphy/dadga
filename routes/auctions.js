// --------- Actual Comments -----------
// DEVNOTE - this code is based off the Youtube tutorial - "Build A Restful Api With Node.js Express & MongoDB | Rest Api Tutorial"
// Link - https://www.youtube.com/watch?v=vjf774RKrLc
// Code has been modified to suit the purposes of this project
// author - donnacha murphy - 116433164

const express = require('express');
const router = express.Router();
const SheepInterface = require('../sheepinterface/sheepInterface');
const sheepFace = new SheepInterface;
// Route Returns All Sheeps
router.get('/', async (req,res) => {
  try{
    const auctions = await sheepFace.getAllAuctions();//await Sheep.find(); //reserarch the .find mongoose method for limits/ querys etc
    console.log("Auction Call For All Auctions Ever Created");
    console.log(auctions);
    res.json(auctions);
  }catch (err){
    res.json({message:err});
  }
});

router.get('/live', async (req,res) => {
  try{
    const auctions = await sheepFace.getAllLiveAuctions();//await Sheep.find(); //reserarch the .find mongoose method for limits/ querys etc
    console.log("Auction Call For All Live Auctions");
    console.log(auctions);
    res.json(auctions);
  }catch (err){
    res.json({message:err});
  }
});


// Route Returns Specifc Sheep
router.get('/:auctionId', async (req,res) => {
  console.log("Call For Specific Auction By Auction ID - auctionId=" + req.params.auctionId );
  try{
  var auction = await sheepFace.getAuctionById(req.params.auctionId);
  res.json(auction);
}catch(err){
  res.json({message:err});
  }
});

// Route Returns Current Price for Sheep
router.get('/:token_id/price', async (req,res) => {
  console.log("Call For Current Price of Token: " + req.params.token_id);
  try{
    //NOTE INVESTIGATE IF THIS IS ACTUALLY AUCITON ID OR TOKEN ID
  var auction = await sheepFace.getAuctionCurrentPrice(req.params.token_id);
  // await Sheep.findById(req.params.auctionId);
  res.json({price:auction});
}catch(err){
  res.json({message:err});
  }
});

// Route Returns All Auctions BY Owner
router.get('/owner/:ownerId', async (req,res) => {
  console.log("Call For All Auctions From Owner: " + req.params.owner_id);
  try{
  var auctions = await sheepFace.getAllAuctionsByOwner(req.params.owner_Id);
  res.json(auctions);
}catch(err){
  res.json({message:err});
  }
});


// Route Creates New Auction
router.post('/', async (req,res) => {
  try{
    console.log("Auction Creation Started for Sheep:" + req.body.sheep_id + "/ From: " + req.body.user_id + "/ Starting Price: " + req.body.starting_price + "/ Ending Price: " + req.body.ending_price + "/ Duration Of : " + req.body.auction_duration + " seconds");
    let savedSheep = await sheepFace.createAuction(req.body.user_id, req.body.sheep_id, parseInt(req.body.starting_price), parseInt(req.body.ending_price), parseInt(req.body.auction_duration));
    console.log("Auction Creation Result: " + savedSheep.toString());
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
});


// Route Submits A Bid on a Live Auction
router.post('/bid', async (req,res) => {
  try{
    console.log("Bidding On Auction For TokenId: " + req.body.sheep_id + "/ For: " + req.body.bid_amount + " / Bidder Id: " + req.body.bidder_id);
    //NOTE TRANSACTION REVERTS IN EVM IF VAL IS BELOW CURRENT PRICE NEED TO GET CURRENT PRICE AT MOMENT
    let savedSheep = await sheepFace.bidOnAuction(req.body.sheep_id, req.body.bid_amount , req.body.bidder_id);
    console.log("Auction Bid Result: " + savedSheep.toString());
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
});

// Route Submits New Sheep
router.post('/cancel', async (req,res) => {
  try{
    console.log("Cancelling Auction For Token: " + req.body.sheep_id + " For User: " +  req.body.seller_id);
    let savedSheep = await sheepFace.cancelActiveAuction(req.body.sheep_id, req.body.seller_id);
    console.log("Cancel Auction Result: " + savedSheep)
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
});


module.exports = router;
