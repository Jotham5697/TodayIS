// watch this video 
//https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database

//const popup = require('node-popup');
//import {alert} from 'node-popup';
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Int32 } = require("mongodb");
// const { MongoClient } = require('mongodb');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://JothamK06:Pazzword12345697@todayis.hbmzteg.mongodb.net/UserInfo");

//const client = new MongoClient(uri);


//var path = require('path');
app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));


app.listen(5000, function () {
  console.log("Server is running on 5000");
})

const userSchema = {
  username: String,
  password: String,
  fname: String,
  lname: String,
  HL1: Boolean,
  lunch1: Number
}

const User = mongoose.model("User", userSchema);

app.get('/signUp.html', function (req, res) {
  res.sendFile(__dirname + '/templates/signUp.html');
  console.log("something");
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/templates/index.html');
  //alert("Connected");
});



function isHL(ishl){
  if(ishl === "HL"){return true;
  }else{
    return false;
  }
}

app.post("/signUp.html", function (req, res) {
  if(req.body.password === req.body.cpassword){
    
    try{
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      fname: req.body.fname,
      lname: req.body.lname,
      HL1: isHL(req.body.hl1), 
      lunch1: req.body.lunch1
    });
    console.log("User Successfully added!");
    newUser.save();
    res.redirect("/");
    } catch{
      console.error(`Error creating user ${req.body.username}:`, err);
    }

  } else {
    res.send(" <script> alert('Passwords Do Not Match'); window.location.href = 'signUp.html'</script>");
  }
})



// const { MongoClient } = require('mongodb');

// const uri = "mongodb+srv://JothamK06:Pazzword12345697@todayis.hbmzteg.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function main() {

//   try {
//     await client.connect();
//     console.log("Connected");
//   } catch (e) {
//     console.log(e);
//   } finally {
//     await client.close();
//     console.log("Disconnected");
//   }

// }
//main().catch(console.error);

// Sign Up Page

// class User {
//   constructor(userName, check1, Alunch) {
//     let username = userName;
//     let aHL = check1;
//     let aLunch = Alunch;
//   }
// }

// function logUserInput() {

//   const username = document.getElementById("userName").value;
//   let check1 = document.getElementById("Ahl");
//   let hlCheck1 = check1.checked;
//   let aLunch = document.getElementById("Alunch").value;
//   alert(username + " " + hlCheck1 + " " + aLunch);
//   console.log("this works");
//   localStorage.setItem("username1", username);
//   console.log(localStorage.getItem("username1"));
//   // const user1 = new User(username, hlCheck1, aLunch);
//   // return user1;
//   // main();
//   localStorage.clear();
//   console.log(localStorage.getItem("username1"));
// }

// console.log(user1);


// Idea: create class that holds info and in logUserInput initialize instance of one
// outside of loguserinput create different method that adds user and then call that method within
// loguserinput and initialize variables based on passed parameters


//console.log(localStorage.getItem("username"));


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
