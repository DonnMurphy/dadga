// --------- Actual COmments -----------
// DEVNOTE - this code is based off the Youtube tutorial - "Build A Restful Api With Node.js Express & MongoDB | Rest Api Tutorial"
// Link - https://www.youtube.com/watch?v=vjf774RKrLc
// Code has been modified to suit the purposes of this project
// author - donnacha murphy - 116433164
// --------- Actual COmments -----------
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
    console.log("AUCTIONS");
    console.log(auctions);
    res.json(auctions);
  }catch (err){
    res.json({message:err});
  }
});

router.get('/live', async (req,res) => {
  try{
    const auctions = await sheepFace.getAllLiveAuctions();//await Sheep.find(); //reserarch the .find mongoose method for limits/ querys etc
    console.log("AUCTIONS");
    console.log(auctions);
    res.json(auctions);
  }catch (err){
    res.json({message:err});
  }
});


// Route Returns Specifc Sheep
router.get('/:auctionId', async (req,res) => {
  //res.send('We are on specific!');
  console.log(req.params.auctionId);
  try{
    //NOTE INVESTIGATE IF THIS IS ACTUALLY AUCITON ID OR TOKEN ID
  var auction = await sheepFace.getAuctionById(req.params.auctionId);
  // await Sheep.findById(req.params.auctionId);
  res.json(auction);
}catch(err){
  res.json({message:err});
  }
});

// Route Returns Current Price for Sheep
router.get('/:token_id/price', async (req,res) => {
  //res.send('We are on specific!');
  console.log(req.params.token_id);
  try{
    //NOTE INVESTIGATE IF THIS IS ACTUALLY AUCITON ID OR TOKEN ID
  var auction = await sheepFace.getAuctionCurrentPrice(req.params.token_id);
  // await Sheep.findById(req.params.auctionId);
  res.json({price:auction});
}catch(err){
  res.json({message:err});
  }
});

// Route Returns Specifc Sheep
router.get('/owner/:ownerId', async (req,res) => {
  //res.send('We are on specific!');
  //console.log(req.params.auctionId);
  try{
  var auctions = await sheepFace.getAllAuctionsByOwner(req.params.ownerId);
  res.json(auctions);
}catch(err){
  res.json({message:err});
  }
});


// Route Creates New Auction
router.post('/', async (req,res) => {
  //const auction = new Sheep({
  //  title: req.body.title,
  //  description: req.body.description
  //});

  try{
    //NOTE SWITCH CONSOLE MESSAGES TO LIST OUT PARAMS INSTE
    console.log("Auction Creation Started for: " + req.body.sheep_id);
    console.log("Auction Duration is: " + req.body.auction_duration);
    let savedSheep = await sheepFace.createAuction(req.body.user_id, req.body.sheep_id, parseInt(req.body.starting_price), parseInt(req.body.ending_price), parseInt(req.body.auction_duration));
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
  //console.log(req.body);
});


// Route Submits New Sheep
router.post('/bid', async (req,res) => {
  //const auction = new Sheep({
  //  title: req.body.title,
  //  description: req.body.description
  //});

  try{
    console.log("Bidding On Auction: " + req.body.sheep_id);
    //NOTE TRANSACTION REVERTS IN EVM IF VAL IS BELOW CURRENT PRICE NEED TO GET CURRENT PRICE AT MOMENT
    let savedSheep = await sheepFace.bidOnAuction(req.body.sheep_id, req.body.bid_amount , req.body.bidder_id);
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
  //console.log(req.body);
});

// --------------------------- Figure everything below later -------------------

//update a auction -- Dont need this really?
router.patch("/:auctionId", async (req,res) => {
  try{
  const updatedSheep = await Sheep.updateOne({_id: res.param.auctionId}, {$set: {title:req.body.title }});
  res.json(updatedSheep);
  }catch(err){
  res.json({message:err});
}
})

module.exports = router;
