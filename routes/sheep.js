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
    res.json(sheeps);
  }catch (err){
    res.json({message:err});
  }
});

// Route Returns Specifc Sheep
router.get('/:sheepId', async (req,res) => {
  //res.send('We are on specific!');
  console.log(req.params.sheepId);
  try{
  var sheep = await sheepFace.getSheepById(req.params.sheepId);
  // await Sheep.findById(req.params.sheepId);
  res.json(sheep);
}catch(err){
  res.json({message:err});
  }
});

// Route Returns Specifc Sheep
router.get('/owner/:ownerId', async (req,res) => {
  //res.send('We are on specific!');
  //console.log(req.params.sheepId);
  try{
  const sheep = await sheepFace.getSheepByOwner(req.params.ownerId);//await Sheep.findById(req.params.sheepId);
  res.json(sheep);
}catch(err){
  res.json({message:err});
  }
});

router.post('/register', async (req,res) => {
  //const sheep = new Sheep({
  //  title: req.body.title,
  //  description: req.body.description
  //});
  try{
    console.log("Register Sheep Started For: " + req.body.sheep_id + req.body.user_id);
    let savedSheep = await sheepFace.registerSheep(req.body.user_id, req.body.sheep_id);
      //NOTE THIS DOES NOT SEEM TO RETURN ANYTHING - SHOULD DO SOMETHING ABOUT THAT
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
  //console.log(req.body);
});

router.post('/release', async (req,res) => {
  //const sheep = new Sheep({
  //  title: req.body.title,
  //  description: req.body.description
  //});
  try{
    console.log("RELEASE Sheep Started For: " + req.body.sheep_id + req.body.user_id);
    let savedSheep = await sheepFace.releaseSheep(req.body.user_id, req.body.sheep_id);
    //NOTE THIS DOES NOT SEEM TO RETURN ANYTHING - SHOULD DO SOMETHING ABOUT THAT
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
  //console.log(req.body);
});

// --------------------------- Figure everything below later -------------------

// Route Submits New Sheep
router.post('/', async (req,res) => {
  //const sheep = new Sheep({
  //  title: req.body.title,
  //  description: req.body.description
  //});

  try{
    console.log("Create SHeep Started for: " + req.body.name);
    let savedSheep = await sheepFace.createNewSheep(req.body.name);
    res.json(savedSheep);
  }catch (err){
    res.json({message: err});
  }
  //console.log(req.body);
});


//update a sheep -- Dont need this really?
router.patch("/:sheepId", async (req,res) => {
  try{
  const updatedSheep = await Sheep.updateOne({_id: res.param.sheepId}, {$set: {title:req.body.title }});
  res.json(updatedSheep);
  }catch(err){
  res.json({message:err});
}
})

module.exports = router;
