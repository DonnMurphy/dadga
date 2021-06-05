// --------- Actual COmments -----------
// DEVNOTE - this code is based off the Youtube tutorial - "Build A Restful Api With Node.js Express & MongoDB | Rest Api Tutorial"
// Link - https://www.youtube.com/watch?v=vjf774RKrLc
// Code has been modified to suit the purposes of this project
// author - donnacha murphy - 116433164

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route Returns All Users
router.get('/', async (req,res) => {
  try{
    const users = await User.find(); //reserarch the .find mongoose method for limits/ querys etc
    res.json(users);
  }catch (err){
    res.json({message:err});
  }
});

// Route Returns Specifc User (public details)
router.get('/:userId', async (req,res) => {
  //res.send('We are on specific!');
  //console.log(req.params.userId);
  try{
  const user = await User.findById(req.params.userId);
  res.json(user);
}catch(err){
  res.json({message:err});
  }
});

// Route Returns Specifc User
router.get('/owner/:ownerId', async (req,res) => {
  //res.send('We are on specific!');
  //console.log(req.params.userId);
  try{
  const user = await User.findById(req.params.userId);
  res.json(user);
}catch(err){
  res.json({message:err});
  }
});
// Route creates a new user (Sign Up)
router.post('/', async (req,res) => {
  const user = new User({
    title: req.body.title,
    description: req.body.description
  });

  try{
    const savedUser = await user.save();
    res.json(savedUser);
  }catch (err){
    res.json({message: err});
  }
  //console.log(req.body);
});

// Route attemps login for user
router.post('/login/:userId', async (req,res) => {
  const user = new User({
    title: req.body.title,
    description: req.body.description
  });

  try{
    const savedUser = await user.save();
    res.json(savedUser);
  }catch (err){
    res.json({message: err});
  }
  //console.log(req.body);
});

//update a user details - check password first
router.patch("/:userId", async (req,res) => {
  try{
  const updatedUser = await User.updateOne({_id: res.param.userId}, {$set: {title:req.body.title }});
  res.json(updatedUser);
  }catch(err){
  res.json({message:err});
}
})

// --------------------------- Figure everything below later -------------------

// Route Submits New User
router.post('/', async (req,res) => {
  const user = new User({
    title: req.body.title,
    description: req.body.description
  });

  try{
    const savedUser = await user.save();
    res.json(savedUser);
  }catch (err){
    res.json({message: err});
  }
  //console.log(req.body);
});


//update a user -- Dont need this really?
router.patch("/:userId", async (req,res) => {
  try{
  const updatedUser = await User.updateOne({_id: res.param.userId}, {$set: {title:req.body.title }});
  res.json(updatedUser);
  }catch(err){
  res.json({message:err});
}
})

module.exports = router;
