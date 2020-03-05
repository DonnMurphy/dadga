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
    const sheeps = await sheepFace.getAllSheep();//await Sheep.find(); //reserarch the .find mongoose method for limits/ querys etc
    console.log("Call For All Sheep Ever Created");
    console.log(sheeps);
    res.json(sheeps);
  }catch (err){
    res.json({message:err});
  }
});

// Route Returns Specifc Sheep
router.get('/:sheepId', async (req,res) => {
  //res.send('We are on specific!');
  console.log("Call For Specific Sheep Of Id: " + req.params.sheepId);

  try{
    var sheep = await sheepFace.getSheepById(req.params.sheepId);
    console.log(sheep);
    res.json(sheep);
  }catch(err){
    res.json({message:err});
  }
});

// Route Returns All Sheep Owned By Owner
router.get('/owner/:ownerId', async (req,res) => {
  console.log("Call For All Sheeps From Owner: " + req.params.ownerid);
  try{
    const sheep = await sheepFace.getSheepByOwner(req.params.ownerId);//await Sheep.findById(req.params.sheepId);
    console.log(sheep);
    res.json(sheep);
  }catch(err){
    res.json({message:err});
  }
});

//Route Registers a Released Sheep
router.post('/register', async (req,res) => {
  try{
    console.log("Sheep Registration Started For SheepId: " + req.body.sheep_id + " To User: " +req.body.user_id);
    let savedSheep = await sheepFace.registerSheep(req.body.user_id, req.body.sheep_id);
      //NOTE THIS DOES NOT SEEM TO RETURN ANYTHING - SHOULD DO SOMETHING ABOUT THAT
    console.log(savedSheep);
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
});

//Route Releases An Owned Sheep
router.post('/release', async (req,res) => {
  try{
    console.log("Sheep Registration Started For SheepId: " + req.body.sheep_id + " From User: " +req.body.user_id);
    let savedSheep = await sheepFace.releaseSheep(req.body.user_id, req.body.sheep_id);
    //NOTE THIS DOES NOT SEEM TO RETURN ANYTHING - SHOULD DO SOMETHING ABOUT THAT
    console.log(savedSheep);
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
});

//Route Releases An Owned Sheep
router.post('/:sheepId/transfer', async (req,res) => {
  try{
    console.log("Sheep Transfer Started For SheepId: " + req.body.sheep_id + " From User: " +req.body.from_id + " To User: " +req.body.to_id);
    let savedSheep = await sheepFace.releaseSheep(req.body.from_id,req.body.to_id, req.body.sheep_id);
    //NOTE THIS DOES NOT SEEM TO RETURN ANYTHING - SHOULD DO SOMETHING ABOUT THAT
    console.log(savedSheep);
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
});

// Route Creates New Sheep
//NOTE COULD DO SOMETHING GOOG WITH THIS
router.post('/', async (req,res) => {
  try{
    console.log("Create Sheep Started for: " + req.body.name);
    let savedSheep = await sheepFace.createNewSheep(req.body.name);
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
});

module.exports = router;
