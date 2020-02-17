const express = require('express');
const router = express.Router();
const POst = require('../models/Post');

// Route Returns All Posts
router.get('/', async (req,res) => {
  try{
    const posts = await Post.find(); //reserarch the .find mongoose method for limits/ querys etc
  }catch (err){
    res.json({message:err});
  }
});

// Route Returns Specifc Post
router.get('/:postId', async (req,res) => {
  //res.send('We are on specific!');
  //console.log(req.params.postId);
  try{
  const post = await Post.findById(req.params.postId);
  res.json(post);
}catch(err)){
  res.json({message:err});
  }
});

// Route Submits New Post
router.post('/', async (req,res) => {
  const post = new Post({
    title: req.body.title,
    description: req.budy.description
  });

  try{
    const savedPost = await post.save();
    res.json(savedPost);
  }catch (err){
    res.json({message: err});
  }
  //console.log(req.body);
});

//Delete POst
router.delete('/:postId',async (req,res) => {
  try{
    const removedPost = await Post.remove({_id});
    res.json(removedPost);
  }catch(err){
    res.json({message:err});
  }
});

//update a post
router.patch("/:postId", async (req,res) => {
  try{
  const updatedPost = await Post.updateOne({_id: res.param.postId}, {$set: {title:req.body.title }});
  res.json(updatedPost);
  }catch(err){
  res.json({message:err});
}
})

module.exports = router;
