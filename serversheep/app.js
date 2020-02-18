// note need to gen a package.json with npm init
// npm install express nodemon
//npm install mongoose
//npm install dotenv
// set up start in scripts section of packAGE.JSON "nodemon app.js"
//NOte he uses MLAB for hosting mongoose db hoste with link - I will include this with time
//time code -- 11:03

//POSTMAN FOR API TESTING - 26:14 - Install browser expension / desktop?? run through this to get postman details
// npm install body-parser


// CORS policy issue talk 50:10
//npm install cors
// --------- Actual COmments -----------
// DEVNOTE - this code is based off the Youtuve tutorial - "Build A Restful Api With Node.js Express & MongoDB | Rest Api Tutorial"
// Link - https://www.youtube.com/watch?v=vjf774RKrLc
// Code has been modified to suit the purposes of this project
// author - donnacha murphy - 116433164
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const app = express();

// Middlewares
//app.use('/posts', () => {
//  console.log('THis is middleware running');
//});
app.use(cors());
app.use(bodyParser.json());

//Import routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

//routes
app.get('/', (req,res) => {
  res.send('We are on home!');
});



// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
  {useNewUrlParser: true},
  () =>
  console.log('connected to DB!')
);


// Start Listening to Server
app.listen(3000);
